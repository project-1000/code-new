from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from contextlib import asynccontextmanager

# Import our new modules
from database import connect_to_mongo, close_mongo_connection, setup_database
from routes.contacts import router as contacts_router
from routes.testimonials import router as testimonials_router
from routes.stats import router as stats_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Lifespan events for database connection
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up School Management System API...")
    try:
        await connect_to_mongo()
        await setup_database()
        logger.info("Database connected and setup complete")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down...")
    await close_mongo_connection()

# Create the main app with lifespan
app = FastAPI(
    title="School Management System API",
    description="Backend API for EduManage School Management Platform",
    version="1.0.0",
    lifespan=lifespan
)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "School Management System API is running", "status": "healthy"}

# Include all route modules
api_router.include_router(contacts_router)
api_router.include_router(testimonials_router)
api_router.include_router(stats_router)

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
