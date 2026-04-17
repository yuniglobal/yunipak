import React, { useState } from "react";

// Helper to generate the 25 rainbow nth-child rules (unchanged for desktop)
const generateRainbowCSS = (): string => {
  const black = "#000000";
  const darkGreen = "#0a3d20";
  const tealGreen = "#0e5a2c";

  const permutations = [
    [black, darkGreen, tealGreen],
    [black, tealGreen, darkGreen],
    [darkGreen, black, tealGreen],
    [darkGreen, tealGreen, black],
    [tealGreen, black, darkGreen],
    [tealGreen, darkGreen, black],
  ];

  let css = "";
  const length = 25;
  const animationTime = 45;

  for (let i = 1; i <= length; i++) {
    const colors = permutations[(i - 1) % permutations.length];
    const delay = -(i / length) * animationTime;
    const duration = animationTime - (animationTime / length / 2) * i;

    css += `
      .rainbow:nth-child(${i}) {
        box-shadow: -130px 0 80px 40px #0a0a0a,
                    -50px 0 50px 25px ${colors[0]},
                    0 0 50px 25px ${colors[1]},
                    50px 0 50px 25px ${colors[2]},
                    130px 0 80px 40px #0a0a0a;
        animation: slide ${duration}s linear infinite;
        animation-delay: ${delay}s;
      }
    `;
  }
  return css;
};

// Job/Internship type definition
interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  imageUrl: string;
}

// Dummy data with Unsplash placeholder images relevant to each role
const jobs: Position[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote / Pakistan",
    type: "Full-time",
    description: "We're looking for an experienced React/TypeScript developer to lead our frontend initiatives.",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: "job-2",
    title: "Backend Engineer (Node.js)",
    department: "Engineering",
    location: "Lahore, PK (Hybrid)",
    type: "Full-time",
    description: "Design and build scalable APIs using Node.js and PostgreSQL.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: "job-3",
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Contract",
    description: "Create intuitive and beautiful interfaces for our web and mobile products.",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: "job-4",
    title: "Technical Project Manager",
    department: "Operations",
    location: "Karachi, PK",
    type: "Full-time",
    description: "Coordinate cross-functional teams to deliver high-quality software on time.",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop&auto=format",
  },
];

const internships: Position[] = [
  {
    id: "intern-1",
    title: "Frontend Development Intern",
    department: "Engineering",
    location: "Remote",
    type: "Internship",
    description: "Work alongside senior developers on real projects using React and TypeScript.",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: "intern-2",
    title: "UI/UX Design Intern",
    department: "Design",
    location: "Lahore, PK (Hybrid)",
    type: "Internship",
    description: "Assist in user research, wireframing, and prototyping for new features.",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: "intern-3",
    title: "Digital Marketing Intern",
    department: "Marketing",
    location: "Remote",
    type: "Internship",
    description: "Help grow our online presence through content creation and social media.",
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=300&fit=crop&auto=format",
  },
  {
    id: "intern-4",
    title: "Backend Development Intern",
    department: "Engineering",
    location: "Karachi, PK",
    type: "Internship",
    description: "Learn to build robust APIs and work with databases in a production environment.",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&auto=format",
  },
];

