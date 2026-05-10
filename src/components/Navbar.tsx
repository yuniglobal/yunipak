// src/components/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Menu, X, Sun, Moon, ChevronRight, Home, Info, BookOpen, Calendar, Briefcase, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContracted, setIsContracted] = useState(false);
  const lastScrollY = useRef(0);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      // Contract on scrolling down, expand on scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsContracted(true); // contracted
      } else if (currentScrollY < lastScrollY.current && currentScrollY > 50) {
        setIsContracted(false); // expanded
      }
      
      // Always expand at the very top
      if (currentScrollY <= 50) {
        setIsContracted(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/Aboutus', icon: Info },
    { name: 'Trainings', path: '/Programs', icon: BookOpen },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Careers', path: '/careers', icon: Briefcase },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];

  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''} ${isContracted ? 'contracted' : ''}`}>
      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: var(--banner-height, 0px);
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 2rem;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1.5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(25px) saturate(200%);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 40px rgba(0,0,0,0.2);
          pointer-events: auto;
          overflow: hidden;
        }

        .scrolled .navbar-wrapper {
          padding: 1rem 2rem;
        }

        .scrolled .navbar-container {
          background: var(--glass-bg-heavy);
          box-shadow: 0 20px 50px var(--glass-shadow);
        }

        /* --- Contracted State Styles --- */
        .contracted .navbar-container {
          max-width: max-content;
          padding: 0.5rem 1.5rem;
          background: var(--glass-bg-heavy);
        }

        .contracted .nav-logo {
          max-width: 0;
          opacity: 0;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .contracted .nav-link span {
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          margin-left: 0;
        }
        
        .contracted .nav-link {
          gap: 0;
          padding: 0.5rem;
        }

        .contracted .btn-enroll {
          max-width: 0;
          opacity: 0;
          padding: 0;
          margin: 0;
          overflow: hidden;
        }

        /* ------------------------------- */

        .nav-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900;
          font-size: 1.5rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          transition: all 0.4s ease;
          max-width: 100px;
          opacity: 1;
        }

        .nav-logo span {
          color: var(--pk-green);
        }

        .nav-links {
          display: none;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .nav-links {
            display: flex;
            align-items: center;
          }
        }

        .nav-link {
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.4s ease;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: 100px;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
        }

        .nav-link.active {
          color: var(--pk-green);
          background: rgba(0, 230, 118, 0.1);
        }

        .nav-link span {
          transition: all 0.4s ease;
          max-width: 100px;
          opacity: 1;
          white-space: nowrap;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          transition: all 0.4s ease;
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background: var(--pk-green-glow-subtle);
          color: var(--pk-green);
        }

        .btn-enroll {
          display: none;
          padding: 0.6rem 1.5rem;
          background: var(--pk-green);
          color: #fff;
          border-radius: 100px;
          font-weight: 700;
          font-size: 0.8rem;
          text-transform: uppercase;
          transition: all 0.4s ease;
          max-width: 150px;
          opacity: 1;
          white-space: nowrap;
          border: none;
          cursor: pointer;
        }

        @media (min-width: 640px) {
          .btn-enroll {
            display: block;
          }
        }

        .btn-enroll:hover {
          background: var(--pk-green-light);
          transform: scale(1.05);
        }

        .mobile-toggle {
          display: flex;
          color: var(--text-primary);
          cursor: pointer;
        }

        @media (min-width: 1024px) {
          .mobile-toggle {
            display: none;
          }
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: var(--bg-primary);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          transform: translateX(100%);
          transition: transform 0.5s var(--transition-smooth);
        }

        .mobile-menu.open {
          transform: translateX(0);
        }

        .mobile-nav-link {
          font-size: 2.5rem;
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .mobile-nav-link:hover {
          color: var(--pk-green);
        }
      `}</style>

      <div className="navbar-container">
        <div className="nav-logo" onClick={() => navigate('/')}>
          <img src="/images/logo1.png" alt="YUNI" style={{height: '35px', width: 'auto'}} />
        </div>

        <div className="nav-links">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div 
                key={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => handleNavigate(link.path)}
              >
                <Icon size={18} />
                <span>{link.name}</span>
              </div>
            );
          })}
        </div>

        <div className="nav-actions">
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </div>
          
          <button className="btn-enroll" onClick={() => navigate('/Programs')}>
            Trainings
          </button>

          <div className="mobile-toggle" onClick={() => setIsOpen(true)}>
            <Menu size={24} />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '4rem'}}>
          <X size={32} onClick={() => setIsOpen(false)} style={{cursor: 'pointer'}} />
        </div>
        
        {navLinks.map((link) => (
          <div 
            key={link.path} 
            className="mobile-nav-link"
            onClick={() => handleNavigate(link.path)}
          >
            {link.name}
            <ChevronRight size={32} />
          </div>
        ))}

        <div style={{marginTop: 'auto', paddingBottom: '4rem'}}>
          <button 
            className="btn-tech btn-tech-primary" 
            style={{width: '100%', justifyContent: 'center'}}
            onClick={() => handleNavigate('/Programs')}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;