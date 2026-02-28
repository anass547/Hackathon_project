from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class ArtisanBase(BaseModel):
    profession: str  # Zlayji, Sebbagh, Gebbas, Plombier, Electricien
    description: Optional[str] = None
    city: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    base_hourly_rate_mad: Optional[float] = None
    is_available: bool = True


class ArtisanCreate(ArtisanBase):
    user_id: UUID


class ArtisanUpdate(BaseModel):
    profession: Optional[str] = None
    description: Optional[str] = None
    city: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    base_hourly_rate_mad: Optional[float] = None
    is_available: Optional[bool] = None


class ArtisanStatsOut(BaseModel):
    artisan_id: UUID
    total_jobs: int = 0
    on_time_ratio: float = 1.0
    avg_rating: float = 0
    avg_response_time_minutes: int = 0
    work_quality_score: float = 0
    reliability_score: float = 1.0
    communication_score: float = 0
    price_quality_score: float = 0
    innovation_score: float = 0
    global_score: float = 0
    updated_at: Optional[datetime] = None


class ArtisanOut(BaseModel):
    id: UUID
    user_id: UUID
    profession: str
    description: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    city: str
    base_hourly_rate_mad: Optional[float] = None
    current_level: str = "Apprenti"
    is_available: bool = True
    refusal_count: int = 0
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    full_name: Optional[str] = None
    phone: Optional[str] = None
    stats: Optional[ArtisanStatsOut] = None

    class Config:
        from_attributes = True


class ArtisanSemiProfile(BaseModel):
    """Shared with client when worker accepts: photo, name, phone."""
    artisan_id: UUID
    full_name: str
    phone: Optional[str] = None
    profession: str
    photo_url: Optional[str] = None
