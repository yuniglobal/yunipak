import React, { useState, useEffect } from 'react';
import { X, GraduationCap, MapPin, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SummerPromoPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // const isDismissed = sessionStorage.getItem('promo-popup-dismissed');
    // if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    // }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo-popup-dismissed', 'true');
  };

  const handleAction = () => {
    handleDismiss();
    navigate('/events?register=summit');
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.5s ease;
        }

        .popup-card {
          width: 100%;
          max-width: 450px;
          background: var(--bg-primary);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          padding: 2.5rem 2rem;
          text-align: center;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .popup-card::before {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(135deg, var(--pk-green), transparent, var(--pk-green-light));
          z-index: -1;
          border-radius: 26px;
          opacity: 0.3;
        }

        .badge-open {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 230, 118, 0.1);
          color: var(--pk-green);
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(0, 230, 118, 0.2);
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: var(--pk-green);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--pk-green);
          animation: pulse 1.5s infinite;
        }

        .popup-title {
          font-size: 2.2rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          line-height: 1.1;
          background: linear-gradient(to bottom, #fff, #aaa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .discount-badge {
          display: inline-block;
          background: var(--pk-green);
          color: #000;
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          font-weight: 900;
          font-size: 1.2rem;
          margin: 1rem 0;
          box-shadow: 0 10px 20px rgba(0, 230, 118, 0.3);
        }

        .discount-badge span {
          font-size: 0.8rem;
          opacity: 0.8;
          font-weight: 700;
          margin-left: 0.5rem;
        }

        .popup-desc {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.8rem;
          margin-bottom: 2rem;
        }

        .feature-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1rem 0.5rem;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .feature-box:hover {
          background: rgba(0, 230, 118, 0.05);
          border-color: rgba(0, 230, 118, 0.2);
          transform: translateY(-5px);
        }

        .feature-box span {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .feature-box strong {
          font-size: 0.8rem;
          color: var(--text-primary);
        }

        .btn-register {
          width: 100%;
          background: linear-gradient(135deg, var(--pk-green) 0%, var(--pk-green-light) 100%);
          color: #000;
          border: none;
          padding: 1.2rem;
          border-radius: 16px;
          font-weight: 900;
          font-size: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 15px 30px rgba(0, 230, 118, 0.2);
        }

        .btn-register:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 230, 118, 0.3);
        }

        .popup-footer {
          margin-top: 1.5rem;
          font-size: 0.75rem;
          color: var(--text-tertiary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .footer-dot {
          width: 6px;
          height: 6px;
          background: #ff5252;
          border-radius: 50%;
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }

        @media (max-width: 480px) {
          .popup-card {
            padding: 2rem 1.5rem;
          }
          .popup-title {
            font-size: 1.8rem;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .feature-box {
            flex-direction: row;
            justify-content: center;
            padding: 0.8rem;
          }
        }
      `}</style>

      <div className="popup-card">
        <button className="close-btn" onClick={handleDismiss}>
          <X size={20} />
        </button>

        <div className="badge-open">
          <div className="badge-dot"></div>
          Registrations Open
        </div>

        <h2 className="popup-title">Future-Ready Summit ✨</h2>
        
        <div className="discount-badge">
          RS. 500 <span>Only for Professionals & Parents</span>
        </div>

        <p className="popup-desc">
          Empowering Professionals, Inspiring Educators, and Guiding Families. 
          Join us for a high-impact weekend at NICAT, Rawalpindi. 
          Tech Innovation, AI, & Career Strategy.
        </p>

        <div className="features-grid">
          <div className="feature-box">
            <GraduationCap size={20} color="var(--pk-green)" />
            <span>Agenda</span>
            <strong>Day 1: Tech</strong>
          </div>
          <div className="feature-box">
            <MapPin size={20} color="var(--pk-green)" />
            <span>Venue</span>
            <strong>NICAT</strong>
          </div>
          <div className="feature-box">
            <Award size={20} color="var(--pk-green)" />
            <span>Agenda</span>
            <strong>Day 2: Skills</strong>
          </div>
        </div>

        <button className="btn-register" onClick={handleAction}>
          Register Now <ArrowRight size={20} />
        </button>

        <div className="popup-footer">
          <div className="footer-dot"></div>
          Only 80 seats per session — Register now to secure yours
        </div>
      </div>
    </div>
  );
};

export default SummerPromoPopup;
