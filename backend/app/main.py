from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import start_db_client, close_db_client
from app.routes import auth_router, family_router
# , tasks, rewards, families, users


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Application starting...")
    print("Connecting to MongoDB...")
    await start_db_client(app)
    print("Connected to MongoDB.")
    yield
    print("Disconnecting from MongoDB...")
    await close_db_client(app)
    print("Disconnected from MongoDB.")
    print("Application shutting down...")

app = FastAPI(lifespan=lifespan)

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(family_router, prefix="/family", tags=["family"])

@app.get("/")
def read_root():
    return {"message": "Family Task/Reward System API"}