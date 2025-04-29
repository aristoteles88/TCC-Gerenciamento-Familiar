from typing import Literal
from app.models.base import BaseDBModel
from pydantic import EmailStr

class UserBase(BaseDBModel):
    firebase_uid: str | None = None
    name: str
    email: EmailStr
    date_of_birth: str | None = None
    password: str | None = None
    family_id: str | None = None
    points: int = 0
    role: Literal['admin', 'user'] = "admin"
    avatar: str | None = None


class UserInDB(UserBase):
    pass

    class Config:
        allow_population_by_field_name = True

class UserOut(UserBase):
    pass