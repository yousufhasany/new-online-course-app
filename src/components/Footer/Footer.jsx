import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Linkedin, Github, Mail, Phone, MapPin, Flame } from 'lucide-react';
import './Footer.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-content">
					<div className="footer-section">
						<div className="footer-brand">
							<Flame className="footer-logo-icon" size={28} />
							<span className="footer-logo-text">Hero Platform</span>
						</div>
						<p className="footer-description">
							The best Online course platform in Bangladesh.
						</p>
						<div className="social-links">
							<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
								<Twitter className="social-icon" size={20} />
							</a>
							<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
								<Facebook className="social-icon" size={20} />
							</a>
							<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
								<Linkedin className="social-icon" size={20} />
							</a>
							<a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
								<Github className="social-icon" size={20} />
							</a>
						</div>
					</div>

					<div className="footer-section">
						<h3 className="footer-title">Quick Links</h3>
						<ul className="footer-links">
							<li><Link to="/">Home</Link></li>
							<li><Link to="/login">Login</Link></li>
							<li><Link to="/register">Register</Link></li>
							<li><a href="#features">Features</a></li>
						</ul>
					</div>

					<div className="footer-section">
						<h3 className="footer-title">Legal</h3>
						<ul className="footer-links">
							<li><a href="#privacy">Privacy Policy</a></li>
							<li><a href="#terms">Terms of Service</a></li>
							<li><a href="#cookies">Cookie Policy</a></li>
							<li><a href="#disclaimer">Disclaimer</a></li>
						</ul>
					</div>

					<div className="footer-section">
						<h3 className="footer-title">Contact Us</h3>
						<ul className="footer-contact">
							<li className="contact-item">
								<Mail className="contact-icon" size={20} />
								<a href="mailto:support@fireauth.com">support@fireauth.com</a>
							</li>
							<li className="contact-item">
								<Phone className="contact-icon" size={20} />
								<a href="tel:+1234567890">+1 (234) 567-890</a>
							</li>
							<li className="contact-item">
								<MapPin className="contact-icon" size={20} />
								<span>123 Auth Street, Security City, SC 12345</span>
							</li>
						</ul>
					</div>
				</div>

				<div className="footer-bottom">
					<p className="copyright">
						© {new Date().getFullYear()} Yousuf Hasan. All rights reserved.
					</p>
					<div className="footer-bottom-links">
						<a href="#privacy">Privacy</a>
						<span className="separator">•</span>
						<a href="#terms">Terms</a>
						<span className="separator">•</span>
						<a href="#sitemap">Sitemap</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
