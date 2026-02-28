from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime
from enum import Enum


class JobStatus(str, Enum):
    requested = "requested"
    pending = "pending"
    accepted = "accepted"
    in_progress = "in_progress"
    completed = "completed"
    closed = "closed"
    complaint = "complaint"
    reassigned = "reassigned"
    completed_after_complaint = "completed_after_complaint"


class JobCreate(BaseModel):
    client_id: UUID
    problem_type: str
    description: Optional[str] = None
    city: str
    severity: int  # 1-5
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    estimated_price_min_mad: float
    estimated_price_max_mad: float
    estimated_duration_hours: float
    photo_urls: Optional[List[str]] = None  # before photos


class JobUpdate(BaseModel):
    status: Optional[JobStatus] = None
    artisan_id: Optional[UUID] = None
    guarantee_until: Optional[datetime] = None
    completed_at: Optional[datetime] = None


class JobPhotoOut(BaseModel):
    id: UUID
    job_id: UUID
    type: str  # before | after
    url: str
    created_at: Optional[datetime] = None


class JobOut(BaseModel):
    id: UUID
    client_id: UUID
    artisan_id: Optional[UUID] = None
    status: str
    problem_type: str
    description: Optional[str] = None
    city: str
    severity: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    estimated_price_min_mad: Optional[float] = None
    estimated_price_max_mad: Optional[float] = None
    estimated_duration_hours: Optional[float] = None
    guarantee_until: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    photos: Optional[List[JobPhotoOut]] = None

    class Config:
        from_attributes = True


class JobAccept(BaseModel):
    artisan_id: UUID


class JobComplete(BaseModel):
    after_photo_urls: List[str] = []


class JobComplaint(BaseModel):
    comment: str
    photo_urls: Optional[List[str]] = None


class JobRate(BaseModel):
    stars: int  # 1-5
    comment: Optional[str] = None
    work_quality: Optional[float] = None
    communication: Optional[float] = None
    price_quality: Optional[float] = None
