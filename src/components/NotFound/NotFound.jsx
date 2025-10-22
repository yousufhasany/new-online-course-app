import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Sparkles } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-animation">
          <div className="notfound-number">4</div>
          <Search className="notfound-icon" size={64} />
          <div className="notfound-number">4</div>
        </div>
        
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-description">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="notfound-actions">
          <Link to="/" className="btn-home">
            <Home className="btn-icon" size={18} />
            Back to Home
          </Link>
          <Link to="/register" className="btn-register">
            <Sparkles className="btn-icon" size={18} />
            Create Account
          </Link>
        </div>
        
        <div className="notfound-links">
          <p>Quick Links:</p>
          <div className="quick-links">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
