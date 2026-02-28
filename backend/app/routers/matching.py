# Matching: POST /match — returns top-5 artisans for a job
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.matching_service import match_artisans
from app.database import get_supabase
from app.services.notification_service import notify_artisan_new_job

router = APIRouter()


class MatchRequest(BaseModel):
    problem_type: str
    latitude: float
    longitude: float
    city: str
    severity: int = 3
    job_id: str | None = None  # if provided, we assign first artisan and send SMS


class MatchResult(BaseModel):
    artisan_id: str
    score: float
    distance_km: float
    full_name: str | None
    profession: str | None
    current_level: str | None
    avg_rating: float | None


@router.post("/match", response_model=list)
def post_match(body: MatchRequest):
    results = match_artisans(
        problem_type=body.problem_type,
        client_lat=body.latitude,
        client_lon=body.longitude,
        city=body.city,
        severity=body.severity,
        top_k=5,
    )
    out = [MatchResult(**r) for r in results]
    # Optional: if job_id provided, assign first artisan and send SMS
    if body.job_id and out:
        first = out[0]
        supabase = get_supabase()
        supabase.table("jobs").update({
            "artisan_id": first.artisan_id,
            "status": "pending",
        }).eq("id", body.job_id).execute()
        art = supabase.table("artisans").select("*, profiles(phone)").eq("id", first.artisan_id).single().execute()
        phone = None
        if art.data:
            prof = art.data.get("profiles") or {}
            phone = prof.get("phone") if isinstance(prof, dict) else None
        notify_artisan_new_job(
            first.artisan_id,
            body.job_id,
            phone,
            body.problem_type,
            body.city,
        )
    return out
