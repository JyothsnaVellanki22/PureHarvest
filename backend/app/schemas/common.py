from typing import Generic, Optional, TypeVar, Any
from pydantic import BaseModel, Field

T = TypeVar("T")


class ErrorDetail(BaseModel):
    code: str
    message: str
    details: Optional[Any] = None


class PaginationMeta(BaseModel):
    page: int
    limit: int
    total: int
    total_pages: int
    has_more: bool


class ApiResponse(BaseModel, Generic[T]):
    success: bool = True
    data: Optional[T] = None
    error: Optional[ErrorDetail] = None
    meta: Optional[PaginationMeta] = None
    correlation_id: Optional[str] = Field(default=None, alias="correlationId")

    model_config = {"populate_by_name": True}
