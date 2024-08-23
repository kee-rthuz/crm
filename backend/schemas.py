from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    refresh_token: str

class TokenData(BaseModel):
    email: str

class RefreshTokenRequest(BaseModel):
    refresh_token: str  # New schema for refresh token request
    
class ProjectCreate(BaseModel):
    name: str
    category: str
    start_date: datetime
    end_date: datetime
    notification: str
    task_person: str
    budget: float
    priority: str
    description: Optional[str] = None

class Project(ProjectCreate):
    id: str
    created_by: str  # Assuming you want to track who created the project
