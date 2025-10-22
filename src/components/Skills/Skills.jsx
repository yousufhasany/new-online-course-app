import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader, User, Star, Calendar, Search } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('/skills.json')
      .then(response => response.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading skills:', error);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];
  
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  if (loading) {
    return (
      <div className="skills-loading">
        <Loader className="loading-spinner-small" size={32} />
        <p>Loading skills...</p>
      </div>
    );
  }

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h1 className="skills-title">
          Explore <span className="gradient-text">Skills</span>
        </h1>
        <p className="skills-subtitle">
          Discover amazing learning opportunities from talented instructors
        </p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="skills-grid">
        {filteredSkills.map(skill => (
          <div key={skill.skillId} className="skill-card">
            <div className="skill-image-wrapper">
              <img 
                src={skill.image} 
                alt={skill.skillName}
                className="skill-image"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x250/ff8c00/ffffff?text=${encodeURIComponent(skill.skillName)}`;
                }}
              />
              <div className="skill-category-badge">{skill.category}</div>
            </div>

            <div className="skill-content">
              <h3 className="skill-name">{skill.skillName}</h3>
              
              <div className="skill-provider">
                <User className="provider-icon" size={20} />
                <div>
                  <p className="provider-name">{skill.providerName}</p>
                  <p className="provider-email">{skill.providerEmail}</p>
                </div>
              </div>

              <p className="skill-description">{skill.description}</p>

              <div className="skill-meta">
                <div className="meta-item">
                  <Star className="meta-icon" size={16} />
                  <span className="meta-value">{skill.rating}</span>
                </div>
                <div className="meta-item">
                  <Calendar className="meta-icon" size={16} />
                  <span className="meta-value">{skill.slotsAvailable} slots</span>
                </div>
              </div>

              <div className="skill-footer">
                <div className="skill-price">
                  <span className="price-label">Price</span>
                  <span className="price-value">${skill.price}</span>
                </div>
                <Link to={`/skill/${skill.skillId}`} className="btn-enroll">
                  View Details
                  <span className="btn-arrow">→</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSkills.length === 0 && (
        <div className="no-skills">
          <Search className="no-skills-icon" size={64} />
          <h3>No skills found</h3>
          <p>Try selecting a different category</p>
        </div>
      )}
    </div>
  );
};

export default Skills;
