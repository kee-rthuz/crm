from bson import ObjectId
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class User(BaseModel):
    id: str
    username: str
    email: EmailStr
    password: str

    class Config:
        orm_mode = True  # This is valid for Pydantic 1.x

class Project(BaseModel):
    id: str
    name: str
    category: str
    start_date: datetime
    end_date: datetime
    notification: str
    task_person: str
    budget: float
    priority: str
    description: Optional[str] = None
    created_by: str  # Track who created the project

    class Config:
        orm_mode = True  # This allows Pydantic to work with ORMs
