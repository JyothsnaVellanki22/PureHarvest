from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, Field, EmailStr


class HarvestPlanBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    price: float = Field(..., gt=0)
    period: str = Field(default="per week")
    description: Optional[str] = None
    includes: List[str] = Field(default_factory=list)
    spots: int = Field(default=10, ge=1)
    popular: bool = False


class HarvestPlanCreate(HarvestPlanBase):
    id: Optional[str] = None
    farm_id: str = Field(..., alias="farmId")

    model_config = {"populate_by_name": True}


class HarvestPlanOut(HarvestPlanBase):
    id: str
    farm_id: str = Field(..., alias="farmId")

    model_config = {"from_attributes": True, "populate_by_name": True}


class SubscriptionRequest(BaseModel):
    plan_id: str = Field(..., alias="planId")
    farm_id: str = Field(..., alias="farmId")
    subscriber_email: EmailStr = Field(..., alias="subscriberEmail")
    subscriber_name: str = Field(..., min_length=2, max_length=255, alias="subscriberName")
    payment_method_id: Optional[str] = Field(default="pm_card_default", alias="paymentMethodId")
    idempotency_key: Optional[str] = Field(default=None, alias="idempotencyKey")

    model_config = {"populate_by_name": True}


class SubscriptionOut(BaseModel):
    id: str = Field(..., alias="subscriptionId")
    plan_id: str = Field(..., alias="planId")
    farm_id: str = Field(..., alias="farmId")
    subscriber_email: str = Field(..., alias="subscriberEmail")
    subscriber_name: str = Field(..., alias="subscriberName")
    amount: float
    status: str
    idempotency_key: Optional[str] = Field(default=None, alias="idempotencyKey")
    created_at: datetime = Field(..., alias="createdAt")

    model_config = {"from_attributes": True, "populate_by_name": True}
