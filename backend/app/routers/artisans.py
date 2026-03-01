# Artisans: CRUD, list by city/geo, stats
from fastapi import APIRouter, HTTPException, Query
from uuid import UUID
from app.database import get_supabase
from app.models.artisan import ArtisanCreate, ArtisanUpdate, ArtisanOut

router = APIRouter()


@router.get("/artisans", response_model=list)
def list_artisans(
    city: str | None = Query(None),
    profession: str | None = Query(None),
    is_available: bool | None = Query(None),
    user_id: str | None = Query(None),
    limit: int = Query(50, le=100),
    offset: int = 0,
):
    supabase = get_supabase()
    q = supabase.table("artisans").select("*, profiles!inner(full_name, phone, email)", count="exact")
    if user_id:
        q = q.eq("user_id", user_id)
    if city:
        q = q.eq("city", city)
    if profession:
        q = q.eq("profession", profession)
    if is_available is not None:
        q = q.eq("is_available", is_available)
    q = q.range(offset, offset + limit - 1)
    r = q.execute()
    rows = r.data or []
    out = []
    for row in rows:
        prof = row.get("profiles") or {}
        if isinstance(prof, list):
            prof = prof[0] if prof else {}
        if not prof.get("email"):
            continue
            
        stat = supabase.table("artisan_stats").select("*").eq("artisan_id", row["id"]).execute()
        row["full_name"] = prof.get("full_name")
        row["phone"] = prof.get("phone")
        if "profiles" in row:
            del row["profiles"]
        row["stats"] = stat.data[0] if stat.data else None
        out.append(ArtisanOut(**row))
    return out


@router.get("/artisans/me", response_model=ArtisanOut)
def get_my_artisan_profile(user_id: UUID):
    """Get artisan profile for the logged in user."""
    supabase = get_supabase()
    r = supabase.table("artisans").select("*, profiles(full_name, phone)").eq("user_id", str(user_id)).execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Artisan profile not found for this user")
    
    row = r.data[0]
    prof = row.get("profiles") or {}
    if isinstance(prof, list):
        prof = prof[0] if prof else {}
        
    row["full_name"] = prof.get("full_name")
    row["phone"] = prof.get("phone")
    if "profiles" in row:
        del row["profiles"]
        
    stat = supabase.table("artisan_stats").select("*").eq("artisan_id", row["id"]).execute()
    row["stats"] = stat.data[0] if stat.data else None
    return ArtisanOut(**row)


@router.get("/artisans/{artisan_id}", response_model=ArtisanOut)
def get_artisan(artisan_id: UUID):
    supabase = get_supabase()
    r = supabase.table("artisans").select("*, profiles(full_name, phone)").eq("id", str(artisan_id)).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Artisan not found")
    row = r.data
    
    prof = row.get("profiles") or {}
    if isinstance(prof, list):
        prof = prof[0] if prof else {}
        
    row["full_name"] = prof.get("full_name")
    row["phone"] = prof.get("phone")
    if "profiles" in row:
        del row["profiles"]
    stat = supabase.table("artisan_stats").select("*").eq("artisan_id", str(artisan_id)).execute()
    row["stats"] = stat.data[0] if stat.data else None
    return ArtisanOut(**row)


@router.post("/artisans", response_model=ArtisanOut)
def create_artisan(body: ArtisanCreate):
    supabase = get_supabase()
    r = supabase.table("artisans").insert(body.model_dump(mode="json")).execute()
    if not r.data:
        raise HTTPException(status_code=400, detail="Insert failed")
    row = r.data[0]
    supabase.table("artisan_stats").insert({"artisan_id": row["id"]}).execute()
    return ArtisanOut(**row)


@router.patch("/artisans/{artisan_id}", response_model=ArtisanOut)
def update_artisan(artisan_id: UUID, body: ArtisanUpdate):
    supabase = get_supabase()
    data = body.model_dump(exclude_unset=True)
    if not data:
        return get_artisan(artisan_id)
    r = supabase.table("artisans").update(data).eq("id", str(artisan_id)).execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Artisan not found")
    return ArtisanOut(**r.data[0])
