import os
from motor.motor_asyncio import AsyncIOMotorClient
import logging

logger = logging.getLogger(__name__)

# Global database client
client = None
database = None

async def connect_to_mongo():
    """Create database connection"""
    global client, database
    
    try:
        mongo_url = os.environ.get('MONGO_URL')
        db_name = os.environ.get('DB_NAME', 'school_cms')
        
        if not mongo_url:
            raise ValueError("MONGO_URL environment variable is required")
        
        client = AsyncIOMotorClient(mongo_url)
        database = client[db_name]
        
        # Test connection
        await client.admin.command('ping')
        logger.info(f"Successfully connected to MongoDB: {db_name}")
        
        return database
        
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {str(e)}")
        raise

async def close_mongo_connection():
    """Close database connection"""
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed")

async def get_database():
    """Get database instance"""
    global database
    if database is None:
        database = await connect_to_mongo()
    return database

# Initialize collections and indexes
async def setup_database():
    """Setup database collections and indexes"""
    try:
        db = await get_database()
        
        # Create indexes for better performance
        await db.contact_submissions.create_index("email")
        await db.contact_submissions.create_index("created_at")
        await db.contact_submissions.create_index("status")
        
        await db.testimonials.create_index("is_active")
        await db.testimonials.create_index("created_at")
        
        await db.school_stats.create_index("last_updated")
        
        logger.info("Database indexes created successfully")
        
    except Exception as e:
        logger.error(f"Error setting up database: {str(e)}")
        raise