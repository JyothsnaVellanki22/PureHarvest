from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import Base, engine
from app.middleware.correlation import CorrelationIdMiddleware
from app.middleware.idempotency import IdempotencyMiddleware
from app.middleware.security import SecurityHeadersMiddleware
from app.routers import health, auth, farms, plans, journal
from app.utils.logger import logger

# Import models so SQLAlchemy metadata registers all tables
import app.models  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Create tables if not existing
    logger.info("Initializing database schemas...")
    Base.metadata.create_all(bind=engine)
    logger.info("Database schemas initialized successfully.")
    yield
    # Shutdown
    logger.info("Shutting down PureHarvest API service.")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Production-grade FastAPI backend for PureHarvest — direct farm-to-consumer platform.",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan,
)

# Custom Middlewares (Lifo execution order in Starlette)
app.add_middleware(SecurityHeadersMiddleware)
app.add_middleware(IdempotencyMiddleware)
app.add_middleware(CorrelationIdMiddleware)

# Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["X-Correlation-ID", "X-Process-Time-Ms", "Idempotency-Key"],
)

# Mount Routers
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(farms.router)
app.include_router(plans.router)
app.include_router(journal.router)


@app.get("/", tags=["Root"])
def root():
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs",
        "health": "/health",
    }
