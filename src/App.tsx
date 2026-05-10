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
import PromoBanner from './components/PromoBanner';
import SummerPromoPopup from './components/SummerPromoPopup';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();




  // Disable browser's automatic scroll restoration
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
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
        </Routes>
      </main>
      {location.pathname !== '/Aboutus' && <Footer />}
    </div>
  );
}

export default App;