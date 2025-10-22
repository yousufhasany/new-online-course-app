import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.init';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			navigate('/');
		} catch (err) {
			console.error('Sign out error', err);
		}
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<Link to="/" className="navbar-logo">
					<span className="logo-icon">🔥</span>
					<span className="logo-text">Hero Platform</span>
				</Link>
				
				<div className="navbar-menu">
					<Link to="/" className="nav-link">
						<span className="nav-icon">🏠</span>
						Home
					</Link>
					
					<Link to="/skills" className="nav-link">
						<span className="nav-icon">🎯</span>
						Skills
					</Link>
					
					{!user ? (
						<>
							<Link to="/login" className="nav-link">
								<span className="nav-icon">🔐</span>
								Login
							</Link>
							<Link to="/register" className="nav-link nav-link-primary">
								<span className="nav-icon">✨</span>
								Register
							</Link>
						</>
					) : (
						<div className="user-section">
							<Link to="/profile" className="nav-link user-profile-link">
								{user.photoURL ? (
									<img 
										src={user.photoURL} 
										alt={user.displayName || 'User'} 
										className="user-avatar-nav"
										onError={(e) => {
											e.target.src = 'https://via.placeholder.com/40/667eea/ffffff?text=' + (user.displayName?.[0] || 'U');
										}}
									/>
								) : (
									<div className="user-avatar-placeholder">
										{user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
									</div>
								)}
								<span className="user-name">{user.displayName || user.email}</span>
							</Link>
							<button onClick={handleSignOut} className="btn-signout">
								<span className="nav-icon">🚪</span>
								Sign Out
							</button>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
