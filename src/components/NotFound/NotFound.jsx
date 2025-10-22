import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-animation">
          <div className="notfound-number">4</div>
          <div className="notfound-icon">🔍</div>
          <div className="notfound-number">4</div>
        </div>
        
        <h1 className="notfound-title">Page Not Found</h1>
        <p className="notfound-description">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="notfound-actions">
          <Link to="/" className="btn-home">
            <span className="btn-icon">🏠</span>
            Back to Home
          </Link>
          <Link to="/register" className="btn-register">
            <span className="btn-icon">✨</span>
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
