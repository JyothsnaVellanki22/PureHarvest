from typing import List, Optional
from pydantic import BaseModel, Field


class JournalEntryBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    update_type: str = Field(..., description="soil, sowing, irrigation, harvest, inspection", alias="updateType")
    notes: str = Field(..., min_length=5)
    date: str
    weather: Optional[str] = "Sunny, 28°C"
    images: List[str] = Field(default_factory=list)

    model_config = {"populate_by_name": True}


class JournalEntryCreate(JournalEntryBase):
    id: Optional[str] = None
    farm_id: str = Field(..., alias="farmId")


class JournalEntryOut(JournalEntryBase):
    id: str
    farm_id: str = Field(..., alias="farmId")

    model_config = {"from_attributes": True, "populate_by_name": True}
