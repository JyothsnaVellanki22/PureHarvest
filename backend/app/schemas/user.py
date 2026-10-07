from typing import Optional
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class UserRegister(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)
    role: str = Field(default="consumer", description="consumer, farmer, admin")
    farm_id: Optional[str] = Field(default=None, alias="farmId")

    model_config = {"populate_by_name": True}


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    role: str
    avatar_url: Optional[str] = Field(default=None, alias="avatarUrl")
    farm_id: Optional[str] = Field(default=None, alias="farmId")
    created_at: datetime = Field(..., alias="createdAt")

    model_config = {"from_attributes": True, "populate_by_name": True}


class TokenOut(BaseModel):
    access_token: str = Field(..., alias="accessToken")
    token_type: str = Field(default="bearer", alias="tokenType")
    user: UserOut

    model_config = {"populate_by_name": True}
