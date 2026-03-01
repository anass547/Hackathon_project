import os
from supabase import create_client

url = os.environ.get('SUPABASE_URL', 'https://xzzwvkazkrtgrtzwebae.supabase.co')
key = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
supabase = create_client(url, key)

print("Fetching all users...")

has_more = True
page = 1
count = 0

while has_more:
    res = supabase.auth.admin.list_users(page=page, per_page=100)
    users = res.users
    
    if not users:
        has_more = False
        break
        
    for user in users:
        try:
            supabase.auth.admin.update_user_by_id(user.id, {"password": "1234Password!"})
            count += 1
            print(f"Updated password for {user.email}")
        except Exception as e:
            print(f"Failed to update {user.email}: {e}")
            
    page += 1

print(f"Successfully updated passwords for {count} users.")
