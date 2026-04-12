// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/Aboutus';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Events from './pages/Events';
import './styles.css';

function App() {
  const location = useLocation();
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/events" element={<Events />} />

      </Routes>
      {/* Footer shown everywhere except About & Contact page */}
      {(location.pathname !== '/about' && location.pathname !== '/contact') && <Footer />}
    </div>
  );
}

export default App;