import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles, ShieldCheck, Award, Users, User, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InstagramIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

const SummerPromoPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after 1.5 seconds if not dismissed during current session
    const isDismissed = sessionStorage.getItem('promo-popup-dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    if (isVisible) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo-popup-dismissed', 'true');
  };

  const handleAction = (path: string) => {
    handleDismiss();
    navigate(path);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay" onClick={(e) => { if (e.target === e.currentTarget) handleDismiss(); }}>
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(2, 6, 4, 0.85);
          backdrop-filter: blur(12px);
          z-index: 5000;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 2rem 1.5rem;
          overflow-y: auto;
          animation: fadeIn 0.5s ease;
        }

        .popup-card {
          width: 100%;
          max-width: 850px;
          margin: auto;
          background: var(--bg-primary, #020604);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          padding: 3rem 2.5rem 2.5rem 2.5rem;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .popup-card::before {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(135deg, var(--pk-green, #0c6238), transparent, var(--pk-green-light, #d4af37));
          z-index: -1;
          border-radius: 30px;
          opacity: 0.3;
        }

        .popup-close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-secondary, #94a3b8);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .popup-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
          transform: rotate(90deg);
        }

        .popup-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .popup-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(12, 98, 56, 0.08);
          color: var(--pk-green, #0c6238);
          padding: 0.4rem 1.2rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1rem;
          border: 1px solid rgba(12, 98, 56, 0.15);
        }

        .popup-badge.gold-badge {
          background: rgba(212, 175, 55, 0.08);
          color: var(--pk-green-light, #d4af37);
          border-color: rgba(212, 175, 55, 0.15);
        }

        .badge-pulse {
          width: 6px;
          height: 6px;
          background: currentColor;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
          animation: pulse 1.5s infinite;
        }

        .popup-title {
          font-family: 'Outfit', sans-serif;
          font-size: 2.2rem;
          font-weight: 900;
          line-height: 1.2;
          color: var(--text-primary, #e2e8f0);
          margin-bottom: 0.5rem;
        }

        .popup-title span {
          background: linear-gradient(135deg, var(--pk-green, #0c6238) 0%, var(--pk-green-light, #d4af37) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .popup-desc {
          color: var(--text-secondary, #94a3b8);
          font-size: 0.95rem;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        .popup-split-container {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .popup-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          padding: 2rem;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .popup-column:hover {
          transform: translateY(-4px);
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(212, 175, 55, 0.15);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .column-content {
          text-align: left;
          display: flex;
          flex-direction: column;
          height: 100%;
          margin-bottom: 1.5rem;
        }

        .column-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .column-icon-wrap {
          background: rgba(12, 98, 56, 0.1);
          border: 1px solid rgba(12, 98, 56, 0.2);
          border-radius: 12px;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--pk-green, #0c6238);
        }

        .popup-column:last-child .column-icon-wrap {
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.2);
          color: var(--pk-green-light, #d4af37);
        }

        .column-title {
          font-family: 'Outfit', sans-serif;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary, #e2e8f0);
          margin: 0;
        }

        .column-desc {
          color: var(--text-secondary, #94a3b8);
          font-size: 0.88rem;
          line-height: 1.5;
          margin-bottom: 1.25rem;
          min-height: 48px;
        }

        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-primary, #e2e8f0);
        }

        .highlight-item svg {
          flex-shrink: 0;
          color: var(--pk-green, #0c6238);
        }

        .popup-column:last-child .highlight-item svg {
          color: var(--pk-green-light, #d4af37);
        }

        .column-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--pk-green, #0c6238) 0%, rgba(12, 98, 56, 0.8) 100%);
          color: #fff;
          border: none;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 8px 20px rgba(12, 98, 56, 0.15);
          margin-top: auto;
        }

        .popup-column:last-child .column-btn {
          background: linear-gradient(135deg, var(--pk-green-light, #d4af37) 0%, rgba(212, 175, 55, 0.8) 100%);
          color: #000;
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.15);
        }

        .column-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(12, 98, 56, 0.3);
        }

        .popup-column:last-child .column-btn:hover {
          box-shadow: 0 12px 24px rgba(212, 175, 55, 0.3);
        }

        /* Footer contact styles */
        .popup-footer {
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding-top: 1.25rem;
          margin-top: 1rem;
          text-align: center;
        }

        .popup-footer-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-tertiary, #64748b);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .popup-contact-links {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .contact-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary, #94a3b8);
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          transition: all 0.2s ease;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .contact-link:hover {
          color: var(--pk-green-light, #d4af37);
          background: rgba(255, 255, 255, 0.03);
          transform: translateY(-1px);
        }

        .contact-link.wa:hover {
          color: #25d366;
        }

        .contact-link.ig:hover {
          color: #e1306c;
        }

        .contact-link.mail:hover {
          color: #ea4335;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 768px) {
          .popup-card {
            max-width: 500px;
            padding: 2.5rem 1.5rem 1.5rem 1.5rem;
          }
          .popup-close-btn {
            top: 1rem;
            right: 1rem;
            width: 36px;
            height: 36px;
          }
          .popup-title {
            font-size: 1.8rem;
          }
          .popup-desc {
            font-size: 0.88rem;
          }
          .popup-split-container {
            flex-direction: column;
            gap: 1.25rem;
          }
          .popup-column {
            padding: 1.5rem;
          }
          .column-desc {
            min-height: auto;
          }
          .popup-contact-links {
            gap: 1rem;
          }
        }

        @media (max-width: 420px) {
          .popup-card {
            padding: 2rem 1rem 1.2rem 1rem;
            border-radius: 20px;
          }
          .popup-title {
            font-size: 1.5rem;
          }
          .popup-desc {
            font-size: 0.8rem;
          }
          .column-title {
            font-size: 1.2rem;
          }
          .column-desc {
            font-size: 0.8rem;
          }
          .highlight-item {
            font-size: 0.78rem;
          }
          .column-btn {
            padding: 0.85rem;
            font-size: 0.8rem;
          }
          .popup-contact-links {
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;
          }
        }
      `}</style>

      <div className="popup-card">
        <button className="popup-close-btn" onClick={handleDismiss} title="Dismiss">
          <X size={20} />
        </button>

        <div className="popup-header">
          <div className="popup-badge">
            <div className="badge-pulse"></div>
            Registrations Live!
          </div>
          <h2 className="popup-title">Welcome to <span>YUNI-TY 2026</span></h2>
          <p className="popup-desc">
            Pakistan's premier youth and technology summit at NASTP Rawalpindi. Choose your track below to register and secure your spot today!
          </p>
        </div>

        <div className="popup-split-container">
          {/* Column 1: Individual Delegate */}
          <div className="popup-column">
            <div className="column-content">
              <div className="column-header">
                <div className="column-icon-wrap">
                  <User size={22} />
                </div>
                <h3 className="column-title">Individual Registration</h3>
              </div>
              <p className="column-desc">
                Register as an individual to participate in certified tech courses, skill workshops, and network with experts.
              </p>
              <div className="highlights-list">
                <div className="highlight-item">
                  <Sparkles size={16} />
                  <span>Certified Workshops & Tracks</span>
                </div>
                <div className="highlight-item">
                  <ShieldCheck size={16} />
                  <span>Official Certificate Ref IDs</span>
                </div>
                <div className="highlight-item">
                  <Award size={16} />
                  <span>Keynote Panel Sessions</span>
                </div>
              </div>
            </div>
            <button className="column-btn" onClick={() => handleAction('/registration-individual')}>
              Register Individually <ArrowRight size={16} />
            </button>
          </div>

          {/* Column 2: Event Team */}
          <div className="popup-column">
            <div className="column-content">
              <div className="column-header">
                <div className="column-icon-wrap">
                  <Users size={22} />
                </div>
                <h3 className="column-title">Team Application</h3>
              </div>
              <p className="column-desc">
                Register your team to participate in collaborative competitions, startup pitches, and innovation exhibitions.
              </p>
              <div className="highlights-list">
                <div className="highlight-item">
                  <Sparkles size={16} />
                  <span>Showcase Team Innovations</span>
                </div>
                <div className="highlight-item">
                  <ShieldCheck size={16} />
                  <span>Compete in Hackathons</span>
                </div>
                <div className="highlight-item">
                  <Award size={16} />
                  <span>Win Dynamic Awards</span>
                </div>
              </div>
            </div>
            <button className="column-btn" onClick={() => handleAction('/registration-team')}>
              Register Your Team <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="popup-footer">
          <div className="popup-footer-title">Need help with registration? Contact us</div>
          <div className="popup-contact-links">
            <a href="https://wa.me/923215615401" target="_blank" rel="noopener noreferrer" className="contact-link wa">
              <Phone size={14} /> <span>+92 321 5615401</span>
            </a>
            <a href="https://instagram.com/yunity.pk" target="_blank" rel="noopener noreferrer" className="contact-link ig">
              <InstagramIcon size={14} /> <span>@yunity.pk</span>
            </a>
            <a href="mailto:info@yunipakistan.com" className="contact-link mail">
              <Mail size={14} /> <span>info@yunipakistan.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummerPromoPopup;
