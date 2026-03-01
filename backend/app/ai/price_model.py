# Price estimation: scikit-learn Random Forest (or fallback to formula)
from pathlib import Path
from app.config import get_settings

settings = get_settings()
_model_bundle = None
_ml_dir = Path(__file__).resolve().parent.parent.parent / "ml"
_model_path = _ml_dir / "price_model.pkl"


def predict_price_range(
    problem_type: str,
    surface_area: float,
    city: str,
    severity: int,
) -> tuple:
    """Returns (price_min, price_max, confidence_level)."""
    global _model_bundle
    if _model_bundle is None and _model_path.exists():
        try:
            import joblib
            _model_bundle = joblib.load(_model_path)
        except Exception:
            pass
    if _model_bundle and "model" in _model_bundle:
        try:
            model = _model_bundle["model"]
            le_p = _model_bundle.get("le_problem")
            le_c = _model_bundle.get("le_city")
            if le_p and problem_type in le_p.classes_:
                p_idx = le_p.transform([problem_type])[0]
            else:
                p_idx = 0
            cities = le_c.classes_.tolist() if le_c else []
            c_idx = next((i for i, c in enumerate(cities) if c.lower() in (city or "").lower()), 0)
            X = [[p_idx, c_idx, surface_area, severity]]
            center = model.predict(X)[0]
            p_min = max(100, center * 0.85)
            p_max = max(p_min, center * 1.15)
            return (round(p_min, 0), round(p_max, 0), "high")
        except Exception:
            pass
    # Fallback formula
    surface_val = float(surface_area) if surface_area else 10.0
    
    rates = {
        "Plombier": 300,
        "Electricien": 250,
        "Sebbagh": 60,
        "Zlayji": 120,
        "Gebbas": 150
    }
    base_rate = rates.get(problem_type, 200)
    
    if problem_type in ["Sebbagh", "Zlayji", "Gebbas"]:
        base = base_rate * surface_val + severity * 100
    else:
        base = base_rate + surface_val * 5 + severity * 150
        
    city_mult = 1.2 if city and city.lower() in ["casablanca", "rabat", "marrakech"] else 1.0
    p_min = base * 0.75 * city_mult
    p_max = base * 1.35 * city_mult
    return (int(p_min), int(p_max), "medium")
