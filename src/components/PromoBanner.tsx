import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PromoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem('promo-banner-dismissed');
    if (isDismissed) {
      setIsVisible(false);
      document.documentElement.style.setProperty('--banner-height', '0px');
    } else {
      document.documentElement.style.setProperty('--banner-height', '40px');
    }

    return () => {
      document.documentElement.style.setProperty('--banner-height', '0px');
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('promo-banner-dismissed', 'true');
    document.documentElement.style.setProperty('--banner-height', '0px');
  };

  if (!isVisible) return null;

  return (
    <div className="promo-banner-wrapper">
      <style>{`
        .promo-banner-wrapper {
          position: sticky;
          top: 0;
          width: 100%;
          height: 40px;
          background: linear-gradient(90deg, var(--pk-green) 0%, var(--pk-green-light) 100%);
          z-index: 3000;
          display: flex;
          align-items: center;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 230, 118, 0.2);
        }

        .marquee-content {
          display: flex;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }

        .marquee-item {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          color: #000;
          padding: 0 2rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .separator {
          opacity: 0.5;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .close-promo {
          position: absolute;
          right: 10px;
          background: rgba(0, 0, 0, 0.1);
          border: none;
          color: #000;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .close-promo:hover {
          background: rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .promo-banner-wrapper {
            height: 35px;
          }
          .marquee-item {
            font-size: 0.75rem;
            padding: 0 1rem;
          }
        }
      `}</style>

      <div className="marquee-content">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="marquee-item">
            <span>☀️ Summer Trainings 2026</span>
            <span className="separator">|</span>
            <span style={{ color: '#000', fontWeight: 900 }}>30% OFF ALL TRAININGS</span>
            <span className="separator">|</span>
            <span>Registrations Open</span>
            <span className="separator">|</span>
            <span>PSEB Certified</span>
            <span className="separator">|</span>
            <span>Located at NASTP</span>
            <span className="separator">|</span>
            <span style={{ textDecoration: 'underline' }}>Enroll Now →</span>
          </div>
        ))}
      </div>

      <button className="close-promo" onClick={handleDismiss} title="Close">
        <X size={16} />
      </button>
    </div>
  );
};

export default PromoBanner;
