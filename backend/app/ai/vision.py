# Vision AI: abstract provider (OpenAI GPT-4o / Anthropic Claude / mock)
import os
import json
import base64
from app.config import get_settings

settings = get_settings()


def analyze_photo(image_base64: str, description: str = "", city: str = "", surface_area: float = 0) -> dict:
    """
    Returns: problem_type, severity (1-5), price_min, price_max (MAD), duration_hours, confidence_level.
    """
    if settings.vision_provider == "mock" or (not settings.openai_api_key and not settings.huggingface_api_key):
        return _mock_analyze(description, city, surface_area)

    if settings.vision_provider == "openai" and settings.openai_api_key:
        return _openai_vision(image_base64, description, city, surface_area)
    if settings.vision_provider == "huggingface" and settings.huggingface_api_key:
        return _huggingface_vision(image_base64, description, city, surface_area)

    return _mock_analyze(description, city, surface_area)


def _mock_analyze(description: str, city: str, surface_area: float) -> dict:
    """Deterministic mock for dev/demo."""
    problem_type = "Plombier"
    if "peinture" in (description or "").lower() or "paint" in (description or "").lower():
        problem_type = "Sebbagh"
    if "carrelage" in (description or "").lower() or "tile" in (description or "").lower():
        problem_type = "Zlayji"
    if "platre" in (description or "").lower() or "plaster" in (description or "").lower():
        problem_type = "Gebbas"
    if "electr" in (description or "").lower():
        problem_type = "Electricien"
    severity = 3
    base_min, base_max = 400, 1200
    if surface_area > 0:
        base_min = 300 + surface_area * 20
        base_max = 800 + surface_area * 40
    return {
        "problem_type": problem_type,
        "severity": severity,
        "price_min": round(base_min, 0),
        "price_max": round(base_max, 0),
        "duration_hours": 2.0,
        "confidence_level": "medium",
    }


def _openai_vision(image_base64: str, description: str, city: str, surface_area: float) -> dict:
    try:
        import openai
        client = openai.OpenAI(api_key=settings.openai_api_key)
        prompt = """Analyze this home repair photo. Identify: (1) type of repair needed (one of: Zlayji, Sebbagh, Gebbas, Plombier, Electricien), (2) severity level 1-5, (3) estimated price range in MAD (min and max), (4) estimated duration in hours. Return ONLY a JSON object with keys: problem_type, severity, price_min, price_max, duration_hours, confidence_level (high/medium/low)."""
        if description:
            prompt += f"\nClient description: {description}"
        if city:
            prompt += f"\nCity: {city}"
        if surface_area:
            prompt += f"\nSurface area (m²): {surface_area}"
        resp = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"}},
                    ],
                }
            ],
            max_tokens=300,
        )
        text = resp.choices[0].message.content
        # Extract JSON from possible markdown
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        data = json.loads(text.strip())
        return {
            "problem_type": data.get("problem_type", "Plombier"),
            "severity": int(data.get("severity", 3)),
            "price_min": float(data.get("price_min", 500)),
            "price_max": float(data.get("price_max", 1500)),
            "duration_hours": float(data.get("duration_hours", 2)),
            "confidence_level": data.get("confidence_level", "medium"),
        }
    except Exception as e:
        return _mock_analyze(description, city, surface_area)


def _huggingface_vision(image_base64: str, description: str, city: str, surface_area: float) -> dict:
    try:
        from huggingface_hub import InferenceClient
        client = InferenceClient("Qwen/Qwen2-VL-7B-Instruct", token=settings.huggingface_api_key)
        prompt = """Analyze this home repair photo. Identify: (1) type of repair needed (one of: Zlayji, Sebbagh, Gebbas, Plombier, Electricien), (2) severity level 1-5, (3) estimated price range in MAD (min and max), (4) estimated duration in hours. Return ONLY a JSON object with keys: problem_type, severity, price_min, price_max, duration_hours, confidence_level (high/medium/low)."""
        if description:
            prompt += f"\nClient description: {description}"
        if city:
            prompt += f"\nCity: {city}"
        if surface_area:
            prompt += f"\nSurface area (m²): {surface_area}"
        
        # The Qwen2-VL model via InferenceClient expects a standard Chat Completion format 
        # for vision, similar to OpenAI. We pass image data appropriately.
        messages = [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{image_base64}"}},
                ],
            }
        ]
        
        resp = client.chat.completions.create(
            messages=messages,
            max_tokens=300,
        )
        text = resp.choices[0].message.content
        if "```" in text:
            text = text.split("```")[1]
            if text.startswith("json"):
                text = text[4:]
        data = json.loads(text.strip())
        return {
            "problem_type": data.get("problem_type", "Plombier"),
            "severity": int(data.get("severity", 3)),
            "price_min": float(data.get("price_min", 500)),
            "price_max": float(data.get("price_max", 1500)),
            "duration_hours": float(data.get("duration_hours", 2)),
            "confidence_level": data.get("confidence_level", "medium"),
        }
    except Exception:
        return _mock_analyze(description, city, surface_area)
