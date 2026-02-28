from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class ProfileBase(BaseModel):
    role: str  # client | worker
    full_name: str
    email: str
    phone: Optional[str] = None
    city: Optional[str] = None


class ProfileCreate(ProfileBase):
    id: UUID  # from Supabase auth

    # Note: password is not in the base model or create model here
    # because the create model is just mapping for internal use.
    # We will handle password at the router level.


class ProfileOut(ProfileBase):
    id: UUID
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class ClientProfileOut(ProfileOut):
    role: str = "client"
