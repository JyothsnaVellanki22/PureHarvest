import time
from typing import Dict, Tuple
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response


class IdempotencyCache:
    def __init__(self, ttl_seconds: int = 86400):
        self._cache: Dict[str, Tuple[int, bytes, Dict[str, str], float]] = {}
        self.ttl_seconds = ttl_seconds

    def get(self, key: str) -> Tuple[int, bytes, Dict[str, str]] | None:
        if key in self._cache:
            status_code, body, headers, timestamp = self._cache[key]
            if time.time() - timestamp < self.ttl_seconds:
                return status_code, body, headers
            del self._cache[key]
        return None

    def set(self, key: str, status_code: int, body: bytes, headers: Dict[str, str]) -> None:
        self._cache[key] = (status_code, body, headers, time.time())


idempotency_cache = IdempotencyCache()


class IdempotencyMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        # Idempotency applies to state-mutating methods
        if request.method not in ("POST", "PUT", "PATCH", "DELETE"):
            return await call_next(request)

        idempotency_key = request.headers.get("Idempotency-Key") or request.headers.get("X-Idempotency-Key")
        if not idempotency_key:
            return await call_next(request)

        cached = idempotency_cache.get(idempotency_key)
        if cached:
            status_code, body, headers = cached
            res_headers = dict(headers)
            res_headers["X-Cache-Lookup"] = "HIT-IDEMPOTENT"
            return Response(content=body, status_code=status_code, headers=res_headers)

        response = await call_next(request)

        # Cache successful responses
        if response.status_code in (200, 201, 202, 204):
            body_chunks = [chunk async for chunk in response.body_iterator]
            full_body = b"".join(body_chunks)
            res_headers = dict(response.headers)
            idempotency_cache.set(idempotency_key, response.status_code, full_body, res_headers)
            return Response(content=full_body, status_code=response.status_code, headers=res_headers)

        return response
