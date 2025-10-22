import React from 'react';
import { Flame } from 'lucide-react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <Flame className="loading-icon" size={40} />
        </div>
        <h2 className="loading-text">Loading...</h2>
      </div>
    </div>
  );
};

export default Loading;
