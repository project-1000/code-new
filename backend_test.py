#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for School Management System
Tests all API endpoints with various scenarios including validation and error handling
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get the backend URL from environment
BACKEND_URL = "https://learnlink-portal.preview.emergentagent.com/api"

class SchoolAPITester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })
    
    def test_health_check(self):
        """Test GET /api/ health check endpoint"""
        print("\n=== Testing API Health Check ===")
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("status") == "healthy" and "message" in data:
                    self.log_test("Health Check", True, f"API is healthy: {data['message']}")
                    return True
                else:
                    self.log_test("Health Check", False, f"Unexpected response format: {data}")
                    return False
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False
    
    def test_testimonials_api(self):
        """Test GET /api/testimonials/ endpoint"""
        print("\n=== Testing Testimonials API ===")
        
        # Test basic testimonials retrieval
        try:
            response = self.session.get(f"{self.base_url}/testimonials/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "data" in data:
                    testimonials = data["data"]
                    self.log_test("Get Testimonials - Basic", True, 
                                f"Retrieved {len(testimonials)} testimonials")
                    
                    # Validate testimonial structure
                    if testimonials and len(testimonials) > 0:
                        first_testimonial = testimonials[0]
                        required_fields = ["id", "text", "author", "role", "school", "rating"]
                        missing_fields = [field for field in required_fields if field not in first_testimonial]
                        
                        if not missing_fields:
                            self.log_test("Testimonials Data Structure", True, 
                                        "All required fields present")
                        else:
                            self.log_test("Testimonials Data Structure", False, 
                                        f"Missing fields: {missing_fields}")
                    else:
                        self.log_test("Testimonials Data Structure", True, 
                                    "No testimonials found (empty database)")
                else:
                    self.log_test("Get Testimonials - Basic", False, 
                                f"Invalid response format: {data}")
            else:
                self.log_test("Get Testimonials - Basic", False, 
                            f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Get Testimonials - Basic", False, f"Exception: {str(e)}")
        
        # Test with limit parameter
        try:
            response = self.session.get(f"{self.base_url}/testimonials/?limit=3")
            
            if response.status_code == 200:
                data = response.json()
                testimonials = data.get("data", [])
                if len(testimonials) <= 3:
                    self.log_test("Get Testimonials - Limit Parameter", True, 
                                f"Limit respected: {len(testimonials)} testimonials")
                else:
                    self.log_test("Get Testimonials - Limit Parameter", False, 
                                f"Limit not respected: {len(testimonials)} testimonials")
            else:
                self.log_test("Get Testimonials - Limit Parameter", False, 
                            f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Get Testimonials - Limit Parameter", False, f"Exception: {str(e)}")
        
        # Test with active parameter
        try:
            response = self.session.get(f"{self.base_url}/testimonials/?active=true")
            
            if response.status_code == 200:
                data = response.json()
                self.log_test("Get Testimonials - Active Parameter", True, 
                            "Active parameter accepted")
            else:
                self.log_test("Get Testimonials - Active Parameter", False, 
                            f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Get Testimonials - Active Parameter", False, f"Exception: {str(e)}")
    
    def test_contact_form_api(self):
        """Test POST /api/contacts/ endpoint with various scenarios"""
        print("\n=== Testing Contact Form API ===")
        
        # Test valid contact submission
        valid_contact = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@brightfuture.edu",
            "message": "I'm interested in learning more about your school management system for our district.",
            "school": "Bright Future Elementary",
            "phone": "+1-555-0123"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contacts/",
                json=valid_contact,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "data" in data:
                    contact_data = data["data"]
                    if "id" in contact_data and contact_data["name"] == valid_contact["name"]:
                        self.log_test("Contact Form - Valid Submission", True, 
                                    f"Contact created with ID: {contact_data['id']}")
                    else:
                        self.log_test("Contact Form - Valid Submission", False, 
                                    "Invalid response data structure")
                else:
                    self.log_test("Contact Form - Valid Submission", False, 
                                f"Invalid response format: {data}")
            else:
                self.log_test("Contact Form - Valid Submission", False, 
                            f"Status code: {response.status_code}, Response: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form - Valid Submission", False, f"Exception: {str(e)}")
        
        # Test minimal valid contact (only required fields)
        minimal_contact = {
            "name": "Michael Chen",
            "email": "m.chen@riverside.edu",
            "message": "Please send me more information about pricing and implementation."
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contacts/",
                json=minimal_contact,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success"):
                    self.log_test("Contact Form - Minimal Valid Data", True, 
                                "Minimal contact submission successful")
                else:
                    self.log_test("Contact Form - Minimal Valid Data", False, 
                                f"Response: {data}")
            else:
                self.log_test("Contact Form - Minimal Valid Data", False, 
                            f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact Form - Minimal Valid Data", False, f"Exception: {str(e)}")
        
        # Test invalid email format
        invalid_email_contact = {
            "name": "Test User",
            "email": "invalid-email-format",
            "message": "This should fail due to invalid email"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contacts/",
                json=invalid_email_contact,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 400:
                self.log_test("Contact Form - Invalid Email Validation", True, 
                            "Invalid email properly rejected")
            elif response.status_code == 422:
                self.log_test("Contact Form - Invalid Email Validation", True, 
                            "Invalid email properly rejected (422)")
            else:
                self.log_test("Contact Form - Invalid Email Validation", False, 
                            f"Expected 400/422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact Form - Invalid Email Validation", False, f"Exception: {str(e)}")
        
        # Test missing required fields
        incomplete_contact = {
            "name": "Test User"
            # Missing email and message
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contacts/",
                json=incomplete_contact,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code in [400, 422]:
                self.log_test("Contact Form - Missing Required Fields", True, 
                            "Missing fields properly rejected")
            else:
                self.log_test("Contact Form - Missing Required Fields", False, 
                            f"Expected 400/422, got {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact Form - Missing Required Fields", False, f"Exception: {str(e)}")
    
    def test_school_stats_api(self):
        """Test GET /api/stats/ endpoint"""
        print("\n=== Testing School Statistics API ===")
        
        try:
            response = self.session.get(f"{self.base_url}/stats/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "data" in data:
                    stats = data["data"]
                    required_fields = ["total_schools", "total_students", "total_teachers", "average_satisfaction"]
                    missing_fields = [field for field in required_fields if field not in stats]
                    
                    if not missing_fields:
                        self.log_test("School Statistics - Data Structure", True, 
                                    f"All required fields present: {list(stats.keys())}")
                        
                        # Validate data types
                        if (isinstance(stats["total_schools"], int) and 
                            isinstance(stats["total_students"], int) and 
                            isinstance(stats["total_teachers"], int) and 
                            isinstance(stats["average_satisfaction"], (int, float))):
                            self.log_test("School Statistics - Data Types", True, 
                                        "All data types are correct")
                        else:
                            self.log_test("School Statistics - Data Types", False, 
                                        "Invalid data types in statistics")
                    else:
                        self.log_test("School Statistics - Data Structure", False, 
                                    f"Missing fields: {missing_fields}")
                else:
                    self.log_test("School Statistics", False, 
                                f"Invalid response format: {data}")
            else:
                self.log_test("School Statistics", False, 
                            f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("School Statistics", False, f"Exception: {str(e)}")
    
    def test_data_persistence(self):
        """Test GET /api/contacts/ to verify data persistence"""
        print("\n=== Testing Data Persistence ===")
        
        try:
            response = self.session.get(f"{self.base_url}/contacts/")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "data" in data:
                    submissions_data = data["data"]
                    if "submissions" in submissions_data:
                        submissions = submissions_data["submissions"]
                        self.log_test("Data Persistence - Contact Retrieval", True, 
                                    f"Retrieved {len(submissions)} contact submissions")
                        
                        # Check pagination info
                        if "pagination" in submissions_data:
                            pagination = submissions_data["pagination"]
                            self.log_test("Data Persistence - Pagination", True, 
                                        f"Pagination info present: {pagination}")
                        else:
                            self.log_test("Data Persistence - Pagination", False, 
                                        "Pagination info missing")
                    else:
                        self.log_test("Data Persistence - Contact Retrieval", False, 
                                    "Submissions array not found in response")
                else:
                    self.log_test("Data Persistence - Contact Retrieval", False, 
                                f"Invalid response format: {data}")
            else:
                self.log_test("Data Persistence - Contact Retrieval", False, 
                            f"Status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Data Persistence - Contact Retrieval", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"Starting comprehensive API testing for: {self.base_url}")
        print("=" * 60)
        
        # Run all test suites
        self.test_health_check()
        self.test_testimonials_api()
        self.test_contact_form_api()
        self.test_school_stats_api()
        self.test_data_persistence()
        
        # Summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"Total Tests: {total}")
        print(f"Passed: {passed}")
        print(f"Failed: {total - passed}")
        print(f"Success Rate: {(passed/total)*100:.1f}%")
        
        # List failed tests
        failed_tests = [result for result in self.test_results if not result["success"]]
        if failed_tests:
            print("\nFAILED TESTS:")
            for test in failed_tests:
                print(f"  ❌ {test['test']}: {test['details']}")
        
        return passed == total

def main():
    """Main test execution"""
    print("School Management System - Backend API Testing")
    print("=" * 60)
    
    tester = SchoolAPITester(BACKEND_URL)
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
        sys.exit(0)
    else:
        print("\n⚠️  Some tests failed. Check the details above.")
        sys.exit(1)

if __name__ == "__main__":
    main()