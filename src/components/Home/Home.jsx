import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase.init';
import { onAuthStateChanged } from 'firebase/auth';
import HeroSlider from '../HeroSlider/HeroSlider';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetch('/skills.json')
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading skills:', err);
        setLoading(false);
      });
  }, []);

  // Get top 6 rated skills for Popular Skills section
  const popularSkills = [...skills]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  // Top providers data
  const topProviders = [
    {
      id: 1,
      name: 'Sarah Johnson',
      expertise: 'Music & Arts',
      rating: 5.0,
      students: 1250,
      image: 'https://i.pravatar.cc/150?img=5'
    },
    {
      id: 2,
      name: 'Michael Chen',
      expertise: 'Technology',
      rating: 4.9,
      students: 980,
      image: 'https://i.pravatar.cc/150?img=12'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      expertise: 'Languages',
      rating: 4.9,
      students: 875,
      image: 'https://i.pravatar.cc/150?img=9'
    },
    {
      id: 4,
      name: 'David Kim',
      expertise: 'Health & Fitness',
      rating: 5.0,
      students: 1100,
      image: 'https://i.pravatar.cc/150?img=14'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Adams',
      role: 'Graphic Designer',
      image: 'https://i.pravatar.cc/150?img=10',
      rating: 5,
      text: 'SkillShare transformed my career! I learned advanced Photoshop techniques that helped me land my dream job. The instructors are incredibly knowledgeable and patient.',
      skillTaken: 'Advanced Photoshop'
    },
    {
      id: 2,
      name: 'Robert Martinez',
      role: 'Software Developer',
      image: 'https://i.pravatar.cc/150?img=13',
      rating: 5,
      text: 'The web development courses here are top-notch. I went from beginner to building full-stack applications in just 3 months. Highly recommend!',
      skillTaken: 'Web Development'
    },
    {
      id: 3,
      name: 'Lisa Thompson',
      role: 'Marketing Manager',
      image: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      text: 'Amazing platform! The digital marketing course gave me practical skills I use every day. The interactive sessions and personalized feedback were invaluable.',
      skillTaken: 'Digital Marketing'
    },
    {
      id: 4,
      name: 'James Wilson',
      role: 'Entrepreneur',
      image: 'https://i.pravatar.cc/150?img=15',
      rating: 5,
      text: 'Learning guitar online seemed impossible, but the instructors here made it easy and fun. I can now play my favorite songs confidently!',
      skillTaken: 'Guitar Lessons'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Popular Skills Section */}
      <section className="popular-skills-section" data-aos="fade-up">
        <div className="section-header">
          <h2 className="section-title animate__animated animate__fadeInDown">Popular Skills</h2>
          <p className="section-subtitle animate__animated animate__fadeInUp">Explore our most sought-after courses</p>
        </div>
        
        {loading ? (
          <div className="loading-state">Loading skills...</div>
        ) : (
          <div className="skills-grid-home">
            {popularSkills.map((skill, index) => (
              <div 
                key={skill.skillId} 
                className="skill-card-home"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="skill-image-wrapper">
                  <img 
                    src={skill.image} 
                    alt={skill.skillName}
                    className="skill-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250?text=Skill+Image';
                    }}
                  />
                  <div className="skill-badge">{skill.category}</div>
                </div>
                <div className="skill-content">
                  <h3 className="skill-name">{skill.skillName}</h3>
                  <p className="skill-provider">by {skill.providerName}</p>
                  <div className="skill-meta">
                    <div className="skill-rating">
                      <span className="rating-icon">⭐</span>
                      <span className="rating-value">{skill.rating}</span>
                    </div>
                    <div className="skill-price">${skill.price}/session</div>
                  </div>
                  <Link to={`/skill/${skill.skillId}`} className="btn-view-details">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="section-cta">
          <Link to="/skills" className="btn-view-all">
            View All Skills
            <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Top Rated Providers */}
      <section className="providers-section" data-aos="fade-up">
        <div className="section-header">
          <h2 className="section-title animate__animated animate__fadeInDown">Top Rated Providers</h2>
          <p className="section-subtitle animate__animated animate__fadeInUp">Learn from the best instructors</p>
        </div>
        
        <div className="providers-grid">
          {topProviders.map((provider, index) => (
            <div 
              key={provider.id} 
              className="provider-card"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="provider-image-wrapper">
                <img 
                  src={provider.image} 
                  alt={provider.name}
                  className="provider-image"
                />
                <div className="provider-badge">
                  <span className="badge-star">⭐</span>
                  {provider.rating}
                </div>
              </div>
              <div className="provider-info">
                <h3 className="provider-name">{provider.name}</h3>
                <p className="provider-expertise">{provider.expertise}</p>
                <div className="provider-stats">
                  <div className="stat-item">
                    <span className="stat-icon">👥</span>
                    <span className="stat-text">{provider.students} students</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section" data-aos="fade-up">
        <div className="section-header">
          <h2 className="section-title animate__animated animate__fadeInDown">How It Works</h2>
          <p className="section-subtitle animate__animated animate__fadeInUp">Get started in three simple steps</p>
        </div>
        
        <div className="steps-container">
          <div className="step-card" data-aos="flip-left" data-aos-delay="0">
            <div className="step-number">1</div>
            <div className="step-icon">🔍</div>
            <h3 className="step-title">Browse Skills</h3>
            <p className="step-description">
              Explore our wide range of skills and find the perfect course for you
            </p>
          </div>
          
          <div className="step-connector">→</div>
          
          <div className="step-card" data-aos="flip-left" data-aos-delay="200">
            <div className="step-number">2</div>
            <div className="step-icon">📅</div>
            <h3 className="step-title">Book a Session</h3>
            <p className="step-description">
              Choose your preferred time and schedule a session with an expert
            </p>
          </div>
          
          <div className="step-connector">→</div>
          
          <div className="step-card" data-aos="flip-left" data-aos-delay="400">
            <div className="step-number">3</div>
            <div className="step-icon">🎓</div>
            <h3 className="step-title">Start Learning</h3>
            <p className="step-description">
              Begin your learning journey and master new skills at your own pace
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" data-aos="fade-up">
        <div className="section-header">
          <h2 className="section-title animate__animated animate__fadeInDown">What Our Students Say</h2>
          <p className="section-subtitle animate__animated animate__fadeInUp">Real success stories from our learning community</p>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="testimonial-header">
                <div className="testimonial-avatar">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="avatar-img"
                  />
                </div>
                <div className="testimonial-author">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <span key={index} className="star-filled">⭐</span>
                ))}
              </div>
              
              <p className="testimonial-text">"{testimonial.text}"</p>
              
              <div className="testimonial-footer">
                <span className="skill-badge-testimonial">
                  📚 {testimonial.skillTaken}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;