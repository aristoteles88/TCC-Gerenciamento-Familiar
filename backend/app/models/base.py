from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
import shortuuid

class BaseDBModel(BaseModel):
    id: Optional[str] = Field(default_factory=shortuuid.uuid, alias="_id")
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }