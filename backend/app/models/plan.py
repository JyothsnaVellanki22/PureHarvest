from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class HarvestPlanModel(Base):
    __tablename__ = "harvest_plans"

    id = Column(String(64), primary_key=True, index=True)
    farm_id = Column(String(64), ForeignKey("farms.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(255), nullable=False)
    price = Column(Float, nullable=False)
    period = Column(String(50), default="per week")
    description = Column(Text, nullable=True)
    includes = Column(JSON, default=list)
    spots = Column(Integer, default=10)
    popular = Column(Boolean, default=False)

    farm = relationship("FarmModel", back_populates="plans")
    subscriptions = relationship("PlanSubscriptionModel", back_populates="plan", cascade="all, delete-orphan")


class PlanSubscriptionModel(Base):
    __tablename__ = "plan_subscriptions"

    id = Column(String(64), primary_key=True, index=True)
    plan_id = Column(String(64), ForeignKey("harvest_plans.id", ondelete="CASCADE"), nullable=False, index=True)
    farm_id = Column(String(64), nullable=False, index=True)
    subscriber_email = Column(String(255), nullable=False, index=True)
    subscriber_name = Column(String(255), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String(50), default="confirmed")
    idempotency_key = Column(String(128), nullable=True, unique=True, index=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    plan = relationship("HarvestPlanModel", back_populates="subscriptions")
