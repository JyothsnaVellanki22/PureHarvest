from sqlalchemy import Column, String, Float, Integer, Text, JSON
from sqlalchemy.orm import relationship
from app.database import Base


class FarmModel(Base):
    __tablename__ = "farms"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False, index=True)
    location = Column(String(255), nullable=False)
    district = Column(String(100), nullable=False, index=True)
    rating = Column(Float, default=4.5)
    image = Column(String(512), nullable=False)
    category = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    acres = Column(Float, nullable=True)
    established_year = Column(Integer, nullable=True)
    plans_count = Column(Integer, default=0)
    tags = Column(JSON, default=list)

    # Relationships
    plans = relationship("HarvestPlanModel", back_populates="farm", cascade="all, delete-orphan")
    journal_entries = relationship("JournalEntryModel", back_populates="farm", cascade="all, delete-orphan")
