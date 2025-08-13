import React from 'react';
import { Star } from 'lucide-react';
import { mockTestimonials } from '../data/mock';

const Testimonials = () => {
  return (
    <section id="testimonials" className="section-padding">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="heading-2 mb-3">
            Trusted by Schools Worldwide
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            See how schools are transforming their management processes and improving 
            educational outcomes with EduManage.
          </p>
        </div>
        
        <div className="features-grid">
          {mockTestimonials.map((testimonial, index) => (
            <div key={index} className="feature-card">
              {/* Star Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    fill="var(--accent-primary)" 
                    style={{ color: 'var(--accent-primary)' }}
                  />
                ))}
              </div>
              
              {/* Testimonial Text */}
              <p className="body-medium mb-4" style={{ color: 'var(--text-body)', fontStyle: 'italic' }}>
                "{testimonial.text}"
              </p>
              
              {/* Author Info */}
              <div>
                <h4 className="heading-3" style={{ fontSize: '1rem' }}>
                  {testimonial.author}
                </h4>
                <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                  {testimonial.role} • {testimonial.school}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* School Logos */}
        <div className="mt-4" style={{ paddingTop: '3rem', borderTop: '1px solid var(--border-light)' }}>
          <p className="text-center body-small mb-3" style={{ color: 'var(--text-muted)' }}>
            Trusted by 500+ educational institutions
          </p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            {mockTestimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="px-4 py-2 rounded-lg"
                style={{ 
                  background: 'var(--bg-section)', 
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}
              >
                {testimonial.school}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;