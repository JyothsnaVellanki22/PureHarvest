from typing import List, Optional
from pydantic import BaseModel, Field


class FarmBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=255)
    location: str = Field(..., min_length=2, max_length=255)
    district: str = Field(..., min_length=2, max_length=100)
    rating: float = Field(default=4.5, ge=1.0, le=5.0)
    image: str = Field(..., max_length=512)
    category: str = Field(..., min_length=2, max_length=100)
    description: Optional[str] = None
    acres: Optional[float] = Field(default=None, ge=0.1)
    established_year: Optional[int] = Field(default=None, ge=1900, le=2100)
    tags: List[str] = Field(default_factory=list)


class FarmCreate(FarmBase):
    id: Optional[str] = None


class FarmUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    district: Optional[str] = None
    rating: Optional[float] = Field(default=None, ge=1.0, le=5.0)
    image: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    acres: Optional[float] = None
    established_year: Optional[int] = None
    tags: Optional[List[str]] = None


class FarmOut(FarmBase):
    id: str
    plans_count: int = Field(default=0, alias="plansCount")

    model_config = {"from_attributes": True, "populate_by_name": True}
