# Auth: custom register, login; create/link profile
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from uuid import UUID
import uuid
from app.database import get_supabase
from app.models.user import ProfileOut
from app.utils.security import get_password_hash, verify_password, create_access_token

router = APIRouter()


class RegisterBody(BaseModel):
    email: str
    password: str
    role: str  # client | worker
    full_name: str
    phone: str | None = None
    city: str | None = None


class LoginBody(BaseModel):
    email: str
    password: str


class AuthOut(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    role: str
    profile: ProfileOut | None = None


@router.post("/register", response_model=AuthOut)
def register(body: RegisterBody):
    supabase = get_supabase()
    
    # Check if user with email already exists
    existing = supabase.table("profiles").select("id").eq("email", body.email).execute()
    if existing.data and len(existing.data) > 0:
        raise HTTPException(status_code=400, detail="Email already registered")
        
    user_id = str(uuid.uuid4())
    hashed_password = get_password_hash(body.password)
    
    try:
        supabase.table("profiles").insert({
            "id": user_id,
            "email": body.email,
            "password_hash": hashed_password,
            "role": body.role,
            "full_name": body.full_name,
            "phone": body.phone,
            "city": body.city,
        }).execute()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to create profile: {str(e)}")
        
    profile = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
    
    access_token = create_access_token(data={"sub": user_id, "role": body.role})
    
    return AuthOut(
        access_token=access_token,
        user_id=user_id,
        role=body.role,
        profile=ProfileOut(**profile.data) if profile.data else None,
    )


@router.post("/login", response_model=AuthOut)
def login(body: LoginBody):
    print("Login called for", body.email)
    try:
        supabase = get_supabase()
        print("Supabase client initialized")
        
        res = supabase.table("profiles").select("*").eq("email", body.email).execute()
        print("Query executed, data:", res.data)
        
        if not res.data or len(res.data) == 0:
            raise HTTPException(status_code=401, detail="Invalid credentials")
            
        user_data = res.data[0]
        
    except Exception as e:
        print(f"Login error Exception: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    
    if not user_data.get("password_hash") or not verify_password(body.password, user_data["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
        
    user_id = user_data["id"]
    role = user_data.get("role", "client")
    
    access_token = create_access_token(data={"sub": user_id, "role": role})
    
    return AuthOut(
        access_token=access_token,
        user_id=user_id,
        role=role,
        profile=ProfileOut(**user_data),
    )


@router.get("/me")
def get_me(user_id: str):
    supabase = get_supabase()
    r = supabase.table("profiles").select("*").eq("id", user_id).single().execute()
    if not r.data:
        raise HTTPException(status_code=404, detail="Profile not found")
    return ProfileOut(**r.data)
