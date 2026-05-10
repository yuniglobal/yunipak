import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../AnimatedTitle";
import AnimatedBackground from "../AnimatedBackground";

gsap.registerPlugin(ScrollTrigger);

// Job/Internship type definition
interface Position {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

// Form data interface
interface FormData {
  // Personal Information
  fullName: string;
  cnic: string;
  dateOfBirth: string;
  gender: string;
  fatherName: string;
  phoneNumber: string;
  alternatePhone: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
  city: string;
  province: string;

  // Professional Information
  positionId: string;
  positionTitle: string;
  experience: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  isCurrentlyEmployed: string;

  // Education
  highestDegree: string;
  university: string;
  yearOfCompletion: string;
  cgpa: string;

  // Skills & Certifications
  technicalSkills: string;
  certifications: string;
  languagesSpoken: string;

  // References
  referenceName: string;
  referenceContact: string;
  referenceRelation: string;

  // Additional
  linkedinProfile: string;
  portfolioUrl: string;
  hearAboutUs: string;
  additionalInfo: string;

  // Declaration
  declaration: boolean;
  timestamp: string;
  status: string;
}

const positions: Position[] = [
  {
    id: "pos-1",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "NASTP, Pakistan",
    type: "Full-time, On-Site",
    description: "React, Next.js, Tailwind. Join our engineering team at NASTP to build cutting-edge web applications.",
  },
];

// IMPORTANT: Replace this URL with your deployed Google Apps Script URL
const GOOGLE_SHEETS_API = 'https://script.google.com/macros/s/AKfycbx-jQckKH2mPOTX8W_8D2ZNv8kAzMFUr5LgtDQXMZnH9HNbNOlSNxukuOL1R_ZUUnfKmQ/exec';

const Careers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    cnic: "",
    dateOfBirth: "",
    gender: "",
    fatherName: "",
    phoneNumber: "",
    alternatePhone: "",
    email: "",
    currentAddress: "",
    permanentAddress: "",
    city: "",
    province: "Punjab",
    positionId: "",
    positionTitle: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    noticePeriod: "",
    isCurrentlyEmployed: "",
    highestDegree: "",
    university: "",
    yearOfCompletion: "",
    cgpa: "",
    technicalSkills: "",
    certifications: "",
    languagesSpoken: "",
    referenceName: "",
    referenceContact: "",
    referenceRelation: "",
    linkedinProfile: "",
    portfolioUrl: "",
    hearAboutUs: "",
    additionalInfo: "",
    declaration: false,
    timestamp: new Date().toISOString(),
    status: "pending",
  });

  useEffect(() => {
    const items = document.querySelectorAll('.position-panel');
    if (items.length > 0) {
      gsap.fromTo(items, 
        { 
          x: -50, 
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".positions-list",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleApply = (position: Position) => {
    setSelectedPosition(position);
    setFormData(prev => ({
      ...prev,
      positionId: position.id,
      positionTitle: position.title,
    }));
    setShowForm(true);
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

    if (!formData.declaration) {
      setSubmitStatus({ type: 'error', message: 'Please accept the declaration' });
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

    setIsSubmitting(true);

    try {
      // Create URLSearchParams for proper form encoding
      const submitData = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, String(value));
      });

      // Submit to Google Sheets with CORS mode
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
          message: `Application submitted successfully for ${selectedPosition?.title}! We will contact you within 5-7 business days.`
        });

        // Reset form after 3 seconds
        setTimeout(() => {
          setShowForm(false);
          setSelectedPosition(null);
          setSubmitStatus(null);
          // Reset form data
          setFormData({
            fullName: "",
            cnic: "",
            dateOfBirth: "",
            gender: "",
            fatherName: "",
            phoneNumber: "",
            alternatePhone: "",
            email: "",
            currentAddress: "",
            permanentAddress: "",
            city: "",
            province: "Punjab",
            positionId: "",
            positionTitle: "",
            experience: "",
            currentSalary: "",
            expectedSalary: "",
            noticePeriod: "",
            isCurrentlyEmployed: "",
            highestDegree: "",
            university: "",
            yearOfCompletion: "",
            cgpa: "",
            technicalSkills: "",
            certifications: "",
            languagesSpoken: "",
            referenceName: "",
            referenceContact: "",
            referenceRelation: "",
            linkedinProfile: "",
            portfolioUrl: "",
            hearAboutUs: "",
            additionalInfo: "",
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
      setSubmitStatus({ type: 'error', message: 'Error submitting application. Please try again or email us directly at careers@yunipakistan.com' });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section className="careers-premium-section">
      <AnimatedBackground />
      {/* Background Light Orbs */}

      <div className="careers-container-premium">
        {/* Header */}
        <div className="title-wrapper">
          <AnimatedTitle>Forge The Future.</AnimatedTitle>
          <p className="careers-subtitle-premium">
            Join our elite squad at NASTP. We don't just hire employees; we recruit visionaries.
          </p>
        </div>

        {/* Positions List */}
        <div className="positions-grid-premium">
          {positions.map((position) => (
            <div 
              key={position.id} 
              className="position-card-premium card-glow-border"
            >
              <div className="position-card-inner">
                <div className="position-meta-top">
                  <span className="location-tag">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {position.location}
                  </span>
                  <span className="type-tag">{position.type}</span>
                </div>
                
                <h3 className="position-title-premium">{position.title}</h3>
                <div className="department-tag">{position.department}</div>
                
                <p className="position-desc-premium">{position.description}</p>
                
                <div className="position-footer-premium">
                  <button
                    onClick={() => handleApply(position)}
                    className="apply-btn-premium"
                  >
                    <span>Initiate Application</span>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta-premium card-glow-border">
          <div className="cta-content">
            <h2 className="cta-title">Passive Recruitment Active</h2>
            <p className="cta-text">
              Don't see your specific designation? Our talent pool is always open for exceptional minds.
            </p>
            <a href="mailto:careers@yunipakistan.com" className="cta-link-premium">
              Transmit CV / Portfolio <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showForm && selectedPosition && (
        <div className="modal-overlay-premium" onClick={() => setShowForm(false)}>
          <div className="modal-content-premium" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-premium" onClick={() => setShowForm(false)}>×</button>

            <div className="form-header-premium">
              <span className="protocol-label">Application Protocol</span>
              <h2 className="form-title-premium">Apply for {selectedPosition.title}</h2>
              <div className="form-progress-bar"></div>
            </div>

            {submitStatus && (
              <div className={`status-message-premium ${submitStatus.type}`}>
                <span className="status-icon">{submitStatus.type === 'success' ? '✓' : '⚠'}</span>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="application-form-premium">
              {/* Personal Information Section */}
              <div className="form-section-premium">
                <div className="section-title-wrapper">
                  <span className="section-number">01</span>
                  <h3>Personnel Profile</h3>
                </div>
                <div className="form-grid-premium">
                  <div className="form-field-premium">
                    <label>Legal Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required placeholder="Enter full name" />
                  </div>

                  <div className="form-field-premium">
                    <label>National ID (CNIC) *</label>
                    <input type="text" name="cnic" placeholder="XXXXX-XXXXXXX-X" value={formData.cnic} onChange={handleInputChange} required />
                  </div>

                  <div className="form-field-premium">
                    <label>Father's Designation *</label>
                    <input type="text" name="fatherName" value={formData.fatherName} onChange={handleInputChange} required placeholder="Father's name" />
                  </div>

                  <div className="form-field-premium">
                    <label>Date of Birth *</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                  </div>

                  <div className="form-field-premium">
                    <label>Gender Identification *</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange} required>
                      <option value="">Select Protocol</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-field-premium">
                    <label>Primary Comms (Phone) *</label>
                    <input type="tel" name="phoneNumber" placeholder="03XXXXXXXXX" value={formData.phoneNumber} onChange={handleInputChange} required />
                  </div>

                  <div className="form-field-premium">
                    <label>Digital Mail (Email) *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="email@address.com" />
                  </div>

                  <div className="form-field-premium">
                    <label>Current Location (City) *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} required placeholder="e.g. Islamabad" />
                  </div>
                </div>

                <div className="form-field-premium full-width" style={{ marginTop: '1.5rem' }}>
                  <label>Residential Coordinates (Address) *</label>
                  <textarea name="currentAddress" rows={2} value={formData.currentAddress} onChange={handleInputChange} required placeholder="Current street address..."></textarea>
                </div>
              </div>

              {/* Professional Information */}
              <div className="form-section-premium">
                <div className="section-title-wrapper">
                  <span className="section-number">02</span>
                  <h3>Professional Status</h3>
                </div>
                <div className="form-grid-premium">
                  <div className="form-field-premium">
                    <label>Service Duration *</label>
                    <select name="experience" value={formData.experience} onChange={handleInputChange} required>
                      <option value="">Select Level</option>
                      <option value="Fresher">Entry Level (0 Exp)</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="6-8 years">6-8 years</option>
                      <option value="9+ years">Senior (9+ years)</option>
                    </select>
                  </div>

                  <div className="form-field-premium">
                    <label>Expected Compensation (PKR/mo) *</label>
                    <input type="text" name="expectedSalary" placeholder="e.g. 150,000" value={formData.expectedSalary} onChange={handleInputChange} required />
                  </div>

                  <div className="form-field-premium">
                    <label>Redeployment Window (Notice) *</label>
                    <select name="noticePeriod" value={formData.noticePeriod} onChange={handleInputChange} required>
                      <option value="">Select Duration</option>
                      <option value="Immediate">Instant Availability</option>
                      <option value="15 days">15 Days</option>
                      <option value="1 month">30 Days</option>
                      <option value="2 months">60 Days</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="form-section-premium">
                <div className="section-title-wrapper">
                  <span className="section-number">03</span>
                  <h3>Technical Stack</h3>
                </div>
                <div className="form-field-premium full-width">
                  <label>Core Technologies * (comma-separated)</label>
                  <textarea name="technicalSkills" rows={3} placeholder="e.g. React, Node.js, GSAP, Python, Cybersecurity..." value={formData.technicalSkills} onChange={handleInputChange} required></textarea>
                </div>

                <div className="form-grid-premium" style={{ marginTop: '1.5rem' }}>
                  <div className="form-field-premium">
                    <label>LinkedIn Identity</label>
                    <input type="url" name="linkedinProfile" placeholder="https://linkedin.com/in/username" value={formData.linkedinProfile} onChange={handleInputChange} />
                  </div>

                  <div className="form-field-premium">
                    <label>Portfolio / Git Link</label>
                    <input type="url" name="portfolioUrl" placeholder="https://github.com/username" value={formData.portfolioUrl} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              {/* Declaration */}
              <div className="form-section-premium declaration-wrapper-premium">
                <label className="checkbox-container-premium">
                  <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleInputChange} required />
                  <span className="checkmark"></span>
                  <p>I confirm that all transmitted data is authentic. I authorize YUNI Intelligence to perform verification protocols.</p>
                </label>
              </div>

              <div className="form-actions-premium">
                <button type="button" className="cancel-btn-premium" onClick={() => setShowForm(false)}>Abort</button>
                <button type="submit" className="submit-btn-premium" disabled={isSubmitting}>
                  <span className="btn-text">{isSubmitting ? 'Transmitting Data...' : 'Submit Application'}</span>
                  <div className="btn-glow"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .careers-premium-section {
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

        .careers-container-premium {
          max-width: 80rem;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .careers-subtitle-premium {
          color: var(--text-secondary);
          font-size: 1.15rem;
          margin-top: 1.5rem;
          opacity: 0.8;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        /* --- Grid --- */
        .positions-grid-premium {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 2.5rem;
          margin-top: 5rem;
          margin-bottom: 5rem;
        }

        /* --- Cards --- */
        .position-card-premium {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          border-radius: 2.5rem;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          transition: all 0.6s var(--transition-smooth);
        }

        .position-card-inner {
          padding: 3rem;
          position: relative;
          z-index: 2;
          background: transparent;
        }

        .position-card-premium:hover {
          transform: translateY(-12px);
          border-color: var(--pk-green);
          box-shadow: 0 40px 80px var(--glass-shadow);
        }

        .position-meta-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .location-tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .type-tag {
          background: rgba(0, 230, 118, 0.1);
          color: var(--pk-green);
          padding: 0.4rem 1rem;
          border-radius: 99px;
          font-size: 0.7rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid rgba(0, 230, 118, 0.2);
        }

        .position-title-premium {
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        .department-tag {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--pk-green);
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .position-desc-premium {
          color: var(--text-secondary);
          line-height: 1.8;
          font-size: 1rem;
          margin-bottom: 2.5rem;
          flex-grow: 1;
        }

        .apply-btn-premium {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-light);
          color: var(--text-primary);
          padding: 1.2rem;
          border-radius: 1.5rem;
          font-weight: 800;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          transition: all 0.4s var(--transition-smooth);
        }

        .apply-btn-premium:hover {
          background: var(--pk-green);
          border-color: var(--pk-green);
          color: #fff;
          transform: translateY(-5px);
          box-shadow: 0 15px 30px var(--pk-green-glow);
        }

        /* --- Bottom CTA --- */
        .bottom-cta-premium {
          margin-top: 6rem;
          background: var(--glass-bg);
          backdrop-filter: blur(25px);
          border-radius: 3rem;
          padding: 4rem;
          text-align: center;
          border: 1px solid var(--glass-border);
          position: relative;
          overflow: hidden;
        }

        .cta-title { font-size: 2.5rem; font-weight: 900; margin-bottom: 1.5rem; }
        .cta-text { color: var(--text-secondary); font-size: 1.1rem; max-width: 600px; margin: 0 auto 2.5rem; line-height: 1.7; }
        .cta-link-premium {
          display: inline-flex; align-items: center; gap: 1rem; color: var(--pk-green);
          font-size: 1.2rem; font-weight: 900; text-decoration: none; transition: all 0.3s ease;
        }
        .cta-link-premium:hover { transform: translateX(10px); color: var(--pk-green-light); }

        /* --- Modal --- */
        .modal-overlay-premium {
          position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(15px);
          z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 2rem;
        }

        .modal-content-premium {
          background: #080808; border: 1px solid var(--pk-green); border-radius: 3rem;
          width: 100%; max-width: 950px; max-height: 90vh; overflow-y: auto; padding: 4rem;
          position: relative; box-shadow: 0 0 100px rgba(0, 230, 118, 0.1);
        }

        .modal-close-premium {
          position: absolute; top: 2rem; right: 2rem; background: none; border: none;
          color: var(--text-tertiary); font-size: 2.5rem; cursor: pointer; transition: color 0.3s;
        }
        .modal-close-premium:hover { color: #fff; }

        .form-header-premium { margin-bottom: 4rem; }
        .protocol-label { 
          color: var(--pk-green); font-size: 0.75rem; font-weight: 900; 
          text-transform: uppercase; letter-spacing: 0.3em; margin-bottom: 1rem; display: block;
        }
        .form-title-premium { font-size: 2.5rem; font-weight: 900; margin: 0; line-height: 1.1; }

        .form-section-premium { margin-bottom: 4rem; }
        .section-title-wrapper { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2.5rem; }
        .section-number { 
          font-size: 1.5rem; font-weight: 900; color: transparent; 
          -webkit-text-stroke: 1px var(--pk-green); font-family: 'Space Grotesk';
        }
        .section-title-wrapper h3 { font-size: 1.3rem; font-weight: 800; margin: 0; color: var(--text-primary); }

        .form-grid-premium { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .form-field-premium { display: flex; flex-direction: column; gap: 0.8rem; }
        .form-field-premium label { font-size: 0.85rem; font-weight: 700; color: var(--text-tertiary); }
        .form-field-premium input, .form-field-premium select, .form-field-premium textarea {
          background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-light); 
          padding: 1.2rem; border-radius: 1.2rem; color: #fff; font-size: 1rem; 
          transition: all 0.3s; width: 100%;
        }
        .form-field-premium input:focus { border-color: var(--pk-green); box-shadow: 0 0 20px var(--pk-green-glow); outline: none; }
        .full-width { grid-column: span 2; }

        .declaration-wrapper-premium { padding: 2rem; background: rgba(0, 230, 118, 0.05); border-radius: 1.5rem; border: 1px solid rgba(0, 230, 118, 0.1); }
        .checkbox-container-premium { display: flex; align-items: flex-start; gap: 1.5rem; cursor: pointer; }
        .checkbox-container-premium p { font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); margin: 0; }

        .form-actions-premium { display: flex; justify-content: flex-end; gap: 2rem; margin-top: 4rem; }
        .cancel-btn-premium { background: none; border: none; color: var(--text-tertiary); font-weight: 700; cursor: pointer; font-size: 1rem; }
        .submit-btn-premium { 
          background: var(--pk-green); color: #fff; padding: 1.5rem 4rem; border-radius: 1.5rem; 
          border: none; font-weight: 900; cursor: pointer; transition: all 0.3s;
          box-shadow: 0 10px 30px var(--pk-green-glow); font-size: 1.1rem;
        }
        .submit-btn-premium:hover { transform: translateY(-5px); box-shadow: 0 20px 50px var(--pk-green-glow); }

        @media (max-width: 1024px) {
          .form-grid-premium { grid-template-columns: 1fr; }
          .full-width { grid-column: span 1; }
          .modal-content-premium { padding: 2rem; }
        }

        @media (max-width: 768px) {
          .positions-grid-premium { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Careers;