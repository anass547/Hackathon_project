# Synthetic training data for price model: problem_type, city, surface_area, severity -> price
import random
import csv
from pathlib import Path

Path(__file__).resolve().parent.mkdir(exist_ok=True)
DATA_DIR = Path(__file__).resolve().parent / "data"
DATA_DIR.mkdir(exist_ok=True)
OUT = DATA_DIR / "prices_synthetic.csv"

professions = ["Zlayji", "Sebbagh", "Gebbas", "Plombier", "Electricien"]
cities = ["Marrakech", "Casablanca", "Rabat", "Fes"]
city_mult = {"Marrakech": 1.0, "Casablanca": 1.15, "Rabat": 1.05, "Fes": 0.95}

rows = []
for _ in range(800):
    p = random.choice(professions)
    c = random.choice(cities)
    area = round(random.uniform(5, 80), 1)
    severity = random.randint(1, 5)
    base = 200 + area * 20 + severity * 60 + random.randint(-50, 100)
    base *= city_mult[c]
    price = round(base + random.gauss(0, 80), 0)
    price = max(150, min(5000, price))
    rows.append({"problem_type": p, "city": c, "surface_area": area, "severity": severity, "price": price})

with open(OUT, "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["problem_type", "city", "surface_area", "severity", "price"])
    w.writeheader()
    w.writerows(rows)
print(f"Wrote {len(rows)} rows to {OUT}")
