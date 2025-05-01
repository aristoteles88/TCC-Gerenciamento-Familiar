from app.models.base import BaseDBModel

class AuthBase(BaseDBModel):
    firebase_uid: str | None = None
    user_id: str | None = None


class AuthInDB(AuthBase):
    pass

    class Config:
        allow_population_by_field_name = True

class AuthOut(AuthBase):
    pass
