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
import AnimatedBackground from '../AnimatedBackground';

const AboutUsPage: React.FC = () => {
  return (
    <div className="relative pb-20 overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10 pt-32">
        
        {/* Hero Section */}
        <header className="hero-content text-center mx-auto px-6 pb-2 relative" style={{ alignItems: 'center', maxWidth: '1200px' }}>
          <div className="hero-badge mb-8">
            <span style={{ width: 8, height: 8, background: 'var(--pk-green-light)', borderRadius: '50%', boxShadow: '0 0 10px var(--pk-green-light)' }}></span>
            National Initiative
          </div>
          
          <h1 className="hero-title" style={{ textAlign: 'center' }}>
            <span className="hero-title-main">YUNI</span>
            <span className="hero-title-accent">Intelligence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--pk-green-light)] font-semibold tracking-wide mb-6 mt-4">
            Awakening Pakistan's Tech Potential
          </p>
          
          <p className="hero-sub mx-auto" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '800px' }}>
            Pakistan stands at a pivotal historical junction. With over 60% of our population under the age of 30, 
            we possess one of the largest demographic dividends globally. YUNI is a professional nation-building 
            ecosystem dedicated to bridging structural, technological, and communication gaps for Pakistan's youth.
          </p>
        </header>

        {/* National Analysis Section */}
        <section className="section-container">
          <div className="section-header">
            <span className="section-subtitle-premium">Macro Landscape</span>
            <h2 className="section-title">National <span className="text-gradient">Analysis</span></h2>
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
          <div className="section-header">
            <span className="section-subtitle-premium">Talent Deficit Analysis</span>
            <h2 className="section-title">Workforce <span className="text-gradient">Skills Gap</span></h2>
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
          <div className="section-header">
            <span className="section-subtitle-premium">Founding Principles</span>
            <h2 className="section-title">Philosophy <span className="text-gradient">& Vision</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="mesh-card border-t-4 border-t-[var(--pk-green-light)] relative overflow-visible">
              <span className="absolute top-4 right-8 text-6xl text-[var(--pk-green-glow)] leading-none">"</span>
              <h3 className="text-2xl font-bold text-[var(--pk-green-light)] mb-2">Khudi</h3>
              <span className="text-sm font-bold text-[var(--pk-green)] uppercase tracking-widest mb-6 block">Self-Realization</span>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Awakening the internal agency, discipline, and willpower within every individual. We empower students to move from passive consumers of digital products to active creators who dictate technical trends.
              </p>
            </div>

            <div className="mesh-card border-t-4 border-t-[var(--pk-green-light)] relative overflow-visible">
              <span className="absolute top-4 right-8 text-6xl text-[var(--pk-green-glow)] leading-none">"</span>
              <h3 className="text-2xl font-bold text-[var(--pk-green-light)] mb-2">Shaheen</h3>
              <span className="text-sm font-bold text-[var(--pk-green)] uppercase tracking-widest mb-6 block">Visionary Flight</span>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                Training the youth to think beyond immediate regional boundaries, look at global benchmarks, target high-altitude intellectual achievements, and navigate professional storms with sharp focus and resilience.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Demographic Dividend */}
            <div className="mesh-card">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-[var(--pk-green-light-subtle)] text-[var(--pk-green-light)]">
                  <Users size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 text-center">Demographic Dividend</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-center">
                With over 60% of the population under 30, Pakistan has one of the world's largest youth cohorts. 
                Harnessing this potential requires immediate, systemic interventions.
              </p>
            </div>

            {/* Strategic Imperatives */}
            <div className="mesh-card">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-[var(--pk-green-light-subtle)] text-[var(--pk-green-light)]">
                  <TrendingUp size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 text-center">Strategic Imperatives</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-center">
                Developing professional IT hubs, promoting research & development, and cultivating global integration 
                are crucial to prevent this resource from becoming an economic challenge.
              </p>
            </div>

            {/* Global Integration */}
            <div className="mesh-card">
              <div className="mb-6 flex justify-center">
                <div className="p-4 rounded-2xl bg-[var(--pk-green-light-subtle)] text-[var(--pk-green-light)]">
                  <Globe size={32} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 text-center">Global Integration</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-center">
                Positioning Pakistan as a top exporter of high-value services. Our programs align talent directly with 
                international freelancing markets and corporate networks.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="section-container relative z-10">
          <div className="section-header">
            <span className="section-subtitle-premium">Key Foundations</span>
            <h2 className="section-title">Core <span className="text-gradient">Pillars</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="mesh-card flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-[var(--pk-green-light-subtle)] text-[var(--pk-green-light)] shrink-0">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Technology & Engineering</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Focusing on cutting-edge fields like Aerospace, AI, Blockchain, and Advanced Software Engineering. 
                  We equip youth with future-proof tech skills.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="mesh-card flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-[var(--pk-green-light-subtle)] text-[var(--pk-green-light)] shrink-0">
                <Layers size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">E-Commerce & Digital Trade</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Enabling global market access through comprehensive training in Amazon FBA, Shopify, dropshipping, 
                  and digital agency management.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="mesh-card flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-[var(--pk-green-light-subtle)] text-[var(--pk-green-light)] shrink-0">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Professional Growth</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Fostering entrepreneurship, soft skills, communication, and business intelligence to turn 
                  freelancers into agency owners and startup founders.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="mesh-card flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-[var(--pk-green-light-subtle)] text-[var(--pk-green-light)] shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Ethical Leadership</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Instilling core values of professional integrity, national pride, and social responsibility 
                  to build leaders who contribute to Pakistan's future.
                </p>
              </div>
            </div>
          </div>
        </section>



        {/* Services Section */}
        <section className="w-full overflow-hidden pb-24">
          <div className="section-header relative z-20 mt-16 px-4">
            <span className="section-subtitle-premium">What We Do</span>
            <h2 className="section-title">Our <span className="text-gradient">Services</span></h2>
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