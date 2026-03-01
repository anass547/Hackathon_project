# Jobs: create, get, accept, refuse, complete, complaint, rate
from fastapi import APIRouter, HTTPException
from uuid import UUID
from datetime import datetime, timedelta
from typing import Optional
from app.database import get_supabase
from app.models.job import (
    JobCreate,
    JobOut,
    JobComplete,
    JobComplaint,
    JobRate,
)
from app.services.ranking_service import recalc_artisan_score, update_stats_from_rating

router = APIRouter()


def _job_with_photos(supabase, job_row: dict) -> dict:
    photos = supabase.table("job_photos").select("*").eq("job_id", job_row["id"]).execute()
    job_row["photos"] = photos.data or []
    return job_row


@router.post("/jobs", response_model=JobOut)
def create_job(body: JobCreate):
    supabase = get_supabase()
    payload = body.model_dump(mode="json", exclude={"photo_urls"})
    r = supabase.table("jobs").insert(payload).execute()
    if not r.data:
        raise HTTPException(status_code=400, detail="Create job failed")
    job = r.data[0]
    if body.photo_urls:
        for url in body.photo_urls:
            supabase.table("job_photos").insert({
                "job_id": job["id"],
                "type": "before",
                "url": url,
            }).execute()
    job = _job_with_photos(supabase, job)
    amount = (body.estimated_price_min_mad + body.estimated_price_max_mad) / 2
    supabase.table("payments").insert({
        "job_id": job["id"],
        "amount_mad": amount,
        "status": "reserved",
        "transaction_id": f"mock_txn_{job['id'][:8]}",
    }).execute()
    return JobOut(**job)


@router.get("/jobs/{job_id}", response_model=JobOut)
def get_job(job_id: UUID):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobOut(**_job_with_photos(supabase, r.data))


@router.delete("/jobs/{job_id}")
def delete_job(job_id: UUID):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Job not found")
    supabase.table("jobs").delete().eq("id", str(job_id)).execute()
    return {"message": "Job deleted successfully"}


@router.get("/jobs", response_model=list)
def list_jobs(
    client_id: Optional[UUID] = None,
    artisan_id: Optional[UUID] = None,
    status: Optional[str] = None,
    city: Optional[str] = None,
    problem_type: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
):
    supabase = get_supabase()
    q = supabase.table("jobs").select("*")
    if client_id:
        q = q.eq("client_id", str(client_id))
    if artisan_id:
        q = q.eq("artisan_id", str(artisan_id))
    if status:
        q = q.eq("status", status)
    if city:
        q = q.eq("city", city)
    if problem_type:
        q = q.eq("problem_type", problem_type)
    q = q.order("created_at", desc=True).range(offset, offset + limit - 1)
    r = q.execute()
    out = []
    for row in r.data or []:
        out.append(JobOut(**_job_with_photos(supabase, row)))
    return out


@router.post("/jobs/{job_id}/accept", response_model=JobOut)
def accept_job(job_id: UUID, artisan_id: UUID):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Job not found")
    job = r.data
    if job["status"] not in ("requested", "pending"):
        raise HTTPException(status_code=400, detail="Job not in requestable state")
    supabase.table("jobs").update({
        "artisan_id": str(artisan_id),
        "status": "accepted",
        "updated_at": datetime.utcnow().isoformat(),
    }).eq("id", str(job_id)).execute()
    updated = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    return JobOut(**_job_with_photos(supabase, updated.data))


@router.post("/jobs/{job_id}/refuse")
def refuse_job(job_id: UUID, artisan_id: UUID):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Job not found")
    job = r.data
    art = supabase.table("artisans").select("refusal_count").eq("id", str(artisan_id)).single().execute()
    count = (art.data or {}).get("refusal_count") or 0
    supabase.table("artisans").update({"refusal_count": count + 1, "updated_at": datetime.utcnow().isoformat()}).eq("id", str(artisan_id)).execute()
    supabase.table("jobs").update({"artisan_id": None, "status": "requested", "updated_at": datetime.utcnow().isoformat()}).eq("id", str(job_id)).execute()
    return {"message": "Refused", "job_id": str(job_id)}


