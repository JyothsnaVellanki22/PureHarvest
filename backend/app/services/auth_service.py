import uuid
from typing import Optional
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.database import get_db
from app.repositories.user_repository import UserRepository
from app.models.user import UserModel
from app.schemas.user import UserRegister, UserLogin, TokenOut, UserOut
from app.utils.security import verify_password, create_access_token, decode_access_token
from app.utils.logger import logger

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login", auto_error=False)


class AuthService:
    def __init__(self, db: Session):
        self.user_repo = UserRepository(db)

    def register(self, user_data: UserRegister, correlation_id: Optional[str] = None) -> TokenOut:
        existing = self.user_repo.get_by_email(user_data.email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A user with this email address already exists",
            )

        user_id = f"usr_{uuid.uuid4().hex[:10]}"
        user = self.user_repo.create(user_data, user_id)

        token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
        logger.info(f"User registered: {user.id} ({user.email})", extra={"correlation_id": correlation_id})

        return TokenOut(access_token=token, token_type="bearer", user=UserOut.model_validate(user))

    def login(self, login_data: UserLogin, correlation_id: Optional[str] = None) -> TokenOut:
        user = self.user_repo.get_by_email(login_data.email)
        if not user or not verify_password(login_data.password, user.hashed_password):
            logger.warning(f"Failed login attempt for {login_data.email}", extra={"correlation_id": correlation_id})
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = create_access_token(data={"sub": user.id, "email": user.email, "role": user.role})
        logger.info(f"User logged in: {user.id}", extra={"correlation_id": correlation_id})

        return TokenOut(access_token=token, token_type="bearer", user=UserOut.model_validate(user))


def get_current_user(token: Optional[str] = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> UserModel:
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_repo = UserRepository(db)
    user = user_repo.get_by_id(payload["sub"])
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User account not found")

    return user
