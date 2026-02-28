# Train Random Forest for price prediction; save as joblib (min/max = center * 0.85, center * 1.15)
import pandas as pd
import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

DATA = Path(__file__).parent / "data" / "prices_synthetic.csv"
if not DATA.exists():
    print("Run generate_data.py first.")
    exit(1)

df = pd.read_csv(DATA)
le_p = LabelEncoder()
le_c = LabelEncoder()
df["p_idx"] = le_p.fit_transform(df["problem_type"])
df["c_idx"] = le_c.fit_transform(df["city"])
X = df[["p_idx", "c_idx", "surface_area", "severity"]]
y = df["price"]

model = RandomForestRegressor(n_estimators=50, max_depth=10, random_state=42)
model.fit(X, y)

# Save model and encoders for inference
out = {
    "model": model,
    "le_problem": le_p,
    "le_city": le_c,
}
joblib.dump(out, Path(__file__).parent / "price_model.pkl")
print("Saved price_model.pkl")
