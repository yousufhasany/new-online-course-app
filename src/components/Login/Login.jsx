import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			await signInWithEmailAndPassword(auth, email, password);
			toast.success('✅ Login successful! Welcome back!', {
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
			// Redirect to the page they tried to visit or home
			setTimeout(() => {
				navigate(from, { replace: true });
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
			setLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		setError(null);
		const provider = new GoogleAuthProvider();

		try {
			await signInWithPopup(auth, provider);
			toast.success('✅ Google login successful!', {
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
			// Redirect to the page they tried to visit or home
			setTimeout(() => {
				navigate(from, { replace: true });
			}, 1000);
		} catch (err) {
			const errorMessage = err.message.replace('Firebase: ', '').replace('auth/', '');
			setError(errorMessage);
			toast.error('❌ ' + errorMessage, {
				duration: 4000,
				position: 'top-center'
			});
		}
	};

	const handleForgotPassword = () => {
		// Navigate to forgot password page with email if provided
		navigate('/forgot-password', { state: { email } });
	};

	return (
		<div className="login-container">
			<Toaster />
			<div className="login-content">
				<div className="login-card animate__animated animate__fadeInUp">
					<div className="login-header">
						<div className="login-icon">🔐</div>
						<h2>Login</h2>
						<p>Sign in to access your account</p>
					</div>

					<form onSubmit={handleSubmit} className="login-form">
						<div className="form-group">
							<label htmlFor="email">
								<span className="label-icon">📧</span>
								Email Address
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
						</div>

						<div className="forgot-password-link">
							<button 
								type="button" 
								onClick={handleForgotPassword}
								className="forgot-btn"
							>
								Forgot Password?
							</button>
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
								<span className="loading-spinner">⏳ Logging in...</span>
							) : (
								<>
									Login
									<span className="btn-arrow">→</span>
								</>
							)}
						</button>
					</form>

					<div className="divider">
						<span>OR</span>
					</div>

					<button onClick={handleGoogleLogin} className="btn-google">
						<svg className="google-icon" viewBox="0 0 24 24" width="20" height="20">
							<path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
							<path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
							<path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
							<path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
						</svg>
						Continue with Google
					</button>

					<div className="login-footer">
						<p>Don't have an account?</p>
						<Link to="/register" className="register-link">
							Sign Up →
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
