from sqlalchemy import Column, String, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class JournalEntryModel(Base):
    __tablename__ = "journal_entries"

    id = Column(String(64), primary_key=True, index=True)
    farm_id = Column(String(64), ForeignKey("farms.id", ondelete="CASCADE"), nullable=False, index=True)
    date = Column(String(50), nullable=False)
    update_type = Column(String(50), nullable=False)  # soil, sowing, irrigation, harvest
    title = Column(String(255), nullable=False)
    notes = Column(Text, nullable=False)
    weather = Column(String(100), default="Sunny, 28°C")
    images = Column(JSON, default=list)

    farm = relationship("FarmModel", back_populates="journal_entries")
