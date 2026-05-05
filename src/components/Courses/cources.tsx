import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

// Course type definition
interface CourseItem {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: "Tech" | "Cybersecurity" | "AI" | "E-Commerce" | "Code" | "Communications";
  description: string;
  imageUrl: string;
  isCertification: boolean;
  enrollmentLink?: string;
  price?: string;
}

// Sample courses data
const coursesData: CourseItem[] = [
  {
    id: "course-1",
    title: "Cybersecurity Fundamentals",
    instructor: "Security Expert",
    duration: "8 weeks • 5 hrs/week",
    level: "Intermediate",
    category: "Cybersecurity",
    description:
      "Learn the foundations of cybersecurity including threat detection, risk assessment, and security protocols. Get hands-on experience with real security tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "Rs. 15,000",
  },
  {
    id: "course-2",
    title: "Ethical Hacking Masterclass",
    instructor: "White Hat Expert",
    duration: "10 weeks • 6 hrs/week",
    level: "Advanced",
    category: "Tech",
    description:
      "Master ethical hacking techniques including penetration testing, vulnerability scanning, and network security. Includes hands-on lab sessions.",
    imageUrl:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop&auto=format",
    isCertification: false,
    enrollmentLink: "#enroll",
    price: "Rs. 18,000",
  },
  {
    id: "course-3",
    title: "Prompt Engineering & AI",
    instructor: "AI Specialist",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "AI",
    description:
      "Learn the art of prompt engineering for AI models. Create effective prompts for ChatGPT, DALL-E, and other AI tools. No coding experience required.",
    imageUrl:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop&auto=format",
    isCertification: false,
    enrollmentLink: "#enroll",
    price: "Rs. 10,000",
  },
  {
    id: "course-4",
    title: "Amazon Mastery: FBA & E-Commerce",
    instructor: "E-Commerce Guru",
    duration: "8 weeks • 5 hrs/week",
    level: "Beginner",
    category: "E-Commerce",
    description:
      "Complete Amazon FBA course covering product research, listing optimization, PPC advertising, and scaling your e-commerce business to 7 figures.",
    imageUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "Rs. 15,000",
  },
  {
    id: "course-5",
    title: "Full-Stack Web Development",
    instructor: "Senior Developer",
    duration: "12 weeks • 7 hrs/week",
    level: "Beginner",
    category: "Code",
    description:
      "Master HTML, CSS, JavaScript, React, Node.js, and databases. Build complete web applications from scratch with real-world projects.",
    imageUrl:
      "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=600&h=400&fit=crop&auto=format",
    isCertification: true,
    enrollmentLink: "#enroll",
    price: "Rs. 25,000",
  },
  {
    id: "course-6",
    title: "IELTS & PTE Preparation",
    instructor: "Language Expert",
    duration: "6 weeks • 4 hrs/week",
    level: "Beginner",
    category: "Communications",
    description:
      "Comprehensive IELTS and PTE preparation course covering all modules - Speaking, Writing, Reading, and Listening. Get your target band score.",
    imageUrl:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format",
    isCertification: false,
    enrollmentLink: "#enroll",
    price: "Rs. 8,000",
  },
];

type View = "trainings" | "course-detail" | "checkout";

