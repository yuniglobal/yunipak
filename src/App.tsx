import { useEffect, useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/Aboutus';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Events from './pages/Events';

import TrainingsPage from './pages/Trainings';
import Certificates from './pages/Certificates';
import Blog from './pages/Blog';

import Legal from './pages/Legal';
import RegistrationTeam from './pages/RegistrationTeam';
import RegistrationIndividual from './pages/RegistrationIndividual';
import PromoBanner from './components/PromoBanner';
import SummerPromoPopup from './components/SummerPromoPopup';
import Newsletter from './components/Newsletter';
import AnimatedBackground from './components/AnimatedBackground';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });
ScrollTrigger.config({ limitCallbacks: true });

function App() {
  const location = useLocation();

  // Disable browser's automatic scroll restoration
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Performance/Hardware Detection
    const checkPerformance = () => {
      const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
        (window.innerWidth < 768 && !('deviceMemory' in navigator)) ||
        // @ts-expect-error - navigator.deviceMemory is not officially standardized in all browsers
        (navigator.deviceMemory && navigator.deviceMemory < 4);

      const checkWebGL = () => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch {
          return false;
        }
      };

      document.documentElement.setAttribute('data-perf', isLowEnd ? 'low' : 'high');
      document.documentElement.setAttribute('data-webgl', checkWebGL() ? 'true' : 'false');
    };

    checkPerformance();
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = '';
    }, 10);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Refresh ScrollTrigger on route changes to ensure animations are correctly calculated
  useLayoutEffect(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [location.pathname]);

  return (
    <div className="app-wrapper">
      <AnimatedBackground />
      {location.pathname === '/' && <PromoBanner />}
      <Navbar />
      <SummerPromoPopup />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutus" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/trainings" element={<TrainingsPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/certificates" element={<Certificates />} />
          <Route path="/registration-team" element={<RegistrationTeam />} />
          <Route path="/registration-individual" element={<RegistrationIndividual />} />
          <Route path="/privacy" element={<Legal defaultTab="privacy" />} />
          <Route path="/terms" element={<Legal defaultTab="terms" />} />
        </Routes>
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;