# Ratings: POST /ratings (alternative to job rate; list by artisan)
from fastapi import APIRouter, HTTPException, Query
from uuid import UUID
from app.database import get_supabase
from app.models.rating import RatingCreate, RatingOut

router = APIRouter()


@router.post("/ratings", response_model=RatingOut)
def create_rating(body: RatingCreate):
    supabase = get_supabase()
    r = supabase.table("ratings").insert(body.model_dump(mode="json")).execute()
    if not r.data:
        raise HTTPException(status_code=400, detail="Insert failed")
    return RatingOut(**r.data[0])


@router.get("/ratings", response_model=list)
def list_ratings(artisan_id: UUID | None = Query(None), job_id: UUID | None = Query(None), limit: int = 50):
    supabase = get_supabase()
    q = supabase.table("ratings").select("*")
    if artisan_id:
        q = q.eq("artisan_id", str(artisan_id))
    if job_id:
        q = q.eq("job_id", str(job_id))
    q = q.order("created_at", desc=True).limit(limit)
    r = q.execute()
    return [RatingOut(**row) for row in (r.data or [])]
