import os
import requests
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

url = os.environ.get('SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json'
}

def get_users():
    res = requests.get(f'{url}/auth/v1/admin/users', headers=headers)
    return res.json().get('users', [])

def reset_password(user_id, email):
    print(f"Resetting password for {email}...")
    res = requests.put(
        f'{url}/auth/v1/admin/users/{user_id}',
        headers=headers,
        json={'password': '123456'}
    )
    if res.status_code == 200:
        print(f"Successfully reset password for {email}")
    else:
        print(f"Failed to reset password for {email}: {res.text}")

users = get_users()
if not users:
    print("No users found in Auth.")
else:
    for u in users:
        reset_password(u['id'], u['email'])
