import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { testimonialsAPI } from '../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await testimonialsAPI.getTestimonials();
        
        if (response.success && response.data) {
          setTestimonials(response.data);
        } else {
          setError('Failed to load testimonials');
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err.message || 'Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
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
            {[...Array(6)].map((_, index) => (
              <div key={index} className="feature-card">
                <div className="animate-pulse">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="section-padding">
        <div className="container">
          <div className="text-center">
            <h2 className="heading-2 mb-3">
              Trusted by Schools Worldwide
            </h2>
            <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
              {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id || index} className="feature-card">
              {/* Star Rating */}
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating || 5)].map((_, i) => (
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
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <div 
                key={testimonial.id || index}
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