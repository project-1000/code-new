// Mock data for the School Management System

export const mockTestimonials = [
  {
    text: "EduManage has completely transformed how we handle student records and parent communication. The time savings have been incredible, and parents love the real-time updates.",
    author: "Sarah Johnson",
    role: "Principal",
    school: "Greenwood Elementary"
  },
  {
    text: "The attendance tracking feature alone has saved us 10 hours per week. The automated parent notifications have significantly improved our attendance rates.",
    author: "Michael Chen",
    role: "Vice Principal",
    school: "Lincoln High School"
  },
  {
    text: "As a teacher, I love how easy it is to manage assignments and grades. The analytics help me identify students who need extra support early in the semester.",
    author: "Emily Rodriguez",
    role: "Math Teacher",
    school: "Roosevelt Middle School"
  },
  {
    text: "The exam management system streamlined our entire testing process. From scheduling to result publication, everything is now automated and error-free.",
    author: "David Thompson",
    role: "Academic Director",
    school: "Westfield Academy"
  },
  {
    text: "Parent-teacher communication has never been easier. The secure messaging platform keeps everyone connected and informed about student progress.",
    author: "Lisa Park",
    role: "Guidance Counselor",
    school: "Maplewood Elementary"
  },
  {
    text: "The data security features give us complete peace of mind. We can focus on education while knowing our student data is completely protected.",
    author: "Robert Martinez",
    role: "IT Administrator",
    school: "Central High School"
  }
];

export const mockSchoolStats = {
  totalSchools: 500,
  totalStudents: 125000,
  totalTeachers: 15000,
  averageSatisfaction: 4.8
};

export const mockFeatureStats = [
  { feature: "Time Saved", value: "75%", description: "Average time reduction in administrative tasks" },
  { feature: "Parent Satisfaction", value: "92%", description: "Parents report improved communication" },
  { feature: "Attendance Improvement", value: "18%", description: "Average increase in student attendance" },
  { feature: "Data Accuracy", value: "99.9%", description: "Elimination of manual data entry errors" }
];

export const mockPricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "per month",
    description: "Perfect for small schools up to 200 students",
    features: [
      "Student records management",
      "Basic attendance tracking",
      "Parent communication portal",
      "Grade management",
      "Email support"
    ],
    isPopular: false
  },
  {
    name: "Professional",
    price: "$99",
    period: "per month",
    description: "Ideal for medium schools up to 1000 students",
    features: [
      "Everything in Starter",
      "Advanced analytics",
      "Exam management",
      "Timetable scheduling",
      "SMS notifications",
      "Phone support"
    ],
    isPopular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large institutions with complex needs",
    features: [
      "Everything in Professional",
      "Custom integrations",
      "Advanced security features",
      "Dedicated account manager",
      "Priority support",
      "Custom training"
    ],
    isPopular: false
  }
];