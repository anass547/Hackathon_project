# L'Artisan — FastAPI entrypoint
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.routers import auth, jobs, artisans, matching, ratings, notifications, ai

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="Connect clients with home-repair artisans. AI photo analysis, price estimates, smart matching.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routers
app.include_router(auth.router, prefix="/api", tags=["Auth"])
app.include_router(artisans.router, prefix="/api", tags=["Artisans"])
app.include_router(jobs.router, prefix="/api", tags=["Jobs"])
app.include_router(matching.router, prefix="/api", tags=["Matching"])
app.include_router(ratings.router, prefix="/api", tags=["Ratings"])
app.include_router(notifications.router, prefix="/api", tags=["Notifications"])
app.include_router(ai.router, prefix="/api", tags=["AI"])


@app.get("/")
def root():
    return {"app": settings.app_name, "docs": "/docs"}


@app.get("/health")
def health():
    return {"status": "ok"}
