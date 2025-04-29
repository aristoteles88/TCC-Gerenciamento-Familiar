import json
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from app.crud.user import get_user_by_uid
from app.schemas import UserOut
from app.models import UserInDB, UserBase, UserOut
from app.utils.firebase_config import get_current_user

router = APIRouter()
security = HTTPBearer()

@router.post("/login", response_model=UserOut)
async def login_with_firebase(request: Request, credentials: HTTPBearer = Depends(security)):
    try:
        db = request.app.db
        users = db.users
        # Verify Firebase token
        decoded_token = await get_current_user(credentials.credentials)
        firebase_uid = decoded_token.get('uid')
        email = decoded_token.get('email')
        name = decoded_token.get('name', "New User")
        avatar = decoded_token.get('picture', None)
        
        # Check if user exists
        user = await get_user_by_uid(request, firebase_uid)
        if user:
            # Update user details if necessary
            await users.update_one({"firebase_uid": firebase_uid}, {"$set": {"email": email, "name": name, "avatar": avatar}})
        else:
            # Create new user
            user = UserBase(
                firebase_uid=firebase_uid,
                email=email,
                name=name,
                role="admin",
            )
            await users.insert_one(user.model_dump())
        
        return UserOut(**user.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/register", response_model=UserOut)
async def register(request: Request, credentials: HTTPBearer = Depends(security)):
    try:
        db = request.app.db
        users = db.users
        # Verify Firebase token
        decoded_token = await get_current_user(credentials.credentials)
        firebase_uid = decoded_token.get('uid')
        email = decoded_token.get('email')
        body = json.loads(str(await request.body(), encoding='utf-8'))
        name = body['name']
        avatar = decoded_token.get('picture', None)
        
        # Check if user exists
        user = await get_user_by_uid(request, firebase_uid)
        if user:
            # Update user details if necessary
            await users.update_one({"firebase_uid": firebase_uid}, {"$set": {"email": email, "name": name, "avatar": avatar}})
        else:
            # Create new user
            user = UserBase(
                firebase_uid=firebase_uid,
                email=email,
                name=name,
                role="admin",
            )
            await users.insert_one(user.model_dump())
        
        return UserOut(**user.model_dump())
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))