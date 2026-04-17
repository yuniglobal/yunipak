import React, { useState } from "react";

// Helper to generate the 25 rainbow nth-child rules (same as other pages)
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

// Event type definition
interface EventItem {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "Workshop" | "Conference" | "Webinar" | "Meetup" | "Hackathon";
  description: string;
  imageUrl: string;
  isPast: boolean;
  registrationLink?: string;
}

// Sample events data
const eventsData: EventItem[] = [
  {
    id: "event-1",
    title: "AI in Fintech Summit 2026",
    date: "May 15, 2026",
    time: "10:00 AM - 4:00 PM PKT",
    location: "NASTP Auditorium, Islamabad",
    type: "Conference",
    description:
      "Join industry leaders and innovators for a full-day conference exploring the intersection of artificial intelligence and financial technology. Keynotes, panel discussions, and networking opportunities.",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format",
    isPast: false,
    registrationLink: "#register",
  },
  {
    id: "event-2",
    title: "React Advanced Workshop",
    date: "June 3-4, 2026",
    time: "9:00 AM - 5:00 PM PKT",
    location: "NASTP Innovation Lab, Lahore",
    type: "Workshop",
    description:
      "Two-day intensive workshop covering advanced React patterns, performance optimization, and server components. Hands-on coding sessions with expert mentors. Limited to 30 participants.",
    imageUrl:
      "https://images.unsplash.com/photo-1593729273427-1f278b7e9e8f?w=600&h=400&fit=crop&auto=format",
    isPast: false,
    registrationLink: "#register",
  },
  {
    id: "event-3",
    title: "Cybersecurity Awareness Webinar",
    date: "April 28, 2026",
    time: "3:00 PM - 4:30 PM PKT",
    location: "Online (Zoom)",
    type: "Webinar",
    description:
      "Free webinar on emerging cyber threats and best practices for individuals and small businesses. Q&A session with certified security professionals.",
    imageUrl:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&auto=format",
    isPast: false,
    registrationLink: "#register",
  },
  {
    id: "event-4",
    title: "Karachi Tech Meetup: Open Source",
    date: "May 5, 2026",
    time: "6:30 PM - 9:00 PM PKT",
    location: "The Nest I/O, Karachi",
    type: "Meetup",
    description:
      "Monthly community gathering for developers, designers, and tech enthusiasts. This month's theme: Contributing to Open Source. Lightning talks and pizza!",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop&auto=format",
    isPast: false,
    registrationLink: "#register",
  },
  {
    id: "event-5",
    title: "Hack for Pakistan 2026",
    date: "July 18-20, 2026",
    time: "48 Hours (Fri 6PM - Sun 6PM)",
    location: "NASTP Headquarters, Islamabad",
    type: "Hackathon",
    description:
      "Pakistan's largest civic tech hackathon. Build solutions for education, healthcare, and governance. Prizes worth PKR 2,000,000+. Mentors from top tech companies.",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop&auto=format",
    isPast: false,
    registrationLink: "#register",
  },
  // Past events
  {
    id: "past-1",
    title: "Women in Tech Leadership Panel",
    date: "March 8, 2026",
    time: "2:00 PM - 5:00 PM PKT",
    location: "NASTP Auditorium, Islamabad",
    type: "Conference",
    description:
      "Inspiring panel discussion with women leaders in Pakistan's tech industry, followed by networking reception. Over 200 attendees joined us.",
    imageUrl:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop&auto=format",
    isPast: true,
  },
  {
    id: "past-2",
    title: "Cloud Computing Bootcamp",
    date: "February 10-12, 2026",
    time: "10:00 AM - 4:00 PM PKT",
    location: "Online (Zoom)",
    type: "Workshop",
    description:
      "Three-day hands-on bootcamp covering AWS, Azure, and GCP fundamentals. Participants earned certificates and cloud credits.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format",
    isPast: true,
  },
  {
    id: "past-3",
    title: "Startup Grind Islamabad",
    date: "January 20, 2026",
    time: "5:00 PM - 8:00 PM PKT",
    location: "COLABS, Islamabad",
    type: "Meetup",
    description:
      "Fireside chat with successful Pakistani founders, followed by startup pitches and networking.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop&auto=format",
    isPast: true,
  },
];

