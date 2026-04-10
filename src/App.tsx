// src/App.tsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/Aboutus';
import Services from './pages/Services';
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
      </Routes>
      {/* Footer shown everywhere except About page */}
      {location.pathname !== '/about' && <Footer />}
    </div>
  );
}

export default App;