import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Acessa firebase com conta de servico.
cred = credentials.Certificate('./config/family-task-manager-firebase-config.json')
firebase_admin.initialize_app(cred)

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifica o token de autenticação do Firebase e retorna o usuário autenticado.
    :param credentials: Token de autenticação do Firebase.
    :return: Usuário autenticado.
    :raises HTTPException: Se o token for inválido ou não puder ser verificado.
    """
    try:
        token = credentials
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
