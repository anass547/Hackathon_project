# AI: analyze photo (vision) + price estimate
from fastapi import APIRouter, UploadFile, File, Form
from pydantic import BaseModel
from typing import List, Optional
import base64
import json
from app.ai.vision import analyze_photo
from app.ai.price_model import predict_price_range

router = APIRouter()


class AnalyzeResponse(BaseModel):
    problem_type: str
    severity: int
    price_min: float
    price_max: float
    duration_hours: float
    confidence_level: str  # high | medium | low


@router.post("/analyze-photo", response_model=AnalyzeResponse)
async def analyze_photo_endpoint(
    image: UploadFile = File(...),
    description: str = Form(""),
    city: str = Form(""),
    surface_area: float = Form(0),
):
    """Analyze uploaded photo with Vision AI; optionally refine with ML price model."""
    content = await image.read()
    b64 = base64.standard_b64encode(content).decode()
    result = analyze_photo(b64, description, city, surface_area)
    # Refine price with ML if we have features
    if city and result.get("severity"):
        p_min, p_max, conf = predict_price_range(
            problem_type=result.get("problem_type", "Plombier"),
            surface_area=surface_area or 10,
            city=city,
            severity=result.get("severity", 3),
        )
        if p_min and p_max:
            result["price_min"] = p_min
            result["price_max"] = p_max
            result["confidence_level"] = conf
    return AnalyzeResponse(
        problem_type=result.get("problem_type", "Plombier"),
        severity=result.get("severity", 3),
        price_min=result.get("price_min", 500),
        price_max=result.get("price_max", 1500),
        duration_hours=result.get("duration_hours", 2.0),
        confidence_level=result.get("confidence_level", "medium"),
    )


@router.post("/analyze-photo-json", response_model=AnalyzeResponse)
async def analyze_photo_json(
    image_base64: str,
    description: str = "",
    city: str = "",
    surface_area: float = 0,
):
    """Same as analyze-photo but accepts JSON body (e.g. from frontend that already has base64)."""
    result = analyze_photo(image_base64, description, city, surface_area)
    if city and result.get("severity"):
        p_min, p_max, conf = predict_price_range(
            problem_type=result.get("problem_type", "Plombier"),
            surface_area=surface_area or 10,
            city=city,
            severity=result.get("severity", 3),
        )
        if p_min and p_max:
            result["price_min"] = p_min
            result["price_max"] = p_max
            result["confidence_level"] = conf
    return AnalyzeResponse(
        problem_type=result.get("problem_type", "Plombier"),
        severity=result.get("severity", 3),
        price_min=result.get("price_min", 500),
        price_max=result.get("price_max", 1500),
        duration_hours=result.get("duration_hours", 2.0),
        confidence_level=result.get("confidence_level", "medium"),
    )