const Events: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const rainbowDivs = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className="rainbow" />
  ));

  const filteredEvents = eventsData.filter((event) =>
    activeTab === "upcoming" ? !event.isPast : event.isPast
  );

  const EventCard: React.FC<{ event: EventItem }> = ({ event }) => (
    <div className={`event-card ${event.isPast ? "past" : ""}`}>
      <div className="event-image">
        <img src={event.imageUrl} alt={event.title} loading="lazy" />
        <span className="event-type-badge">{event.type}</span>
      </div>
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <div className="event-datetime">
          <span className="event-date">📅 {event.date}</span>
          <span className="event-time">⏰ {event.time}</span>
        </div>
        <div className="event-location">
          <span>📍 {event.location}</span>
        </div>
        <p className="event-description">{event.description}</p>
        {!event.isPast && event.registrationLink && (
          <a
            href={event.registrationLink}
            className="register-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now →
          </a>
        )}
        {event.isPast && <span className="past-label">Past Event</span>}
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
      <section className="events">
        <h1 className="page-title">Events & Programs</h1>
        <p className="page-subtitle">
          Join our workshops, conferences, and community gatherings.
        </p>

        {/* Tab Switcher */}
        <div className="tab-container">
          <button
            className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Events
          </button>
          <button
            className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past Events
          </button>
        </div>

        {/* Events Grid */}
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="no-events">No events to display.</p>
          )}
        </div>

        {/* Host an Event CTA */}
        <div className="host-cta">
          <h2>Want to host an event with us?</h2>
          <p>
            We partner with community organizers, companies, and educational
            institutions to bring impactful events to Pakistan's tech ecosystem.
          </p>
          <a href="mailto:events@nastp.gov.pk" className="host-btn">
            Propose an Event
          </a>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        /* ===== Rainbow Background ===== */
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

        /* ===== Events Page ===== */
        .events {
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

        /* Events Grid */
        .events-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .events-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Event Card */
        .event-card {
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

        .event-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.8);
          border-color: rgba(10, 228, 72, 0.4);
          transform: translateY(-3px);
        }

        .event-card.past {
          opacity: 0.85;
          border-color: rgba(255, 255, 255, 0.1);
        }

        .event-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .event-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .event-card:hover .event-image img {
          transform: scale(1.05);
        }

        .event-type-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(10, 228, 72, 0.9);
          color: #000;
          padding: 0.3rem 1rem;
          border-radius: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .event-content {
          padding: 1.75rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .event-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .event-datetime {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 0.5rem;
          color: #0ae448;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .event-location {
          color: #0ae448;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .event-description {
          color: #ddd;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .register-btn {
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
          text-decoration: none;
          display: inline-block;
        }

        .register-btn:hover {
          background: #0ae448;
          color: #000;
          box-shadow: 0 4px 12px rgba(10, 228, 72, 0.3);
        }

        .past-label {
          color: #888;
          font-size: 0.9rem;
          font-weight: 500;
          align-self: flex-start;
          border: 1px solid #555;
          padding: 0.4rem 1rem;
          border-radius: 2rem;
        }

        .no-events {
          color: #aaa;
          font-size: 1.25rem;
          text-align: center;
          padding: 3rem;
        }

        /* Host CTA */
        .host-cta {
          margin-top: 2rem;
          padding: 2.5rem;
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(10, 228, 72, 0.2);
          text-align: center;
        }

        .host-cta h2 {
          color: #ffffff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .host-cta p {
          color: #ccc;
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto 2rem;
          line-height: 1.6;
        }

        .host-btn {
          background: #0ae448;
          color: #000;
          font-weight: 700;
          padding: 0.875rem 2rem;
          border-radius: 2rem;
          font-size: 1rem;
          text-decoration: none;
          display: inline-block;
          transition: all 0.2s;
        }

        .host-btn:hover {
          background: #ffffff;
          color: #000;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
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

export default Events;