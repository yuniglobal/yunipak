import { useLayoutEffect } from 'react';
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
import CoursesPage from './pages/Courses';
import Certificates from './pages/Certificates';
import PromoBanner from './components/PromoBanner';
import SummerPromoPopup from './components/SummerPromoPopup';
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
                       // @ts-ignore
                       (navigator.deviceMemory && navigator.deviceMemory < 4);
      
      const checkWebGL = () => {
        try {
          const canvas = document.createElement('canvas');
          return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
          return false;
        }
      };

      document.documentElement.setAttribute('data-perf', isLowEnd ? 'low' : 'high');
      document.documentElement.setAttribute('data-webgl', checkWebGL() ? 'true' : 'false');
    };
    
    checkPerformance();
  }, []);

  // Scroll to top on route change, EXCEPT for the Services page (where ScrollMotionPath lives)
  useLayoutEffect(() => {
    if (location.pathname !== '/services') {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Refresh ScrollTrigger on route changes to ensure animations are correctly calculated
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <div className="app-wrapper">
      {location.pathname === '/' && <PromoBanner />}
      <Navbar />
      <SummerPromoPopup />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Aboutus" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Programs" element={<CoursesPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/events" element={<Events />} />
          <Route path="/certificates" element={<Certificates />} />
        </Routes>
      </main>
      {location.pathname !== '/Aboutus' && <Footer />}
    </div>
  );
}

export default App;