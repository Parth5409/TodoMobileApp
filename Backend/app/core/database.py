"""
MongoDB database connection and utilities
"""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from .config import settings

# Global database client
client: AsyncIOMotorClient = None
database: AsyncIOMotorDatabase = None


async def connect_to_mongo():
    """Connect to MongoDB"""
    global client, database
    client = AsyncIOMotorClient(settings.mongodb_url)
    database = client[settings.database_name]
    print(f"✅ Connected to MongoDB: {settings.database_name}")


async def close_mongo_connection():
    """Close MongoDB connection"""
    global client
    if client:
        client.close()
        print("❌ Closed MongoDB connection")


def get_database() -> AsyncIOMotorDatabase:
    """Get database instance"""
    return database


async def create_indexes():
    """Create database indexes for better performance"""
    # User indexes
    await database.users.create_index("email", unique=True)
    
    # Todo indexes
    await database.todos.create_index("user_id")
    await database.todos.create_index([("user_id", 1), ("created_at", -1)])
    await database.todos.create_index([("user_id", 1), ("category", 1)])
    await database.todos.create_index([("user_id", 1), ("priority", 1)])
    await database.todos.create_index([("user_id", 1), ("completed", 1)])
    
    print("✅ Created database indexes")
