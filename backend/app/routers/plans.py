from typing import List
from fastapi import APIRouter, Depends, Header, Request, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.plan_service import PlanService
from app.schemas.plan import (
    HarvestPlanCreate,
    HarvestPlanOut,
    SubscriptionRequest,
    SubscriptionOut,
)
from app.schemas.common import ApiResponse

router = APIRouter(prefix="/api/v1/plans", tags=["Harvest Plans"])


@router.get("/farm/{farm_id}", response_model=ApiResponse[List[HarvestPlanOut]])
def get_plans_by_farm(farm_id: str, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = PlanService(db)
    plans = service.get_plans_for_farm(farm_id)
    return ApiResponse(
        success=True,
        data=[HarvestPlanOut.model_validate(p) for p in plans],
        correlation_id=correlation_id,
    )


@router.post("", response_model=ApiResponse[HarvestPlanOut], status_code=status.HTTP_201_CREATED)
def create_plan(plan_data: HarvestPlanCreate, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = PlanService(db)
    created = service.create_plan(plan_data, correlation_id)
    return ApiResponse(
        success=True,
        data=HarvestPlanOut.model_validate(created),
        correlation_id=correlation_id,
    )


@router.post("/subscribe", response_model=ApiResponse[SubscriptionOut], status_code=status.HTTP_201_CREATED)
def subscribe_to_plan(
    sub_req: SubscriptionRequest,
    request: Request,
    idempotency_key: str = Header(None, alias="Idempotency-Key"),
    db: Session = Depends(get_db),
):
    correlation_id = getattr(request.state, "correlation_id", None)
    if idempotency_key and not sub_req.idempotency_key:
        sub_req.idempotency_key = idempotency_key

    service = PlanService(db)
    subscription = service.subscribe_to_plan(sub_req, correlation_id)

    return ApiResponse(
        success=True,
        data=SubscriptionOut.model_validate(subscription),
        correlation_id=correlation_id,
    )
