import os
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
from app.models import User

async def init_db():
    client = AsyncIOMotorClient(os.getenv("MONGODB_URL"))
    await init_beanie(
        database=client.family_app,
        document_models=[User]
    )
    