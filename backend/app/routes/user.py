import json
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from app.crud.user import get_user_by_uid, get_user_by_uid, update_user
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
    pass
    
@router.put("/{uid}", response_model=UserOut)
async def add_user_to_family(request: Request, uid: str, credentials: HTTPBearer = Depends(security)):
    try:
        # Recupera dados do usuário
        user = await get_user_by_uid(request, uid)
        body = json.loads(str(await request.body(), encoding='utf-8'))
        if not user:
            raise HTTPException(status_code=404, detail="Usuario não encontrado")
        else:
            await update_user(request, user, body)
        return UserOut(**user.model_dump(by_alias=True))
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))