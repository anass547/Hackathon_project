# Matching: score = w1*(1/distance) + w2*rating + w3*availability + w4*specialization - penalty
import math
from typing import List
from app.database import get_supabase
from app.config import get_settings

settings = get_settings()


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlam / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def match_artisans(
    problem_type: str,
    client_lat: float,
    client_lon: float,
    city: str,
    severity: int = 3,
    top_k: int = 5,
) -> List[dict]:
    """
    Returns top_k artisans with score, distance, profile summary.
    Sorts purely by Fairness (Round Robin).
    """
    supabase = get_supabase()
    # Fetch artisans in same city (or nearby); optionally filter by profession
    q = supabase.table("artisans").select("*, profiles(full_name, phone, email), artisan_stats(avg_rating, global_score)")
    q = q.eq("city", city).eq("is_available", True).eq("profession", problem_type)
    r = q.execute()
    rows = r.data or []
    scored = []
    for row in rows:
        lat = row.get("latitude")
        lon = row.get("longitude")
        if lat is None or lon is None:
            dist_km = 50.0
        else:
            dist_km = haversine_km(client_lat, client_lon, float(lat), float(lon))
        # Avoid div by zero
        inv_dist = 1.0 / (dist_km + 0.1)
        stats = (row.get("artisan_stats") or [{}])
        stat = stats[0] if isinstance(stats, list) else stats
        avg_rating = float(stat.get("avg_rating") or 0) / 5.0
        availability = 1.0 if row.get("is_available") else 0.0
        profession_match = 1.0 if row.get("profession") == problem_type else 0.5
        refusal_penalty = (row.get("refusal_count") or 0) * settings.match_penalty_refusal
        # Ensure we only match valid profiles with an email
        prof = row.get("profiles") or {}
        if isinstance(prof, list) and prof:
            prof = prof[0]
            
        if not prof.get("email"):
            continue
            
        # Extract historic metrics for Fairness ranking (default to 0 to prioritize newly registered artisans)
        past_missions = row.get("assigned_count") or 0
        last_assigned = row.get("last_assigned_at") or "1970-01-01"

        # Fairness Mode => Round Robin => Priority to lowest historic missions, then oldest assignment
        import datetime
        try:
            dt = datetime.datetime.fromisoformat(last_assigned.replace("Z", "+00:00")).timestamp()
        except:
            dt = 0
            
        # Penalize linearly by amount of past missions and slightly by recent assignment
        # Negative score means smaller is worse. Since we reverse sort below, we want larger = better.
        # So fewest missions -> higher score.
        score = -(past_missions * 100000) - dt

        scored.append({
            "artisan_id": row["id"],
            "score": float(score),
            "distance_km": float(dist_km),
            "full_name": prof.get("full_name") if prof else None,
            "profession": row.get("profession"),
            "current_level": row.get("current_level"),
            "avg_rating": stat.get("avg_rating"),
        })
    scored.sort(key=lambda x: x["score"], reverse=True)
    return [dict(s) for s in scored[:top_k]]
