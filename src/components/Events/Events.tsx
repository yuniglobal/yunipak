import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../AnimatedTitle";
import AnimatedBackground from "../AnimatedBackground";
import { MapPin, CreditCard, UserCheck, ShieldCheck, Calendar, Clock } from 'lucide-react';

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
  externalLink?: string;
}

interface EnrollmentData {
  fullName: string;
  fatherName: string;
  cnic: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phoneNumber: string;
  alternatePhone: string;
  currentAddress: string;
  city: string;
  province: string;
  highestQualification: string;
  institution: string;
  yearOfCompletion: string;
  percentage: string;
  courseId: string;
  courseTitle: string;
  coursePrice: string;
  paymentMethod: string;
  bankName: string;
  bankAccountTitle: string;
  bankAccountNumber: string;
  transactionId: string;
  transactionDate: string;
  transactionAmount: string;
  currentEmployment: string;
  organization: string;
  designation: string;
  hearAboutUs: string;
  referralCode: string;
  whyJoin: string;
  declaration: boolean;
  timestamp: string;
  status: string;
}

const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbxv3FVEPexjV4hLcAWNj6FafStyFzqzrJWzo-Zk8FJFOWkxw-mh9bxNi-ZYbwnLHyfzxg/exec';

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
  {
    id: "blog-7",
    title: "Upcoming Summer Trainings Trailer",
    category: "Summit",
    icon: "fa-rocket",
    colorClass: "brand",
    description: "A first look at the upcoming summer trainings lineup, plus the Open Learning Weekend preview for students and professionals.",
    date: "May 29, 2026",
    readTime: "2 min read",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&auto=format",
    author: "Events Team",
  },
];

