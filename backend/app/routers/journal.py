import uuid
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.journal import JournalEntryModel
from app.schemas.journal import JournalEntryCreate, JournalEntryOut
from app.schemas.common import ApiResponse
from app.models.farm import FarmModel

router = APIRouter(prefix="/api/v1/journal", tags=["Harvest Journal"])


@router.get("/farm/{farm_id}", response_model=ApiResponse[List[JournalEntryOut]])
def get_journal_by_farm(farm_id: str, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    entries = db.query(JournalEntryModel).filter(JournalEntryModel.farm_id == farm_id).all()
    return ApiResponse(
        success=True,
        data=[JournalEntryOut.model_validate(e) for e in entries],
        correlation_id=correlation_id,
    )


@router.post("", response_model=ApiResponse[JournalEntryOut], status_code=status.HTTP_201_CREATED)
def create_journal_entry(entry_data: JournalEntryCreate, request: Request, db: Session = Depends(get_db)):
    correlation_id = getattr(request.state, "correlation_id", None)
    farm = db.query(FarmModel).filter(FarmModel.id == entry_data.farm_id).first()
    if not farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found")

    entry_id = entry_data.id or f"jrn_{uuid.uuid4().hex[:8]}"
    db_entry = JournalEntryModel(
        id=entry_id,
        farm_id=entry_data.farm_id,
        date=entry_data.date,
        update_type=entry_data.update_type,
        title=entry_data.title,
        notes=entry_data.notes,
        weather=entry_data.weather,
        images=entry_data.images,
    )
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)

    return ApiResponse(
        success=True,
        data=JournalEntryOut.model_validate(db_entry),
        correlation_id=correlation_id,
    )
