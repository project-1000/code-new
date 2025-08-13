import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { contactsAPI } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Submit to backend
      const response = await contactsAPI.submitContact({
        name: formData.name.trim(),
        email: formData.email.trim(),
        school: formData.school.trim() || null,
        phone: formData.phone.trim() || null,
        message: formData.message.trim()
      });

      if (response.success) {
        // Success - show toast and reset form
        toast({
          title: "Message Sent!",
          description: response.message || "We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({ 
          name: '', 
          email: '', 
          school: '', 
          phone: '', 
          message: '' 
        });
      } else {
        // API returned success: false
        toast({
          title: "Error",
          description: response.message || "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Show user-friendly error message
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-section)' }}>
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="heading-2 mb-3">
            Ready to Transform Your School Management?
          </h2>
          <p className="body-large" style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Get in touch with our education specialists to see how EduManage can 
            streamline your school operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Contact Form */}
          <Card className="p-6">
            <h3 className="heading-3 mb-4">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block body-small mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block body-small mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block body-small mb-1" style={{ color: 'var(--text-secondary)' }}>
                    School Name
                  </label>
                  <Input
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handleChange}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
                
                <div>
                  <label className="block body-small mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              
              <div>
                <label className="block body-small mb-1" style={{ color: 'var(--text-secondary)' }}>
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full"
                  placeholder="Tell us about your school's needs..."
                  disabled={isSubmitting}
                />
              </div>
              
              <Button 
                type="submit" 
                className="btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
          
          {/* Contact Information */}
          <div>
            <Card className="p-6 mb-4">
              <h3 className="heading-3 mb-4">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div 
                    className="inline-flex items-center justify-center"
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: 'var(--accent-wash)', 
                      borderRadius: '8px',
                      flexShrink: '0'
                    }}
                  >
                    <Mail size={20} style={{ color: 'var(--accent-text)' }} />
                  </div>
                  <div>
                    <h4 className="body-medium font-semibold mb-1">Email</h4>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      hello@edumanage.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div 
                    className="inline-flex items-center justify-center"
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: 'var(--accent-wash)', 
                      borderRadius: '8px',
                      flexShrink: '0'
                    }}
                  >
                    <Phone size={20} style={{ color: 'var(--accent-text)' }} />
                  </div>
                  <div>
                    <h4 className="body-medium font-semibold mb-1">Phone</h4>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      +1 (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div 
                    className="inline-flex items-center justify-center"
                    style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: 'var(--accent-wash)', 
                      borderRadius: '8px',
                      flexShrink: '0'
                    }}
                  >
                    <MapPin size={20} style={{ color: 'var(--accent-text)' }} />
                  </div>
                  <div>
                    <h4 className="body-medium font-semibold mb-1">Office</h4>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      123 Education Ave<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* CTA Card */}
            <Card className="p-6 text-center" style={{ background: 'var(--accent-wash)' }}>
              <h4 className="heading-3 mb-2">Ready to Get Started?</h4>
              <p className="body-small mb-4" style={{ color: 'var(--text-secondary)' }}>
                Join 500+ schools already using EduManage
              </p>
              <Button className="btn-primary">
                Start Free Trial
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;