

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/HOME/Hero';
import FeaturesReveal from '../components/HOME/FeaturesReveal';
import NationalAnalysis from '../components/HOME/NationalAnalysis';
import CTA from '../components/HOME/CTA';
import TextEffect from '../components/HOME/TextEffect';
import AnimatedTitle from '../components/AnimatedTitle';
import GalleryComponent from '../components/Gallery/Gallery';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const teamRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [showBanner, setShowBanner] = useState(true);



  const testimonials = [
    { name: 'Ahmed R.', course: 'Cybersecurity', text: 'The program at NASTP completely changed my trajectory. Landed a job immediately.', letter: 'A' },
    { name: 'Fatima S.', course: 'Amazon Mastery', text: 'The YUNI ecosystem is incredible. We launched a real product during our professional training.', letter: 'F' },
    { name: 'Usman K.', course: 'Prompt Engineering', text: 'The YUNI LMS is smoother than my university. The gamification kept me hooked.', letter: 'U' }
  ];

  return (
    <div className="home-container">
      <style>{`
        .home-container {
          background-color: transparent;
          transition: background-color 0.4s ease;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 8rem 1.5rem;
        }

        .stat-label {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          color: var(--text-tertiary);
        }

        /* Team Design */
        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .team-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .team-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 1.5rem;
          margin-bottom: 2rem;
          filter: grayscale(100%);
          transition: filter 0.5s ease;
        }

        .mesh-card:hover .team-image {
          filter: grayscale(0%);
        }

        .team-role {
          color: var(--pk-green);
          font-weight: 800;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
        }

        .team-name {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
        }

        .mesh-card.small-team-card:hover .small-team-image {
          filter: grayscale(0%);
        }

        /* Testimonials Design */
        .testimonial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 1024px) {
          .testimonial-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .testimonial-card {
          padding: 3rem;
          background: var(--bg-tertiary);
          border-radius: var(--card-radius);
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border: 1px solid transparent;
          transition: all 0.4s ease;
        }

        .testimonial-card:hover {
          background: var(--bg-primary);
          border-color: var(--pk-green);
          transform: translateY(-5px);
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--pk-green);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
        }

        .quote {
          font-size: 1.1rem;
          font-style: italic;
          color: var(--text-secondary);
          line-height: 1.7;
        }

          .certificate-img {
            max-width: 50%;
          }
        }

        @media (max-width: 768px) {
          .section-container {
            padding: 5rem 1rem;
          }

          .testimonial-grid {
            grid-template-columns: 1fr;
          }

          .testimonial-card {
            padding: 1.5rem;
          }

          .team-image {
            height: 280px;
          }

          .team-name {
            font-size: 2rem;
          }
        }

        .apology-banner-premium {
          position: relative;
          background: rgba(255, 159, 10, 0.08);
          border: 1px solid rgba(255, 159, 10, 0.2);
          border-radius: 1.5rem;
          margin: 6.5rem auto 0;
          max-width: 1200px;
          padding: 1.25rem 2rem;
          backdrop-filter: blur(20px);
          overflow: hidden;
          z-index: 50;
          transition: all 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .apology-banner-glow {
          position: absolute;
          top: -50%;
          left: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 159, 10, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .apology-banner-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .apology-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 159, 10, 0.15);
          border: 1px solid rgba(255, 159, 10, 0.3);
          color: #ff9f0a;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          white-space: nowrap;
        }

        .apology-badge-dot {
          width: 8px;
          height: 8px;
          background: #ff9f0a;
          border-radius: 50%;
          box-shadow: 0 0 10px #ff9f0a;
          display: inline-block;
          animation: pulse-apology 2s infinite;
        }

        @keyframes pulse-apology {
          0% { opacity: 0.5; }
          50% { opacity: 1; }
          100% { opacity: 0.5; }
        }

        .apology-text {
          flex: 1;
          font-size: 0.95rem;
          color: #ffe0b2;
          line-height: 1.6;
          margin: 0;
        }

        .apology-text strong {
          color: #fff;
          font-weight: 700;
        }

        .apology-close-btn {
          background: rgba(255, 159, 10, 0.1);
          border: 1px solid rgba(255, 159, 10, 0.2);
          color: #ffe0b2;
          font-size: 1.5rem;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .apology-close-btn:hover {
          background: #ff9f0a;
          color: #000;
          border-color: #ff9f0a;
          transform: scale(1.1);
          box-shadow: 0 0 15px rgba(255, 159, 10, 0.4);
        }

        @media (max-width: 1240px) {
          .apology-banner-premium {
            margin-left: 1.5rem;
            margin-right: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .apology-banner-premium {
            margin: 5rem 1rem 0;
            padding: 1.25rem 1.5rem;
            border-radius: 1.2rem;
          }
          .apology-banner-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .apology-close-btn {
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 30px;
            font-size: 1.2rem;
          }
          .apology-text {
            padding-right: 2rem;
          }
        }
      `}</style>

      {showBanner && (
        <div className="apology-banner-premium">
          <div className="apology-banner-glow"></div>
          <div className="apology-banner-content">
            <div className="apology-badge">
              <span className="apology-badge-dot"></span>
              Event Rescheduled
            </div>
            <p className="apology-text">
              We sincerely apologize for the inconvenience: the grand YUNI event has been postponed to <strong>1-2 August 2026</strong>. All registrations remain fully secured and active. We look forward to seeing you there!
            </p>
            <button
              className="apology-close-btn"
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss banner"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <Hero />

      <GalleryComponent />

      <FeaturesReveal />

      <NationalAnalysis />

      {/* Collaborative Partners Grid */}
      <section className="section-container">
        <div className="section-header">
          <span className="section-subtitle-premium">Ecosystem Alignment</span>
          <h2 className="section-title">Ecosystem <span className="text-gradient">Partners</span></h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Partner: NASTP */}
          <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src="/images/nastp.png" alt="NASTP Logo" className="max-h-full max-w-[150px] object-contain" />
            </div>
            <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Strategic Partner</span>
          </div>

          {/* Partner: PSEB */}
          <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src="/images/pseb-certificate.png" alt="PSEB Registration Certificate" className="max-h-full max-w-[150px] object-contain" />
            </div>
            <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Official Provider</span>
          </div>

          {/* Partner 1: NICAT */}
          <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src="/images/nicat.png" alt="NICAT Logo" className="max-h-full max-w-[150px] object-contain" />
            </div>
            <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Aerospace Technology</span>
          </div>

          {/* Partner 2: Fazaia Bilquis College */}
          <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src="/images/fbc.png" alt="FBC Logo" className="max-h-full max-w-[150px] object-contain" />
            </div>
            <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Fazaia Bilquis College</span>
          </div>

          {/* Partner 3: Nerdflow */}
          <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src="/images/nerdflow.png" alt="Nerdflow Logo" className="max-h-full max-w-[150px] object-contain" />
            </div>
            <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Tech Infrastructure</span>
          </div>

          {/* Partner 4: Prosmetic Solutions */}
          <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src="/images/prosmetic.png" alt="Prosmetic Logo" className="max-h-full max-w-[150px] object-contain" />
            </div>
            <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Solutions Provider</span>
          </div>

          {/* Partner 5: Event Agency (Mahnoor) */}
          <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src="/images/eventagency.png" alt="Event Agency Logo" className="max-h-full max-w-[150px] object-contain" />
            </div>
            <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Management & Outreach</span>
          </div>

          {/* Partner 6: Pakistan Film Society */}
          <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
            <div className="h-16 flex items-center justify-center mb-3">
              <img src="/images/pfs.png" alt="PFS Logo" className="max-h-full max-w-[150px] object-contain" />
            </div>
            <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Pakistan Film Society</span>
          </div>
        </div>
      </section>

      <section className="section-container" ref={teamRef}>
        <AnimatedTitle className="section-title">The Core</AnimatedTitle>
        <div className="team-grid">
          {/* Left: Abdul Moiz */}
          <div className="mesh-card flex flex-col h-full">
            <img src="/images/moiz.jpeg" alt="Abdul Moiz" className="team-image flex-grow" style={{ minHeight: '300px' }} />
            <div className="team-role">Founder</div>
            <div className="team-name">Abdul Moiz</div>
            <p className="team-desc" style={{ color: 'var(--text-secondary)' }}>Driving the macro-vision of YUNI to build an unparalleled educational empire.</p>
          </div>

          {/* Right: 3 members */}
          <div className="flex flex-col gap-4 h-full">
            {[
              { name: 'Ahmed Malik', role: 'COO', image: '/images/ahmed.jpeg' },
              { name: 'Amna Adil', role: 'CMO', image: '/images/amna.jpeg' },
              { name: 'Hafsa', role: 'Head of YUNITY', image: '/images/hafsa.jpeg' },
            ].map((member, i) => (
              <div key={i} className="small-team-card mesh-card flex items-center gap-6 p-4 flex-1">
                <img src={member.image} alt={member.name} className="small-team-image w-24 h-24 rounded-full object-cover grayscale transition-all duration-500" />
                <div>
                  <div className="team-role mb-1">{member.role}</div>
                  <div className="team-name text-2xl mb-0">{member.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-container" ref={testimonialsRef}>
        <AnimatedTitle className="section-title">Voices of Success</AnimatedTitle>
        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p className="quote">"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="avatar">{t.letter}</div>
                <div>
                  <div style={{ fontWeight: 800 }}>{t.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{t.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div style={{ padding: '8rem 0' }}>
        <TextEffect />
      </div>

      <CTA />
    </div>
  );
}