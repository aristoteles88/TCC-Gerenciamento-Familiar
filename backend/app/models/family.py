from datetime import datetime
from bson import ObjectId
from app.models.base import BaseDBModel
from pydantic import Field
from typing import List

class FamilyBase(BaseDBModel):
    name: str
    members: List[str] = Field(default_factory=list)
    
class FamilyCreate(FamilyBase):
    pass

class FamilyOut(FamilyBase):
    id: str = Field(alias="_id")
    created_at: datetime
    updated_at: datetime

    class Config:
        allow_population_by_field_name = True
        json_encoders = {ObjectId: str}