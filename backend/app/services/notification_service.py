# Notifications: Twilio SMS (or mock) when job is assigned to artisan
from app.config import get_settings

settings = get_settings()


def notify_artisan_new_job(artisan_id: str, job_id: str, phone: str | None, problem_type: str, city: str) -> bool:
    """Send SMS to artisan for new job assignment. If twilio_mock=True, only log."""
    message = f"L'Artisan: New job in {city} - {problem_type}. Job ID: {job_id[:8]}. Log in to accept or refuse."
    if settings.twilio_mock or not settings.twilio_account_sid:
        # Log to notification_log table if we have supabase in context; else just return
        return True
    try:
        from twilio.rest import Client
        client = Client(settings.twilio_account_sid, settings.twilio_auth_token)
        client.messages.create(
            body=message,
            from_=settings.twilio_from_number,
            to=phone or "+212600000000",
        )
        return True
    except Exception:
        return False
