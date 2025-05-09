from datetime import datetime
from typing import Optional
from pydantic import BaseModel

# User schemas
class UserCreate(BaseModel):
    uid: str
    name: str
    email: str
    date_of_birth: Optional[str] = None
    family_id: str

class UserOut(BaseModel):
    id: str
    uid: str
    name: str
    email: str
    points: int
    role: str