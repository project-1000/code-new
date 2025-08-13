# School Management System API Contracts

## Backend Implementation Plan

### 1. Database Models (MongoDB Collections)

#### ContactSubmission Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  school: String (optional),
  phone: String (optional),
  message: String (required),
  status: String (enum: ['new', 'in_progress', 'resolved']) - default: 'new',
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

#### SchoolTestimonial Model
```javascript
{
  _id: ObjectId,
  text: String (required),
  author: String (required),
  role: String (required),
  school: String (required),
  rating: Number (default: 5),
  isActive: Boolean (default: true),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

#### SchoolStats Model
```javascript
{
  _id: ObjectId,
  totalSchools: Number (default: 500),
  totalStudents: Number (default: 125000),
  totalTeachers: Number (default: 15000),
  averageSatisfaction: Number (default: 4.8),
  lastUpdated: Date (default: now)
}
```

### 2. API Endpoints to Implement

#### Contact Form Endpoints
- **POST /api/contacts** - Submit contact form
  - Body: { name, email, school?, phone?, message }
  - Response: { success: boolean, message: string, data: ContactSubmission }

- **GET /api/contacts** - Get all contact submissions (admin only)
  - Query params: ?status=new&limit=50&page=1
  - Response: { success: boolean, data: ContactSubmission[], pagination: {...} }

#### Testimonials Endpoints
- **GET /api/testimonials** - Get active testimonials
  - Query params: ?limit=6&active=true
  - Response: { success: boolean, data: SchoolTestimonial[] }

- **POST /api/testimonials** - Create new testimonial (admin only)
  - Body: { text, author, role, school, rating? }
  - Response: { success: boolean, data: SchoolTestimonial }

#### Statistics Endpoints
- **GET /api/stats** - Get school statistics
  - Response: { success: boolean, data: SchoolStats }

### 3. Frontend Integration Changes

#### Current Mock Data Usage:
1. **Testimonials** (`/src/data/mock.js`):
   - `mockTestimonials` array → Replace with API call to `/api/testimonials`
   - Used in: `Testimonials.js` component

2. **Contact Form** (`Contact.js`):
   - Currently saves to browser storage → Replace with API call to `/api/contacts`
   - Toast message remains the same for user feedback

3. **Statistics** (not currently displayed):
   - `mockSchoolStats` → Can be used later with `/api/stats` endpoint

#### Integration Steps:
1. **Remove mock data imports** from components
2. **Add API service layer** (`/src/services/api.js`)
3. **Update Testimonials component** to fetch from backend
4. **Update Contact form** to submit to backend
5. **Add loading states** and error handling
6. **Keep toast notifications** for user feedback

### 4. Backend Features to Implement

#### Essential Features:
- ✅ Contact form submission with validation
- ✅ Testimonials management
- ✅ Basic error handling and logging
- ✅ CORS configuration for frontend integration

#### Data Validation:
- Email format validation
- Required field validation
- Sanitize user inputs
- Rate limiting for form submissions

#### Error Handling:
- Proper HTTP status codes
- Consistent error response format
- Logging for debugging

### 5. Integration Testing Plan

#### Backend Testing:
1. Test contact form submission API
2. Test testimonials retrieval API
3. Test data validation and error cases
4. Test database connection and operations

#### Frontend Integration Testing:
1. Test contact form submission with real backend
2. Test testimonials loading from backend
3. Test error handling and loading states
4. Test form validation and user feedback

### 6. Environment Variables Required

```env
# Already configured in backend/.env
MONGO_URL=mongodb://localhost:27017/school_cms
DB_NAME=school_cms

# Frontend already configured
REACT_APP_BACKEND_URL=<external_backend_url>
```

### 7. Migration from Mock to Real Data

#### Step 1: Seed Database
- Insert initial testimonials from mock data
- Insert initial school statistics

#### Step 2: Update Frontend
- Replace mock imports with API calls
- Add loading states and error handling
- Maintain existing UI/UX

#### Step 3: Testing
- Test all user interactions
- Verify data persistence
- Test error scenarios

## Implementation Priority

1. **High Priority** (Core functionality):
   - Contact form submission API
   - Testimonials retrieval API
   - Frontend integration for both

2. **Medium Priority** (Enhanced features):
   - Contact form management endpoints
   - Statistics API
   - Data validation and sanitization

3. **Low Priority** (Future features):
   - Admin interface for managing testimonials
   - Contact form status management
   - Analytics and reporting

## Notes

- All API responses follow consistent format: `{ success: boolean, data?: any, message?: string, error?: string }`
- Database connection already configured via existing server.py
- Frontend-backend integration uses existing REACT_APP_BACKEND_URL
- Toast notifications and UI feedback remain unchanged
- Error handling includes both technical errors and user-friendly messages