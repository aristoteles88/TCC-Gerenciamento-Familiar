from datetime import datetime
from typing import Optional
from pydantic import BaseModel

# User schemas
class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    family_id: str

class UserOut(BaseModel):
    id: str
    name: str
    email: str
    points: int
    role: str