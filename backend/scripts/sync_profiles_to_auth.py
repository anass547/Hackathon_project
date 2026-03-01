import os
import requests
from dotenv import load_dotenv

# Load env vars from the backend .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

url = os.environ.get('SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not url or not key:
    print("Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.")
    exit(1)

headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json'
}

def sync_profiles_to_auth():
    print("Fetching existing profiles...")
    # Get all profiles from the profiles table
    res = requests.get(f"{url}/rest/v1/profiles?select=id,email", headers=headers)
    if res.status_code != 200:
        print(f"Failed to fetch profiles: {res.text}")
        return
    
    profiles = res.json()
    print(f"Found {len(profiles)} profiles in the database.")

    # Get existing auth users to avoid duplicates
    res_auth = requests.get(f"{url}/auth/v1/admin/users", headers=headers)
    auth_users = res_auth.json().get('users', [])
    auth_emails = {u['email'] for u in auth_users}

    count = 0
    for p in profiles:
        email = p['email']
        if not email:
            continue
            
        if email in auth_emails:
            print(f"User {email} already in Auth. Resetting password...")
            # Find the user id in auth
            auth_id = next(u['id'] for u in auth_users if u['email'] == email)
            # Reset password
            requests.put(f"{url}/auth/v1/admin/users/{auth_id}", headers=headers, json={"password": "123456"})
            count += 1
            continue

        print(f"Creating Auth user for {email}...")
        # Create user in Auth
        # Note: We try to create with the SAME ID as the profile to maintain FK integrity
        payload = {
            "email": email,
            "password": "123456",
            "email_confirm": True,
            "id": p['id']
        }
        create_res = requests.post(f"{url}/auth/v1/admin/users", headers=headers, json=payload)
        
        if create_res.status_code == 201:
            print(f"Successfully created Auth user for {email}")
            count += 1
        else:
            print(f"Failed to create Auth user for {email}: {create_res.text}")

    print(f"Done! Synced {count} users.")

if __name__ == "__main__":
    sync_profiles_to_auth()
