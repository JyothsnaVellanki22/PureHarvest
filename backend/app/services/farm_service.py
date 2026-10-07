import uuid
from typing import List, Optional, Tuple
from sqlalchemy.orm import Session
from app.repositories.farm_repository import FarmRepository
from app.models.farm import FarmModel
from app.schemas.farm import FarmCreate, FarmUpdate
from app.utils.logger import logger


class FarmService:
    def __init__(self, db: Session):
        self.repository = FarmRepository(db)

    def get_farm(self, farm_id: str, correlation_id: Optional[str] = None) -> Optional[FarmModel]:
        logger.debug(f"Fetching farm {farm_id}", extra={"correlation_id": correlation_id})
        return self.repository.get_by_id(farm_id)

    def list_farms(
        self,
        search: Optional[str] = None,
        category: Optional[str] = None,
        district: Optional[str] = None,
        min_rating: Optional[float] = None,
        page: int = 1,
        limit: int = 12,
        correlation_id: Optional[str] = None,
    ) -> Tuple[List[FarmModel], int]:
        safe_page = max(1, min(page, 1000))
        safe_limit = max(1, min(limit, 50))

        logger.info(
            f"Querying farms page={safe_page} limit={safe_limit} search={search} district={district}",
            extra={"correlation_id": correlation_id}
        )

        return self.repository.filter_and_paginate(
            search_query=search,
            category=category,
            district=district,
            min_rating=min_rating,
            page=safe_page,
            limit=safe_limit,
        )

    def create_farm(self, farm_data: FarmCreate, correlation_id: Optional[str] = None) -> FarmModel:
        farm_id = farm_data.id or f"farm_{uuid.uuid4().hex[:8]}"
        created = self.repository.create(farm_data, farm_id)
        logger.info(f"Farm created successfully: {farm_id}", extra={"correlation_id": correlation_id})
        return created

    def update_farm(self, farm_id: str, farm_update: FarmUpdate, correlation_id: Optional[str] = None) -> Optional[FarmModel]:
        updated = self.repository.update(farm_id, farm_update)
        if updated:
            logger.info(f"Farm updated successfully: {farm_id}", extra={"correlation_id": correlation_id})
        return updated

    def delete_farm(self, farm_id: str, correlation_id: Optional[str] = None) -> bool:
        deleted = self.repository.delete(farm_id)
        if deleted:
            logger.info(f"Farm deleted: {farm_id}", extra={"correlation_id": correlation_id})
        return deleted

    def get_districts(self) -> List[str]:
        return self.repository.get_all_districts()

    def get_categories(self) -> List[str]:
        return self.repository.get_all_categories()