const Careers: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"jobs" | "internships">("jobs");

  const rainbowDivs = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className="rainbow" />
  ));

  const PositionCard: React.FC<{ position: Position }> = ({ position }) => (
    <div className="position-card">
      <div className="card-image">
        <img src={position.imageUrl} alt={position.title} loading="lazy" />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3 className="position-title">{position.title}</h3>
          <span className="position-type">{position.type}</span>
        </div>
        <div className="position-meta">
          <span className="meta-item">{position.department}</span>
          <span className="meta-separator">•</span>
          <span className="meta-item">{position.location}</span>
        </div>
        <p className="position-description">{position.description}</p>
        <button className="apply-btn">Apply Now →</button>
      </div>
    </div>
  );

  return (
    <>
      {/* Rainbow Background */}
      <div className="rainbow-background">
        {rainbowDivs}
        <div className="h" />
        <div className="v" />
      </div>

      {/* Main Content */}
      <section className="careers">
        <h1 className="page-title">Join Our Team</h1>
        <p className="page-subtitle">
          Help us build the future of digital payments in Pakistan.
        </p>

        {/* Tab Switcher */}
        <div className="tab-container">
          <button
            className={`tab-btn ${activeTab === "jobs" ? "active" : ""}`}
            onClick={() => setActiveTab("jobs")}
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

        {/* Positions Grid */}
        <div className="positions-grid">
          {activeTab === "jobs"
            ? jobs.map((job) => <PositionCard key={job.id} position={job} />)
            : internships.map((intern) => (
                <PositionCard key={intern.id} position={intern} />
              ))}
        </div>

        {/* CTA for spontaneous applications */}
        <div className="spontaneous-cta">
          <h2>Don't see a perfect fit?</h2>
          <p>
            We're always looking for talented individuals. Send your resume to{" "}
            <a href="mailto:careers@yunipakistan.com">careers@yunipakistan.com</a>
          </p>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* ===== Rainbow Background (unchanged for desktop) ===== */
        .rainbow-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
          background-color: #000000;
        }

        .rainbow {
          height: 100vh;
          width: 0;
          top: 0;
          position: absolute;
          transform: rotate(10deg);
          transform-origin: top right;
        }

        .h {
          box-shadow: 0 0 50vh 40vh #0a0a0a;
          width: 100vw;
          height: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }

        .v {
          box-shadow: 0 0 35vw 25vw #0a0a0a;
          width: 0;
          height: 100vh;
          bottom: 0;
          left: 0;
          position: absolute;
        }

        @keyframes slide {
          from { right: -25vw; }
          to { right: 125vw; }
        }

        ${generateRainbowCSS()}

        /* ===== Careers Page (unchanged) ===== */
        .careers {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 1.5rem 4rem;
          font-family: 'Inter', sans-serif;
          background: transparent;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #ffffff;
          text-shadow: 0 0 15px rgba(0,0,0,0.7);
        }

        .page-subtitle {
          font-size: 1.25rem;
          color: #0ae448;
          margin-bottom: 2.5rem;
          text-shadow: 0 0 8px rgba(0,0,0,0.5);
        }

        /* Tab Switcher */
        .tab-container {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          border-bottom: 1px solid rgba(10, 228, 72, 0.2);
          padding-bottom: 0.5rem;
        }

        .tab-btn {
          background: transparent;
          border: none;
          color: #aaa;
          font-size: 1.25rem;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
          border-radius: 0.5rem 0.5rem 0 0;
          font-family: inherit;
        }

        .tab-btn:hover {
          color: #ffffff;
          background: rgba(10, 228, 72, 0.1);
        }

        .tab-btn.active {
          color: #0ae448;
          background: rgba(10, 228, 72, 0.15);
          border-bottom: 2px solid #0ae448;
        }

        /* Positions Grid */
        .positions-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .positions-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Position Card */
        .position-card {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6);
          border: 1px solid rgba(10, 228, 72, 0.25);
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .position-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.8);
          border-color: rgba(10, 228, 72, 0.4);
          transform: translateY(-3px);
        }

        .card-image {
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .position-card:hover .card-image img {
          transform: scale(1.05);
        }

        .card-content {
          padding: 1.75rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .position-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
          line-height: 1.3;
        }

        .position-type {
          background: rgba(10, 228, 72, 0.15);
          color: #0ae448;
          padding: 0.25rem 0.75rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          font-weight: 600;
          white-space: nowrap;
          border: 1px solid rgba(10, 228, 72, 0.3);
        }

        .position-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: #0ae448;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .meta-separator {
          color: #555;
        }

        .position-description {
          color: #ddd;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .apply-btn {
          background: transparent;
          border: 1px solid #0ae448;
          color: #0ae448;
          font-weight: 600;
          padding: 0.6rem 1.2rem;
          border-radius: 2rem;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
          align-self: flex-start;
          font-family: inherit;
        }

        .apply-btn:hover {
          background: #0ae448;
          color: #000;
          box-shadow: 0 4px 12px rgba(10, 228, 72, 0.3);
        }

        /* Spontaneous CTA */
        .spontaneous-cta {
          margin-top: 2rem;
          padding: 2rem;
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(10, 228, 72, 0.2);
          text-align: center;
        }

        .spontaneous-cta h2 {
          color: #ffffff;
          font-size: 1.75rem;
          margin-bottom: 0.5rem;
        }

        .spontaneous-cta p {
          color: #ccc;
          font-size: 1.1rem;
        }

        .spontaneous-cta a {
          color: #0ae448;
          text-decoration: none;
          font-weight: 600;
        }

        .spontaneous-cta a:hover {
          text-decoration: underline;
          color: #ffffff;
        }

        /* ---------- MOBILE PERFORMANCE OPTIMIZATIONS ---------- */
        /* These overrides apply only to tablets and smaller, leaving desktop unchanged */
        @media (max-width: 1023px) {
          /* Reduce number of visible rainbows (hide half of them) */
          .rainbow:nth-child(n+13) {
            display: none !important;
          }

          /* Use transform instead of 'right' for smoother animation */
          @keyframes slide {
            from { transform: translateX(-25vw); }
            to { transform: translateX(125vw); }
          }

          /* Simplify box-shadows on mobile for better performance */
          .rainbow {
            right: auto !important;
            left: 0;
            animation-name: slide-mobile !important;
            will-change: transform;
          }

          /* Override the nth-child generated box-shadows with lighter ones */
          .rainbow:nth-child(n) {
            box-shadow: -50px 0 40px 20px #0a0a0a,
                        0 0 30px 15px #0e5a2c,
                        50px 0 40px 20px #0a0a0a !important;
          }

          /* Keyframe for transform-based animation */
          @keyframes slide-mobile {
            from { transform: translateX(-50vw); }
            to { transform: translateX(150vw); }
          }

          /* Keep the overlay darkening the edges */
          .h {
            box-shadow: 0 0 50vh 30vh #0a0a0a;
          }
          .v {
            box-shadow: 0 0 35vw 20vw #0a0a0a;
          }
        }

        /* Small phones – further reduce */
        @media (max-width: 600px) {
          .rainbow:nth-child(n+8) {
            display: none !important;
          }

          .rainbow:nth-child(n) {
            box-shadow: -30px 0 30px 15px #0a0a0a,
                        0 0 20px 10px #0e5a2c,
                        30px 0 30px 15px #0a0a0a !important;
          }
        }

        /* Fallback for reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
          .rainbow {
            animation: none !important;
            opacity: 0.2;
          }
        }
      `}</style>
    </>
  );
};

export default Careers;