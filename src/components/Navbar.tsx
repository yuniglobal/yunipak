// src/components/Navbar.tsx
import { Link, useLocation } from 'react-router-dom';
import { compname } from '../constants';

export default function Navbar() {
  const location = useLocation();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    // Only apply smooth scroll if we're on the home page
    if (location.pathname === '/') {
      e.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">{compname}</Link>
        </div>

        <div className="navbar-links">
          <Link
            to="/"
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={location.pathname === '/about' ? 'active' : ''}
          >
            About
          </Link>
          {/* Services now uses react-router Link to "/services" */}
          <Link
            to="/services"
            className={location.pathname === '/services' ? 'active' : ''}
          >
            Services
          </Link>
          {/* Contact remains a hash link with smooth scroll (works only on homepage) */}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
          >
            Contact
          </a>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          z-index: 1000;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(10, 228, 72, 0.2);
        }

        .navbar-container {
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 2rem;
        }

        .navbar-logo a {
          color: #0ae448;
          font-size: 1.5rem;
          font-weight: bold;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
        }

        .navbar-links {
          display: flex;
          gap: 2rem;
        }

        .navbar-links a {
          color: white;
          text-decoration: none;
          transition: color 0.3s;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          cursor: pointer;
        }

        .navbar-links a:hover {
          color: #0ae448;
        }

        .navbar-links a.active {
          color: #0ae448;
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 1rem;
          }
          .navbar-links {
            gap: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}