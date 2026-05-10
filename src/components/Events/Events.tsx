import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../AnimatedTitle";
import AnimatedBackground from "../AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

// Blog type definition
interface BlogPost {
  id: string;
  title: string;
  category: string;
  icon: string;
  colorClass: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "NCAT 2026 at NASTP",
    category: "Tech Conference",
    icon: "fa-network-wired",
    colorClass: "brand",
    description: "YUNI is organizing the National Conference of Applied Technology focusing on cybersecurity.",
    date: "March 15, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&auto=format",
    author: "YUNI Team",
  },
  {
    id: "blog-2",
    title: "Winter Warmth Drive",
    category: "CSR Initiative",
    icon: "fa-hand-holding-heart",
    colorClass: "blue",
    description: "The YUNI community came together to distribute essential winter supplies to roadside communities.",
    date: "January 10, 2026",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop&auto=format",
    author: "CSR Team",
  },
  {
    id: "blog-3",
    title: "Cybersecurity Bootcamp Graduation",
    category: "Education",
    icon: "fa-graduation-cap",
    colorClass: "brand",
    description: "First cohort of ethical hacking students complete their training with 100% certification success rate.",
    date: "February 28, 2026",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop&auto=format",
    author: "Academics Team",
  },
  {
    id: "blog-4",
    title: "AI in Fintech Summit",
    category: "Industry Event",
    icon: "fa-robot",
    colorClass: "brand",
    description: "Exploring the intersection of artificial intelligence and financial technology in Pakistan.",
    date: "April 2, 2026",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop&auto=format",
    author: "Tech Team",
  },
  {
    id: "blog-5",
    title: "Community Iftar Gathering",
    category: "Community",
    icon: "fa-users",
    colorClass: "blue",
    description: "YUNI hosted a massive community iftar bringing together students, mentors, and industry leaders.",
    date: "March 25, 2026",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=400&fit=crop&auto=format",
    author: "Community Team",
  },
  {
    id: "blog-6",
    title: "Partnership with AWS Educate",
    category: "Partnership",
    icon: "fa-handshake",
    colorClass: "brand",
    description: "YUNI becomes official AWS Educate partner, bringing cloud computing resources to students.",
    date: "February 14, 2026",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&auto=format",
    author: "Partnerships Team",
  },
];