const Blog: React.FC = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState<"intel" | "registration">("intel");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visiblePosts, setVisiblePosts] = useState<number>(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<EnrollmentData>({
    fullName: "", fatherName: "", cnic: "", dateOfBirth: "", gender: "",
    email: "", phoneNumber: "", alternatePhone: "", currentAddress: "",
    city: "", province: "Punjab", highestQualification: "", institution: "",
    yearOfCompletion: "", percentage: "", courseId: "summit-2026", courseTitle: "Future-Ready Summit",
    coursePrice: "500", paymentMethod: "bank", bankName: "", bankAccountTitle: "",
    bankAccountNumber: "", transactionId: "", transactionDate: "",
    transactionAmount: "500", currentEmployment: "", organization: "",
    designation: "", hearAboutUs: "", referralCode: "", whyJoin: "",
    declaration: false, timestamp: new Date().toISOString(), status: "pending",
  });

  // Filter categories
  const categories = ["all", "Summit", "Tech Conference", "CSR Initiative", "Education", "Industry Event", "Community", "Partnership"];

  const filteredPosts = activeFilter === "all"
    ? blogPosts
    : blogPosts.filter(post => post.category === activeFilter);

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('register') === 'summit') {
      setCurrentView("registration");
    }
  }, [location]);

  useEffect(() => {
    if (currentView === "intel") {
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
    }
  }, [displayedPosts, currentView]);

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
      "fa-rocket": "🚀",
    };
    return iconMap[icon] || "📰";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleRegister = () => {
    setCurrentView("registration");
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await fetch(GOOGLE_SHEETS_API, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitStatus({ type: 'success', message: 'Registration transmitted successfully! See you at the Summit.' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Data sync failed. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderRegistrationView = () => (
    <div className="registration-view">
      <div className="registration-container-premium">
        <button onClick={() => setCurrentView("intel")} className="cancel-btn-tech">CANCEL</button>
        <h2 className="registration-title-tech">Summit <span className="text-gradient">Registration</span> Gateway</h2>
        
        <div className="summit-schedule-premium">
          <div className="schedule-badge">
            <Calendar size={16} />
            <span>16-17 May, 2026 (Sat-Sun)</span>
          </div>
          <div className="schedule-badge">
            <Clock size={16} />
            <span>09:00 AM - 06:00 PM (PST)</span>
          </div>
          <div className="schedule-badge">
            <MapPin size={16} />
            <span>NICAT, Rawalpindi</span>
          </div>
        </div>

        {submitStatus && (
          <div className={`status-banner-tech ${submitStatus.type}`}>
            <span className="icon">{submitStatus.type === 'success' ? '✓' : '⚠'}</span>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="registration-form-premium">
          <div className="form-grid-premium">
            <div className="form-left-col">
              <section className="form-section-tech">
                <h3 className="section-header-tech"><CreditCard size={20} /> 1. Payment Protocol</h3>
                <div className="payment-nodes">
                  <div className="payment-node-card active-node">
                    <h4>Bank Al Falah</h4>
                    <div className="node-details">
                      <p><span>Title:</span> YUNI-TY x NICAT</p>
                      <p><span>Account Number:</span> 0140-1010831162</p>
                      <p><span>Branch:</span> Rawalpindi</p>
                    </div>
                  </div>
                </div>

                <div className="input-group-tech">
                  <div className="field-tech">
                    <label>Network</label>
                    <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required>
                      <option value="bank">Bank Al Falah</option>
                    </select>
                  </div>
                  <div className="field-tech">
                    <label>TXN ID / Hash</label>
                    <input type="text" name="transactionId" placeholder="Enter RefID" value={formData.transactionId} onChange={handleInputChange} required />
                  </div>
                  <div className="field-tech">
                    <label>Timestamp</label>
                    <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleInputChange} required />
                  </div>
                  <div className="field-tech">
                    <label>Credits (PKR)</label>
                    <input type="text" name="transactionAmount" value={formData.transactionAmount} readOnly />
                  </div>
                </div>
              </section>
            </div>

            <div className="form-right-col">
              <section className="form-section-tech">
                <h3 className="section-header-tech"><UserCheck size={20} /> 2. Identity Sync</h3>
                <div className="input-group-tech">
                  <div className="field-tech full"><label>Full Legal Name</label><input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required /></div>
                  <div className="field-tech"><label>CNIC (Verified)</label><input type="text" name="cnic" placeholder="XXXXX-XXXXXXX-X" value={formData.cnic} onChange={handleInputChange} required /></div>
                  <div className="field-tech"><label>Email Address</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} required /></div>
                  <div className="field-tech full"><label>Comms (WhatsApp)</label><input type="tel" name="phoneNumber" placeholder="03XXXXXXXXX" value={formData.phoneNumber} onChange={handleInputChange} required /></div>
                </div>
              </section>

            </div>
          </div>

          <section className="form-section-tech validation-section-premium">
            <h3 className="section-header-tech"><ShieldCheck size={20} /> 3. Validation</h3>
            <div className="validation-content-premium">
              <div className="declaration-tech">
                <label className="checkbox-tech">
                  <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleInputChange} required />
                  <span className="checkmark-tech"></span>
                  I confirm my participation in the Summit.
                </label>
              </div>
              <div className="form-actions-tech">
                <button type="submit" className="submit-btn-premium" disabled={isSubmitting}>
                  {isSubmitting ? 'Syncing...' : 'Confirm Registration'}
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </div>
  );


  return (
    <section className="events-premium-section">
      <AnimatedBackground />
      {/* Background Light Orbs */}

      {currentView === "registration" ? (
        renderRegistrationView()
      ) : (
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
                    {post.externalLink ? (
                      <button 
                        onClick={handleRegister}
                        className="read-more-btn-tech"
                      >
                        Register Now <span className="arrow">→</span>
                      </button>
                    ) : (
                      <button className="read-more-btn-tech">
                        Explore <span className="arrow">→</span>
                      </button>
                    )}
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
    )}

      <style>{`
        .events-premium-section {
          min-height: 100vh;
          background: transparent;
          font-family: 'Inter', sans-serif;
          color: var(--text-primary);
          padding-top: 8rem;
          padding-bottom: 8rem;
          position: relative;
          z-index: 1;
        }

        .events-container {
          max-width: 90rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .events-subtitle-premium {
          color: var(--text-secondary);
          font-size: 1.15rem;
          margin-top: 1.5rem;
          opacity: 0.8;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
          text-align: center;
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
          color: var(--text-primary);
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
          color: var(--text-primary);
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 8px 20px var(--glass-shadow);
          border: 1px solid var(--glass-border);
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

        .summit-highlight-banner {
          background: rgba(0, 230, 118, 0.05);
          border: 1px solid var(--pk-green);
          border-radius: 20px;
          padding: 1.5rem 2.5rem;
          margin-bottom: 4rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .summit-highlight-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(0, 230, 118, 0.1), transparent);
          transform: translateX(-100%);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }

        .summit-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .summit-tag {
          background: var(--pk-green);
          color: #000;
          font-weight: 900;
          font-size: 0.7rem;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          text-transform: uppercase;
        }

        .summit-text h3 {
          font-size: 1.4rem;
          margin: 0;
          color: var(--text-primary);
        }

        .summit-text p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin: 0.2rem 0 0;
          font-weight: 600;
        }

        .summit-btn {
          background: var(--pk-green);
          color: #000;
          padding: 0.8rem 1.5rem;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.9rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .summit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px var(--pk-green-glow);
        }

        @media (max-width: 1024px) {
          .summit-content { flex-direction: column; text-align: center; gap: 1rem; }
          .summit-highlight-banner { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .events-container,
          .trainings-view,
          .registration-view {
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .filter-container-premium {
            justify-content: flex-start;
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.5rem;
            -webkit-overflow-scrolling: touch;
          }

          .filter-btn-events {
            flex: 0 0 auto;
            padding: 0.8rem 1rem;
          }

          .blog-grid-premium {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .blog-card-image {
            height: 220px;
          }

          .blog-card-content {
            padding: 1.5rem;
          }

          .blog-title-tech {
            font-size: 1.45rem;
          }

          .blog-description-tech {
            font-size: 0.98rem;
          }

          .blog-footer-tech {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .summit-highlight-banner {
            padding: 1.25rem;
            margin-bottom: 2.5rem;
          }

          .summit-text h3 {
            font-size: 1.2rem;
          }

          .registration-view {
            padding-top: 6rem;
          }

          .registration-container-premium {
            border-radius: 2rem;
            padding: 1.5rem;
          }

          .summit-schedule-premium {
            gap: 0.75rem;
            margin-bottom: 2rem;
          }

          .cancel-btn-tech {
            position: static;
            margin-left: auto;
            margin-bottom: 1rem;
          }

          .form-grid-premium,
          .input-group-tech,
          .form-row-premium {
            grid-template-columns: 1fr;
          }

          .form-section-tech {
            padding: 1.25rem;
          }

          .section-header-tech {
            gap: 0.5rem;
            font-size: 1rem;
          }
        }

        /* --- Registration Form Styles --- */
        .registration-view { 
          padding: 8rem 2rem 5rem; 
          max-width: 1400px; 
          margin: 0 auto; 
          animation: fadeIn 0.6s ease; 
          width: 100%; 
          display: flex;
          justify-content: center;
          box-sizing: border-box; 
        }
        .registration-container-premium { 
          background: var(--glass-bg); 
          backdrop-filter: blur(40px); 
          border-radius: 4rem; 
          padding: 5rem 5%; 
          border: 1px solid var(--glass-border); 
          position: relative; 
          box-shadow: 0 50px 100px rgba(0,0,0,0.5); 
          width: 100%; 
          max-width: 100%;
          box-sizing: border-box; 
          display: flex;
          flex-direction: column;
        }
        .registration-title-tech { 
          font-size: clamp(2rem, 5vw, 3.5rem); 
          font-weight: 900; 
          margin-bottom: 2rem; 
          text-align: center; 
          color: var(--pk-green); 
          text-transform: uppercase; 
          letter-spacing: 0.2em; 
          text-shadow: 0 0 30px var(--pk-green-glow-subtle); 
          line-height: 1.2; 
        }

        .summit-schedule-premium {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 5rem;
        }
        .schedule-badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          padding: 0.6rem 1.2rem;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }
        .schedule-badge svg { color: var(--pk-green); }

        .cancel-btn-tech { position: absolute; top: 3rem; right: 4rem; background: rgba(255, 50, 50, 0.05); border: 1px solid rgba(255, 50, 50, 0.2); color: #ff4d4d; padding: 0.8rem 1.6rem; border-radius: 15px; font-weight: 800; font-size: 0.8rem; cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.1em; z-index: 10; }
        .cancel-btn-tech:hover { background: #ff4d4d; color: #fff; box-shadow: 0 0 20px rgba(255, 77, 77, 0.4); transform: translateY(-2px); }

        .form-grid-premium { 
          display: grid; 
          grid-template-columns: repeat(2, minmax(0, 1fr)); 
          gap: 4rem; 
          width: 100%; 
          align-items: start; 
          margin-bottom: 3rem; 
          box-sizing: border-box;
        }
        .section-header-tech { font-size: 1.2rem; font-weight: 800; color: var(--pk-green); margin-bottom: 2rem; text-transform: uppercase; letter-spacing: 0.1em; display: flex; align-items: center; gap: 0.8rem; }
        .form-section-tech { margin-bottom: 2rem; }

        .validation-section-premium { 
          border-top: 1px solid var(--glass-border); 
          padding-top: 3rem; 
          margin-top: 1rem;
        }
        .validation-content-premium {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }

        .payment-nodes { display: grid; gap: 1.5rem; margin-bottom: 2.5rem; }
        .payment-node-card { background: rgba(255,255,255,0.03); border: 1px solid var(--border-light); padding: 2rem; border-radius: 25px; transition: all 0.3s ease; }
        .payment-node-card.active-node { border-color: var(--pk-green); background: rgba(0, 230, 118, 0.05); box-shadow: 0 10px 30px rgba(0, 230, 118, 0.1); }
        .payment-node-card h4 { margin: 0 0 1.2rem; font-size: 1.2rem; color: var(--pk-green); font-weight: 900; text-transform: uppercase; }
        .node-details p { margin: 0.6rem 0; font-size: 1rem; color: var(--text-secondary); }
        .node-details span { color: var(--text-tertiary); font-weight: 700; width: 100px; display: inline-block; }

        .input-group-tech { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem; width: 100%; box-sizing: border-box; }
        .field-tech { display: flex; flex-direction: column; gap: 0.6rem; }
        .field-tech.full { grid-column: span 2; }
        .field-tech label { font-size: 0.85rem; font-weight: 800; color: var(--text-tertiary); text-transform: uppercase; margin-left: 0.5rem; letter-spacing: 0.05em; }
        .field-tech input, .field-tech select { background: var(--bg-elevated); border: 1px solid var(--border-light); padding: 1.2rem 1.5rem; border-radius: 15px; color: var(--text-primary); font-size: 1.05rem; transition: all 0.3s ease; width: 100%; box-sizing: border-box; }
        .field-tech select { color-scheme: dark; }
        .field-tech select option { background: var(--bg-elevated); color: var(--text-primary); }
        .field-tech input:focus, .field-tech select:focus { border-color: var(--pk-green); background: var(--bg-elevated); outline: none; box-shadow: 0 0 20px var(--pk-green-glow-subtle); transform: translateY(-2px); }

        .declaration-tech { margin-bottom: 2.5rem; }
        .checkbox-tech { display: flex; align-items: center; gap: 1rem; cursor: pointer; color: var(--text-secondary); font-weight: 600; font-size: 0.95rem; }
        .checkbox-tech input { width: 20px; height: 20px; accent-color: var(--pk-green); }

        .submit-btn-premium { width: 100%; background: var(--pk-green); color: #000; padding: 1.2rem; border-radius: 15px; font-weight: 900; font-size: 1.1rem; border: none; cursor: pointer; transition: all 0.4s ease; text-transform: uppercase; letter-spacing: 0.1em; }
        .submit-btn-premium:hover:not(:disabled) { transform: translateY(-5px); box-shadow: 0 20px 40px var(--pk-green-glow); }
        .submit-btn-premium:disabled { opacity: 0.5; cursor: not-allowed; }

        .status-banner-tech { padding: 1.2rem; border-radius: 15px; margin-bottom: 3rem; display: flex; align-items: center; gap: 1rem; font-weight: 700; }
        .status-banner-tech.success { background: rgba(0, 230, 118, 0.1); color: var(--pk-green); border: 1px solid var(--pk-green); }
        .status-banner-tech.error { background: rgba(255, 77, 77, 0.1); color: #ff4d4d; border: 1px solid #ff4d4d; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 900px) {
          .form-grid-premium { grid-template-columns: 1fr; gap: 2rem; }
          .registration-container-premium { padding: 2rem; }
        }
      `}</style>
    </section>
  );
};

export default Blog;