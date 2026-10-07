from typing import Optional
from sqlalchemy.orm import Session
from app.models.user import UserModel
from app.schemas.user import UserRegister
from app.utils.security import get_password_hash


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: str) -> Optional[UserModel]:
        return self.db.query(UserModel).filter(UserModel.id == user_id).first()

    def get_by_email(self, email: str) -> Optional[UserModel]:
        return self.db.query(UserModel).filter(UserModel.email == email.strip().lower()).first()

    def create(self, user_data: UserRegister, user_id: str) -> UserModel:
        db_user = UserModel(
            id=user_id,
            name=user_data.name.strip(),
            email=user_data.email.strip().lower(),
            hashed_password=get_password_hash(user_data.password),
            role=user_data.role,
            farm_id=user_data.farm_id,
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user
