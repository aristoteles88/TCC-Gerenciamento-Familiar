from datetime import datetime
from app.models.user import UserBase, UserInDB, UserOut
from fastapi import HTTPException, Request

async def get_user_by_uid(request: Request, uid: str) -> UserBase:
    db = request.app.db
    users = db.users
    user = await users.find_one({"user_id": uid})
    if user:
        user["_id"] = str(user["_id"])
    return UserInDB(**user) if user else None

async def create_user_from_firebase (request: Request, user: UserBase) -> UserOut:
    db = request.app.db
    users = db.users
    user_dict = user.model_dump()
    user_dict.update({
        "_id": str(user_dict["_id"]),
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    })
    result_user= await users.insert_one(user_dict)
    if not result_user.inserted_id:
        raise HTTPException(500, "Falha ao criar o usuário")
    created_user = users.find_one({"_id": result_user.inserted_id})
    return UserOut(**created_user)
    
