import React from 'react';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--text-primary)', color: 'white', padding: '3rem 0 1.5rem' }}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">EduManage</h3>
            <p className="body-small mb-4" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Comprehensive school management platform designed to streamline operations, 
              improve communication, and enhance educational outcomes.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="inline-flex items-center justify-center"
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center"
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center"
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center"
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                }}
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Features</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Pricing</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Demo</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>API</a></li>
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Help Center</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Documentation</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Contact Us</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Training</a></li>
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>About Us</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Careers</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Blog</a></li>
              <li><a href="#" className="body-small" style={{ color: 'rgba(255, 255, 255, 0.8)' }} onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'} onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}>Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div 
          className="pt-8 text-center"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <p className="body-small" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            © {currentYear} EduManage. All rights reserved. Built with care for educational institutions worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;