import React, { useState } from "react";

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

  const getCategoryColor = (colorClass: string): string => {
    return colorClass === "brand" ? "#0ae448" : "#3b82f6";
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
    <section className="blog-section">
      <div className="blog-container">
        {/* Header */}
        <h2 className="blog-heading">
          News & <span className="blog-heading-highlight">Intel.</span>
        </h2>

        {/* Category Filters */}
        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? "active" : ""}`}
              onClick={() => {
                setActiveFilter(category);
                setVisiblePosts(6);
              }}
            >
              {category === "all" ? "All News" : category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {displayedPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-card-image">
                <img src={post.imageUrl} alt={post.title} loading="lazy" />
                <span 
                  className="blog-category-badge"
                  style={{ background: getCategoryColor(post.colorClass) }}
                >
                  {getCategoryIcon(post.icon)} {post.category}
                </span>
              </div>
              <div className="blog-card-content">
                <div className="blog-meta">
                  <span className="blog-date">{post.date}</span>
                  <span className="blog-separator">•</span>
                  <span className="blog-read-time">{post.readTime}</span>
                </div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-description">{post.description}</p>
                <div className="blog-footer">
                  <span className="blog-author">By {post.author}</span>
                  <button className="read-more-btn">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        {filteredPosts.length > visiblePosts && (
          <div className="load-more-container">
            <button 
              className="load-more-btn"
              onClick={() => setVisiblePosts(prev => prev + 6)}
            >
              Load More Articles
            </button>
          </div>
        )}

        
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* ===== Blog Section ===== */
        .blog-section {
          min-height: 100vh;
          background: #000000;
          font-family: 'Inter', sans-serif;
          color: #ffffff;
          padding-top: 10rem;
          padding-bottom: 8rem;
        }

        .blog-container {
          max-width: 80rem; /* max-w-7xl */
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* Heading */
        .blog-heading {
          font-family: 'Inter', sans-serif;
          font-size: 3rem;
          font-weight: 900;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 3rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .blog-heading-highlight {
          color: #0ae448;
        }

        /* Category Filters */
        .filter-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #9ca3af;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .filter-btn:hover {
          border-color: #0ae448;
          color: #ffffff;
          background: rgba(10, 228, 72, 0.08);
        }

        .filter-btn.active {
          background: #0ae448;
          border-color: #0ae448;
          color: #000000;
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Blog Card */
        .blog-card {
          background: rgba(20, 20, 20, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-6px);
          border-color: rgba(10, 228, 72, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(10, 228, 72, 0.1);
        }

        .blog-card-image {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .blog-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .blog-card:hover .blog-card-image img {
          transform: scale(1.08);
        }

        .blog-category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          color: #000000;
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          backdrop-filter: blur(4px);
        }

        .blog-card-content {
          padding: 1.75rem;
        }

        .blog-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .blog-separator {
          color: #4b5563;
        }

        .blog-date {
          color: #9ca3af;
        }

        .blog-read-time {
          color: #0ae448;
          font-weight: 600;
        }

        .blog-title {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #ffffff;
          line-height: 1.3;
        }

        .blog-card:hover .blog-title {
          color: #0ae448;
        }

        .blog-description {
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 1.25rem;
          font-size: 0.95rem;
        }

        .blog-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .blog-author {
          color: #6b7280;
          font-size: 0.85rem;
        }

        .read-more-btn {
          background: transparent;
          border: none;
          color: #0ae448;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .read-more-btn:hover {
          color: #ffffff;
          transform: translateX(4px);
        }

        /* Load More Button */
        .load-more-container {
          text-align: center;
          margin-top: 3rem;
        }

        .load-more-btn {
          background: transparent;
          border: 2px solid #0ae448;
          color: #0ae448;
          font-weight: 700;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .load-more-btn:hover {
          background: #0ae448;
          color: #000000;
          box-shadow: 0 4px 20px rgba(10, 228, 72, 0.3);
        }

        /* Newsletter CTA */
        .newsletter-cta {
          margin-top: 5rem;
          padding: 3rem 2rem;
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 2rem;
          border: 1px solid rgba(10, 228, 72, 0.2);
          text-align: center;
        }

        .newsletter-cta h2 {
          color: #ffffff;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }

        .newsletter-cta p {
          color: #9ca3af;
          font-size: 1.1rem;
          margin-bottom: 2rem;
        }

        .newsletter-form {
          display: flex;
          gap: 0.75rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .newsletter-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 0.85rem 1.5rem;
          color: #ffffff;
          font-family: inherit;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .newsletter-input:focus {
          border-color: #0ae448;
        }

        .newsletter-input::placeholder {
          color: #6b7280;
        }

        .newsletter-btn {
          background: #0ae448;
          color: #000000;
          font-weight: 700;
          padding: 0.85rem 1.75rem;
          border-radius: 9999px;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          background: #ffffff;
          box-shadow: 0 4px 20px rgba(10, 228, 72, 0.3);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .blog-section {
            padding-top: 6rem;
            padding-bottom: 4rem;
          }

          .blog-heading {
            font-size: 2.25rem;
          }

          .blog-card-image {
            height: 180px;
          }

          .newsletter-form {
            flex-direction: column;
          }

          .newsletter-input,
          .newsletter-btn {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .blog-heading {
            font-size: 1.75rem;
          }

          .blog-title {
            font-size: 1.15rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Blog;