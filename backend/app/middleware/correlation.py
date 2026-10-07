import uuid
import time
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import Response
from app.utils.logger import logger


class CorrelationIdMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        correlation_id = request.headers.get("X-Correlation-ID") or request.headers.get("x-correlation-id")
        if not correlation_id:
            correlation_id = f"corr_{uuid.uuid4().hex[:12]}"

        request.state.correlation_id = correlation_id
        start_time = time.perf_counter()

        response = await call_next(request)

        process_time_ms = round((time.perf_counter() - start_time) * 1000, 2)
        response.headers["X-Correlation-ID"] = correlation_id
        response.headers["X-Process-Time-Ms"] = str(process_time_ms)

        logger.info(
            f"{request.method} {request.url.path} completed with {response.status_code} in {process_time_ms}ms",
            extra={"correlation_id": correlation_id, "context": {"method": request.method, "path": request.url.path, "status": response.status_code}}
        )

        return response
