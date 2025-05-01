from datetime import datetime
from app.models.auth import AuthBase, AuthInDB, AuthOut
from fastapi import HTTPException, Request
from app.models.user import UserBase
from app.crud.user import create_user_from_firebase

async def get_auth_by_firebase_uid(request: Request, firebase_uid: str) -> AuthBase:
    db = request.app.db
    auth_db = db.auth
    auth_user = await auth_db.find_one({"firebase_uid": firebase_uid})
    if auth_user:
        users = db.users
        user = await users.find_one({"_id": auth_user["user_id"]})
        if user:
            user["_id"] = str(user["_id"])
            auth_user["user"] = user
    return AuthInDB(**auth_user) if auth_user else None
    #     user["_id"] = str(user["_id"])
    # return UserInDB(**user) if user else None

async def create_auth_for_user (request: Request, auth: AuthBase, user: UserBase) -> AuthOut:
    db = request.app.db
    auth_db = db.auth
    auth_dict = auth.model_dump()
    result_auth = auth_db.insert_one(auth_dict)
    if not result_auth.inserted_id:
        raise HTTPException(500, "Falha ao criar o usuário")
    created_user = create_user_from_firebase(request, user)
    /Users/aristotelesjunior/Projetos/tcc-gerenciamento-tarefas-familiar/family-task-manager/backend/app/crud/user.py
    
    return AuthOut(**created_user)
