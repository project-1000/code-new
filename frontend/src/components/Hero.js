import React from 'react';
import { Button } from './ui/button';
import { BookOpen, Users, Clock, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="heading-1 mb-4">
            Streamline Your School Management with EduManage
          </h1>
          
          <p className="body-large mb-4" style={{ color: 'var(--text-secondary)' }}>
            Comprehensive school management platform that saves time, improves communication, 
            and enhances education quality for administrators, teachers, and parents.
          </p>
          
          <div className="flex justify-center gap-4 mb-4 mt-4">
            <Button className="btn-primary">
              Start Free Trial
            </Button>
            <Button variant="outline" className="btn-secondary">
              Watch Demo
            </Button>
          </div>
          
          {/* Key Benefits */}
          <div className="mt-4" style={{ paddingTop: '3rem' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <BookOpen size={32} style={{ color: 'var(--accent-text)' }} />
                </div>
                <p className="body-small">Academic Management</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users size={32} style={{ color: 'var(--accent-text)' }} />
                </div>
                <p className="body-small">Student Records</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Clock size={32} style={{ color: 'var(--accent-text)' }} />
                </div>
                <p className="body-small">Attendance Tracking</p>
              </div>
              
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield size={32} style={{ color: 'var(--accent-text)' }} />
                </div>
                <p className="body-small">Secure Data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;