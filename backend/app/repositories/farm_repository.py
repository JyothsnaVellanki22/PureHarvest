from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.models.farm import FarmModel
from app.schemas.farm import FarmCreate, FarmUpdate


class FarmRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, farm_id: str) -> Optional[FarmModel]:
        return self.db.query(FarmModel).filter(FarmModel.id == farm_id).first()

    def filter_and_paginate(
        self,
        search_query: Optional[str] = None,
        category: Optional[str] = None,
        district: Optional[str] = None,
        min_rating: Optional[float] = None,
        page: int = 1,
        limit: int = 12,
    ) -> Tuple[List[FarmModel], int]:
        query = self.db.query(FarmModel)

        if search_query:
            pattern = f"%{search_query.strip().lower()}%"
            query = query.filter(
                or_(
                    func.lower(FarmModel.name).like(pattern),
                    func.lower(FarmModel.location).like(pattern),
                    func.lower(FarmModel.district).like(pattern),
                )
            )

        if category and category.lower() != "all":
            query = query.filter(func.lower(FarmModel.category) == category.strip().lower())

        if district and district.lower() != "all":
            query = query.filter(func.lower(FarmModel.district) == district.strip().lower())

        if min_rating is not None:
            query = query.filter(FarmModel.rating >= min_rating)

        total = query.count()
        offset = (page - 1) * limit
        items = query.order_by(FarmModel.rating.desc()).offset(offset).limit(limit).all()

        return items, total

    def create(self, farm_data: FarmCreate, farm_id: str) -> FarmModel:
        db_farm = FarmModel(
            id=farm_id,
            name=farm_data.name,
            location=farm_data.location,
            district=farm_data.district,
            rating=farm_data.rating,
            image=farm_data.image,
            category=farm_data.category,
            description=farm_data.description,
            acres=farm_data.acres,
            established_year=farm_data.established_year,
            tags=farm_data.tags,
            plans_count=0,
        )
        self.db.add(db_farm)
        self.db.commit()
        self.db.refresh(db_farm)
        return db_farm

    def update(self, farm_id: str, farm_update: FarmUpdate) -> Optional[FarmModel]:
        db_farm = self.get_by_id(farm_id)
        if not db_farm:
            return None

        update_dict = farm_update.model_dump(exclude_unset=True)
        for field, value in update_dict.items():
            setattr(db_farm, field, value)

        self.db.commit()
        self.db.refresh(db_farm)
        return db_farm

    def delete(self, farm_id: str) -> bool:
        db_farm = self.get_by_id(farm_id)
        if not db_farm:
            return False
        self.db.delete(db_farm)
        self.db.commit()
        return True

    def get_all_districts(self) -> List[str]:
        results = self.db.query(FarmModel.district).distinct().all()
        return sorted([r[0] for r in results if r[0]])

    def get_all_categories(self) -> List[str]:
        results = self.db.query(FarmModel.category).distinct().all()
        return sorted([r[0] for r in results if r[0]])
