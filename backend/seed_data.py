"""
Seed script to populate initial data in the database
Run this script to add initial testimonials and stats
"""
import asyncio
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from database import connect_to_mongo
from models import SchoolTestimonial, SchoolStats

# Initial testimonials data (from frontend mock data)
INITIAL_TESTIMONIALS = [
    {
        "text": "EduManage has completely transformed how we handle student records and parent communication. The time savings have been incredible, and parents love the real-time updates.",
        "author": "Sarah Johnson",
        "role": "Principal",
        "school": "Greenwood Elementary",
        "rating": 5
    },
    {
        "text": "The attendance tracking feature alone has saved us 10 hours per week. The automated parent notifications have significantly improved our attendance rates.",
        "author": "Michael Chen",
        "role": "Vice Principal", 
        "school": "Lincoln High School",
        "rating": 5
    },
    {
        "text": "As a teacher, I love how easy it is to manage assignments and grades. The analytics help me identify students who need extra support early in the semester.",
        "author": "Emily Rodriguez",
        "role": "Math Teacher",
        "school": "Roosevelt Middle School", 
        "rating": 5
    },
    {
        "text": "The exam management system streamlined our entire testing process. From scheduling to result publication, everything is now automated and error-free.",
        "author": "David Thompson",
        "role": "Academic Director",
        "school": "Westfield Academy",
        "rating": 5
    },
    {
        "text": "Parent-teacher communication has never been easier. The secure messaging platform keeps everyone connected and informed about student progress.",
        "author": "Lisa Park",
        "role": "Guidance Counselor",
        "school": "Maplewood Elementary",
        "rating": 5
    },
    {
        "text": "The data security features give us complete peace of mind. We can focus on education while knowing our student data is completely protected.",
        "author": "Robert Martinez",
        "role": "IT Administrator",
        "school": "Central High School",
        "rating": 5
    }
]

async def seed_testimonials():
    """Seed initial testimonials"""
    print("Seeding testimonials...")
    db = await connect_to_mongo()
    
    # Check if testimonials already exist
    existing_count = await db.testimonials.count_documents({})
    if existing_count > 0:
        print(f"Testimonials already exist ({existing_count} found). Skipping...")
        return
    
    # Insert testimonials
    testimonials = []
    for testimonial_data in INITIAL_TESTIMONIALS:
        testimonial = SchoolTestimonial(**testimonial_data)
        testimonials.append(testimonial.dict())
    
    result = await db.testimonials.insert_many(testimonials)
    print(f"Inserted {len(result.inserted_ids)} testimonials")

async def seed_stats():
    """Seed initial school stats"""
    print("Seeding school statistics...")
    db = await connect_to_mongo()
    
    # Check if stats already exist
    existing_stats = await db.school_stats.find_one()
    if existing_stats:
        print("School statistics already exist. Skipping...")
        return
    
    # Create initial stats
    stats = SchoolStats(
        total_schools=500,
        total_students=125000,
        total_teachers=15000,
        average_satisfaction=4.8
    )
    
    await db.school_stats.insert_one(stats.dict())
    print("Inserted initial school statistics")

async def main():
    """Main seeding function"""
    print("Starting database seeding...")
    
    try:
        await seed_testimonials()
        await seed_stats()
        print("Database seeding completed successfully!")
        
    except Exception as e:
        print(f"Error during seeding: {e}")
        raise
    
    finally:
        # Close connection (if using global client)
        print("Seeding finished.")

if __name__ == "__main__":
    asyncio.run(main())