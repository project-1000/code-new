from fastapi import APIRouter, HTTPException
import logging

from ..models import SchoolStats, StatsResponse
from ..database import get_database

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/stats", tags=["statistics"])

@router.get("/", response_model=StatsResponse)
async def get_school_statistics():
    """Get school statistics for display on website"""
    try:
        db = await get_database()
        
        # Get latest stats
        stats_doc = await db.school_stats.find_one(sort=[("last_updated", -1)])
        
        if stats_doc:
            stats = SchoolStats(**stats_doc)
        else:
            # Create default stats if none exist
            stats = SchoolStats()
            await db.school_stats.insert_one(stats.dict())
            logger.info("Created default school statistics")
        
        return StatsResponse(
            success=True,
            data=stats
        )
        
    except Exception as e:
        logger.error(f"Error fetching school statistics: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.patch("/", response_model=StatsResponse)
async def update_school_statistics(stats_data: dict):
    """Update school statistics (admin endpoint)"""
    try:
        db = await get_database()
        
        # Get current stats
        current_stats = await db.school_stats.find_one(sort=[("last_updated", -1)])
        
        if current_stats:
            # Update existing stats
            update_data = {
                **stats_data,
                "last_updated": datetime.utcnow()
            }
            
            result = await db.school_stats.update_one(
                {"id": current_stats["id"]},
                {"$set": update_data}
            )
            
            # Get updated stats
            updated_doc = await db.school_stats.find_one({"id": current_stats["id"]})
            stats = SchoolStats(**updated_doc)
        else:
            # Create new stats
            stats_dict = {**SchoolStats().dict(), **stats_data}
            stats = SchoolStats(**stats_dict)
            await db.school_stats.insert_one(stats.dict())
        
        logger.info("School statistics updated successfully")
        
        return StatsResponse(
            success=True,
            message="Statistics updated successfully",
            data=stats
        )
        
    except Exception as e:
        logger.error(f"Error updating school statistics: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")