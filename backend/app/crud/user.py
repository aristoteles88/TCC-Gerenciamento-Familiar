from datetime import datetime
from app.models.user import UserBase, UserInDB, UserOut
from fastapi import HTTPException, Request

async def get_user_by_uid(request: Request, uid: str) -> UserBase:
    db = request.app.db
    users = db.users
    user = await users.find_one({"uid": uid})
    if user:
        user["_id"] = str(user["_id"])
    return UserInDB(**user) if user else None

async def create_user_from_firebase (request: Request, user: UserBase) -> UserOut:
    db = request.app.db
    users = db.users
    user_dict = user.model_dump(by_alias=True, exclude={"id"})
    user_dict.update({
        "uid": user.uid,
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    })
    result_user= await users.insert_one(user_dict)
    if not result_user.inserted_id:
        raise HTTPException(500, "Falha ao criar o usuário")
    created_user = await users.find_one({"_id": result_user.inserted_id})
    if created_user:
        created_user["_id"] = str(created_user["_id"])
    else:
        raise HTTPException(500, "Falha ao criar o usuário")
    return UserOut(**created_user)
    
async def update_user(request: Request, user: UserBase, body: dict):
    db = request.app.db
    users = db.users
    user_dict = user.model_dump(by_alias=True)
    body["updated_at"] = datetime.now()
    user_dict.update(body)
    result_user = await users.update_one({"_id": user_dict["_id"]}, {"$set": user_dict})
    if not result_user.acknowledged:
        raise HTTPException(500, "Falha ao atualizar o usuário")