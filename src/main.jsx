import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'animate.css';

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  easing: 'ease-out-cubic'
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
