import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase.init';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSpring, animated } from 'react-spring';
import { User, Mail, Camera, Lock, Check, Circle, Calendar, Star, Loader, Target, Shield, Code, Palette, Database, Globe, Cpu, Zap, Plus, X } from 'lucide-react';
import './Profile.css';

const Profile = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [editing, setEditing] = useState(false);
	const [name, setName] = useState('');
	const [photoURL, setPhotoURL] = useState('');
	const [updating, setUpdating] = useState(false);
	const [skills, setSkills] = useState([
		{ id: 1, name: 'React', icon: 'Code', level: 'Expert', color: '#61dafb' },
		{ id: 2, name: 'JavaScript', icon: 'Zap', level: 'Expert', color: '#f7df1e' },
		{ id: 3, name: 'Node.js', icon: 'Cpu', level: 'Advanced', color: '#68a063' },
		{ id: 4, name: 'Firebase', icon: 'Database', level: 'Advanced', color: '#ffca28' },
		{ id: 5, name: 'CSS/Tailwind', icon: 'Palette', level: 'Expert', color: '#38bdf8' },
		{ id: 6, name: 'Web Development', icon: 'Globe', level: 'Expert', color: '#ff6347' }
	]);
	const [showAddSkill, setShowAddSkill] = useState(false);
	const [newSkill, setNewSkill] = useState({ name: '', level: 'Beginner', icon: 'Code', color: '#ff8c00' });
	const navigate = useNavigate();

	// React-Spring animations
	const fadeIn = useSpring({
		from: { opacity: 0, transform: 'translateY(30px)' },
		to: { opacity: 1, transform: 'translateY(0px)' },
		config: { tension: 280, friction: 60 }
	});

	const scaleIn = useSpring({
		from: { transform: 'scale(0.8)', opacity: 0 },
		to: { transform: 'scale(1)', opacity: 1 },
		config: { tension: 300, friction: 20 }
	});

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
				setName(currentUser.displayName || '');
				setPhotoURL(currentUser.photoURL || '');
				setLoading(false);
			} else {
				navigate('/login');
			}
		});
		return () => unsubscribe();
	}, [navigate]);

	// Update form fields when user changes
	useEffect(() => {
		if (user) {
			setName(user.displayName || '');
			setPhotoURL(user.photoURL || '');
		}
	}, [user]);

	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		
		if (!name.trim()) {
			toast.error('❌ Name cannot be empty!', {
				duration: 3000,
				position: 'top-center'
			});
			return;
		}

		setUpdating(true);

		try {
			await updateProfile(auth.currentUser, {
				displayName: name.trim(),
				photoURL: photoURL.trim() || null
			});

			// Force refresh the user object
			const updatedUser = auth.currentUser;
			setUser({
				...updatedUser,
				displayName: name.trim(),
				photoURL: photoURL.trim() || null
			});
			
			setEditing(false);

			toast.success('✅ Profile updated successfully!', {
				duration: 3000,
				position: 'top-center',
				style: {
					background: 'linear-gradient(135deg, #ff8c00, #ff6347)',
					color: 'white',
					fontWeight: '600',
					padding: '16px',
					borderRadius: '10px'
				}
			});
		} catch (err) {
			console.error('Profile update error:', err);
			toast.error('❌ Failed to update profile: ' + err.message, {
				duration: 4000,
				position: 'top-center'
			});
		} finally {
			setUpdating(false);
		}
	};

	const handleCancel = () => {
		setName(user.displayName || '');
		setPhotoURL(user.photoURL || '');
		setEditing(false);
	};

	const getIconComponent = (iconName) => {
		const icons = {
			Code: Code,
			Palette: Palette,
			Database: Database,
			Globe: Globe,
			Cpu: Cpu,
			Zap: Zap
		};
		return icons[iconName] || Code;
	};

	const handleAddSkill = (e) => {
		e.preventDefault();
		if (!newSkill.name.trim()) {
			toast.error('❌ Skill name cannot be empty!');
			return;
		}

		const skillToAdd = {
			id: Date.now(),
			name: newSkill.name.trim(),
			level: newSkill.level,
			icon: newSkill.icon,
			color: newSkill.color
		};

		setSkills([...skills, skillToAdd]);
		setNewSkill({ name: '', level: 'Beginner', icon: 'Code', color: '#ff8c00' });
		setShowAddSkill(false);
		toast.success('✅ Skill added successfully!');
	};

	const handleDeleteSkill = (id) => {
		setSkills(skills.filter(skill => skill.id !== id));
		toast.success('🗑️ Skill removed!');
	};

	if (loading) {
		return (
			<div className="profile-loading">
				<div className="spinner"></div>
				<p>Loading profile...</p>
			</div>
		);
	}

	return (
		<div className="profile-container">
			<Toaster />
			
			<animated.div className="profile-content" style={fadeIn}>
				<div className="profile-header-banner">
					<h1 className="profile-page-title">✨ My Profile</h1>
				</div>

				<animated.div className="profile-card" style={scaleIn}>
					<div className="profile-avatar-section">
						<div className="avatar-wrapper">
							{user.photoURL ? (
								<img 
									src={user.photoURL} 
									alt={user.displayName || 'User'}
									className="profile-avatar"
									onError={(e) => {
										e.target.src = 'https://i.ibb.co.com/GQzVRzxt/Yousuf-np.png' + (user.displayName?.[0] || 'U');
									}}
								/>
							) : (
								<div className="avatar-placeholder">
									<span className="avatar-initial">
										{user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
									</span>
								</div>
							)}
							<div className="avatar-status">
								<span className="status-dot"></span>
								Active
							</div>
						</div>
					</div>

					{!editing ? (
						<div className="profile-info-section">
							<div className="info-group">
								<label className="info-label">
									<User className="label-icon" size={18} />
									Name
								</label>
								<div className="info-value">
									{user.displayName || 'Not set'}
								</div>
							</div>

							<div className="info-group">
								<label className="info-label">
									<Mail className="label-icon" size={18} />
									Email
								</label>
								<div className="info-value">
									{user.email}
								</div>
							</div>

							<div className="info-group">
								<label className="info-label">
									<Camera className="label-icon" size={18} />
									Photo URL
								</label>
								<div className="info-value photo-url">
									{user.photoURL || 'No photo URL set'}
								</div>
							</div>

							<div className="info-group">
								<label className="info-label">
									<Lock className="label-icon" size={18} />
									Account Status
								</label>
								<div className="info-value">
									<span className="status-badge">
										{user.emailVerified ? <><Check size={16} /> Verified</> : <><Circle size={16} /> Not Verified</>}
									</span>
								</div>
							</div>

							<div className="info-group">
								<label className="info-label">
									<Calendar className="label-icon" size={18} />
									Member Since
								</label>
								<div className="info-value">
									{user.metadata.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									}) : 'Unknown'}
								</div>
							</div>

							<button 
								type="button"
								onClick={() => {
									console.log('Edit button clicked');
									setEditing(true);
								}} 
								className="btn-update-profile"
							>
								✏️ Edit Profile
							</button>
						</div>
					) : (
						<div className="profile-edit-section">
							<h3 className="edit-title">✏️ Update Your Profile</h3>
							<form onSubmit={handleUpdateProfile} className="edit-form">
								<div className="form-group">
									<label htmlFor="name">
										<User className="label-icon" size={18} />
										Name
									</label>
									<input
										id="name"
										type="text"
										value={name}
										onChange={(e) => setName(e.target.value)}
										placeholder="Enter your full name"
										className="form-input"
										required
										autoFocus
										disabled={updating}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="photoURL">
										<Camera className="label-icon" size={18} />
										Photo URL
									</label>
									<input
										id="photoURL"
										type="url"
										value={photoURL}
										onChange={(e) => setPhotoURL(e.target.value)}
										placeholder="https://example.com/your-photo.jpg"
										className="form-input"
										disabled={updating}
									/>
									<small className="input-hint">
										💡 Tip: Upload image to <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer">ImgBB</a> and paste the URL here
									</small>
								</div>

								<div className="form-group">
									<label className="info-label-disabled">
										<Mail className="label-icon" size={18} />
										Email (Cannot be changed)
									</label>
									<div className="info-value-disabled">
										{user.email}
									</div>
								</div>

								<div className="edit-actions">
									<button 
										type="button" 
										onClick={handleCancel}
										className="btn-cancel"
										disabled={updating}
									>
										❌ Cancel
									</button>
									<button 
										type="submit" 
										className="btn-save"
										disabled={updating}
									>
										{updating ? (
											<span><Loader className="spinner-icon" size={18} /> Saving...</span>
										) : (
											<span>💾 Save Changes</span>
										)}
									</button>
								</div>
							</form>
						</div>
					)}
				</animated.div>

				<div className="profile-stats-grid">
					<div className="stat-card" data-aos="zoom-in" data-aos-delay="0">
						<Target className="stat-icon" size={32} />
						<div className="stat-info">
							<div className="stat-value">Active</div>
							<div className="stat-label">Account Status</div>
						</div>
					</div>
					
					<div className="stat-card" data-aos="zoom-in" data-aos-delay="100">
						<Shield className="stat-icon" size={32} />
						<div className="stat-info">
							<div className="stat-value">Secure</div>
							<div className="stat-label">Authentication</div>
						</div>
					</div>
					
					<div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
						<Star className="stat-icon" size={32} />
						<div className="stat-info">
							<div className="stat-value">Member</div>
							<div className="stat-label">User Type</div>
						</div>
					</div>
				</div>

				{/* Skills Section */}
				<animated.div className="skills-section" style={fadeIn}>
					<div className="skills-header">
						<h2 className="skills-title">
							<Code size={28} className="title-icon" />
							My Skills
						</h2>
						<button 
							className="btn-add-skill"
							onClick={() => setShowAddSkill(!showAddSkill)}
						>
							{showAddSkill ? <X size={20} /> : <Plus size={20} />}
							{showAddSkill ? 'Cancel' : 'Add Skill'}
						</button>
					</div>

					{showAddSkill && (
						<div className="add-skill-form">
							<form onSubmit={handleAddSkill}>
								<div className="form-row">
									<div className="form-group">
										<label htmlFor="skillName">Skill Name</label>
										<input
											id="skillName"
											type="text"
											value={newSkill.name}
											onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
											placeholder="e.g., Python, Design, Marketing"
											className="form-input"
											required
										/>
									</div>

									<div className="form-group">
										<label htmlFor="skillLevel">Level</label>
										<select
											id="skillLevel"
											value={newSkill.level}
											onChange={(e) => setNewSkill({...newSkill, level: e.target.value})}
											className="form-input"
										>
											<option value="Beginner">Beginner</option>
											<option value="Intermediate">Intermediate</option>
											<option value="Advanced">Advanced</option>
											<option value="Expert">Expert</option>
										</select>
									</div>

									<div className="form-group">
										<label htmlFor="skillIcon">Icon</label>
										<select
											id="skillIcon"
											value={newSkill.icon}
											onChange={(e) => setNewSkill({...newSkill, icon: e.target.value})}
											className="form-input"
										>
											<option value="Code">Code</option>
											<option value="Palette">Palette</option>
											<option value="Database">Database</option>
											<option value="Globe">Globe</option>
											<option value="Cpu">Cpu</option>
											<option value="Zap">Zap</option>
										</select>
									</div>

									<div className="form-group">
										<label htmlFor="skillColor">Color</label>
										<input
											id="skillColor"
											type="color"
											value={newSkill.color}
											onChange={(e) => setNewSkill({...newSkill, color: e.target.value})}
											className="form-input color-input"
										/>
									</div>
								</div>

								<button type="submit" className="btn-submit-skill">
									<Plus size={18} /> Add Skill
								</button>
							</form>
						</div>
					)}

					<div className="skills-grid">
						{skills.map((skill, index) => {
							const IconComponent = getIconComponent(skill.icon);
							return (
								<div 
									key={skill.id} 
									className="skill-card"
									data-aos="fade-up"
									data-aos-delay={index * 50}
								>
									<button 
										className="skill-delete-btn"
										onClick={() => handleDeleteSkill(skill.id)}
										title="Remove skill"
									>
										<X size={16} />
									</button>
									<div className="skill-icon" style={{ color: skill.color }}>
										<IconComponent size={32} />
									</div>
									<h3 className="skill-name">{skill.name}</h3>
									<span className="skill-level" style={{ borderColor: skill.color, color: skill.color }}>
										{skill.level}
									</span>
								</div>
							);
						})}
					</div>
				</animated.div>
			</animated.div>
		</div>
	);
};

export default Profile;