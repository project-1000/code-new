from datetime import datetime
from pydantic import BaseModel, Field, validator
from typing import Optional, List
from enum import Enum
import uuid

# Enums
class ContactStatus(str, Enum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"

# Database Models (for storage)
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=5, max_length=100)
    school: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    message: str = Field(..., min_length=1, max_length=1000)
    status: ContactStatus = Field(default=ContactStatus.NEW)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    @validator('email')
    def validate_email(cls, v):
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v.lower()

    @validator('phone')
    def validate_phone(cls, v):
        if v is None:
            return v
        # Remove non-numeric characters for validation but keep original format
        import re
        digits_only = re.sub(r'[^\d]', '', v)
        if len(digits_only) < 10:
            raise ValueError('Phone number must have at least 10 digits')
        return v

class SchoolTestimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text: str = Field(..., min_length=10, max_length=500)
    author: str = Field(..., min_length=1, max_length=100)
    role: str = Field(..., min_length=1, max_length=100)
    school: str = Field(..., min_length=1, max_length=100)
    rating: int = Field(default=5, ge=1, le=5)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class SchoolStats(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    total_schools: int = Field(default=500)
    total_students: int = Field(default=125000)
    total_teachers: int = Field(default=15000)
    average_satisfaction: float = Field(default=4.8)
    last_updated: datetime = Field(default_factory=datetime.utcnow)

# Request Models (for API input)
class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=5, max_length=100)
    school: Optional[str] = Field(None, max_length=100)
    phone: Optional[str] = Field(None, max_length=20)
    message: str = Field(..., min_length=1, max_length=1000)

    @validator('email')
    def validate_email(cls, v):
        import re
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, v):
            raise ValueError('Invalid email format')
        return v.lower()

class TestimonialCreate(BaseModel):
    text: str = Field(..., min_length=10, max_length=500)
    author: str = Field(..., min_length=1, max_length=100)
    role: str = Field(..., min_length=1, max_length=100)
    school: str = Field(..., min_length=1, max_length=100)
    rating: int = Field(default=5, ge=1, le=5)

# Response Models
class APIResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    data: Optional[dict] = None
    error: Optional[str] = None

class ContactResponse(APIResponse):
    data: Optional[ContactSubmission] = None

class TestimonialsResponse(APIResponse):
    data: Optional[List[SchoolTestimonial]] = None

class StatsResponse(APIResponse):
    data: Optional[SchoolStats] = None