from typing import Optional
from bson.objectid import ObjectId
from app.models.base import BaseDBModel
from pydantic import EmailStr, Field

class UserBase(BaseDBModel):
    """Modelo base para o usuário"""
    uid: str
    name: str
    email: EmailStr
    date_of_birth: str | None = None
    family_id: str | None = None
    points: int = 0
    is_admin: bool = True
    role: str | None = None
    avatar: str | None = None


class UserInDB(UserBase):
    pass

    class Config:
        allow_population_by_field_name = True

class UserOut(UserBase):
    pass