export default function Footer() {
  return (
    <>
      <style>{`
        /* Import modern font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap');

        .footer {
          position: relative;
          z-index: 20;
          background: linear-gradient(145deg, #0a0a0a 0%, #0f0f0f 100%);
          border-top: 1px solid rgba(153, 213, 162, 0.15);
          overflow: hidden;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif;
        }

        /* Animated dot pattern overlay - enhanced */
        .footer::before {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(
            circle at center,
            rgba(153, 213, 162, 0.25) 1.5px,
            transparent 1.5px
          );
          background-size: 32px 32px;
          background-repeat: repeat;
          animation: floatDots 24s linear infinite;
          z-index: 0;
          opacity: 0.6;
        }

        @keyframes floatDots {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 64px 64px;
          }
        }

        /* Subtle glow overlay on top */
        .footer::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(153, 213, 162, 0.4), transparent);
          z-index: 0;
        }

        /* Ensure all content sits above pseudo-elements */
        .footer-container {
          position: relative;
          z-index: 2;
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 2rem 2.5rem;
        }

        /* Responsive container padding */
        @media (max-width: 768px) {
          .footer-container {
            padding: 3rem 1.5rem 2rem;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 2.5rem 1.25rem 1.75rem;
          }
        }

        /* Grid layout - modern spacing */
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }

        /* Section styling */
        .footer-section h3 {
          font-size: 1.125rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #e5e7eb;
          margin-bottom: 1.25rem;
          position: relative;
          display: inline-block;
        }

        .footer-section h3::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 2rem;
          height: 2px;
          background: #99d5a2;
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .footer-section:hover h3::after {
          width: 3rem;
        }

        .footer-section p {
          color: #9ca3af;
          font-size: 0.875rem;
          line-height: 1.6;
          margin-top: 0.5rem;
        }

        /* Links styling */
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-links a,
        .footer-links p {
          color: #9ca3af;
          font-size: 0.875rem;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-links a:hover {
          color: #99d5a2;
          transform: translateX(4px);
        }

        /* Contact items with icons */
        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.875rem;
        }

        .contact-icon {
          color: #99d5a2;
          font-size: 1rem;
          min-width: 1.25rem;
        }

        /* Social row - modern */
        .footer-social {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(153, 213, 162, 0.1);
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          background: rgba(153, 213, 162, 0.08);
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
          color: #9ca3af;
        }

        .social-link:hover {
          background: #99d5a2;
          color: #0a0a0a;
          transform: translateY(-3px);
        }

        .social-link svg {
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.2s;
        }

        .social-link:hover svg {
          transform: scale(1.05);
        }

        /* Divider and bottom section */
        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          align-items: center;
          justify-content: space-between;
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            text-align: left;
          }
        }

        .footer-text {
          color: #6b7280;
          font-size: 0.75rem;
          letter-spacing: 0.01em;
        }

        .footer-legal {
          display: flex;
          gap: 1.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-legal a {
          color: #6b7280;
          font-size: 0.75rem;
          text-decoration: none;
          transition: color 0.25s ease;
          position: relative;
        }

        .footer-legal a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #99d5a2;
          transition: width 0.25s ease;
        }

        .footer-legal a:hover {
          color: #99d5a2;
        }

        .footer-legal a:hover::after {
          width: 100%;
        }

        /* Smooth hover for all interactive */
        a, button {
          cursor: pointer;
        }

        /* Focus styles for accessibility */
        .footer-links a:focus-visible,
        .social-link:focus-visible,
        .footer-legal a:focus-visible {
          outline: 2px solid #99d5a2;
          outline-offset: 4px;
          border-radius: 4px;
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .footer::before {
            animation: none;
          }
          .footer-links a,
          .social-link,
          .footer-section h3::after {
            transition: none;
          }
          .footer-links a:hover {
            transform: none;
          }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-section">
              <h3>NASTP</h3>
              <p>
                Pakistan's premier technology ecosystem fostering innovation,
                entrepreneurship, and technical excellence for the digital age.
              </p>
            </div>

            {/* Company Links */}
            <div className="footer-section">
              <h3>Company</h3>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#team">Leadership</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#blog">Insights</a></li>
              </ul>
            </div>

            {/* Services Links */}
            <div className="footer-section">
              <h3>Services</h3>
              <ul className="footer-links">
                <li><a href="#dev">Development</a></li>
                <li><a href="#consulting">Tech Consulting</a></li>
                <li><a href="#security">Cybersecurity</a></li>
                <li><a href="#support">Incubation</a></li>
              </ul>
            </div>

            {/* Contact Info with Icons */}
            <div className="footer-section">
              <h3>Connect</h3>
              <ul className="footer-links">
                <li className="contact-item">
                  <a href="mailto:info@nastp.gov.pk">info@nastp.gov.pk</a>
                </li>
                <li className="contact-item">
                  <p>Islamabad, Pakistan</p>
                </li>
                <li className="contact-item">
                  <a href="tel:+92511234567">+92 51 123 4567</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.3 9 4.5 0-1 .2-3.5 2-5 1.8-1.5 4.5-1 5.5 1 .7-.2 1.4-.5 2-.9 0 1-1 2-2 2 1 .2 2-.5 2-1.6z" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Bottom Section */}
          <div className="footer-bottom">
            <p className="footer-text">
              © {new Date().getFullYear()} NASTP. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}