from typing import List, Optional
from math import ceil
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.farm_service import FarmService
from app.schemas.farm import FarmCreate, FarmUpdate, FarmOut
from app.schemas.common import ApiResponse, PaginationMeta, ErrorDetail

router = APIRouter(prefix="/api/v1/farms", tags=["Farms"])


@router.get("", response_model=ApiResponse[List[FarmOut]])
def list_farms(
    request: Request,
    search: Optional[str] = Query(None, description="Search by farm name, location, or tag"),
    category: Optional[str] = Query(None, description="Filter by crop category"),
    district: Optional[str] = Query(None, description="Filter by district"),
    min_rating: Optional[float] = Query(None, ge=1.0, le=5.0, alias="minRating"),
    page: int = Query(1, ge=1, le=1000),
    limit: int = Query(12, ge=1, le=50),
    db: Session = Depends(get_db),
):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = FarmService(db)

    items, total = service.list_farms(
        search=search,
        category=category,
        district=district,
        min_rating=min_rating,
        page=page,
        limit=limit,
        correlation_id=correlation_id,
    )

    total_pages = ceil(total / limit) if total > 0 else 1

    return ApiResponse(
        success=True,
        data=[FarmOut.model_validate(item) for item in items],
        meta=PaginationMeta(
            page=page,
            limit=limit,
            total=total,
            total_pages=total_pages,
            has_more=page < total_pages,
        ),
        correlation_id=correlation_id,
    )


@router.get("/districts", response_model=ApiResponse[List[str]])
def get_districts(request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = FarmService(db)
    return ApiResponse(success=True, data=service.get_districts(), correlation_id=correlation_id)


@router.get("/categories", response_model=ApiResponse[List[str]])
def get_categories(request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = FarmService(db)
    return ApiResponse(success=True, data=service.get_categories(), correlation_id=correlation_id)


@router.get("/{farm_id}", response_model=ApiResponse[FarmOut])
def get_farm_by_id(farm_id: str, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = FarmService(db)
    farm = service.get_farm(farm_id, correlation_id)

    if not farm:
        return ApiResponse(
            success=False,
            error=ErrorDetail(code="FARM_NOT_FOUND", message=f"Farm with id '{farm_id}' was not found"),
            correlation_id=correlation_id,
        )

    return ApiResponse(success=True, data=FarmOut.model_validate(farm), correlation_id=correlation_id)


@router.post("", response_model=ApiResponse[FarmOut], status_code=status.HTTP_201_CREATED)
def create_farm(farm_data: FarmCreate, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = FarmService(db)
    created = service.create_farm(farm_data, correlation_id)
    return ApiResponse(success=True, data=FarmOut.model_validate(created), correlation_id=correlation_id)


@router.put("/{farm_id}", response_model=ApiResponse[FarmOut])
def update_farm(farm_id: str, farm_update: FarmUpdate, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = FarmService(db)
    updated = service.update_farm(farm_id, farm_update, correlation_id)

    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found")

    return ApiResponse(success=True, data=FarmOut.model_validate(updated), correlation_id=correlation_id)


@router.delete("/{farm_id}", response_model=ApiResponse[dict])
def delete_farm(farm_id: str, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = FarmService(db)
    deleted = service.delete_farm(farm_id, correlation_id)

    if not deleted:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found")

    return ApiResponse(success=True, data={"id": farm_id, "deleted": True}, correlation_id=correlation_id)
