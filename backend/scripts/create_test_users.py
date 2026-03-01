import os
from supabase import create_client
from dotenv import load_dotenv

# Load env vars from the backend .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

url = os.environ.get('SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not url or not key:
    print("Missing SUPABASE URL or SERVICE_ROLE_KEY")
    exit(1)

supabase = create_client(url, key)

def create_test_user(email, password, role, name, profession=None):
    try:
        print(f"Creating user {email}...")
        res = supabase.auth.admin.create_user({
            "email": email,
            "password": password,
            "email_confirm": True
        })
        user_id = res.user.id
        
        # Insert into profiles
        supabase.table('profiles').insert({
            "id": user_id,
            "email": email,
            "role": "worker" if role == "artisan" else "client",
            "full_name": name,
            "city": "Agadir",
            "phone": "+212600000000"
        }).execute()
        
        # Insert- [x] List all existing Auth users in Supabase
# - [x] For each relevant test account, reset password to "123456" (Supabase requires min 6 chars)
# - [x] Ensure `profiles` and `artisans` entries exist for these users
# - [x] Verify login functionality via script
# - [x] Notify user of the final verified credentials
        if role == "artisan" and profession:
            supabase.table('artisans').insert({
                "id": user_id,
                "user_id": user_id,
                "profession": profession,
                "city": "Agadir",
                "latitude": 30.4278,
                "longitude": -9.5981,
                "description": f"Expert {profession} de test",
                "base_hourly_rate_mad": 150,
                "is_available": True
            }).execute()
            
            # Init stats
            supabase.table('artisan_stats').insert({
                "artisan_id": user_id
            }).execute()
            
        print(f"Success! Created {role}: {email} / pw: {password}")
    except Exception as e:
        print(f"Error creating {email}: {e}")

# Create an Artisan and a Client for testing
create_test_user("artisan@test.com", "1234", "artisan", "Artisan Test", "Plombier")
create_test_user("client@test.com", "1234", "client", "Client Test")
