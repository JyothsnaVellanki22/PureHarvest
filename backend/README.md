# PureHarvest FastAPI Backend 🚀

Production-grade, asynchronous REST API for the **PureHarvest** platform built with **Python 3.12**, **FastAPI**, **SQLAlchemy**, and **PostgreSQL** (with zero-config SQLite local fallback).

---

## Architecture & Layering

The backend follows Clean Architecture principles:

- **Routers (`app/routers/`)**: Presentation & HTTP protocol layer. Validates requests and serializes standard `ApiResponse` envelopes.
- **Services (`app/services/`)**: Business logic layer. Encapsulates business rules, idempotency verification, and domain logic.
- **Repositories (`app/repositories/`)**: Data access layer. Manages database transactions and query optimizations.
- **Models (`app/models/`)**: SQLAlchemy ORM entities with foreign keys and relationships.
- **Schemas (`app/schemas/`)**: Pydantic v2 data transfer objects (DTOs) and validation schemas.
- **Middleware (`app/middleware/`)**: Correlation ID tracing, idempotency key deduplication, and HTTP security headers.
- **Utils (`app/utils/`)**: Structured differentiated logger and bcrypt/JWT security utilities.

---

## Getting Started

### 1. Prerequisites
- Python 3.10+ (Python 3.12 recommended)
- `pip` or `venv`
- (Optional) Docker & Docker Compose for containerized PostgreSQL

### 2. Local Setup
```bash
cd backend

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables (optional, defaults to SQLite)
cp .env.example .env

# Seed initial Andhra Pradesh & Telangana farms, plans, and demo users
python seed.py

# Start development server
uvicorn app.main:app --reload --port 8000
```

The API will be available at:
- **Root**: [http://localhost:8000](http://localhost:8000)
- **Interactive Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
- **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

---

## Docker & PostgreSQL Orchestration

To run the complete production stack (FastAPI + PostgreSQL 16) with a single command:

```bash
docker compose up --build -d
```

To stop:
```bash
docker compose down
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | System health, uptime & DB status |
| `GET` | `/api/v1/farms` | Search & filter farms with pagination |
| `GET` | `/api/v1/farms/{id}` | Farm detail by ID |
| `POST` | `/api/v1/farms` | Register a new farm |
| `GET` | `/api/v1/farms/districts` | List available districts |
| `GET` | `/api/v1/farms/categories` | List available crop categories |
| `GET` | `/api/v1/plans/farm/{farm_id}` | List plans for a farm |
| `POST` | `/api/v1/plans/subscribe` | Subscribe to harvest plan (supports `Idempotency-Key`) |
| `POST` | `/api/v1/auth/register` | Register customer / farmer user |
| `POST` | `/api/v1/auth/login` | Authenticate and obtain JWT token |
| `GET` | `/api/v1/auth/me` | Fetch authenticated profile |
| `GET` | `/api/v1/journal/farm/{farm_id}` | Farm harvest timeline journal entries |

---

## Automated Testing

Run the test suite with pytest:
```bash
pytest -v
```
