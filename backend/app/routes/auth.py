import json
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import HTTPBearer
from app.crud.user import get_user_by_uid, create_user_from_firebase, get_user_by_uid, update_user
from app.models import UserInDB, UserBase, UserOut
from app.utils.firebase_config import get_current_user

router = APIRouter()
security = HTTPBearer()

@router.post("/login", response_model=UserOut, status_code=200)
async def login_with_firebase(request: Request, credentials: HTTPBearer = Depends(security)):
    try:
        # Verifica token Firebase
        decoded_token = await get_current_user(credentials.credentials)
        uid = decoded_token.get('uid')
        body = {}
        body['email'] = decoded_token.get('email')
        body['name'] = decoded_token.get('name', "Novo Usuário")
        body['avatar'] = decoded_token.get('picture', None)
        # Verifica se o usuário já existe
        user = await get_user_by_uid(request, uid)
        if not user:
            

            # Cria um novo usuário
            user_data = UserBase(
                uid = uid,
                email=body.get('email'),
                name=body.get('name'),
                avatar=body.get('avatar'),
                is_admin=True
            )
                
            # Cria um novo usuário no banco de dados
            user = await create_user_from_firebase(request, user_data)
        else:
            # Atualiza os dados do usuário se necessário
            await update_user(request, user, body)
        
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/register", response_model=UserOut)
async def register(request: Request, credentials: HTTPBearer = Depends(security)):
    try:
        # Verifica token Firebase
        decoded_token = await get_current_user(credentials.credentials)
        uid = decoded_token.get('uid')
        
        # Verifica se o usuário já existe
        auth_user = await get_user_by_uid(request, uid)
        user = None
        if auth_user:
            # Erro caso o usuário já exista
            raise HTTPException(status_code=400, detail="Usuário já existe")
        else:
            # Cria um novo usuário de autenticação
            auth_user = await create_user_from_firebase(request, auth_user)
            body = json.loads(str(await request.body(), encoding='utf-8'))
            body['email'] = decoded_token.get('email')
            body['avatar'] = decoded_token.get('picture', None)
            # Cria um novo usuário
            user_data = UserBase(
                uid=uid,
                email=body['email'],
                name=body['name'],
                avatar=body['avatar'],
                is_admin=True,
            )
            user = await create_user_from_firebase(request, user_data)
            if not user:
                raise HTTPException(status_code=500, detail="Falha ao criar o usuário")
        
        return user
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
