from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import start_db_client, close_db_client
from app.routes import auth_router, family_router
# , tasks, rewards, families, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    await start_db_client(app)
    yield
    await close_db_client(app)

app = FastAPI(lifespan=lifespan)

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclui routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(family_router, prefix="/family", tags=["family"])

@app.get("/")
def read_root():
    return {"message": "Family Task/Reward System API"}