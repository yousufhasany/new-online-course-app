import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.init';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import './ForgotPassword.css';

const ForgotPassword = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [email, setEmail] = useState(location.state?.email || '');
	const [loading, setLoading] = useState(false);

	const handleResetPassword = async (e) => {
		e.preventDefault();
		
		if (!email) {
			toast.error('❌ Please enter your email address', {
				duration: 3000,
				position: 'top-center'
			});
			return;
		}

		setLoading(true);

		try {
			await sendPasswordResetEmail(auth, email);
			
			toast.success('✅ Password reset email sent! Check your inbox.', {
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

			// Wait a moment before redirecting to Gmail
			setTimeout(() => {
				window.open('https://mail.google.com', '_blank');
				navigate('/login');
			}, 2000);

		} catch (err) {
			console.error('Password reset error:', err);
			
			let errorMessage = 'Failed to send reset email';
			
			if (err.code === 'auth/user-not-found') {
				errorMessage = 'No account found with this email';
			} else if (err.code === 'auth/invalid-email') {
				errorMessage = 'Invalid email address';
			} else if (err.code === 'auth/too-many-requests') {
				errorMessage = 'Too many requests. Please try again later';
			}
			
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
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="forgot-password-container">
			<Toaster />
			
			<div className="forgot-password-content">
				<div className="forgot-password-card">
					<div className="forgot-password-header">
						<div className="icon-wrapper">
							<span className="lock-icon">🔐</span>
						</div>
						<h1 className="forgot-password-title">Forgot Password?</h1>
						<p className="forgot-password-subtitle">
							No worries! Enter your email and we'll send you reset instructions.
						</p>
					</div>

					<form onSubmit={handleResetPassword} className="forgot-password-form">
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
								placeholder="Enter your email"
								className="form-input"
								required
								autoFocus
							/>
						</div>

						<button 
							type="submit" 
							className="btn-reset-password"
							disabled={loading}
						>
							{loading ? (
								<>
									<span className="spinner-small"></span>
									Sending...
								</>
							) : (
								<>
									<span className="btn-icon">📬</span>
									Send Reset Link
								</>
							)}
						</button>
					</form>

					<div className="forgot-password-footer">
						<p className="back-to-login">
							Remember your password?{' '}
							<button 
								onClick={() => navigate('/login')}
								className="link-button"
							>
								Back to Login →
							</button>
						</p>
					</div>

					<div className="info-box">
						<span className="info-icon">💡</span>
						<p className="info-text">
							Check your spam folder if you don't see the email within a few minutes.
						</p>
					</div>
				</div>

				<div className="illustration-section">
					<div className="floating-icon">🔑</div>
					<div className="floating-icon delay-1">📧</div>
					<div className="floating-icon delay-2">✨</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
