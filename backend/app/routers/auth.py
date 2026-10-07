from fastapi import APIRouter, Depends, Request, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.auth_service import AuthService, get_current_user
from app.schemas.user import UserRegister, UserLogin, TokenOut, UserOut
from app.schemas.common import ApiResponse
from app.models.user import UserModel

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])


@router.post("/register", response_model=ApiResponse[TokenOut], status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = AuthService(db)
    token_out = service.register(user_data, correlation_id)
    return ApiResponse(success=True, data=token_out, correlation_id=correlation_id)


@router.post("/login", response_model=ApiResponse[TokenOut])
def login(login_data: UserLogin, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    service = AuthService(db)
    token_out = service.login(login_data, correlation_id)
    return ApiResponse(success=True, data=token_out, correlation_id=correlation_id)


@router.get("/me", response_model=ApiResponse[UserOut])
def get_me(request: Request, current_user: UserModel = Depends(get_current_user)):
    correlation_id = getattr(request.state, "correlation_id", None)
    return ApiResponse(
        success=True,
        data=UserOut.model_validate(current_user),
        correlation_id=correlation_id,
    )
