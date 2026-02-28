# L'Artisan — Supabase client for database and auth
from supabase import create_client, Client
from app.config import get_settings

_settings = get_settings()


def get_supabase() -> Client:
    url = _settings.supabase_url
    key = _settings.supabase_service_role_key or _settings.supabase_key
    if not url or not key:
        raise ValueError("Supabase URL and key must be set")
    return create_client(url, key)


def get_supabase_anon() -> Client:
    """For frontend-style calls; use anon key."""
    url = _settings.supabase_url
    key = _settings.supabase_key
    if not url or not key:
        raise ValueError("Supabase URL and anon key must be set")
    return create_client(url, key)
