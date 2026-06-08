// src/components/Aboutus/aboutus-sec.tsx
import React from 'react';
import { 
  BookOpen, 
  TrendingUp, 
  Globe, 
  Zap, 
  Users, 
  Cpu, 
  Layers, 
  Briefcase, 
  ShieldCheck
} from 'lucide-react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="about-page-wrapper">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap');

        :root {
          --pk-green-deep: #051d10;
          --pk-green-mid: #0b3720;
          --pk-green-bright: #118c4f;
          --pk-gold: #c5a059;
          --pk-gold-light: #e5c180;
          --glass-bg: rgba(11, 55, 32, 0.4);
          --glass-border: rgba(197, 160, 89, 0.2);
          --glass-border-hover: rgba(197, 160, 89, 0.45);
        }

        .about-page-wrapper {
          background-color: var(--pk-green-deep);
          color: #ffffff;
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
          padding-bottom: 5rem;
        }

        /* Ambient background glows */
        .ambient-glow {
          position: absolute;
          width: 50vw;
          height: 50vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(17, 140, 79, 0.15) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }
        .glow-1 { top: 10%; left: -10%; }
        .glow-2 { top: 40%; right: -10%; }
        .glow-3 { bottom: 10%; left: 20%; }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 8rem 2rem 4rem;
          position: relative;
          z-index: 2;
        }

        /* Hero Header styling */
        .about-hero {
          text-align: center;
          margin-bottom: 6rem;
          position: relative;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid var(--pk-gold);
          color: var(--pk-gold-light);
          padding: 0.6rem 1.8rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 2rem;
          box-shadow: 0 0 15px rgba(197, 160, 89, 0.15);
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #ffffff 30%, var(--pk-gold-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: clamp(1.1rem, 2.5vw, 1.6rem);
          color: var(--pk-green-bright);
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
        }
        .hero-description {
          max-width: 850px;
          margin: 0 auto;
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
        }

        /* Section Layout Common */
        .about-section {
          margin-bottom: 8rem;
        }
        .section-header {
          margin-bottom: 3.5rem;
          text-align: center;
        }
        .section-tag {
          color: var(--pk-gold);
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
          display: block;
        }
        .section-title-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #ffffff;
        }
        .section-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--pk-gold), transparent);
          margin: 1rem auto 0;
        }

        /* Glassmorphic Card system */
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        .glass-card:hover {
          transform: translateY(-5px);
          border-color: var(--glass-border-hover);
          box-shadow: 0 20px 40px rgba(197, 160, 89, 0.08);
        }

        /* National Analysis styling */
        .national-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        @media (min-width: 900px) {
          .national-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        .national-lead-card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 4px solid var(--pk-gold);
        }
        .national-lead-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: var(--pk-gold-light);
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        .national-desc {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 1.5rem;
        }
        .deficit-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .deficit-item {
          display: flex;
          gap: 1.2rem;
          align-items: flex-start;
        }
        .deficit-icon-wrapper {
          background: rgba(17, 140, 79, 0.2);
          border: 1px solid rgba(17, 140, 79, 0.4);
          color: var(--pk-green-bright);
          padding: 0.6rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .deficit-content h4 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.4rem;
        }
        .deficit-content p {
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Skills Gap Breakdown styling */
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .skills-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .skills-icon-large {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid rgba(197, 160, 89, 0.3);
          color: var(--pk-gold-light);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          transition: all 0.3s ease;
        }
        .skills-card:hover .skills-icon-large {
          background: rgba(197, 160, 89, 0.2);
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(197, 160, 89, 0.2);
        }
        .skills-card h3 {
          font-size: 1.3rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #ffffff;
        }
        .skills-card p {
          font-size: 0.98rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.75);
        }

        /* Philosophy & Vision styling */
        .philosophy-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        @media (min-width: 900px) {
          .philosophy-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .philosophy-card {
          border-top: 3px solid var(--pk-gold);
          position: relative;
        }
        .philosophy-card::after {
          content: '"';
          position: absolute;
          top: 1rem;
          right: 2rem;
          font-family: 'Playfair Display', serif;
          font-size: 4rem;
          color: rgba(197, 160, 89, 0.08);
          line-height: 1;
        }
        .philosophy-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--pk-gold-light);
          margin-bottom: 0.5rem;
        }
        .philosophy-concept {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--pk-green-bright);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
          display: block;
        }
        .philosophy-desc {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Partners Grid styling */
        .partners-showcase-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }
        @media (min-width: 768px) {
          .partners-showcase-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        .partner-showcase-card {
          background: rgba(10, 45, 25, 0.3);
          border: 1px solid rgba(197, 160, 89, 0.12);
          border-radius: 16px;
          height: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .partner-showcase-card:hover {
          background: rgba(197, 160, 89, 0.05);
          border-color: var(--pk-gold);
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
        .partner-img-wrapper {
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.8rem;
        }
        .partner-img-wrapper img {
          max-height: 100%;
          max-width: 150px;
          object-fit: contain;
          filter: brightness(0.9) contrast(1.1);
          transition: filter 0.3s ease;
        }
        .partner-showcase-card:hover img {
          filter: brightness(1) contrast(1);
        }
        .partner-fallback-logo {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--pk-gold-light);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .partner-subtext {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-top: 0.4rem;
        }
      `}</style>

      {/* Decorative Glow Elements */}
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      <div className="about-container">
        
        {/* Hero Section */}
        <header className="about-hero">
          <div className="hero-badge">
            <ShieldCheck size={16} /> National Initiative
          </div>
          <h1 className="hero-title">YUNI Intelligence</h1>
          <p className="hero-subtitle">Re-Building The 21st Century Shaheen 🦅</p>
          <p className="hero-description">
            Pakistan stands at a pivotal historical junction. With over 60% of our population under the age of 30, 
            we possess one of the largest demographic dividends globally. YUNI is a professional nation-building 
            ecosystem dedicated to bridging structural, technological, and communication gaps for Pakistan's youth.
          </p>
        </header>

        {/* National Analysis Section */}
        <section className="about-section">
          <div className="section-header">
            <span className="section-tag">Macro Landscape</span>
            <h2 className="section-title-text">National Analysis</h2>
            <div className="section-underline"></div>
          </div>
          
          <div className="national-grid">
            <div className="glass-card national-lead-card">
              <h3 className="national-lead-title">
                <TrendingUp size={22} className="text-gold" />
                The Demographic Dividend
              </h3>
              <p className="national-desc">
                Since its inception, Pakistan’s greatest asset has been its resilient and creative population. 
                Today, more than 60% of the country is under 30. This demographic configuration offers an 
                unprecedented engine for transformation. 
              </p>
              <p className="national-desc">
                If systematically guided, this generation can bypass legacy pathways, leading Pakistan directly into the center of the global digital economy.
              </p>
            </div>

            <div className="glass-card">
              <h3 className="national-lead-title" style={{ color: '#ffffff' }}>
                <Layers size={22} style={{ color: 'var(--pk-green-bright)' }} />
                Structural Challenges
              </h3>
              <div className="deficit-list">
                <div className="deficit-item">
                  <div className="deficit-icon-wrapper">
                    <BookOpen size={20} />
                  </div>
                  <div className="deficit-content">
                    <h4>Academic Disconnect</h4>
                    <p>Conventional university curricula are disconnected from market requirements, focusing on theoretical constructs rather than high-value practical execution.</p>
                  </div>
                </div>

                <div className="deficit-item">
                  <div className="deficit-icon-wrapper">
                    <Globe size={20} />
                  </div>
                  <div className="deficit-content">
                    <h4>Technological Isolation</h4>
                    <p>Local talent frequently faces a lack of access to advanced international platforms, developer tools, global mentorship, and industry-standard workflows.</p>
                  </div>
                </div>

                <div className="deficit-item">
                  <div className="deficit-icon-wrapper">
                    <Briefcase size={20} />
                  </div>
                  <div className="deficit-content">
                    <h4>Low-Value Service Trap</h4>
                    <p>The domestic tech ecosystem has historically prioritized low-complexity outsourcing. We must transition toward creating high-value digital IP, AI integration, and complex software platforms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workforce Skills Gap Breakdown */}
        <section className="about-section">
          <div className="section-header">
            <span className="section-tag">Talent Deficit Analysis</span>
            <h2 className="section-title-text">Workforce Skills Gap</h2>
            <div className="section-underline"></div>
          </div>

          <div className="skills-grid">
            <div className="glass-card skills-card">
              <div className="skills-icon-large">
                <Users size={28} />
              </div>
              <h3>Soft Skills & Communication</h3>
              <p>
                Highly capable engineers often fail to unlock their potential due to a lack of professional presentation, international client interaction standards, cross-cultural storytelling, and structured team collaboration frameworks.
              </p>
            </div>

            <div className="glass-card skills-card">
              <div className="skills-icon-large">
                <Cpu size={28} />
              </div>
              <h3>Advanced Emerging Tech</h3>
              <p>
                There is a massive deficit in practical, production-level expertise in Cloud Architectures, AI systems integration, deep learning pipelines, and highly scalable modern web/mobile architectures.
              </p>
            </div>

            <div className="glass-card skills-card">
              <div className="skills-icon-large">
                <Zap size={28} />
              </div>
              <h3>Execution & Portfolio Quality</h3>
              <p>
                Rote-learning leaves graduates with theoretical credentials but no live-deployed, production-grade project portfolios. The workforce is largely untested in professional agile sprints and hands-on building.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy & Vision */}
        <section className="about-section">
          <div className="section-header">
            <span className="section-tag">Founding Principles</span>
            <h2 className="section-title-text">Philosophy & Vision</h2>
            <div className="section-underline"></div>
          </div>

          <div className="philosophy-grid">
            <div className="glass-card philosophy-card">
              <h3 className="philosophy-title">Khudi</h3>
              <span className="philosophy-concept">Self-Realization</span>
              <p className="philosophy-desc">
                Awakening the internal agency, discipline, and willpower within every individual. We empower students to move from passive consumers of digital products to active creators who dictate technical trends.
              </p>
            </div>

            <div className="glass-card philosophy-card">
              <h3 className="philosophy-title">Shaheen</h3>
              <span className="philosophy-concept">Visionary Flight</span>
              <p className="philosophy-desc">
                Training the youth to think beyond immediate regional boundaries, look at global benchmarks, target high-altitude intellectual achievements, and navigate professional storms with sharp focus and resilience.
              </p>
            </div>

            <div className="glass-card philosophy-card">
              <h3 className="philosophy-title">Intellectual Sovereignty</h3>
              <span className="philosophy-concept">Sovereign Development</span>
              <p className="philosophy-desc">
                Reclaiming control of our economic and technological destiny. By nurturing world-class technical leaders locally, we aim to establish a self-reliant digital economy that drives national prosperity.
              </p>
            </div>
          </div>
        </section>

        {/* Collaborative Partners Grid */}
        <section className="about-section">
          <div className="section-header">
            <span className="section-tag">Institutional Alignment</span>
            <h2 className="section-title-text">Collaborative Partners</h2>
            <div className="section-underline"></div>
          </div>

          <div className="partners-showcase-grid">
            {/* Partner 1: NICAT */}
            <div className="partner-showcase-card">
              <div className="partner-img-wrapper">
                <img src="/images/nicat.png" alt="NICAT Logo" />
              </div>
              <span className="partner-subtext">Aerospace Technology Partner</span>
            </div>

            {/* Partner 2: Fazaia Bilquis College */}
            <div className="partner-showcase-card">
              <div className="partner-img-wrapper">
                <span className="partner-fallback-logo">FBC</span>
              </div>
              <span className="partner-subtext">Fazaia Bilquis College</span>
            </div>

            {/* Partner 3: Nerdflow */}
            <div className="partner-showcase-card">
              <div className="partner-img-wrapper">
                <span className="partner-fallback-logo">Nerdflow</span>
              </div>
              <span className="partner-subtext">Tech Infrastructure</span>
            </div>

            {/* Partner 4: Prosmetic Solutions */}
            <div className="partner-showcase-card">
              <div className="partner-img-wrapper">
                <span className="partner-fallback-logo">Prosmetic</span>
              </div>
              <span className="partner-subtext">Solutions Provider</span>
            </div>

            {/* Partner 5: Event Agency (Mahnoor) */}
            <div className="partner-showcase-card">
              <div className="partner-img-wrapper">
                <span className="partner-fallback-logo">Event Agency</span>
              </div>
              <span className="partner-subtext">Management & Outreach</span>
            </div>

            {/* Partner 6: Pakistan Film Society */}
            <div className="partner-showcase-card">
              <div className="partner-img-wrapper">
                <span className="partner-fallback-logo">PFS</span>
              </div>
              <span className="partner-subtext">Pakistan Film Society</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;