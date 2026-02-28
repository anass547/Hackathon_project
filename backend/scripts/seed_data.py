import os
import sys
import uuid
import random
from pathlib import Path
from datetime import datetime, timedelta

# Add backend directory to path so 'app' can be imported
backend_dir = str(Path(__file__).parent.parent.absolute())
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.database import get_supabase
from app.utils.security import get_password_hash

def run_seed():
    supabase = get_supabase()
    
    cities = ["Agadir", "Inezgane", "Ait Melloul", "Dcheira", "Taroudant", "Tiznit", "Tata", "Chtouka Ait Baha"]
    professions = ["Zlayji", "Sebbagh", "Gebbas", "Plombier", "Electricien"]
    
    print("Seeding database...")
    print("Clearing old seed data...")
    try:
        # Clean up old mock users (to avoid email conflicts)
        supabase.table("profiles").delete().like("email", "%@example.com").execute()
    except Exception as e:
        print(f"Warning during cleanup: {e}")
    
    # 1. Create Clients
    clients = []
    print("Creating clients...")
    for i in range(1, 6):
        client_id = str(uuid.uuid4())
        client_data = {
            "id": client_id,
            "email": f"client{i}@example.com",
            "password_hash": get_password_hash("password123"),
            "role": "client",
            "full_name": f"Client Name {i}",
            "phone": f"+2126000000{i:02d}",
            "city": random.choice(cities)
        }
        supabase.table("profiles").insert(client_data).execute()
        clients.append(client_id)
        
    # 2. Create Artisans
    artisans = []
    print("Creating artisans...")
    for i in range(1, 11):
        worker_id = str(uuid.uuid4())
        profession = professions[i % len(professions)]
        city = random.choice(cities)
        worker_data = {
            "id": worker_id,
            "email": f"artisan{i}@example.com",
            "password_hash": get_password_hash("password123"),
            "role": "worker",
            "full_name": f"Artisan {profession} {i}",
            "phone": f"+2126110000{i:02d}",
            "city": city
        }
        supabase.table("profiles").insert(worker_data).execute()
        
        artisan_data = {
            "user_id": worker_id,
            "profession": profession,
            "city": city,
            "latitude": round(30.4 + random.uniform(-0.1, 0.1), 6),
            "longitude": round(-9.6 + random.uniform(-0.1, 0.1), 6),
            "description": f"Expérience de plus de 10 ans en tant que {profession}.",
            "base_hourly_rate_mad": random.randint(50, 200),
            "is_available": True
        }
        res = supabase.table("artisans").insert(artisan_data).execute()
        artisan_id = res.data[0]["id"]
        artisans.append(artisan_id)
        
    print(f"Created {len(clients)} clients and {len(artisans)} artisans.")
    print("Seed data generated successfully!")

if __name__ == "__main__":
    run_seed()