const Courses: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("trainings");
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [filter, setFilter] = useState<"all" | "tech" | "ecom">("all");
  const studentsCountRef = useRef<HTMLSpanElement>(null);

  // Filter courses based on category
  const filteredCourses = coursesData.filter((course) => {
    if (filter === "all") return true;
    if (filter === "tech") {
      return ["Tech", "Cybersecurity", "AI", "Code"].includes(course.category);
    }
    if (filter === "ecom") {
      return course.category === "E-Commerce";
    }
    return true;
  });

  // Animate the students counter
  useEffect(() => {
    if (studentsCountRef.current) {
      gsap.to(studentsCountRef.current, {
        innerText: 950,
        duration: 2.5,
        snap: { innerText: 5 },
        ease: "power2.out",
      });
    }
  }, []);

  const handleViewCourse = (course: CourseItem) => {
    setSelectedCourse(course);
    setCurrentView("course-detail");
  };

  const handleEnroll = (course: CourseItem) => {
    setSelectedCourse(course);
    setCurrentView("checkout");
  };

  const handleBackToHub = () => {
    setCurrentView("trainings");
    setSelectedCourse(null);
  };

  const handleCompleteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration submitted! You will receive login details via email.");
    // In a real app, you would send data to backend
  };

  // Render Training Hub View
  const renderTrainingsView = () => (
    <div className="trainings-view">
      <div className="trainings-container">
        <h2 className="page-title">Select Your Weapon.</h2>
        
        {/* Filters */}
        <div className="filters-container">
          <button 
            onClick={() => setFilter("all")} 
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
          >
            All Programs
          </button>
          <button 
            onClick={() => setFilter("tech")} 
            className={`filter-btn ${filter === "tech" ? "active" : ""}`}
          >
            Tech & Cyber
          </button>
          <button 
            onClick={() => setFilter("ecom")} 
            className={`filter-btn ${filter === "ecom" ? "active" : ""}`}
          >
            E-Commerce
          </button>
        </div>

        {/* Course Grid */}
        <div className="course-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="course-card-hub">
              <div className="course-card-image">
                <img src={course.imageUrl} alt={course.title} />
                {course.isCertification && <span className="cert-badge">🎓 Certificate</span>}
              </div>
              <div className="course-card-content">
                <h3>{course.title}</h3>
                <p className="instructor">{course.instructor}</p>
                <p className="description">{course.description.substring(0, 100)}...</p>
                <div className="card-footer">
                  <span className="price">{course.price}</span>
                  <button onClick={() => handleViewCourse(course)} className="view-btn">
                    View Weapon <i className="arrow">→</i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render Course Detail View
  const renderCourseDetailView = () => (
    <div className="detail-view">
      <div className="detail-container">
        <button onClick={handleBackToHub} className="back-btn">
          <i className="back-arrow">←</i> Back to Hub
        </button>
        
        <div className="detail-panel">
          <div className="detail-left">
            <img src={selectedCourse?.imageUrl} alt={selectedCourse?.title} className="detail-image" />
            <div className="detail-stats">
              <div className="stat">
                <span className="stat-value">{selectedCourse?.duration}</span>
                <span className="stat-label">Duration</span>
              </div>
              <div className="stat">
                <span className="stat-value">{selectedCourse?.level}</span>
                <span className="stat-label">Level</span>
              </div>
              <div className="stat">
                <span className="stat-value">{selectedCourse?.price}</span>
                <span className="stat-label">Investment</span>
              </div>
            </div>
            {selectedCourse?.isCertification && (
              <div className="cert-notice">
                🎓 Includes Official Certificate
              </div>
            )}
          </div>
          
          <div className="detail-right">
            <h2>{selectedCourse?.title}</h2>
            <p className="instructor-detail">👤 {selectedCourse?.instructor}</p>
            <p className="description-detail">{selectedCourse?.description}</p>
            
            <h3>What You'll Learn</h3>
            <ul className="learn-list">
              <li>✅ Hands-on projects and real-world applications</li>
              <li>✅ Expert-led live sessions and mentorship</li>
              <li>✅ Community access and networking opportunities</li>
              <li>✅ Lifetime access to course materials</li>
            </ul>
            
            <button onClick={() => selectedCourse && handleEnroll(selectedCourse)} className="enroll-now-btn">
              Enroll Now → 
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Checkout View
  const renderCheckoutView = () => (
    <div className="checkout-view">
      <div className="checkout-container">
        <button onClick={handleBackToHub} className="cancel-btn">
          ← Cancel
        </button>
        <h2 className="checkout-title">Secure Registration</h2>
        
        <div className="checkout-grid">
          {/* Left Column - Payment Info */}
          <div className="payment-info">
            <h3>1. Transfer Payment</h3>
            <div className="payment-methods">
              <div className="payment-card bank-card">
                <h4><i className="icon-bank"></i> Bank Transfer (Meezan Bank)</h4>
                <p>Title: YUNI Education</p>
                <div className="account-number">0123-4567-8910</div>
              </div>
              <div className="payment-card easypaisa-card">
                <h4><i className="icon-mobile"></i> Easypaisa / SadaPay</h4>
                <p>Title: YUNI Official</p>
                <div className="account-number">0300-1234567</div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Student Form */}
          <div className="student-form">
            <h3>2. Student Details & Proof</h3>
            <form onSubmit={handleCompleteCheckout} className="checkout-form">
              <input type="text" placeholder="Full Name" required />
              <input type="email" placeholder="Email Address" required />
              <select required defaultValue="">
                <option value="" disabled>Select Course...</option>
                {coursesData.map(course => (
                  <option key={course.id} value={course.id} selected={selectedCourse?.id === course.id}>
                    {course.title} - {course.price}
                  </option>
                ))}
              </select>
              
              <div className="upload-area">
                <i className="upload-icon">📤</i>
                <p className="upload-text">Upload Screenshot (Required)</p>
                <input type="file" accept="image/*" className="file-input" />
              </div>
              
              <button type="submit" className="submit-btn">
                Confirm & Enter LMS 🔒
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="courses-app">
      {currentView === "trainings" && renderTrainingsView()}
      {currentView === "course-detail" && renderCourseDetailView()}
      {currentView === "checkout" && renderCheckoutView()}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        /* Global Reset & Base */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .courses-app {
          background: #000000;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          color: #ffffff;
        }

        /* ===== TRAININGS HUB VIEW ===== */
        .trainings-view {
          padding: 8rem 1.5rem 5rem;
          max-width: 1280px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 4rem;
          font-weight: 900;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 2rem;
          background: linear-gradient(135deg, #ffffff 0%, #0ae448 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .page-title {
            font-size: 5rem;
          }
        }

        /* Filters */
        .filters-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.75rem;
          margin: 2rem 0 3rem;
        }

        .filter-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.6);
          padding: 0.6rem 1.5rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .filter-btn:hover {
          border-color: #0ae448;
          color: #0ae448;
        }

        .filter-btn.active {
          background: #0ae448;
          border-color: #0ae448;
          color: #000000;
        }

        /* Course Grid */
        .course-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .course-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .course-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .course-card-hub {
          background: rgba(20, 20, 20, 0.8);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(10, 228, 72, 0.2);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .course-card-hub:hover {
          transform: translateY(-4px);
          border-color: rgba(10, 228, 72, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .course-card-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .course-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .course-card-hub:hover .course-card-image img {
          transform: scale(1.05);
        }

        .cert-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: #0ae448;
          color: #000;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 700;
        }

        .course-card-content {
          padding: 1.5rem;
        }

        .course-card-content h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #fff;
        }

        .instructor {
          color: #0ae448;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }

        .description {
          color: #aaa;
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }

        .price {
          font-weight: 800;
          font-size: 1.25rem;
          color: #0ae448;
        }

        .view-btn {
          background: transparent;
          border: 1px solid #0ae448;
          color: #0ae448;
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }

        .view-btn:hover {
          background: #0ae448;
          color: #000;
        }

        .arrow {
          margin-left: 0.25rem;
          transition: transform 0.2s;
        }

        .view-btn:hover .arrow {
          transform: translateX(4px);
        }

        /* ===== COURSE DETAIL VIEW ===== */
        .detail-view {
          padding: 8rem 1.5rem 5rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .back-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
          font-family: inherit;
        }

        .back-btn:hover {
          color: #0ae448;
        }

        .back-arrow {
          transition: transform 0.2s;
        }

        .back-btn:hover .back-arrow {
          transform: translateX(-4px);
        }

        .detail-panel {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .detail-panel {
            flex-direction: row;
          }
        }

        .detail-left {
          width: 100%;
          padding: 2rem;
          background: rgba(0, 0, 0, 0.3);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (min-width: 768px) {
          .detail-left {
            width: 33.333%;
          }
          .detail-right {
            width: 66.666%;
          }
        }

        .detail-image {
          width: 100%;
          border-radius: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-stats {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-value {
          font-weight: 700;
          color: #0ae448;
        }

        .stat-label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        .cert-notice {
          background: rgba(10, 228, 72, 0.1);
          border: 1px solid rgba(10, 228, 72, 0.3);
          padding: 0.75rem;
          border-radius: 0.75rem;
          text-align: center;
          font-weight: 600;
          color: #0ae448;
        }

        .detail-right {
          width: 100%;
          padding: 2rem;
        }

        .detail-right h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .instructor-detail {
          color: #0ae448;
          margin-bottom: 1rem;
        }

        .description-detail {
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .detail-right h3 {
          font-size: 1.25rem;
          margin: 1.5rem 0 1rem;
        }

        .learn-list {
          list-style: none;
          margin-bottom: 2rem;
        }

        .learn-list li {
          padding: 0.5rem 0;
          color: #ddd;
        }

        .enroll-now-btn {
          background: #0ae448;
          color: #000;
          border: none;
          padding: 0.875rem 2rem;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }

        .enroll-now-btn:hover {
          background: #fff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(10, 228, 72, 0.3);
        }

        /* ===== CHECKOUT VIEW ===== */
        .checkout-view {
          padding: 8rem 1.5rem 5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .cancel-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 700;
          margin-bottom: 1.5rem;
          cursor: pointer;
          transition: color 0.2s;
          font-family: inherit;
        }

        .cancel-btn:hover {
          color: #0ae448;
        }

        .checkout-title {
          font-size: 3rem;
          font-weight: 900;
          text-transform: uppercase;
          margin-bottom: 2rem;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .payment-info h3, .student-form h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .payment-card {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          padding: 1.25rem;
          border-radius: 1rem;
          border-left: 4px solid;
        }

        .bank-card {
          border-left-color: #3b82f6;
        }

        .easypaisa-card {
          border-left-color: #22c55e;
        }

        .payment-card h4 {
          margin-bottom: 0.5rem;
          font-size: 1rem;
        }

        .payment-card p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .account-number {
          background: rgba(0, 0, 0, 0.5);
          padding: 0.5rem;
          border-radius: 0.5rem;
          text-align: center;
          font-family: monospace;
          letter-spacing: 2px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .student-form {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          padding: 1.5rem;
          border-radius: 1.5rem;
        }

        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .checkout-form input,
        .checkout-form select {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #fff;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }

        .checkout-form input:focus,
        .checkout-form select:focus {
          border-color: #0ae448;
        }

        .checkout-form input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .upload-area {
          border: 2px dashed rgba(10, 228, 72, 0.5);
          background: rgba(10, 228, 72, 0.05);
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
        }

        .upload-area:hover {
          background: rgba(10, 228, 72, 0.1);
          border-color: #0ae448;
        }

        .upload-icon {
          font-size: 1.5rem;
          display: block;
          margin-bottom: 0.5rem;
        }

        .upload-text {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0ae448;
        }

        .file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .submit-btn {
          background: #0ae448;
          color: #000;
          border: none;
          padding: 0.875rem;
          border-radius: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
          margin-top: 0.5rem;
        }

        .submit-btn:hover {
          background: #fff;
          transform: translateY(-2px);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .trainings-view, .detail-view, .checkout-view {
            padding: 6rem 1rem 3rem;
          }
          .page-title {
            font-size: 2.5rem;
          }
          .checkout-title {
            font-size: 2rem;
          }
          .detail-right h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Courses;