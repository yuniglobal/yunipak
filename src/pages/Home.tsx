

import { useRef } from 'react';
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

  const team = [
    {
      name: 'Abdul Moiz',
      role: 'Founder',
      image: '/images/moiz.jpeg',
      desc: 'Driving the macro-vision of YUNI to build an unparalleled educational empire.'
    }
  ];

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
      `}</style>

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
          {team.map((member, i) => (
            <div key={i} className="mesh-card">
              <img src={member.image} alt={member.name} className="team-image" />
              <div className="team-role">{member.role}</div>
              <div className="team-name">{member.name}</div>
              <p className="team-desc" style={{ color: 'var(--text-secondary)' }}>{member.desc}</p>
            </div>
          ))}
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