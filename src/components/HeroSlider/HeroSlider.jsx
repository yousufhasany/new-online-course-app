import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import './HeroSlider.css';

const HeroSlider = () => {
	const slides = [
		{
			id: 1,
			title: 'Learn New Skills',
			subtitle: 'Master Any Skill You Want',
			description: 'Connect with expert instructors and learn at your own pace. From music to coding, we have it all.',
			image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop',
			cta: 'Explore Skills',
			link: '/skills'
		},
		{
			id: 2,
			title: 'Expert Instructors',
			subtitle: 'Learn From The Best',
			description: 'Our platform connects you with top-rated professionals who are passionate about teaching.',
			image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=600&fit=crop',
			cta: 'Find Instructors',
			link: '/skills'
		},
		{
			id: 3,
			title: 'Flexible Schedule',
			subtitle: 'Learn On Your Terms',
			description: 'Book sessions that fit your schedule. Learn anytime, anywhere with our flexible platform.',
			image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1200&h=600&fit=crop',
			cta: 'Get Started',
			link: '/register'
		},
		{
			id: 4,
			title: 'Affordable Pricing',
			subtitle: 'Quality Education For Everyone',
			description: 'Access premium skills training at prices that won\'t break the bank. Starting from just $10/session.',
			image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop',
			cta: 'View Pricing',
			link: '/skills'
		}
	];

	return (
		<div className="hero-slider-container">
			<Swiper
				modules={[Navigation, Pagination, Autoplay, EffectFade]}
				spaceBetween={0}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				effect="fade"
				loop={true}
				className="hero-swiper"
			>
				{slides.map((slide) => (
					<SwiperSlide key={slide.id}>
						<div className="hero-slide">
							<div 
								className="hero-slide-bg"
								style={{ backgroundImage: `url(${slide.image})` }}
							>
								<div className="hero-overlay"></div>
							</div>
							<div className="hero-content">
								<div className="hero-text">
									<h3 className="hero-subtitle">{slide.subtitle}</h3>
									<h1 className="hero-title">{slide.title}</h1>
									<p className="hero-description">{slide.description}</p>
									<Link to={slide.link} className="hero-cta">
										{slide.cta}
										<span className="cta-arrow">→</span>
									</Link>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default HeroSlider;
