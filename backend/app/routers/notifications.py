# Notifications: trigger SMS (for demo)
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.notification_service import notify_artisan_new_job

router = APIRouter()


class NotifyBody(BaseModel):
    artisan_id: str
    job_id: str
    phone: str | None = None
    problem_type: str
    city: str


@router.post("/notify")
def notify(body: NotifyBody):
    ok = notify_artisan_new_job(
        body.artisan_id,
        body.job_id,
        body.phone,
        body.problem_type,
        body.city,
    )
    return {"sent": ok, "message": "SMS sent or mocked"}
