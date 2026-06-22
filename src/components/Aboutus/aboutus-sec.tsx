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
import ScrollMotionPath from '../Services/ScrollMotionPath';

const AboutUsPage: React.FC = () => {
  return (
    <div className="relative pb-20 overflow-x-hidden">
      <div className="relative z-10 pt-32">
        
        {/* Hero Section */}
        <header className="text-center section-container pt-8 pb-16 relative">
          <div className="inline-flex items-center gap-2 bg-[var(--pk-green-glow-subtle)] border border-[var(--pk-green-light)] text-[var(--pk-green-light)] px-7 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8 shadow-[0_0_15px_var(--pk-green-glow)]">
            <ShieldCheck size={16} /> National Initiative
          </div>
          <h1 className="section-title text-gradient">YUNI Intelligence</h1>
          <p className="text-xl md:text-2xl text-[var(--pk-green)] font-semibold tracking-wide mb-8">
            Awakening Pakistan's Tech Potential
          </p>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-[var(--text-secondary)]">
            Pakistan stands at a pivotal historical junction. With over 60% of our population under the age of 30, 
            we possess one of the largest demographic dividends globally. YUNI is a professional nation-building 
            ecosystem dedicated to bridging structural, technological, and communication gaps for Pakistan's youth.
          </p>
        </header>

        {/* National Analysis Section */}
        <section className="section-container">
          <div className="title-wrapper">
            <span className="text-[var(--pk-green-light)] text-sm font-bold uppercase tracking-widest mb-2 block">Macro Landscape</span>
            <h2 className="section-title text-gradient">National Analysis</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--pk-green-light)] to-transparent mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="mesh-card flex flex-col justify-center border-l-4 border-l-[var(--pk-green-light)]">
              <h3 className="text-2xl font-bold mb-6 text-[var(--pk-green-light)] flex items-center gap-3">
                <TrendingUp size={22} />
                The Demographic Dividend
              </h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                Since its inception, Pakistan’s greatest asset has been its resilient and creative population. 
                Today, more than 60% of the country is under 30. This demographic configuration offers an 
                unprecedented engine for transformation. 
              </p>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                If systematically guided, this generation can bypass legacy pathways, leading Pakistan directly into the center of the global digital economy.
              </p>
            </div>

            <div className="mesh-card">
              <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-3">
                <Layers size={22} className="text-[var(--pk-green)]" />
                Structural Challenges
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-[var(--pk-green-glow-subtle)] text-[var(--pk-green)] border border-[var(--border-light)] flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">Academic Disconnect</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">Conventional university curricula are disconnected from market requirements, focusing on theoretical constructs rather than high-value practical execution.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-[var(--pk-green-glow-subtle)] text-[var(--pk-green)] border border-[var(--border-light)] flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">Technological Isolation</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">Local talent frequently faces a lack of access to advanced international platforms, developer tools, global mentorship, and industry-standard workflows.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-[var(--pk-green-glow-subtle)] text-[var(--pk-green)] border border-[var(--border-light)] flex items-center justify-center">
                    <Briefcase size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[var(--text-primary)] mb-1">Low-Value Service Trap</h4>
                    <p className="text-[var(--text-secondary)] leading-relaxed">The domestic tech ecosystem has historically prioritized low-complexity outsourcing. We must transition toward creating high-value digital IP, AI integration, and complex software platforms.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Workforce Skills Gap Breakdown */}
        <section className="section-container">
          <div className="title-wrapper">
            <span className="text-[var(--pk-green-light)] text-sm font-bold uppercase tracking-widest mb-2 block">Talent Deficit Analysis</span>
            <h2 className="section-title text-gradient">Workforce Skills Gap</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--pk-green-light)] to-transparent mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mesh-card flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-[var(--pk-green-glow-subtle)] border border-[var(--border-light)] text-[var(--pk-green-light)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--pk-green-glow)]">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Soft Skills & Communication</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Highly capable engineers often fail to unlock their potential due to a lack of professional presentation, international client interaction standards, cross-cultural storytelling, and structured team collaboration frameworks.
              </p>
            </div>

            <div className="mesh-card flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-[var(--pk-green-glow-subtle)] border border-[var(--border-light)] text-[var(--pk-green-light)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--pk-green-glow)]">
                <Cpu size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Advanced Emerging Tech</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                There is a massive deficit in practical, production-level expertise in Cloud Architectures, AI systems integration, deep learning pipelines, and highly scalable modern web/mobile architectures.
              </p>
            </div>

            <div className="mesh-card flex flex-col items-center text-center group">
              <div className="w-20 h-20 rounded-full bg-[var(--pk-green-glow-subtle)] border border-[var(--border-light)] text-[var(--pk-green-light)] flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--pk-green-glow)]">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Execution & Portfolio Quality</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Rote-learning leaves graduates with theoretical credentials but no live-deployed, production-grade project portfolios. The workforce is largely untested in professional agile sprints and hands-on building.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy & Vision */}
        <section className="section-container">
          <div className="title-wrapper">
            <span className="text-[var(--pk-green-light)] text-sm font-bold uppercase tracking-widest mb-2 block">Founding Principles</span>
            <h2 className="section-title text-gradient">Philosophy & Vision</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--pk-green-light)] to-transparent mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="mesh-card border-t-4 border-t-[var(--pk-green-light)] relative overflow-visible">
              <span className="absolute top-4 right-8 text-6xl text-[var(--pk-green-glow)] leading-none font-serif">"</span>
              <h3 className="text-2xl font-bold text-[var(--pk-green-light)] mb-2">Khudi</h3>
              <span className="text-sm font-bold text-[var(--pk-green)] uppercase tracking-widest mb-6 block">Self-Realization</span>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Awakening the internal agency, discipline, and willpower within every individual. We empower students to move from passive consumers of digital products to active creators who dictate technical trends.
              </p>
            </div>

            <div className="mesh-card border-t-4 border-t-[var(--pk-green-light)] relative overflow-visible">
              <span className="absolute top-4 right-8 text-6xl text-[var(--pk-green-glow)] leading-none font-serif">"</span>
              <h3 className="text-2xl font-bold text-[var(--pk-green-light)] mb-2">Shaheen</h3>
              <span className="text-sm font-bold text-[var(--pk-green)] uppercase tracking-widest mb-6 block">Visionary Flight</span>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Training the youth to think beyond immediate regional boundaries, look at global benchmarks, target high-altitude intellectual achievements, and navigate professional storms with sharp focus and resilience.
              </p>
            </div>

            <div className="mesh-card border-t-4 border-t-[var(--pk-green-light)] relative overflow-visible">
              <span className="absolute top-4 right-8 text-6xl text-[var(--pk-green-glow)] leading-none font-serif">"</span>
              <h3 className="text-2xl font-bold text-[var(--pk-green-light)] mb-2">Intellectual Sovereignty</h3>
              <span className="text-sm font-bold text-[var(--pk-green)] uppercase tracking-widest mb-6 block">Sovereign Development</span>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Reclaiming control of our economic and technological destiny. By nurturing world-class technical leaders locally, we aim to establish a self-reliant digital economy that drives national prosperity.
              </p>
            </div>
          </div>
        </section>

        {/* National Recognition Partners */}
        <section className="section-container">
          <div className="title-wrapper">
            <span className="text-[var(--pk-green-light)] text-sm font-bold uppercase tracking-widest mb-2 block">Government & Defense Alignment</span>
            <h2 className="section-title text-gradient">National Recognition Partners</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--pk-green-light)] to-transparent mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Partner 1: NASTP */}
            <div className="mesh-card flex flex-col items-center text-center">
              <div className="h-24 flex items-center justify-center mb-6">
                <img src="/images/nastp.png" alt="NASTP Logo" className="max-h-full max-w-full object-contain" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">NASTP</h3>
              <div className="text-sm text-[var(--pk-green-light)] font-bold uppercase tracking-widest mb-4">Official Registration & Ecosystem Partner</div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Collaborating under the National Aerospace Science & Technology Park framework to support technological innovation, training alignment, and high-altitude research initiatives.
              </p>
            </div>

            {/* Partner 2: PSEB */}
            <div className="mesh-card flex flex-col items-center text-center">
              <div className="h-24 flex items-center justify-center mb-6">
                <img src="/images/pseb-certificate.png" alt="PSEB Registration Certificate" className="max-h-full max-w-full object-contain rounded-lg shadow-sm" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">PSEB</h3>
              <div className="text-sm text-[var(--pk-green-light)] font-bold uppercase tracking-widest mb-4">Official Registered Training Provider</div>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Officially registered with the Pakistan Software Export Board (PSEB) to deliver industry-validated IT training programs aligned with national standards, providing credentials recognized by top-tier tech companies.
              </p>
            </div>
          </div>
        </section>

        {/* Collaborative Partners Grid */}
        <section className="section-container">
          <div className="title-wrapper">
            <span className="text-[var(--pk-green-light)] text-sm font-bold uppercase tracking-widest mb-2 block">Ecosystem Alignment</span>
            <h2 className="section-title text-gradient">Collaborative & Ecosystem Partners</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--pk-green-light)] to-transparent mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {/* Partner 1: NICAT */}
            <div className="glass-panel rounded-2xl h-36 flex flex-col items-center justify-center p-6 text-center transition-all hover:-translate-y-1 hover:border-[var(--pk-green-light)] hover:shadow-lg">
              <div className="h-16 flex items-center justify-center mb-3">
                <img src="/images/nicat.png" alt="NICAT Logo" className="max-h-full max-w-[150px] object-contain" />
              </div>
              <span className="text-xs text-[var(--text-tertiary)] font-semibold uppercase tracking-widest">Aerospace Technology Partner</span>
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

        {/* Services Section */}
        <section className="w-full overflow-hidden pb-24">
          <div className="title-wrapper max-w-[1200px] mx-auto px-4 md:px-8 relative z-20 mt-16">
            <span className="text-[var(--pk-green-light)] text-sm font-bold uppercase tracking-widest mb-2 block text-center">What We Do</span>
            <h2 className="section-title text-gradient text-center">Our Services</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[var(--pk-green-light)] to-transparent mx-auto mt-4"></div>
          </div>
          <div className="-mt-16 w-full relative z-10">
            <ScrollMotionPath />
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutUsPage;