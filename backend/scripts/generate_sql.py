import uuid
import random

cities = ["Agadir", "Inezgane", "Ait Melloul", "Dcheira", "Taroudant", "Tiznit", "Tata", "Chtouka Ait Baha"]
professions = ["Zlayji", "Sebbagh", "Gebbas", "Plombier", "Electricien"]
password_hash = "$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei"

sql_commands = []
sql_commands.append("-- Insertion de 2 artisans de chaque type pour chaque ville de la région Souss Massa\n")

for city in cities:
    for profession in professions:
        for i in range(2):
            user_id = str(uuid.uuid4())
            artisan_id = str(uuid.uuid4())
            
            # Base location around Agadir (can be customized per city if needed, but keeping simple perturbation here)
            lat = round(30.4 + random.uniform(-0.1, 0.1), 6)
            lng = round(-9.6 + random.uniform(-0.1, 0.1), 6)
            
            email = f"artisan_{city.replace(' ', '').lower()}_{profession.lower()}_{i+1}@example.com"
            full_name = f"{profession} {city} {i+1}"
            phone = f"+2126{random.randint(10000000, 99999999)}"
            
            # Insert into profiles
            # role, full_name, email, phone, city
            profile_sql = f"""INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('{user_id}', '{email}', '{password_hash}', 'worker', '{full_name}', '{phone}', '{city.replace("'", "''")}');"""
            
            # Insert into artisans
            artisan_sql = f"""INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('{artisan_id}', '{user_id}', '{profession}', '{city.replace("'", "''")}', {lat}, {lng}, 'Expert {profession} à {city.replace("'", "''")}', {random.randint(50, 200)}, true);"""
            
            # Insert into artisan_stats (Important for list queries)
            stats_sql = f"""INSERT INTO artisan_stats (artisan_id) VALUES ('{artisan_id}');"""
            
            sql_commands.extend([profile_sql, artisan_sql, stats_sql, ""])

with open("c:/Users/Dell/Desktop/Hackathon_Project/backend/scripts/insert_artisans_souss_massa.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql_commands))