const Blog: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visiblePosts, setVisiblePosts] = useState<number>(6);

  // Filter categories
  const categories = ["all", "Tech Conference", "CSR Initiative", "Education", "Industry Event", "Community", "Partnership"];

  const filteredPosts = activeFilter === "all" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  useEffect(() => {
    const cards = document.querySelectorAll('.blog-card');
    if (cards.length > 0) {
      gsap.fromTo(cards, 
        { 
          y: 80, 
          opacity: 0,
          scale: 0.9,
          filter: "blur(10px)"
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [displayedPosts]);

  const getCategoryColor = (colorClass: string): string => {
    return colorClass === "brand" ? "var(--pk-green)" : "var(--pk-green-light)";
  };

  const getCategoryIcon = (icon: string): string => {
    const iconMap: { [key: string]: string } = {
      "fa-network-wired": "🌐",
      "fa-hand-holding-heart": "🤝",
      "fa-graduation-cap": "🎓",
      "fa-robot": "🤖",
      "fa-users": "👥",
      "fa-handshake": "🤝",
    };
    return iconMap[icon] || "📰";
  };


  return (
    <section className="events-premium-section">
      <AnimatedBackground />
      {/* Background Light Orbs */}

      <div className="events-container">
        {/* Header */}
        <div className="title-wrapper">
          <AnimatedTitle>Intelligence & Events</AnimatedTitle>
          <p className="events-subtitle-tech">Tracking the digital frontier and community milestones in real-time.</p>
        </div>

        {/* Category Filters */}
        <div className="filter-container-premium">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn-events ${activeFilter === category ? "active" : ""}`}
              onClick={() => {
                setActiveFilter(category);
                setVisiblePosts(6);
              }}
            >
              <span className="btn-text">{category === "all" ? "All Updates" : category}</span>
              <span className="btn-glow"></span>
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid-premium">
          {displayedPosts.map((post) => (
            <article 
              key={post.id} 
              className="blog-card-premium card-glow-border"
            >
              <div className="blog-card-inner">
                <div className="blog-card-image">
                  <img src={post.imageUrl} alt={post.title} loading="lazy" />
                  <div className="scanline-overlay"></div>
                  <div className="image-vignette"></div>
                  <span 
                    className="blog-category-badge-premium"
                    style={{ background: getCategoryColor(post.colorClass) }}
                  >
                    <span className="badge-icon">{getCategoryIcon(post.icon)}</span>
                    <span className="badge-text">{post.category}</span>
                  </span>
                </div>
                <div className="blog-card-content">
                  <div className="blog-meta-premium">
                    <span className="meta-item date">{post.date}</span>
                    <span className="meta-separator">/</span>
                    <span className="meta-item read-time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-title-tech">{post.title}</h3>
                  <p className="blog-description-tech">{post.description}</p>
                  <div className="blog-footer-tech">
                    <div className="author-info">
                      <div className="author-avatar-tech">{post.author.charAt(0)}</div>
                      <span className="author-name">{post.author}</span>
                    </div>
                    <button className="read-more-btn-tech">
                      Explore <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > visiblePosts && (
          <div className="load-more-container-tech">
            <button 
              className="load-more-btn-premium"
              onClick={() => setVisiblePosts(prev => prev + 6)}
            >
              Fetch More Intel
            </button>
          </div>
        )}
      </div>

      <style>{`
        .events-premium-section {
          min-height: 100vh;
          background: transparent;
          font-family: 'Inter', sans-serif;
          color: var(--text-primary);
          padding-top: 12rem;
          padding-bottom: 8rem;
          position: relative;
          z-index: 1;
          overflow-x: hidden;
        }

        .events-container {
          max-width: 90rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .events-subtitle-tech {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-top: 1.5rem;
          opacity: 0.8;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        /* --- Filters --- */
        .filter-container-premium {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 5rem;
        }

        .filter-btn-events {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          color: var(--text-secondary);
          padding: 0.8rem 1.8rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.4s var(--transition-smooth);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .filter-btn-events:hover {
          border-color: var(--pk-green);
          color: var(--pk-green);
          transform: translateY(-3px);
        }

        .filter-btn-events.active {
          background: var(--pk-green);
          border-color: var(--pk-green);
          color: #ffffff;
          box-shadow: 0 10px 25px var(--pk-green-glow);
        }

        /* --- Grid --- */
        .blog-grid-premium {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 3rem;
        }

        /* --- Cards --- */
        .blog-card-premium {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-radius: 2.5rem;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          transition: all 0.6s var(--transition-smooth);
          display: flex;
          flex-direction: column;
        }

        .blog-card-inner {
          position: relative;
          z-index: 2;
          background: transparent;
        }

        .blog-card-premium:hover {
          transform: translateY(-15px);
          border-color: var(--pk-green);
          box-shadow: 0 40px 80px var(--glass-shadow);
        }

        .blog-card-image {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.5s var(--transition-smooth);
          filter: brightness(0.9) contrast(1.1);
        }

        .blog-card-premium:hover .blog-card-image img {
          transform: scale(1.1);
        }

        .scanline-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          opacity: 0.3;
        }

        .image-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, transparent 40%, rgba(0,0,0,0.5) 100%);
          pointer-events: none;
        }

        .blog-category-badge-premium {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          color: #ffffff;
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .blog-card-content {
          padding: 2.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .blog-meta-premium {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-tertiary);
        }

        .meta-item.read-time { color: var(--pk-green); }

        .blog-title-tech {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 1.2rem;
          color: var(--text-primary);
          line-height: 1.2;
          transition: color 0.3s ease;
        }

        .blog-card-premium:hover .blog-title-tech {
          color: var(--pk-green);
        }

        .blog-description-tech {
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 2.5rem;
          font-size: 1.05rem;
          flex: 1;
        }

        .blog-footer-tech {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-light);
        }

        .author-info { display: flex; align-items: center; gap: 0.8rem; }
        .author-avatar-tech { 
          width: 32px; height: 32px; background: var(--pk-green); color: #fff; 
          border-radius: 50%; display: flex; align-items: center; justify-content: center; 
          font-weight: 900; font-size: 0.8rem;
        }
        .author-name { color: var(--text-secondary); font-size: 0.9rem; font-weight: 600; }

        .read-more-btn-tech {
          background: transparent; border: none; color: var(--pk-green); font-weight: 800; 
          cursor: pointer; display: flex; align-items: center; gap: 0.5rem; transition: all 0.3s ease;
        }
        .read-more-btn-tech:hover { transform: translateX(8px); color: var(--pk-green-light); }

        /* --- Load More --- */
        .load-more-container-tech { text-align: center; margin-top: 6rem; }
        .load-more-btn-premium { 
          background: rgba(0, 230, 118, 0.05); border: 2px solid var(--pk-green); 
          color: var(--pk-green); font-weight: 900; padding: 1.5rem 4rem; border-radius: 1.5rem; 
          font-size: 1.1rem; cursor: pointer; transition: all 0.4s var(--transition-smooth);
          text-transform: uppercase; letter-spacing: 0.2em;
        }
        .load-more-btn-premium:hover { 
          background: var(--pk-green); color: #fff; box-shadow: 0 15px 40px var(--pk-green-glow); 
          transform: translateY(-5px); 
        }

        @media (max-width: 768px) {
          .blog-grid-premium { grid-template-columns: 1fr; }
          .detail-panel-premium { padding: 2rem; }
        }
      `}</style>
    </section>
  );
};

export default Blog;