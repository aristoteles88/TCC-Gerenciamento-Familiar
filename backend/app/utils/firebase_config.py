import firebase_admin
from firebase_admin import credentials, auth
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Use a service account.
cred = credentials.Certificate('/Users/aristotelesjunior/Projetos/tcc-gerenciamento-tarefas-familiar/family-task-manager/backend/config/family-task-manager-51606-firebase-adminsdk-fbsvc-3b416c736a.json')
firebase_admin.initialize_app(cred)

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifies the Firebase ID token and returns the user information.
    """
    try:
        token = credentials
        decoded_token = auth.verify_id_token(token)
        user = decoded_token
        # You can also access other claims in the token, like email, name, etc.
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
