from datetime import datetime
from pydantic import BaseModel

class FamilyCreate(BaseModel):
    name: str

class FamilyOut(FamilyCreate):
    id: str
    members: list[str]
    created_at: datetime