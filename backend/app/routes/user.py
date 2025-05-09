import json
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from app.crud.user import get_user_by_uid, get_user_by_uid, update_user_family_id
from app.schemas import UserOut
from app.models import UserInDB, UserBase, UserOut
from app.utils.firebase_config import get_current_user

router = APIRouter()
security = HTTPBearer()

@router.get("/{uid}", response_model=UserOut)
async def retrieve_user_by_uid(request: Request, uid: str, credentials: HTTPBearer = Depends(security)):
    try:
        # Recupera dados do usuário
        user = await get_user_by_uid(request, uid)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario não encontrado")
        return UserOut(**user.model_dump(by_alias=True))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/by_family_id/{family_id}", response_model=UserOut)
async def register(request: Request, credentials: HTTPBearer = Depends(security)):
    try:
        db = request.app.db
        users = db.users
        # Verify Firebase token
        decoded_token = await get_current_user(credentials.credentials)
        uid = decoded_token.get('uid')
        email = decoded_token.get('email')
        body = json.loads(str(await request.body(), encoding='utf-8'))
        name = body['name']
        avatar = decoded_token.get('picture', None)
        
        # Check if user exists
        user = await get_user_by_uid(request, uid)
        if user:
            # Update user details if necessary
            await users.update_one({"uid": uid}, {"$set": {"email": email, "name": name, "avatar": avatar}})
        else:
            # Create new user
            user = UserBase(
                uid=uid,
                email=email,
                name=name,
                is_admin=True,
            )
            await users.insert_one(user.model_dump(by_alias=True))
        
        return UserOut(**user.model_dump(by_alias=True))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.put("/{uid}", response_model=UserOut)
async def add_user_to_family(request: Request, uid: str, credentials: HTTPBearer = Depends(security)):
    try:
        # Recupera dados do usuário
        user = await get_user_by_uid(request, uid)
        body = json.loads(str(await request.body(), encoding='utf-8'))
        if not user:
            raise HTTPException(status_code=404, detail="Usuario não encontrado")
        else:
            await update_user_family_id(request=request, user=user, family_id=body['family_id'])
        return UserOut(**user.model_dump(by_alias=True))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))