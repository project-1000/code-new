import React from 'react';
import { Button } from './ui/button';

const Header = () => {
  return (
    <header className="nav-header">
      <div className="flex items-center gap-2">
        <div className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          EduManage
        </div>
      </div>
      
      <nav className="flex items-center gap-4">
        <a href="#features" className="nav-link">Features</a>
        <a href="#testimonials" className="nav-link">Testimonials</a>
        <a href="#contact" className="nav-link">Contact</a>
      </nav>
      
      <div className="flex items-center gap-2">
        <Button variant="outline" className="btn-secondary">
          Login
        </Button>
        <Button className="btn-primary">
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;