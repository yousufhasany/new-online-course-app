import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Star, DollarSign, Calendar, UserCircle, Mail as MailIcon, User, Rocket, Check } from 'lucide-react';
import './SkillDetails.css';

const SkillDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [skill, setSkill] = useState(null);
	const [loading, setLoading] = useState(true);
	const [formData, setFormData] = useState({
		name: '',
		email: ''
	});

	useEffect(() => {
		fetch('/skills.json')
			.then(res => res.json())
			.then(data => {
				const foundSkill = data.find(s => s.skillId === parseInt(id));
				setSkill(foundSkill);
				setLoading(false);
			})
			.catch(err => {
				console.error('Error loading skill:', err);
				setLoading(false);
			});
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		if (!formData.name || !formData.email) {
			toast.error('Please fill in all fields');
			return;
		}

		// Show success toast
		toast.success('🎉 Session booked successfully!', {
			duration: 4000,
			position: 'top-center',
			style: {
				background: 'linear-gradient(135deg, #ff8c00, #ff6347)',
				color: 'white',
				fontWeight: '600',
				padding: '16px',
				borderRadius: '10px'
			}
		});

		// Clear form
		setFormData({
			name: '',
			email: ''
		});
	};

	if (loading) {
		return (
			<div className="loading-container">
				<div className="spinner"></div>
				<p>Loading skill details...</p>
			</div>
		);
	}

	if (!skill) {
		return (
			<div className="error-container">
				<h2>Skill not found</h2>
				<button onClick={() => navigate('/skills')} className="btn-back">
					Back to Skills
				</button>
			</div>
		);
	}

	return (
		<div className="skill-details-container">
			<Toaster />
			
			<div className="skill-details-content">
				{/* Header Section */}
				<div className="details-header">
					<button onClick={() => navigate('/skills')} className="btn-back-arrow">
						← Back to Skills
					</button>
					<div className="skill-category-badge">{skill.category}</div>
				</div>

				{/* Main Content Grid */}
				<div className="details-grid">
					{/* Left Column - Image and Quick Stats */}
					<div className="details-left">
						<div className="skill-image-container">
							<img 
								src={skill.image} 
								alt={skill.skillName}
								className="skill-detail-image"
								onError={(e) => {
									e.target.src = `https://via.placeholder.com/600x400/ff8c00/ffffff?text=${encodeURIComponent(skill.skillName)}`;
								}}
							/>
						</div>

						<div className="quick-stats">
							<div className="stat-box">
								<Star className="stat-icon" size={32} />
								<div className="stat-info">
									<div className="stat-value">{skill.rating}</div>
									<div className="stat-label">Rating</div>
								</div>
							</div>
							<div className="stat-box">
								<DollarSign className="stat-icon" size={32} />
								<div className="stat-info">
									<div className="stat-value">${skill.price}</div>
									<div className="stat-label">Per Session</div>
								</div>
							</div>
							<div className="stat-box">
								<Calendar className="stat-icon" size={32} />
								<div className="stat-info">
									<div className="stat-value">{skill.slotsAvailable}</div>
									<div className="stat-label">Slots Available</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Column - Details */}
					<div className="details-right">
						<h1 className="skill-detail-title">{skill.skillName}</h1>
						
						<div className="provider-info-section">
							<div className="provider-avatar">
								<UserCircle className="avatar-icon" size={48} />
							</div>
							<div className="provider-details">
								<h3 className="provider-name">{skill.providerName}</h3>
								<a href={`mailto:${skill.providerEmail}`} className="provider-email">
									<MailIcon size={16} /> {skill.providerEmail}
								</a>
							</div>
						</div>

						<div className="skill-description-section">
							<h2 className="section-heading">About This Skill</h2>
							<p className="skill-description">{skill.description}</p>
						</div>

						<div className="skill-features">
							<h2 className="section-heading">What You'll Get</h2>
							<ul className="features-list">
								<li><Check size={18} /> One-on-one personalized sessions</li>
								<li><Check size={18} /> Flexible scheduling options</li>
								<li><Check size={18} /> Expert guidance from {skill.providerName}</li>
								<li><Check size={18} /> Practical hands-on learning</li>
								<li><Check size={18} /> Progress tracking and feedback</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Book Session Form */}
				<div className="booking-section">
					<div className="booking-card">
						<h2 className="booking-title">Book Your Session</h2>
						<p className="booking-subtitle">Ready to start learning? Fill out the form below!</p>
						
						<form onSubmit={handleSubmit} className="booking-form">
							<div className="form-group">
								<label htmlFor="name" className="form-label">
									<User className="label-icon" size={18} />
									Your Name
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									className="form-input"
									placeholder="Enter your full name"
									required
								/>
							</div>

							<div className="form-group">
								<label htmlFor="email" className="form-label">
									<MailIcon className="label-icon" size={18} />
									Email Address
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className="form-input"
									placeholder="Enter your email"
									required
								/>
							</div>

							<button type="submit" className="btn-submit">
								<Rocket className="btn-icon" size={18} />
								Book Session Now
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SkillDetails;
