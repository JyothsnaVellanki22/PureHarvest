from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from app.database import Base


class UserModel(Base):
    __tablename__ = "users"

    id = Column(String(64), primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="consumer")  # consumer, farmer, admin
    avatar_url = Column(String(512), nullable=True)
    farm_id = Column(String(64), nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
