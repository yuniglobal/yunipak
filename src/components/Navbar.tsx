// src/components/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, ChevronRight, Home, Info, BookOpen, GraduationCap, Mail, ClipboardList, ChevronDown, Users, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContracted, setIsContracted] = useState(false);
  const [isMobileRegOpen, setIsMobileRegOpen] = useState(false);
  const lastScrollY = useRef(0);
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
    { name: 'About Us', path: '/Aboutus', icon: Info },
    { name: 'Summer Camp', path: '/summer-camp', icon: Sun },
    { name: 'Trainings', path: '/trainings', icon: GraduationCap },
    { name: 'Blog', path: '/blog', icon: BookOpen },
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
          top: calc(var(--banner-height, 0px) + 8px);
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 2rem;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .navbar-wrapper {
            top: calc(var(--banner-height, 0px) + 6px);
            padding: 0.75rem 1rem;
          }

          .navbar-container {
            padding: 0.65rem 0.9rem;
            border-radius: 28px;
            gap: 0.75rem;
          }

          .nav-logo {
            max-width: 86px;
          }

          .nav-logo img {
            height: 28px !important;
          }

          .nav-actions {
            gap: 0.6rem;
          }

          .theme-toggle,
          .mobile-toggle {
            width: 38px;
            height: 38px;
          }
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
          padding: 0.5rem 1.25rem;
          background: var(--glass-bg-heavy);
          gap: 0.75rem;
        }

        .contracted .nav-logo {
          max-width: 80px;
          opacity: 1;
          margin-right: 0.5rem;
          overflow: visible;
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


        @media (max-width: 1024px) {
          .contracted .theme-toggle {
            display: none;
          }
        }

        /* ------------------------------- */

        .nav-logo {
          font-family: 'Outfit', sans-serif;
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
          gap: 2rem;
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
          background: rgba(12, 98, 56, 0.1);
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

        /* Mobile Menu Overlay */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100dvh;
          background: var(--glass-bg-heavy);
          backdrop-filter: blur(25px) saturate(200%);
          -webkit-backdrop-filter: blur(25px) saturate(200%);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          transform: translateX(100%);
          transition: all 0.6s var(--transition-smooth);
          pointer-events: auto;
          visibility: hidden;
          overflow-y: auto;
        }

        .mobile-menu.open {
          transform: translateX(0);
          visibility: visible;
        }

        .mobile-nav-link {
          font-size: clamp(1.4rem, 6vw, 2rem);
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: 1px solid var(--glass-border);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .mobile-nav-link:hover {
          color: var(--pk-green);
          padding-left: 1rem;
        }

        .mobile-nav-link span {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .mobile-nav-link {
            padding: 0.85rem 0;
          }

          .mobile-nav-link span {
            gap: 0.75rem;
          }
        }

        /* Dropdown Styling */
        .nav-dropdown {
          position: relative;
          display: inline-block;
        }
        
        .nav-dropdown-toggle {
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 100px;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.4s ease;
        }

        .nav-dropdown-toggle:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.05);
        }

        .nav-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: var(--glass-bg-heavy);
          backdrop-filter: blur(25px) saturate(200%);
          -webkit-backdrop-filter: blur(25px) saturate(200%);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          padding: 0.5rem;
          min-width: 240px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1100;
        }

        .nav-dropdown:hover .nav-dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(8px);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .dropdown-item:hover {
          color: var(--text-primary);
          background: rgba(255,255,255,0.08);
        }
        
        .dropdown-item.placeholder-item {
          opacity: 0.7;
        }
        
        .dropdown-item.placeholder-item:hover {
          opacity: 1;
        }

        .contracted .nav-dropdown-toggle span {
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          margin-left: 0;
        }
        
        .contracted .nav-dropdown-toggle .chevron-icon {
          display: none;
        }
        
        .contracted .nav-dropdown-toggle {
          gap: 0;
          padding: 0.5rem;
        }

        /* Mobile Dropdown styles */
        .mobile-dropdown-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          font-size: clamp(1.4rem, 6vw, 2rem);
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          color: var(--text-primary);
          border-bottom: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .mobile-dropdown-header span {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .mobile-dropdown-header .chevron-icon {
          transition: transform 0.3s ease;
        }

        .mobile-dropdown-header.open .chevron-icon {
          transform: rotate(90deg);
        }

        .mobile-dropdown-content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin 0.4s ease;
          display: flex;
          flex-direction: column;
          padding-left: 1.5rem;
          border-left: 2px solid var(--glass-border);
          margin-top: 0;
          margin-bottom: 0;
          gap: 0.5rem;
        }

        .mobile-dropdown-content.open {
          max-height: 250px;
          opacity: 1;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .mobile-dropdown-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 0;
          color: var(--text-secondary);
          font-size: 1.1rem;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .mobile-dropdown-item:hover {
          color: var(--pk-green);
          padding-left: 0.5rem;
        }
        
        .mobile-dropdown-item.placeholder-item {
          opacity: 0.7;
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
                <Icon size={18} strokeWidth={2.5} />
                <span>{link.name}</span>
              </div>
            );
          })}
          
          {/* Registrations Dropdown */}
          <div className="nav-dropdown">
            <div className="nav-dropdown-toggle">
              <ClipboardList size={18} strokeWidth={2.5} />
              <span>Registrations</span>
              <ChevronDown size={14} strokeWidth={2.5} className="chevron-icon" />
            </div>
            <div className="nav-dropdown-menu">
              <a 
                href="https://forms.gle/dHUsKbX4i9zahny79" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dropdown-item"
              >
                <Users size={16} strokeWidth={2} />
                <span>Event Team Registration</span>
              </a>
              <a 
                href="https://forms.gle/FKQr6jWuu5aP3c8V6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dropdown-item"
              >
                <User size={16} strokeWidth={2} />
                <span>Individual Registration</span>
              </a>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          {/* Theme toggle disabled/hidden as requested */}
          <div className="mobile-toggle" onClick={() => setIsOpen(true)}>
            <Menu size={24} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem'}}>
          <img src="/images/logo1.png" alt="YUNI" style={{height: '40px', width: 'auto'}} />
          <div 
            onClick={() => setIsOpen(false)} 
            style={{
              cursor: 'pointer',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--glass-border)'
            }}
          >
            <X size={32} strokeWidth={2.5} />
          </div>
        </div>
        
        {navLinks.map((link) => {
          const Icon = link.icon;
          return (
            <div 
              key={link.path} 
              className="mobile-nav-link"
              onClick={() => handleNavigate(link.path)}
            >
              <span>
                <Icon size={28} strokeWidth={2.5} />
                {link.name}
              </span>
              <ChevronRight size={32} />
            </div>
          );
        })}

        {/* Mobile Registrations Dropdown */}
        <div className={`mobile-dropdown-header ${isMobileRegOpen ? 'open' : ''}`} onClick={() => setIsMobileRegOpen(!isMobileRegOpen)}>
          <span>
            <ClipboardList size={28} strokeWidth={2.5} />
            Registrations
          </span>
          <ChevronRight size={32} className="chevron-icon" />
        </div>
        <div className={`mobile-dropdown-content ${isMobileRegOpen ? 'open' : ''}`}>
          <a 
            href="https://forms.gle/dHUsKbX4i9zahny79" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <Users size={22} strokeWidth={2} />
            Event Team Registration
          </a>
          <a 
            href="https://forms.gle/FKQr6jWuu5aP3c8V6" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-dropdown-item"
            onClick={() => setIsOpen(false)}
          >
            <User size={22} strokeWidth={2} />
            <span>Individual Registration</span>
          </a>
        </div>

        <div style={{marginTop: 'auto', paddingBottom: '4rem'}}>
          <button 
            className="btn-tech btn-tech-primary" 
            style={{width: '100%', justifyContent: 'center'}}
            onClick={() => handleNavigate('/summer-camp')}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;