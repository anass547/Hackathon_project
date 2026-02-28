# Ranking & meritocracy: global_score and worker level (Apprenti → Maitre Maalem)
from uuid import UUID
from datetime import datetime
from app.config import get_settings

settings = get_settings()


def _level_from_score(score: float) -> str:
    if score <= settings.level_apprenti_max:
        return "Apprenti"
    if score <= settings.level_compagnon_max:
        return "Compagnon"
    if score <= settings.level_maitre_max:
        return "Maitre"
    return "Maitre Maalem"


def recalc_artisan_score(supabase, artisan_id: UUID) -> float:
    """Compute global_score from artisan_stats and update level."""
    r = supabase.table("artisan_stats").select("*").eq("artisan_id", str(artisan_id)).single().execute()
    if not r.data:
        return 0.0
    row = r.data
    wq = float(row.get("work_quality_score") or 0)
    rel = float(row.get("reliability_score") or 1.0)
    comm = float(row.get("communication_score") or 0)
    pq = float(row.get("price_quality_score") or 0)
    inn = float(row.get("innovation_score") or 0)
    global_score = (
        settings.rank_work_quality * wq
        + settings.rank_reliability * rel
        + settings.rank_communication * comm
        + settings.rank_price_quality * pq
        + settings.rank_innovation * inn
    )
    global_score = max(0, min(1, global_score))
    level = _level_from_score(global_score)
    supabase.table("artisan_stats").update({
        "global_score": global_score,
        "updated_at": datetime.utcnow().isoformat(),
    }).eq("artisan_id", str(artisan_id)).execute()
    supabase.table("artisans").update({
        "current_level": level,
        "updated_at": datetime.utcnow().isoformat(),
    }).eq("id", str(artisan_id)).execute()
    return global_score


def update_stats_from_rating(supabase, artisan_id: UUID, stars: float, work_quality: float, communication: float, price_quality: float):
    """After a new rating, aggregate and update artisan_stats then recalc level."""
    stats = supabase.table("artisan_stats").select("*").eq("artisan_id", str(artisan_id)).single().execute()
    if not stats.data:
        return
    ratings = supabase.table("ratings").select("stars, work_quality, communication, price_quality").eq("artisan_id", str(artisan_id)).execute()
    rows = ratings.data or []
    n = len(rows)
    if n == 0:
        return
    avg_stars = sum(r.get("stars") or 0 for r in rows) / n
    avg_wq = sum(float(r.get("work_quality") or r.get("stars") or 0) for r in rows) / n
    avg_comm = sum(float(r.get("communication") or r.get("stars") or 0) for r in rows) / n
    avg_pq = sum(float(r.get("price_quality") or r.get("stars") or 0) for r in rows) / n
    # Normalize to 0-1 (stars 1-5 -> /5)
    jobs_count = supabase.table("jobs").select("id").eq("artisan_id", str(artisan_id)).in_("status", ["closed", "completed_after_complaint"]).execute()
    total_jobs = len(jobs_count.data or [])
    supabase.table("artisan_stats").update({
        "avg_rating": round(avg_stars, 2),
        "work_quality_score": round(avg_wq / 5.0, 4),
        "communication_score": round(avg_comm / 5.0, 4),
        "price_quality_score": round(avg_pq / 5.0, 4),
        "total_jobs": total_jobs,
        "updated_at": datetime.utcnow().isoformat(),
    }).eq("artisan_id", str(artisan_id)).execute()
    recalc_artisan_score(supabase, artisan_id)
