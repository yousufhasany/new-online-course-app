import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Register.css';

const Register = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [photoURL, setPhotoURL] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	// Password validation function
	const validatePassword = (pass) => {
		const errors = [];
		
		if (pass.length < 6) {
			errors.push('Password must be at least 6 characters long');
		}
		if (!/[A-Z]/.test(pass)) {
			errors.push('Must have an Uppercase letter in the password');
		}
		if (!/[a-z]/.test(pass)) {
			errors.push('Must have a Lowercase letter in the password');
		}
		
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		
		// Validate password
		const passwordErrors = validatePassword(password);
		if (passwordErrors.length > 0) {
			setError(passwordErrors.join('. '));
			toast.error('❌ ' + passwordErrors.join('. '), {
				duration: 5000,
				position: 'top-center',
				style: {
					background: '#ef4444',
					color: 'white',
					fontWeight: '600',
					padding: '16px',
					borderRadius: '10px'
				}
			});
			setLoading(false);
			return;
		}

		try {
			// Create user with email and password
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			
			// Update user profile with name and photo URL
			await updateProfile(userCredential.user, {
				displayName: name,
				photoURL: photoURL || null
			});

			setSuccess(true);
			toast.success('🎉 Account created successfully!', {
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
			setTimeout(() => {
				navigate(from, { replace: true });
			}, 1500);
		} catch (err) {
			const errorMessage = err.message.replace('Firebase: ', '').replace('auth/', '');
			setError(errorMessage);
			toast.error('❌ ' + errorMessage, {
				duration: 4000,
				position: 'top-center',
				style: {
					background: '#ef4444',
					color: 'white',
					fontWeight: '600',
					padding: '16px',
					borderRadius: '10px'
				}
			});
			setLoading(false);
		}
	};

	const handleGoogleSignup = async () => {
		setError(null);
		const provider = new GoogleAuthProvider();

		try {
			await signInWithPopup(auth, provider);
			toast.success('✅ Google sign up successful!', {
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
			setTimeout(() => {
				navigate('/', { replace: true });
			}, 1000);
		} catch (err) {
			const errorMessage = err.message.replace('Firebase: ', '').replace('auth/', '');
			setError(errorMessage);
			toast.error('❌ ' + errorMessage, {
				duration: 4000,
				position: 'top-center',
				style: {
					background: '#ef4444',
					color: 'white',
					fontWeight: '600',
					padding: '16px',
					borderRadius: '10px'
				}
			});
		}
	};

	return (
		<div className="register-container">
			<Toaster />
			<div className="register-content">
				<div className="register-left">
					<div className="register-hero animate__animated animate__fadeInLeft">
						<h1 className="register-hero-title">
							Join Our
							<br />
							<span className="gradient-text">Amazing Community</span>
						</h1>
						<p className="register-hero-description">
							Create your account and unlock access to powerful features
						</p>
						<div className="benefits-list">
							<div className="benefit-item">
								<span className="benefit-icon">✨</span>
								<span>Instant Access</span>
							</div>
							<div className="benefit-item">
								<span className="benefit-icon">🔐</span>
								<span>Secure & Private</span>
							</div>
							<div className="benefit-item">
								<span className="benefit-icon">🎯</span>
								<span>Easy Setup</span>
							</div>
						</div>
					</div>
				</div>

				<div className="register-right">
					<div className="register-card animate__animated animate__fadeInRight">
						<div className="register-header">
							<div className="register-icon">🚀</div>
							<h2>Sign Up</h2>
							<p>Create your account to get started</p>
						</div>

						{success ? (
							<div className="success-message">
								<div className="success-icon">✅</div>
								<h3>Account Created!</h3>
								<p>Redirecting you to home page...</p>
							</div>
						) : (
							<>
								<form onSubmit={handleSubmit} className="register-form">
									<div className="form-group">
										<label htmlFor="name">
											<span className="label-icon">�</span>
											Name
										</label>
										<input
											id="name"
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											placeholder="Your full name"
											required
											className="form-input"
										/>
									</div>

									<div className="form-group">
										<label htmlFor="email">
											<span className="label-icon">📧</span>
											Email
										</label>
										<input
											id="email"
											type="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											placeholder="your@email.com"
											required
											className="form-input"
										/>
									</div>

									<div className="form-group">
										<label htmlFor="photoURL">
											<span className="label-icon">📸</span>
											Photo URL
										</label>
										<input
											id="photoURL"
											type="url"
											value={photoURL}
											onChange={(e) => setPhotoURL(e.target.value)}
											placeholder="https://example.com/photo.jpg (optional)"
											className="form-input"
										/>
									</div>

									<div className="form-group">
										<label htmlFor="password">
											<span className="label-icon">🔒</span>
											Password
										</label>
										<div className="password-input-wrapper">
											<input
												id="password"
												type={showPassword ? "text" : "password"}
												value={password}
												onChange={(e) => setPassword(e.target.value)}
												placeholder="Enter your password"
												required
												className="form-input"
											/>
											<button
												type="button"
												className="password-toggle-btn"
												onClick={() => setShowPassword(!showPassword)}
												aria-label="Toggle password visibility"
											>
												{showPassword ? '👁️' : '👁️‍🗨️'}
											</button>
										</div>
										<div className="password-requirements">
											<p className="requirement-title">Password must contain:</p>
											<ul className="requirements-list">
												<li className={password.length >= 6 ? 'valid' : ''}>
													{password.length >= 6 ? '✓' : '○'} At least 6 characters
												</li>
												<li className={/[A-Z]/.test(password) ? 'valid' : ''}>
													{/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
												</li>
												<li className={/[a-z]/.test(password) ? 'valid' : ''}>
													{/[a-z]/.test(password) ? '✓' : '○'} One lowercase letter
												</li>
											</ul>
										</div>
									</div>

									{error && (
										<div className="error-message">
											<span className="error-icon">⚠️</span>
											{error}
										</div>
									)}

									<button 
										type="submit" 
										className="btn-submit"
										disabled={loading}
									>
										{loading ? (
											<span className="loading-spinner">⏳ Creating account...</span>
										) : (
											<>
												Register
												<span className="btn-arrow">→</span>
											</>
										)}
									</button>
								</form>

								<div className="divider">
									<span>OR</span>
								</div>

								<button onClick={handleGoogleSignup} className="btn-google">
									<svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
										<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
										<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
										<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
										<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
									</svg>
									Continue with Google
								</button>

								<div className="register-footer">
									<p>Already have an account?</p>
									<Link to="/login" className="login-link">
										Login →
									</Link>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
