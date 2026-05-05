'use client';

import { useNavigate } from 'react-router-dom';
import type { ReactElement } from 'react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

const Footer = ({ onNavigate }: FooterProps): ReactElement => {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      let route = '';
      switch (page) {
        case 'home':
          route = '/';
          break;
        case 'trainings':
          route = '/courses';
          break;
        case 'blog':
          route = '/events';
          break;
        case 'careers':
          route = '/careers';
          break;
        case 'contact':
          route = '/contact';
          break;
        default:
          route = `/${page}`;
      }
      navigate(route);
    }
  };

  return (
    <>
      <style>{`
        .footer-glass-panel {
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          border-top: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: 5rem;
        }

        .footer-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 4rem 1.5rem 2.5rem 1.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-logo {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-weight: 900;
          font-size: 1.875rem;
          margin-bottom: 1rem;
          color: white;
        }

        .footer-logo span {
          color: var(--brand-400, #34d399);
        }

        .footer-description {
          color: #6b7280;
          max-width: 24rem;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .footer-heading {
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          color: white;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-link-btn {
          background: none;
          border: none;
          color: #6b7280;
          font-size: 0.875rem;
          cursor: pointer;
          transition: color 0.2s ease;
          padding: 0;
          font-family: inherit;
        }

        .footer-link-btn:hover {
          color: var(--brand-400, #34d399);
        }

        .footer-link {
          color: #6b7280;
          font-size: 0.875rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: var(--brand-400, #34d399);
        }

        .footer-bottom {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
          color: #6b7280;
          font-size: 0.625rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-top: 1px solid rgba(107, 114, 128, 0.2);
          padding-top: 2rem;
        }

        .hover-trigger {
          transition: all 0.2s ease;
        }

        /* Tablet and Desktop */
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 3rem;
          }
          
          .col-span-2 {
            grid-column: span 2;
          }
        }
      `}</style>

      <footer className="footer-glass-panel">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Logo and Description - spans 2 columns on desktop */}
            <div className="col-span-2">
              <div className="footer-logo">
                YUNI<span>.</span>
              </div>
              <p className="footer-description">
                Redefining tech education from the heart of NASTP.
              </p>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="footer-heading">Links</h4>
              <ul className="footer-links">
                <li>
                  <button 
                    onClick={() => handleNavigate('home')} 
                    className="footer-link-btn hover-trigger"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('trainings')} 
                    className="footer-link-btn hover-trigger"
                  >
                    Trainings
                  </button>
                </li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link hover-trigger">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link hover-trigger">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 YUNI Pakistan. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;