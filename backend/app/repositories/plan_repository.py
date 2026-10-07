import uuid
from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.plan import HarvestPlanModel, PlanSubscriptionModel
from app.schemas.plan import HarvestPlanCreate, SubscriptionRequest


class PlanRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, plan_id: str) -> Optional[HarvestPlanModel]:
        return self.db.query(HarvestPlanModel).filter(HarvestPlanModel.id == plan_id).first()

    def get_by_farm_id(self, farm_id: str) -> List[HarvestPlanModel]:
        return self.db.query(HarvestPlanModel).filter(HarvestPlanModel.farm_id == farm_id).all()

    def create_plan(self, plan_data: HarvestPlanCreate, plan_id: str) -> HarvestPlanModel:
        db_plan = HarvestPlanModel(
            id=plan_id,
            farm_id=plan_data.farm_id,
            name=plan_data.name,
            price=plan_data.price,
            period=plan_data.period,
            description=plan_data.description,
            includes=plan_data.includes,
            spots=plan_data.spots,
            popular=plan_data.popular,
        )
        self.db.add(db_plan)
        self.db.commit()
        self.db.refresh(db_plan)
        return db_plan

    def get_subscription_by_idempotency_key(self, idempotency_key: str) -> Optional[PlanSubscriptionModel]:
        if not idempotency_key:
            return None
        return (
            self.db.query(PlanSubscriptionModel)
            .filter(PlanSubscriptionModel.idempotency_key == idempotency_key)
            .first()
        )

    def create_subscription(
        self, sub_req: SubscriptionRequest, plan_price: float, subscription_id: str
    ) -> PlanSubscriptionModel:
        db_sub = PlanSubscriptionModel(
            id=subscription_id,
            plan_id=sub_req.plan_id,
            farm_id=sub_req.farm_id,
            subscriber_email=sub_req.subscriber_email,
            subscriber_name=sub_req.subscriber_name,
            amount=plan_price,
            status="confirmed",
            idempotency_key=sub_req.idempotency_key,
        )
        self.db.add(db_sub)
        self.db.commit()
        self.db.refresh(db_sub)
        return db_sub
