from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class RatingCreate(BaseModel):
    job_id: UUID
    client_id: UUID
    artisan_id: UUID
    stars: int  # 1-5
    comment: Optional[str] = None
    work_quality: Optional[float] = None
    communication: Optional[float] = None
    price_quality: Optional[float] = None


class RatingOut(BaseModel):
    id: UUID
    job_id: UUID
    client_id: UUID
    artisan_id: UUID
    stars: int
    comment: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
