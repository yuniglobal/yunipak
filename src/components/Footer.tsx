// src/components/Footer.tsx
import { useNavigate } from 'react-router-dom';


const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const footerLinks = [
    { title: 'Nexus', links: [
      { name: 'Trainings', path: '/Programs' },
      { name: 'Events', path: '/events' },
      { name: 'Careers', path: '/careers' },
      { name: 'About', path: '/Aboutus' }
    ]},
    { title: 'Support', links: [
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy', path: '/privacy' },
      { name: 'Terms', path: '/terms' }
    ]}
  ];

  return (
    <footer className="footer-tech">
      <style>{`
        .footer-tech {
          background: var(--bg-primary);
          position: relative;
          z-index: 100;
          overflow: hidden;
          padding-top: 5rem;
        }

        /* Subtle glowing top border */
        .footer-tech::before {
          content: '';
          position: absolute;
          top: 0;
          left: 5%;
          right: 5%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent);
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .footer-main {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
        }

        @media (min-width: 1024px) {
          .footer-main {
            flex-direction: row;
          }
        }

        .footer-brand {
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .footer-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900;
          font-size: 2.2rem;
          color: var(--text-primary);
          letter-spacing: -0.05em;
        }

        .footer-logo span {
          color: var(--pk-green);
        }

        .footer-desc {
          color: var(--text-secondary);
          font-size: 1rem;
          line-height: 1.7;
        }

        .footer-links-container {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
        }

        .footer-link-group {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-heading {
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.05rem;
          letter-spacing: 0.05em;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-link {
          color: var(--text-tertiary);
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
        }

        .footer-link:hover {
          color: var(--pk-green);
          transform: translateX(5px);
        }

        .footer-divider {
          height: 1px;
          background: var(--glass-border);
          width: 100%;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
          }
        }

        .footer-copyright {
          color: var(--text-tertiary);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        .footer-built {
          color: var(--pk-green);
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .social-row {
          display: flex;
          gap: 1rem;
        }

        .social-icon {
          color: var(--text-tertiary);
          transition: all 0.3s ease;
          cursor: pointer;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-icon:hover {
          color: var(--pk-green);
          background: rgba(16, 185, 129, 0.05);
          border-color: rgba(16, 185, 129, 0.3);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.15);
        }

        .footer-legal {
          display: flex;
          gap: 2rem;
          color: var(--text-tertiary);
          font-size: 0.85rem;
        }

        .footer-legal span {
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .footer-legal span:hover {
          color: var(--pk-green);
        }
      `}</style>

      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/images/logo2.png" alt="YUNI" style={{height: '50px', width: 'auto'}} />
            </div>
            <p className="footer-desc">
              The technical benchmark of Pakistan. Based at NASTP, 
              we are architecting the next generation of engineers, 
              creators, and digital sovereign leaders.
            </p>
          </div>

          <div className="footer-links-container">
            {footerLinks.map((col, i) => (
              <div key={i} className="footer-link-group">
                <h4 className="footer-heading">{col.title}</h4>
                <div className="footer-links">
                  {col.links.map((link, j) => (
                    <div 
                      key={j} 
                      className="footer-link"
                      onClick={() => navigate(link.path)}
                    >
                      {link.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            © {year} YUNI PAKISTAN COLLECTIVE
            <div className="footer-built" style={{ marginTop: '0.5rem' }}>BUILT AT NASTP ISLAMABAD</div>
          </div>
          
          <div className="social-row">
            <div className="social-icon"><LinkedInIcon /></div>
            <div className="social-icon"><XIcon /></div>
            <div className="social-icon"><FacebookIcon /></div>
            <div className="social-icon"><InstagramIcon /></div>
          </div>

          <div className="footer-legal">
            <span onClick={() => navigate('/privacy')}>Privacy Policy</span>
            <span onClick={() => navigate('/terms')}>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;