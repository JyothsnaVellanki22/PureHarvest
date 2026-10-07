import uuid
from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from app.repositories.plan_repository import PlanRepository
from app.repositories.farm_repository import FarmRepository
from app.models.plan import HarvestPlanModel, PlanSubscriptionModel
from app.schemas.plan import HarvestPlanCreate, SubscriptionRequest
from app.utils.logger import logger


class PlanService:
    def __init__(self, db: Session):
        self.plan_repo = PlanRepository(db)
        self.farm_repo = FarmRepository(db)

    def get_plans_for_farm(self, farm_id: str) -> List[HarvestPlanModel]:
        return self.plan_repo.get_by_farm_id(farm_id)

    def create_plan(self, plan_data: HarvestPlanCreate, correlation_id: Optional[str] = None) -> HarvestPlanModel:
        farm = self.farm_repo.get_by_id(plan_data.farm_id)
        if not farm:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Referenced farm does not exist")

        plan_id = plan_data.id or f"plan_{uuid.uuid4().hex[:8]}"
        created = self.plan_repo.create_plan(plan_data, plan_id)
        logger.info(f"Harvest plan created: {plan_id} for farm {plan_data.farm_id}", extra={"correlation_id": correlation_id})
        return created

    def subscribe_to_plan(
        self, sub_req: SubscriptionRequest, correlation_id: Optional[str] = None
    ) -> PlanSubscriptionModel:
        # Idempotency verification: If idempotency_key is provided and already exists, return existing subscription
        if sub_req.idempotency_key:
            existing = self.plan_repo.get_subscription_by_idempotency_key(sub_req.idempotency_key)
            if existing:
                logger.info(
                    f"Idempotent replay for subscription {existing.id} key={sub_req.idempotency_key}",
                    extra={"correlation_id": correlation_id}
                )
                return existing

        # Validate that plan exists
        plan = self.plan_repo.get_by_id(sub_req.plan_id)
        if not plan:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Harvest plan not found")

        # Validate farm match
        if plan.farm_id != sub_req.farm_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Plan does not belong to specified farm"
            )

        subscription_id = f"sub_{uuid.uuid4().hex[:10]}"
        created_sub = self.plan_repo.create_subscription(sub_req, plan.price, subscription_id)

        logger.info(
            f"Plan subscription confirmed: {subscription_id} for plan {sub_req.plan_id}",
            extra={"correlation_id": correlation_id}
        )
        return created_sub
