// src/pages/Services.tsx
import React from "react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features?: string[];
}

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="service-card">
    <div className="service-icon">{service.icon}</div>
    <h3 className="service-title">{service.title}</h3>
    <p className="service-description">{service.description}</p>
    {service.features && service.features.length > 0 && (
      <ul className="service-features">
        {service.features.map((feature, idx) => (
          <li key={idx}>
            <span className="feature-bullet"></span>
            {feature}
          </li>
        ))}
      </ul>
    )}
    <div className="service-learn-more">
      <a href="#">Learn more →</a>
    </div>
  </div>
);

const ServicesGrid: React.FC<{ services: Service[] }> = ({ services }) => (
  <div className="services-grid">
    {services.map((service) => (
      <ServiceCard key={service.id} service={service} />
    ))}
  </div>
);

const ServicesPage: React.FC = () => {
  const servicesData: Service[] = [
    {
      id: "1",
      title: "Yuni-Buddy (Parwaaz-e-Uqabi)",
      description:
        "Connect, earn, and grow globally. A community platform for opportunities, jobs, internships, leadership, and global networking.",
      icon: "🤝",
      features: [
        "Global connectivity & earning opportunities",
        "Jobs / internships",
        "Leadership & community building",
        "Study abroad support",
      ],
    },
    {
      id: "2",
      title: "Yuni-Courses (Umeed-e-Sahar)",
      description:
        "Practical, project-based courses taught by industry leaders. Build real skills, portfolios, and secure job-ready verification.",
      icon: "📚",
      features: [
        "Taught by CEOs, COOs, founders",
        "Project-based with hands-on experience",
        "Portfolio building & Yuni-Verification",
        "Course + internship pathway",
      ],
    },
    {
      id: "3",
      title: "Yuni-Coworking (Yuni-Anjuman)",
      description:
        "Collaborative workspaces for innovators, freelancers, and startups. A community-driven environment to create and grow.",
      icon: "🏢",
      features: [
        "Flexible workspaces with global vibe",
        "Networking & mentorship for startups",
        "Skill workshops & events",
        "Blend of work, creativity & unity",
      ],
    },
    {
      id: "4",
      title: "Yuni-Tech & Marketing (Taqat-e-Parwaaz)",
      description:
        "Digital agency boosting Pakistan's online presence. AI, automation, e-commerce, and innovative marketing for global reach.",
      icon: "📈",
      features: [
        "Web development & digital branding",
        "AI & automation services",
        "E-commerce enablement",
        "Global marketing strategies",
      ],
    },
    {
      id: "5",
      title: "Business Consultation (Momin-e-Sana'at)",
      description:
        "Strategic guidance for entrepreneurs and businesses. Turn ideas into sustainable, ethical, and profitable ventures.",
      icon: "💼",
      features: [
        "Startup mentorship & business planning",
        "Market entry & growth strategies",
        "Financial & operational consulting",
        "Ethical leadership & national service",
      ],
    },
  ];

  return (
    <div className="services-page">
      <div className="services-container">
        {/* Hero Section with Yuni Philosophy */}
        <div className="services-hero">
          <h1>Our Services</h1>
          <p className="tagline">
            <em>“Khudi ko kar buland itna ke har taqdeer se pehle…”</em>
          </p>
          <p>
            Yuni Pakistan exists to awaken the youth, transform knowledge into
            power, and build a nation of thinkers, creators, and leaders.
          </p>
          <div className="hero-underline"></div>
        </div>

        {/* Services Grid */}
        <div className="services-grid-wrapper">
          <ServicesGrid services={servicesData} />
        </div>

        {/* CTA - Aligned with Yuni's mission */}
        <div className="services-cta">
          <h2>Ready to rise with the Shaheen?</h2>
          <p>
            Join Yuni's 360° ecosystem — from learning to earning, from
            coworking to global opportunities.
          </p>
          <button className="cta-button">Become a Yuni Partner</button>
        </div>
      </div>

      <style>{`
        /* Services Page Styles - Yuni Pakistan Theme */
        .services-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #faf9ff 0%, #f0f4ff 100%);
          padding-top: 80px;
        }

        .services-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 3rem 2rem 5rem;
        }

        /* Hero Section */
        .services-hero {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .services-hero h1 {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1e2a3a, #0f4c5c);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 0.5rem;
        }

        .tagline {
          font-size: 1.25rem;
          color: #2c7a4d;
          font-style: italic;
          margin-bottom: 1rem;
        }

        .services-hero p {
          font-size: 1.125rem;
          color: #2c3e2f;
          line-height: 1.5;
        }

        .hero-underline {
          width: 80px;
          height: 4px;
          background: #2c7a4d;
          border-radius: 4px;
          margin: 1.5rem auto 0;
        }

        /* Grid */
        .services-grid-wrapper {
          margin-top: 3rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Card */
        .service-card {
          background: white;
          border-radius: 1.5rem;
          padding: 1.8rem;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
          transition: all 0.3s ease;
          border: 1px solid rgba(44, 122, 77, 0.1);
        }

        .service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.15);
          border-color: #2c7a4d;
        }

        .service-icon {
          font-size: 2.8rem;
          margin-bottom: 1rem;
          display: inline-block;
          background: #e9f5eb;
          padding: 0.75rem;
          border-radius: 1rem;
        }

        .service-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e3a2f;
          margin: 0.75rem 0 0.5rem;
        }

        .service-description {
          color: #4a5b4e;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .service-features {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
        }

        .service-features li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #2d6a4f;
          margin-bottom: 0.5rem;
        }

        .feature-bullet {
          width: 6px;
          height: 6px;
          background: #2c7a4d;
          border-radius: 50%;
          display: inline-block;
        }

        .service-learn-more {
          margin-top: 1rem;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .service-card:hover .service-learn-more {
          opacity: 1;
        }

        .service-learn-more a {
          color: #2c7a4d;
          font-weight: 600;
          text-decoration: none;
          font-size: 0.9rem;
        }

        .service-learn-more a:hover {
          text-decoration: underline;
        }

        /* CTA Section */
        .services-cta {
          text-align: center;
          margin-top: 5rem;
          padding: 2.5rem;
          background: #1e2a3a;
          border-radius: 2rem;
          color: white;
        }

        .services-cta h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .services-cta p {
          color: #cbd5e0;
          margin-bottom: 1.5rem;
        }

        .cta-button {
          background: #2c7a4d;
          border: none;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          border-radius: 2rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .cta-button:hover {
          background: #1e5a3a;
        }

        @media (max-width: 768px) {
          .services-container {
            padding: 2rem 1rem;
          }
          .services-hero h1 {
            font-size: 2.2rem;
          }
          .services-cta h2 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;