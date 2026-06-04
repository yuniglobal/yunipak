import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Award, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="popup-overlay">
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(12px);
          z-index: 5000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.5s ease;
        }

        .popup-card {
          width: 100%;
          max-width: 850px;
          background: var(--bg-primary);
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          padding: 3rem 2.5rem 2.5rem 2.5rem;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .popup-card::before {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: linear-gradient(135deg, var(--pk-green), transparent, var(--pk-green-light));
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
          color: var(--text-secondary);
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

        .popup-split-container {
          display: flex;
          gap: 3rem;
          margin-bottom: 2rem;
        }

        .popup-column {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
        }

        .popup-column:first-child::after {
          content: '';
          position: absolute;
          right: -1.5rem;
          top: 5%;
          bottom: 5%;
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .column-content {
          text-align: left;
        }

        .popup-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 230, 118, 0.08);
          color: var(--pk-green);
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 1.2rem;
          border: 1px solid rgba(0, 230, 118, 0.15);
        }

        .popup-badge.blue-badge {
          background: rgba(0, 145, 234, 0.08);
          color: #0091ea;
          border-color: rgba(0, 145, 234, 0.15);
        }

        .badge-pulse {
          width: 6px;
          height: 6px;
          background: currentColor;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
          animation: pulse 1.5s infinite;
        }

        .column-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.2;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .column-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          min-height: 70px;
        }

        .highlights-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-bottom: 2rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .highlight-item svg {
          flex-shrink: 0;
        }

        .column-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--pk-green) 0%, var(--pk-green-light) 100%);
          color: #000;
          border: none;
          padding: 1.1rem;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 10px 20px rgba(0, 230, 118, 0.15);
        }

        .column-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 25px rgba(0, 230, 118, 0.25);
        }

        .column-btn.blue-btn {
          background: linear-gradient(135deg, #0091ea 0%, #00b0ff 100%);
          color: #fff;
          box-shadow: 0 10px 20px rgba(0, 145, 234, 0.15);
        }

        .column-btn.blue-btn:hover {
          box-shadow: 0 15px 25px rgba(0, 145, 234, 0.25);
        }

        .popup-footer-text {
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-tertiary);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 1.2rem;
          margin-top: 1rem;
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
            padding: 3rem 1.5rem 1.5rem 1.5rem;
            max-height: 90vh;
            overflow-y: auto;
          }
          .popup-close-btn {
            top: 0.6rem;
            right: 0.6rem;
            width: 42px;
            height: 42px;
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.15);
            position: sticky;
            float: right;
            margin-top: -2.5rem;
            margin-right: -0.5rem;
            margin-bottom: -1rem;
          }
          .popup-close-btn:hover {
            background: rgba(255, 255, 255, 0.25);
          }
          .popup-split-container {
            flex-direction: column;
            gap: 2.5rem;
          }
          .popup-column:first-child::after {
            display: none;
          }
          .column-content {
            text-align: center;
          }
          .popup-badge {
            margin-bottom: 1rem;
          }
          .column-title {
            font-size: 1.6rem;
          }
          .column-desc {
            min-height: auto;
            font-size: 0.85rem;
          }
          .highlights-list {
            align-items: center;
            margin-bottom: 1.5rem;
          }
        }

        @media (max-width: 420px) {
          .popup-card {
            padding: 2.5rem 1rem 1.2rem 1rem;
            border-radius: 20px;
            max-height: 88vh;
          }
          .popup-close-btn {
            width: 38px;
            height: 38px;
          }
          .column-title {
            font-size: 1.3rem;
          }
          .column-desc {
            font-size: 0.8rem;
          }
          .highlight-item {
            font-size: 0.78rem;
          }
          .column-btn {
            padding: 0.9rem;
            font-size: 0.82rem;
            border-radius: 12px;
          }
          .popup-footer-text {
            font-size: 0.72rem;
          }
        }
      `}</style>

      <div className="popup-card">
        <button className="popup-close-btn" onClick={handleDismiss} title="Dismiss">
          <X size={20} />
        </button>

        <div className="popup-split-container">
          {/* Column 1: Summer Camp 2026 */}
          <div className="popup-column">
            <div className="column-content">
              <div className="popup-badge">
                <div className="badge-pulse"></div>
                ☀️ Summer Camp 2026
              </div>
              <h3 className="column-title">Accelerate Your Skills</h3>
              <p className="column-desc">
                Join our premium IT & soft skills programs. 7 specialized tracks designed for career growth and hands-on learning at NASTP.
              </p>
              <div className="highlights-list">
                <div className="highlight-item">
                  <Sparkles size={18} color="var(--pk-green)" />
                  <span>7 Specialized Tracks & Certifications</span>
                </div>
                <div className="highlight-item">
                  <ShieldCheck size={18} color="var(--pk-green)" />
                  <span>PSEB Certified Industry Programs</span>
                </div>
                <div className="highlight-item">
                  <Award size={18} color="var(--pk-green)" />
                  <span>Interactive Real-World Projects</span>
                </div>
              </div>
            </div>
            <button className="column-btn" onClick={() => handleAction('/Programs')}>
              Register Now <ArrowRight size={18} />
            </button>
          </div>

          {/* Column 2: Event Certificates */}
          <div className="popup-column">
            <div className="column-content">
              <div className="popup-badge blue-badge">
                <div className="badge-pulse"></div>
                🎓 YUNI-TY Event
              </div>
              <h3 className="column-title">Download Certificates</h3>
              <p className="column-desc">
                Digital credentials and completion certificates are active for all YUNI-TY 2026 attendees. Verify and save your files.
              </p>
              <div className="highlights-list">
                <div className="highlight-item">
                  <GraduationCap size={18} color="#0091ea" />
                  <span>Official Attendance Verification</span>
                </div>
                <div className="highlight-item">
                  <ShieldCheck size={18} color="#0091ea" />
                  <span>Secure QR-Coded Digital PDF</span>
                </div>
                <div className="highlight-item">
                  <Award size={18} color="#0091ea" />
                  <span>Instant Reference ID Search</span>
                </div>
              </div>
            </div>
            <button className="column-btn blue-btn" onClick={() => handleAction('/certificates')}>
              Get Certificate <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="popup-footer-text">
          Empowering the Youth through Modern Skills & Tech Education at NASTP Rawalpindi
        </div>
      </div>
    </div>
  );
};

export default SummerPromoPopup;
