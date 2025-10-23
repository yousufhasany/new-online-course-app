import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.init';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { Flame, Home as HomeIcon, BookOpen, Lock, Sparkles, LogOut, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	const handleSignOut = async () => {
		try {
			await signOut(auth);
			setIsMobileMenuOpen(false);
			navigate('/');
		} catch (err) {
			console.error('Sign out error', err);
		}
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
					<Flame className="logo-icon" size={24} />
					<span className="logo-text">Hero Platform</span>
				</Link>

				<button 
					className="mobile-menu-toggle"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					aria-label="Toggle menu"
				>
					{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
				</button>
				
				<div className={`navbar-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
					<Link to="/" className="nav-link" onClick={closeMobileMenu}>
						<HomeIcon className="nav-icon" size={18} />
						Home
					</Link>
					
					<Link to="/skills" className="nav-link" onClick={closeMobileMenu}>
						<BookOpen className="nav-icon" size={18} />
						Skills
					</Link>
					
					{!user ? (
						<>
							<Link to="/login" className="nav-link" onClick={closeMobileMenu}>
								<Lock className="nav-icon" size={18} />
								Login
							</Link>
							<Link to="/register" className="nav-link nav-link-primary" onClick={closeMobileMenu}>
								<Sparkles className="nav-icon" size={18} />
								Register
							</Link>
						</>
					) : (
						<div className="user-section">
							<Link to="/profile" className="nav-link user-profile-link" onClick={closeMobileMenu}>
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
								<LogOut className="nav-icon" size={18} />
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
