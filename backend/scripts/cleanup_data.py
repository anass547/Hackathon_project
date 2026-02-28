import os
import sys
from pathlib import Path

# Add backend directory to path so 'app' can be imported
backend_dir = str(Path(__file__).parent.parent.absolute())
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from app.database import get_supabase

def run_cleanup():
    supabase = get_supabase()
    
    print("Fetching profiles...")
    res = supabase.table("profiles").select("id, email, password_hash").execute()
    profiles = res.data
    
    to_delete_ids = []
    for p in profiles:
        email = p.get("email")
        pwd = p.get("password_hash")
        
        # Check if email or password is None or empty string
        if not email or not pwd or str(email).strip() == "" or str(pwd).strip() == "":
            to_delete_ids.append(p["id"])
            
    print(f"Found {len(to_delete_ids)} profiles without email or password.")
    
    if not to_delete_ids:
        print("Nothing to delete.")
        return
        
    print("Deleting associated records (artisans, jobs, ratings) to avoid foreign key constraints...")
    # Deleting one by one to avoid postgrest url length limits if the list is huge
    for uid in to_delete_ids:
        try:
            # Delete dependent artisans
            supabase.table("artisans").delete().eq("user_id", uid).execute()
        except Exception as e:
            print(f"Error deleting artisan for {uid}: {e}")
            
    print("Deleting profiles...")
    success_count = 0
    for uid in to_delete_ids:
        try:
            supabase.table("profiles").delete().eq("id", uid).execute()
            success_count += 1
        except Exception as e:
            print(f"Error deleting profile {uid}: {e}")
            
    print(f"Cleanup completed. Successfully deleted {success_count} profiles out of {len(to_delete_ids)} candidates.")

if __name__ == "__main__":
    run_cleanup()
