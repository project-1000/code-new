import React from 'react';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  MessageSquare, 
  BarChart3, 
  Clock, 
  GraduationCap,
  Shield
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Student Records Management",
      description: "Comprehensive student profiles, enrollment tracking, and academic history management in one centralized system."
    },
    {
      icon: Clock,
      title: "Attendance Tracking",
      description: "Real-time attendance monitoring with automated notifications to parents and detailed reporting for administrators."
    },
    {
      icon: Calendar,
      title: "Academic Scheduling",
      description: "Streamlined timetables, class scheduling, and exam planning with conflict detection and optimization."
    },
    {
      icon: BookOpen,
      title: "Assignment & Grades",
      description: "Digital assignment distribution, submission tracking, and comprehensive grade management with analytics."
    },
    {
      icon: MessageSquare,
      title: "Parent-Teacher Communication",
      description: "Secure messaging platform connecting parents, teachers, and administrators with instant notifications."
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Detailed insights into student performance, attendance patterns, and institutional metrics."
    },
    {
      icon: GraduationCap,
      title: "Exam Management",
      description: "Complete exam lifecycle management from scheduling to result publication with automated calculations."
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security with role-based access control and complete data privacy compliance."
    }
  ];

  return (
    <section id="features" className="section-padding" style={{ background: 'var(--bg-section)' }}>
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="heading-2 mb-3">
            Everything You Need to Manage Your School
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Our comprehensive platform provides all the tools you need to streamline operations, 
            improve communication, and enhance educational outcomes.
          </p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="feature-card">
                <div className="mb-3">
                  <div 
                    className="inline-flex items-center justify-center"
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      background: 'var(--accent-wash)', 
                      borderRadius: '12px' 
                    }}
                  >
                    <IconComponent size={24} style={{ color: 'var(--accent-text)' }} />
                  </div>
                </div>
                
                <h3 className="heading-3 mb-2">
                  {feature.title}
                </h3>
                
                <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;