from datetime import datetime
from pydantic import BaseModel

class FamilyCreate(BaseModel):
    name: str

class FamilyOut(FamilyCreate):
    id: str
    created_at: datetime