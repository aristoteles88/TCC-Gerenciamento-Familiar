from app.models.user import UserBase, UserInDB, UserOut
from app.utils.security import get_password_hash
from fastapi import Depends, HTTPException, Request
from typing import Optional

async def get_user_by_uid(request: Request, firebase_uid: str) -> UserBase:
    db = request.app.db
    users = db.users
    user = await users.find_one({"firebase_uid": firebase_uid})
    if user:
        user["_id"] = str(user["_id"])
    return UserInDB(**user) if user else None

async def create_user_from_firebase (request: Request, user: UserBase) -> UserOut:
    db = request.app.db
    users = db.users
    user_dict = user.model_dump()
    result = users.insert_one(user_dict)
    created_user = users.find_one({"_id": result.inserted_id})
    return UserOut(**created_user)
