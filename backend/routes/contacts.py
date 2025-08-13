from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from datetime import datetime
import logging

from models import (
    ContactSubmission, 
    ContactSubmissionCreate, 
    ContactResponse, 
    APIResponse,
    ContactStatus
)
from database import get_database

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contacts", tags=["contacts"])

@router.post("/", response_model=ContactResponse)
async def create_contact_submission(contact_data: ContactSubmissionCreate):
    """Submit a contact form"""
    try:
        db = await get_database()
        
        # Create contact submission
        contact_dict = contact_data.dict()
        contact_obj = ContactSubmission(**contact_dict)
        
        # Insert into database
        result = await db.contact_submissions.insert_one(contact_obj.dict())
        
        if result.inserted_id:
            logger.info(f"New contact submission created: {contact_obj.id}")
            return ContactResponse(
                success=True,
                message="Thank you for your message! We'll get back to you within 24 hours.",
                data=contact_obj
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to save contact submission")
            
    except ValueError as e:
        logger.error(f"Validation error in contact submission: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error creating contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/", response_model=APIResponse)
async def get_contact_submissions(
    status: Optional[ContactStatus] = None,
    limit: int = Query(50, ge=1, le=100),
    page: int = Query(1, ge=1)
):
    """Get contact submissions (admin endpoint)"""
    try:
        db = await get_database()
        
        # Build query
        query = {}
        if status:
            query["status"] = status.value
        
        # Calculate skip for pagination
        skip = (page - 1) * limit
        
        # Get submissions
        cursor = db.contact_submissions.find(query).sort("created_at", -1).skip(skip).limit(limit)
        submissions = await cursor.to_list(length=limit)
        
        # Convert to model objects
        contact_list = [ContactSubmission(**sub) for sub in submissions]
        
        # Get total count for pagination
        total_count = await db.contact_submissions.count_documents(query)
        
        return APIResponse(
            success=True,
            data={
                "submissions": [sub.dict() for sub in contact_list],
                "pagination": {
                    "page": page,
                    "limit": limit,
                    "total": total_count,
                    "pages": (total_count + limit - 1) // limit
                }
            }
        )
        
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.patch("/{contact_id}/status")
async def update_contact_status(contact_id: str, status: ContactStatus):
    """Update contact submission status (admin endpoint)"""
    try:
        db = await get_database()
        
        # Update status
        result = await db.contact_submissions.update_one(
            {"id": contact_id},
            {
                "$set": {
                    "status": status.value,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Contact submission not found")
        
        return APIResponse(
            success=True,
            message=f"Contact status updated to {status.value}"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")