@router.post("/jobs/{job_id}/complete", response_model=JobOut)
def complete_job(job_id: UUID, body: JobComplete):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Job not found")
    job = r.data
    if job["status"] not in ("accepted", "in_progress"):
        raise HTTPException(status_code=400, detail="Job not in completable state")
    now = datetime.utcnow()
    guarantee_until = (now + timedelta(hours=48)).isoformat()
    for url in body.after_photo_urls:
        supabase.table("job_photos").insert({"job_id": str(job_id), "type": "after", "url": url}).execute()
    supabase.table("jobs").update({
        "status": "completed",
        "completed_at": now.isoformat(),
        "guarantee_until": guarantee_until,
        "updated_at": now.isoformat(),
    }).eq("id", str(job_id)).execute()
    updated = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    return JobOut(**_job_with_photos(supabase, updated.data))


@router.post("/jobs/{job_id}/complaint", response_model=JobOut)
def complaint_job(job_id: UUID, body: JobComplaint):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Job not found")
    job = r.data
    if job["status"] != "completed":
        raise HTTPException(status_code=400, detail="Can only complain when job is in guarantee window")
    if job.get("guarantee_until"):
        gu = job["guarantee_until"].replace("Z", "+00:00")
        if datetime.fromisoformat(gu) < datetime.utcnow():
            raise HTTPException(status_code=400, detail="48h guarantee window has passed")
    for url in (body.photo_urls or []):
        supabase.table("job_photos").insert({"job_id": str(job_id), "type": "after", "url": url}).execute()
    supabase.table("jobs").update({
        "status": "complaint",
        "updated_at": datetime.utcnow().isoformat(),
    }).eq("id", str(job_id)).execute()
    updated = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    return JobOut(**_job_with_photos(supabase, updated.data))


@router.post("/jobs/{job_id}/rate")
def rate_job(job_id: UUID, body: JobRate):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Job not found")
    job = r.data
    if job["status"] not in ("completed", "closed", "completed_after_complaint"):
        raise HTTPException(status_code=400, detail="Job must be completed to rate")
    existing = supabase.table("ratings").select("id").eq("job_id", str(job_id)).execute()
    if existing.data:
        raise HTTPException(status_code=400, detail="Already rated")
    supabase.table("ratings").insert({
        "job_id": str(job_id),
        "client_id": str(job["client_id"]),
        "artisan_id": str(job["artisan_id"]),
        "stars": body.stars,
        "comment": body.comment,
        "work_quality": body.work_quality or body.stars,
        "communication": body.communication or body.stars,
        "price_quality": body.price_quality or body.stars,
    }).execute()
    update_stats_from_rating(
        supabase,
        UUID(job["artisan_id"]),
        body.stars,
        float(body.work_quality or body.stars),
        float(body.communication or body.stars),
        float(body.price_quality or body.stars),
    )
    return {"message": "Rated", "job_id": str(job_id)}


@router.post("/jobs/{job_id}/start", response_model=JobOut)
def start_job(job_id: UUID):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data or r.data["status"] != "accepted":
        raise HTTPException(status_code=400, detail="Job not in accepted state")
    supabase.table("jobs").update({"status": "in_progress", "updated_at": datetime.utcnow().isoformat()}).eq("id", str(job_id)).execute()
    updated = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    return JobOut(**_job_with_photos(supabase, updated.data))


@router.post("/jobs/{job_id}/close", response_model=JobOut)
def close_job(job_id: UUID):
    supabase = get_supabase()
    r = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Job not found")
    job = r.data
    if job["status"] != "completed":
        raise HTTPException(status_code=400, detail="Only completed jobs can be closed")
    supabase.table("jobs").update({"status": "closed", "updated_at": datetime.utcnow().isoformat()}).eq("id", str(job_id)).execute()
    supabase.table("payments").update({"status": "released", "updated_at": datetime.utcnow().isoformat()}).eq("job_id", str(job_id)).execute()
    updated = supabase.table("jobs").select("*").eq("id", str(job_id)).single().execute()
    return JobOut(**_job_with_photos(supabase, updated.data))
