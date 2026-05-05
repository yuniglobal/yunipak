import React, { useState } from "react";

// Job/Internship type definition
interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

const positions: Position[] = [
  {
    id: "pos-1",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "NASTP, Pakistan",
    type: "Full-time, On-Site",
    description: "React, Next.js, Tailwind. Full-time, On-Site.",
  },
  {
    id: "pos-2",
    title: "Instructor (Cybersecurity)",
    department: "Cybersecurity",
    location: "NASTP, Pakistan",
    type: "Part-time, Hybrid",
    description: "Industry expert. Part-time, Hybrid.",
  },
  {
    id: "pos-3",
    title: "Ethical Hacking Specialist",
    department: "Tech",
    location: "NASTP, Pakistan",
    type: "Full-time, On-Site",
    description: "Penetration testing & security assessments. Full-time, On-Site.",
  },
  {
    id: "pos-4",
    title: "AI/ML Prompt Engineer",
    department: "AI",
    location: "NASTP, Pakistan",
    type: "Contract, Remote",
    description: "Design and optimize AI prompts. Contract, Remote.",
  },
];

const Careers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"positions" | "internships">("positions");

  const handleApply = (position: Position) => {
    alert(`Application Form Opened for: ${position.title}`);
    // In production, this would open a modal or navigate to application form
  };

  return (
    <section className="careers-section">
      <div className="careers-container">
        {/* Header */}
        <h2 className="careers-heading">
          Join The <span className="careers-heading-highlight">Movement.</span>
        </h2>
        <p className="careers-subtitle">
          We are looking for disruptors to join our HQ at NASTP.
        </p>

        {/* Tab Switcher */}
        <div className="tab-container">
          <button
            className={`tab-btn ${activeTab === "positions" ? "active" : ""}`}
            onClick={() => setActiveTab("positions")}
          >
            Open Positions
          </button>
          <button
            className={`tab-btn ${activeTab === "internships" ? "active" : ""}`}
            onClick={() => setActiveTab("internships")}
          >
            Internships
          </button>
        </div>

        {/* Positions List */}
        <div className="positions-list">
          {positions.map((position) => (
            <div key={position.id} className="position-panel">
              <div className="position-info">
                <h3 className="position-title">{position.title}</h3>
                <p className="position-description">{position.description}</p>
              </div>
              <button
                onClick={() => handleApply(position)}
                className="apply-button"
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <h2>Don't see a perfect fit?</h2>
          <p>
            We're always looking for talented individuals. Send your resume to{" "}
            <a href="mailto:careers@yunipakistan.com">careers@yunipakistan.com</a>
          </p>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* ===== Careers Section ===== */
        .careers-section {
          min-height: 100vh;
          background: #000000;
          font-family: 'Inter', sans-serif;
          color: #ffffff;
          padding-top: 10rem;
          padding-bottom: 8rem;
        }

        .careers-container {
          max-width: 56rem; /* max-w-4xl equivalent */
          margin: 0 auto;
          padding: 0 1.5rem;
          text-align: center;
        }

        /* Heading */
        .careers-heading {
          font-family: 'Inter', sans-serif;
          font-size: 3rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .careers-heading-highlight {
          color: #0ae448;
        }

        .careers-subtitle {
          color: #6b7280;
          margin-bottom: 4rem;
          font-size: 1.125rem;
          line-height: 1.75rem;
        }

        /* Tab Switcher */
        .tab-container {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 3rem;
          border-bottom: 1px solid rgba(10, 228, 72, 0.2);
          padding-bottom: 0.5rem;
        }

        .tab-btn {
          background: transparent;
          border: none;
          color: #9ca3af;
          font-size: 1.125rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 0.5rem 0.5rem 0 0;
          font-family: inherit;
          position: relative;
        }

        .tab-btn:hover {
          color: #ffffff;
          background: rgba(10, 228, 72, 0.08);
        }

        .tab-btn.active {
          color: #0ae448;
          background: rgba(10, 228, 72, 0.12);
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 100%;
          height: 2px;
          background: #0ae448;
        }

        /* Positions List */
        .positions-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        /* Position Panel - Glass Effect */
        .position-panel {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 1.5rem;
          padding: 2.5rem;
          text-align: left;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid rgba(10, 228, 72, 0.15);
          transition: all 0.3s ease;
        }

        .position-panel:hover {
          transform: translateY(-4px);
          border-color: rgba(10, 228, 72, 0.4);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(10, 228, 72, 0.1);
        }

        .position-info {
          flex: 1;
          margin-right: 2rem;
        }

        .position-title {
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }

        .position-description {
          color: #6b7280;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        .apply-button {
          background: #0ae448;
          color: #000000;
          font-weight: 700;
          padding: 0.625rem 1.5rem;
          border-radius: 9999px;
          border: none;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .apply-button:hover {
          background: #ffffff;
          transform: scale(1.05);
          box-shadow: 0 4px 16px rgba(10, 228, 72, 0.4);
        }

        /* Bottom CTA */
        .bottom-cta {
          margin-top: 4rem;
          padding: 2.5rem;
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(10, 228, 72, 0.15);
          text-align: center;
        }

        .bottom-cta h2 {
          color: #ffffff;
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .bottom-cta p {
          color: #9ca3af;
          font-size: 1.1rem;
        }

        .bottom-cta a {
          color: #0ae448;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .bottom-cta a:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .careers-section {
            padding-top: 6rem;
            padding-bottom: 4rem;
          }

          .careers-heading {
            font-size: 2.25rem;
          }

          .position-panel {
            flex-direction: column;
            text-align: center;
            padding: 1.75rem;
          }

          .position-info {
            margin-right: 0;
            margin-bottom: 1.25rem;
          }

          .position-title {
            font-size: 1.25rem;
          }

          .apply-button {
            width: 100%;
            padding: 0.75rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .careers-heading {
            font-size: 1.75rem;
          }

          .careers-subtitle {
            font-size: 1rem;
            margin-bottom: 2.5rem;
          }

          .tab-btn {
            font-size: 1rem;
            padding: 0.5rem 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Careers;