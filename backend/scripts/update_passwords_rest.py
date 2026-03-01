import os
import requests

url = 'https://xzzwvkazkrtgrtzwebae.supabase.co'
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')

if not key:
    print("Error: SUPABASE_SERVICE_ROLE_KEY is required")
    exit(1)

headers = {
    'apikey': key,
    'Authorization': f'Bearer {key}',
    'Content-Type': 'application/json'
}

print("Fetching all users...")
res = requests.get(f'{url}/auth/v1/admin/users', headers=headers)

if res.status_code != 200:
    print(f"Failed to fetch users: {res.text}")
    exit(1)

data = res.json()
users = data.get('users', [])
print(f"Found {len(users)} users. Updating passwords to 1234...")

count = 0
for u in users:
    update_res = requests.put(
        f"{url}/auth/v1/admin/users/{u['id']}", 
        headers=headers, 
        json={'password': '1234'}
    )
    if update_res.status_code == 200:
        count += 1
        print(f"Updated {u.get('email', u['id'])}")
    else:
        print(f"Failed to update {u.get('email', u['id'])}: {update_res.text}")

print(f"Done! Successfully updated {count}/{len(users)} users.")
