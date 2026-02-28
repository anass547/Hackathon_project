# L'Artisan — backend configuration from environment
import os
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # App
    app_name: str = "L'Artisan API"
    debug: bool = False

    # Database (Supabase PostgreSQL connection string)
    database_url: str = ""

    # Supabase
    supabase_url: str = ""
    supabase_key: str = ""  # anon key for client; use service_role in backend for full access
    supabase_service_role_key: str = ""

    # Auth
    jwt_secret: str = "your-super-secret-jwt-key-change-me"

    # AI / Vision (OpenAI or HuggingFace)
    openai_api_key: str = ""
    huggingface_api_key: str = ""
    vision_provider: str = "openai"  # openai | huggingface | mock

    # Twilio (SMS)
    twilio_account_sid: str = ""
    twilio_auth_token: str = ""
    twilio_from_number: str = ""
    twilio_mock: bool = True  # if True, log only without sending

    # Matching weights
    match_weight_distance: float = 0.35
    match_weight_rating: float = 0.30
    match_weight_availability: float = 0.20
    match_weight_specialization: float = 0.15
    match_penalty_refusal: float = 0.05

    # Ranking formula weights (documentation)
    rank_work_quality: float = 0.40
    rank_reliability: float = 0.25
    rank_communication: float = 0.15
    rank_price_quality: float = 0.10
    rank_innovation: float = 0.10

    # Worker level thresholds (global_score 0–1)
    level_apprenti_max: float = 0.35
    level_compagnon_max: float = 0.60
    level_maitre_max: float = 0.85

    class Config:
        env_file = ".env"
        extra = "ignore"


@lru_cache
def get_settings() -> Settings:
    return Settings()
