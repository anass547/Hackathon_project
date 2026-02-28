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
    problem_type maps to profession (e.g. Plombier, Electricien).
    """
    supabase = get_supabase()
    # Fetch artisans in same city (or nearby); optionally filter by profession
    q = supabase.table("artisans").select("*, profiles(full_name, phone, email), artisan_stats(avg_rating, global_score)")
    q = q.eq("city", city).eq("is_available", True)
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
            
        score = (
            settings.match_weight_distance * inv_dist * 10
            + settings.match_weight_rating * avg_rating
            + settings.match_weight_availability * availability
            + settings.match_weight_specialization * profession_match
            - refusal_penalty
        )
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
