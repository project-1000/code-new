from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
import logging

from models import (
    SchoolTestimonial, 
    TestimonialCreate, 
    TestimonialsResponse, 
    APIResponse
)
from database import get_database

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/testimonials", tags=["testimonials"])

@router.get("/", response_model=TestimonialsResponse)
async def get_testimonials(
    limit: int = Query(6, ge=1, le=20),
    active: bool = Query(True)
):
    """Get active testimonials for display on website"""
    try:
        db = await get_database()
        
        # Build query
        query = {}
        if active:
            query["is_active"] = True
        
        # Get testimonials
        cursor = db.testimonials.find(query).sort("created_at", -1).limit(limit)
        testimonials = await cursor.to_list(length=limit)
        
        # Convert to model objects
        testimonial_list = [SchoolTestimonial(**test) for test in testimonials]
        
        logger.info(f"Retrieved {len(testimonial_list)} testimonials")
        
        return TestimonialsResponse(
            success=True,
            data=testimonial_list
        )
        
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/", response_model=APIResponse)
async def create_testimonial(testimonial_data: TestimonialCreate):
    """Create new testimonial (admin endpoint)"""
    try:
        db = await get_database()
        
        # Create testimonial
        testimonial_dict = testimonial_data.dict()
        testimonial_obj = SchoolTestimonial(**testimonial_dict)
        
        # Insert into database
        result = await db.testimonials.insert_one(testimonial_obj.dict())
        
        if result.inserted_id:
            logger.info(f"New testimonial created: {testimonial_obj.id}")
            return APIResponse(
                success=True,
                message="Testimonial created successfully",
                data=testimonial_obj.dict()
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save testimonial")
            
    except ValueError as e:
        logger.error(f"Validation error in testimonial creation: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.patch("/{testimonial_id}/toggle")
async def toggle_testimonial_status(testimonial_id: str):
    """Toggle testimonial active status (admin endpoint)"""
    try:
        db = await get_database()
        
        # Get current testimonial
        testimonial = await db.testimonials.find_one({"id": testimonial_id})
        if not testimonial:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        
        # Toggle active status
        new_status = not testimonial.get("is_active", True)
        
        result = await db.testimonials.update_one(
            {"id": testimonial_id},
            {"$set": {"is_active": new_status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Testimonial not found")
        
        return APIResponse(
            success=True,
            message=f"Testimonial {'activated' if new_status else 'deactivated'}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error toggling testimonial status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")