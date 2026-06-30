import { useState, useEffect } from "react";
import Trainings from "../components/Courses/trainings";
import SummerCamp from "../components/Courses/summercamp";
import { BookOpen, Tent } from "lucide-react";

export default function TrainingsPage() {
  const [activeTab, setActiveTab] = useState<'professional' | 'summercamp'>('professional');

  // Refresh GSAP ScrollTrigger on tab change
  useEffect(() => {
    const ScrollTrigger = (window as any).ScrollTrigger;
    if (ScrollTrigger) {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [activeTab]);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative' }}>
      {/* Tabs Container */}
      <div 
        className="trainings-tabs-container" 
        style={{
          padding: '8rem 1.5rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          position: 'relative',
          zIndex: 50
        }}
      >
        <button 
          onClick={() => setActiveTab('professional')}
          className={`tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            background: activeTab === 'professional' ? 'var(--pk-green)' : 'rgba(255, 255, 255, 0.03)',
            color: activeTab === 'professional' ? '#fff' : 'var(--text-secondary)',
            border: `1px solid ${activeTab === 'professional' ? 'var(--pk-green)' : 'var(--border-light)'}`,
            borderRadius: '100px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'professional' ? '0 10px 20px -10px var(--pk-green)' : 'none'
          }}
        >
          <BookOpen size={20} />
          <span>Professional Trainings</span>
        </button>
        <button 
          onClick={() => setActiveTab('summercamp')}
          className={`tab-btn ${activeTab === 'summercamp' ? 'active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            background: activeTab === 'summercamp' ? 'var(--pk-green)' : 'rgba(255, 255, 255, 0.03)',
            color: activeTab === 'summercamp' ? '#fff' : 'var(--text-secondary)',
            border: `1px solid ${activeTab === 'summercamp' ? 'var(--pk-green)' : 'var(--border-light)'}`,
            borderRadius: '100px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: activeTab === 'summercamp' ? '0 10px 20px -10px var(--pk-green)' : 'none'
          }}
        >
          <Tent size={20} />
          <span>Summer Camp 2026 (Closed)</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="tab-content-wrapper">
        {activeTab === 'professional' && <Trainings />}
        {activeTab === 'summercamp' && <SummerCamp />}
      </div>

      <style>{`
        .tab-btn:hover:not(.active) {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #fff !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }

        /* Adjust top padding of the child components so it looks seamless with tabs */
        .tab-content-wrapper .trainings-view,
        .tab-content-wrapper .detail-view,
        .tab-content-wrapper .checkout-view {
          padding-top: 1rem !important;
        }

        @media (max-width: 768px) {
          .trainings-tabs-container {
            flex-direction: column;
            padding-top: 6rem !important;
            padding-bottom: 1rem !important;
          }
          .tab-btn {
            width: 100%;
            justify-content: center;
          }
          .tab-content-wrapper .trainings-view,
          .tab-content-wrapper .detail-view,
          .tab-content-wrapper .checkout-view {
            padding-top: 1rem !important;
          }
        }
      `}</style>
    </main>
  );
}
