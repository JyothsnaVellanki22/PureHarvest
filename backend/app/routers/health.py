import time
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.config import settings
from app.schemas.common import ApiResponse

router = APIRouter(tags=["Health"])
start_time = time.time()


@router.get("/health", response_model=ApiResponse[dict])
def health_check(request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", "health")
    uptime_seconds = int(time.time() - start_time)

    # Database connectivity check
    db_status = "healthy"
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        db_status = "degraded"

    data = {
        "status": "healthy" if db_status == "healthy" else "degraded",
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "uptime_seconds": uptime_seconds,
        "database": db_status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    return ApiResponse(
        success=True,
        data=data,
        correlation_id=correlation_id,
    )
