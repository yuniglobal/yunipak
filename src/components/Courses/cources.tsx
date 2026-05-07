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

// Form data interface for enrollment
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

// IMPORTANT: Replace this URL with your deployed Google Apps Script URL
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbxv3FVEPexjV4hLcAWNj6FafStyFzqzrJWzo-Zk8FJFOWkxw-mh9bxNi-ZYbwnLHyfzxg/exec';

const Courses: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>("trainings");
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [filter, setFilter] = useState<"all" | "tech" | "ecom">("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const studentsCountRef = useRef<HTMLSpanElement>(null);

  const [formData, setFormData] = useState<EnrollmentData>({
    fullName: "",
    fatherName: "",
    cnic: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    phoneNumber: "",
    alternatePhone: "",
    currentAddress: "",
    city: "",
    province: "Punjab",
    highestQualification: "",
    institution: "",
    yearOfCompletion: "",
    percentage: "",
    courseId: "",
    courseTitle: "",
    coursePrice: "",
    paymentMethod: "",
    bankName: "",
    bankAccountTitle: "",
    bankAccountNumber: "",
    transactionId: "",
    transactionDate: "",
    transactionAmount: "",
    currentEmployment: "",
    organization: "",
    designation: "",
    hearAboutUs: "",
    referralCode: "",
    whyJoin: "",
    declaration: false,
    timestamp: new Date().toISOString(),
    status: "pending",
  });

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
    setFormData(prev => ({
      ...prev,
      courseId: course.id,
      courseTitle: course.title,
      coursePrice: course.price || "0",
    }));
    setCurrentView("checkout");
    setSubmitStatus(null);
  };

  const handleBackToHub = () => {
    setCurrentView("trainings");
    setSelectedCourse(null);
    setSubmitStatus(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.cnic || !formData.email || !formData.phoneNumber) {
      setSubmitStatus({ type: 'error', message: 'Please fill all required fields (*)' });
      return;
    }

    // CNIC validation
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    if (!cnicRegex.test(formData.cnic)) {
      setSubmitStatus({ type: 'error', message: 'Please enter valid CNIC format (XXXXX-XXXXXXX-X)' });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter valid email address' });
      return;
    }

    if (!formData.paymentMethod) {
      setSubmitStatus({ type: 'error', message: 'Please select payment method' });
      return;
    }

    if (!formData.transactionId || !formData.transactionAmount) {
      setSubmitStatus({ type: 'error', message: 'Please provide transaction details' });
      return;
    }

    if (!formData.declaration) {
      setSubmitStatus({ type: 'error', message: 'Please accept the declaration' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create URLSearchParams for proper form encoding
      const submitData = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value));
      });

      // Submit to Google Sheets
      const response = await fetch(GOOGLE_SHEETS_API, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submitData,
      });

      let result;
      try {
        result = await response.json();
      } catch {
        result = { success: response.ok };
      }

      if (response.ok && result.success !== false) {
        setSubmitStatus({
          type: 'success',
          message: `Registration submitted successfully for ${selectedCourse?.title}! Your application is pending approval. We will contact you within 24-48 hours.`
        });

        // Reset form and go back after 3 seconds
        setTimeout(() => {
          setCurrentView("trainings");
          setSelectedCourse(null);
          setSubmitStatus(null);
          // Reset form data
          setFormData({
            fullName: "",
            fatherName: "",
            cnic: "",
            dateOfBirth: "",
            gender: "",
            email: "",
            phoneNumber: "",
            alternatePhone: "",
            currentAddress: "",
            city: "",
            province: "Punjab",
            highestQualification: "",
            institution: "",
            yearOfCompletion: "",
            percentage: "",
            courseId: "",
            courseTitle: "",
            coursePrice: "",
            paymentMethod: "",
            bankName: "",
            bankAccountTitle: "",
            bankAccountNumber: "",
            transactionId: "",
            transactionDate: "",
            transactionAmount: "",
            currentEmployment: "",
            organization: "",
            designation: "",
            hearAboutUs: "",
            referralCode: "",
            whyJoin: "",
            declaration: false,
            timestamp: new Date().toISOString(),
            status: "pending",
          });
        }, 3000);
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Error submitting registration. Please try again or contact support.'
      });
    } finally {
      setIsSubmitting(false);
    }
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
          ← Cancel Registration
        </button>
        <h2 className="checkout-title">Complete Registration</h2>

        {submitStatus && (
          <div className={`status-message ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="checkout-form-full">
          {/* Banking Information Section */}
          <div className="form-section">
            <h3>💰 Banking Information</h3>
            <div className="bank-details-card">
              <div className="bank-card meezan">
                <h4>🏦 Meezan Bank (Recommended)</h4>
                <p><strong>Account Title:</strong> YUNI Education Systems</p>
                <p><strong>Account Number:</strong> 1234-567890-12-3</p>
                <p><strong>IBAN:</strong> PK36MEZN0012345678901234</p>
                <p><strong>Branch Code:</strong> 0123</p>
              </div>
              <div className="bank-card easypaisa">
                <h4>📱 Easypaisa / JazzCash</h4>
                <p><strong>Account Title:</strong> Muhammad Ali</p>
                <p><strong>Mobile Number:</strong> 0300 1234567</p>
                <p><strong>CNIC (for verification):</strong> 12345-1234567-1</p>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div className="form-section">
            <h3>📝 Payment Details</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Payment Method *</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange} required>
                  <option value="">Select Payment Method</option>
                  <option value="bank">Bank Transfer (Meezan Bank)</option>
                  <option value="easypaisa">Easypaisa / JazzCash</option>
                </select>
              </div>

              <div className="form-field">
                <label>Transaction ID / Reference Number *</label>
                <input type="text" name="transactionId" placeholder="e.g., TXN123456789" value={formData.transactionId} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Transaction Date *</label>
                <input type="date" name="transactionDate" value={formData.transactionDate} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Transaction Amount *</label>
                <input type="text" name="transactionAmount" placeholder={selectedCourse?.price} value={formData.transactionAmount} onChange={handleInputChange} required />
              </div>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="form-section">
            <h3>👤 Personal Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Full Name (as per CNIC) *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Father's Name *</label>
                <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>CNIC Number (XXXXX-XXXXXXX-X) *</label>
                <input type="text" name="cnic" placeholder="12345-1234567-1" value={formData.cnic} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Date of Birth *</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Gender *</label>
                <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label>Email Address *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Phone Number (WhatsApp) *</label>
                <input type="tel" name="phoneNumber" placeholder="03XXXXXXXXX" value={formData.phoneNumber} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Alternate Phone Number</label>
                <input type="tel" name="alternatePhone" value={formData.alternatePhone} onChange={handleInputChange} />
              </div>

              <div className="form-field">
                <label>City *</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Province *</label>
                <select name="province" value={formData.province} onChange={handleInputChange} required>
                  <option value="Punjab">Punjab</option>
                  <option value="Sindh">Sindh</option>
                  <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                  <option value="Balochistan">Balochistan</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                  <option value="Azad Kashmir">Azad Kashmir</option>
                </select>
              </div>

              <div className="form-field full-width">
                <label>Current Address *</label>
                <textarea name="currentAddress" rows={2} value={formData.currentAddress} onChange={handleInputChange} required></textarea>
              </div>
            </div>
          </div>

          {/* Educational Background */}
          <div className="form-section">
            <h3>🎓 Educational Background</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Highest Qualification *</label>
                <select name="highestQualification" value={formData.highestQualification} onChange={handleInputChange} required>
                  <option value="">Select Qualification</option>
                  <option value="Matriculation">Matriculation</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Bachelor's">Bachelor's (14/16 years)</option>
                  <option value="Master's">Master's (16/18 years)</option>
                  <option value="MS/MPhil">MS/MPhil</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div className="form-field">
                <label>Institution/University *</label>
                <input type="text" name="institution" value={formData.institution} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Year of Completion *</label>
                <input type="text" name="yearOfCompletion" placeholder="YYYY" value={formData.yearOfCompletion} onChange={handleInputChange} required />
              </div>

              <div className="form-field">
                <label>Percentage/CGPA *</label>
                <input type="text" name="percentage" placeholder="e.g., 85% or 3.5/4.0" value={formData.percentage} onChange={handleInputChange} required />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="form-section">
            <h3>💼 Professional Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Current Employment Status</label>
                <select name="currentEmployment" value={formData.currentEmployment} onChange={handleInputChange}>
                  <option value="">Select Status</option>
                  <option value="Student">Student</option>
                  <option value="Employed Full-time">Employed Full-time</option>
                  <option value="Employed Part-time">Employed Part-time</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Business Owner">Business Owner</option>
                </select>
              </div>

              <div className="form-field">
                <label>Organization/Company</label>
                <input type="text" name="organization" value={formData.organization} onChange={handleInputChange} />
              </div>

              <div className="form-field">
                <label>Designation/Role</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3>ℹ️ Additional Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>How did you hear about us? *</label>
                <select name="hearAboutUs" value={formData.hearAboutUs} onChange={handleInputChange} required>
                  <option value="">Select Option</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Friend/Colleague">Friend/Colleague</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Newspaper">Newspaper</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-field">
                <label>Referral Code (if any)</label>
                <input type="text" name="referralCode" value={formData.referralCode} onChange={handleInputChange} />
              </div>

              <div className="form-field full-width">
                <label>Why do you want to join this course? *</label>
                <textarea name="whyJoin" rows={3} placeholder="Tell us about your goals and expectations..." value={formData.whyJoin} onChange={handleInputChange} required></textarea>
              </div>
            </div>
          </div>

          {/* Declaration */}
          <div className="form-section">
            <div className="declaration">
              <label>
                <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleInputChange} required />
                I declare that all the information provided is true and correct. I understand that any false information may lead to cancellation of registration. I have made the payment and provided correct transaction details.
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-reg-btn" onClick={handleBackToHub}>Cancel</button>
            <button type="submit" className="submit-reg-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Registration'}
            </button>
          </div>
        </form>
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
          max-width: 1000px;
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

        .status-message {
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .status-message.success {
          background: rgba(10, 228, 72, 0.2);
          border: 1px solid #0ae448;
          color: #0ae448;
        }

        .status-message.error {
          background: rgba(255, 68, 68, 0.2);
          border: 1px solid #ff4444;
          color: #ff4444;
        }

        .checkout-form-full {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .form-section {
          background: rgba(20, 20, 20, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid rgba(10, 228, 72, 0.1);
        }

        .form-section h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #0ae448;
          border-bottom: 1px solid rgba(10, 228, 72, 0.2);
          padding-bottom: 0.5rem;
        }

        .bank-details-card {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .bank-details-card {
            grid-template-columns: 1fr 1fr;
          }
        }

        .bank-card {
          background: rgba(0, 0, 0, 0.5);
          padding: 1rem;
          border-radius: 0.75rem;
          border-left: 4px solid;
        }

        .bank-card.meezan {
          border-left-color: #3b82f6;
        }

        .bank-card.easypaisa {
          border-left-color: #22c55e;
        }

        .bank-card h4 {
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .bank-card p {
          font-size: 0.875rem;
          color: #ccc;
          margin-bottom: 0.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-field.full-width {
          grid-column: span 1;
        }

        @media (min-width: 768px) {
          .form-field.full-width {
            grid-column: span 2;
          }
        }

        .form-field label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #d1d5db;
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 0.5rem;
          padding: 0.625rem;
          color: #ffffff;
          font-family: inherit;
          font-size: 0.875rem;
          transition: all 0.2s;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: #0ae448;
          box-shadow: 0 0 0 2px rgba(10, 228, 72, 0.2);
        }

        .declaration {
          padding: 1rem;
          background: rgba(10, 228, 72, 0.05);
          border-radius: 0.5rem;
        }

        .declaration label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          color: #d1d5db;
          font-size: 0.875rem;
        }

        .declaration input[type="checkbox"] {
          width: 1.125rem;
          height: 1.125rem;
          cursor: pointer;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .cancel-reg-btn {
          background: #333;
          color: #fff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-reg-btn:hover {
          background: #444;
        }

        .submit-reg-btn {
          background: #0ae448;
          color: #000;
          border: none;
          padding: 0.75rem 2rem;
          border-radius: 0.5rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .submit-reg-btn:hover:not(:disabled) {
          background: #ffffff;
          transform: translateY(-2px);
        }

        .submit-reg-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .trainings-view,
          .detail-view,
          .checkout-view {
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