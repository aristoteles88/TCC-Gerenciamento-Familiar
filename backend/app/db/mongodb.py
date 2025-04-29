import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import Depends

load_dotenv()
MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = os.getenv("DB_NAME")

async def start_db_client(app):
    app.db_client = AsyncIOMotorClient(MONGODB_URL)
    app.db = app.db_client[DB_NAME]
    app.loop = app.db_client.get_io_loop()
    
async def close_db_client(app):
    app.db_client.close()

# mongodb = MongoDB()

# async def get_db():
#     if not mongodb.db:
#         await mongodb.connect()
#     return mongodb.db