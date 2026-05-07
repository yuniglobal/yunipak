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

// Social Media SVG Icons
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Logo = () => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none">
    <circle cx="20" cy="20" r="18" fill="#0ae448" />
    <text x="20" y="27" fontSize="18" fontWeight="bold" fill="#000" textAnchor="middle" fontFamily="Inter, sans-serif">Y</text>
  </svg>
);

const GetInTouch: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agree: false,
  });

  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({
    type: 'idle',
    message: '',
  });

  // Validation helpers
  const validateName = (value: string): boolean => /^[A-Za-z\s\-']{0,50}$/.test(value);
  const validatePhone = (value: string): boolean => /^\d{0,15}$/.test(value);
  const validateEmail = (value: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 100;
  const validateSubject = (value: string): boolean => value.length <= 200;
  const validateMessage = (value: string): boolean => value.length <= 1000;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!validateName(value)) return;
        break;
      case 'phone':
        if (!validatePhone(value)) return;
        break;
      case 'subject':
        if (!validateSubject(value)) return;
        break;
      case 'message':
        if (!validateMessage(value)) return;
        break;
      default:
        break;
    }
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !validateName(formData.firstName)) {
      setStatus({ type: 'error', message: 'First name must contain only letters, spaces, hyphens or apostrophes (max 50 characters).' });
      return;
    }
    if (!formData.lastName || !validateName(formData.lastName)) {
      setStatus({ type: 'error', message: 'Last name must contain only letters, spaces, hyphens or apostrophes (max 50 characters).' });
      return;
    }
    if (!formData.email || !validateEmail(formData.email)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address (max 100 characters).' });
      return;
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      setStatus({ type: 'error', message: 'Phone number must contain only digits (max 15).' });
      return;
    }
    if (formData.subject && !validateSubject(formData.subject)) {
      setStatus({ type: 'error', message: 'Subject must not exceed 200 characters.' });
      return;
    }
    if (!formData.message || !validateMessage(formData.message)) {
      setStatus({ type: 'error', message: 'Message must not exceed 1000 characters.' });
      return;
    }
    if (!formData.agree) {
      setStatus({ type: 'error', message: 'You must agree to the Privacy Policy.' });
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! We will get back to you soon.' });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          agree: false,
        });
      } else {
        setStatus({ type: 'error', message: `${data.error || 'Something went wrong. Please try again.'}` });
      }
    } catch (error) {
      console.error('Network error:', error);
      setStatus({ type: 'error', message: 'Network error – please check your connection and try again.' });
    }
  };

  const rainbowDivs = Array.from({ length: 25 }, (_, i) => (
    <div key={i} className="rainbow" />
  ));

  return (
    <>
      <div className="rainbow-background">
        {rainbowDivs}
        <div className="h" />
        <div className="v" />
      </div>

      <section className="get-in-touch">
        <h1 className="page-title">Get in Touch</h1>

        <div className="contact-container">
          {/* Left column – Contact info */}
          <div className="contact-info">
            <div className="logo-wrapper">
              <Logo />
              <span className="brand-name">YUNI Pakistan</span>
            </div>
            
            <div className="info-block">
              <h2>Visit us</h2>
              <p>NASTP (National Aerospace Science & Technology Park)<br />Islamabad, Pakistan</p>
            </div>
            
            <div className="info-block">
              <h2>Chat to us</h2>
              <p><a href="mailto:hello@yunipakistan.com">hello@yunipakistan.com</a></p>
            </div>
            
            <div className="info-block">
              <h2>Call us</h2>
              <p>Mon-Fri from 9am to 6pm (PKT)<br /><a href="tel:+923001234567">+92 300 1234567</a></p>
            </div>
            
            <div className="info-block">
              <h2>Follow us</h2>
              <div className="social-icons">
                <a href="https://www.facebook.com/yunipakistan" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link"><FacebookIcon /></a>
                <a href="https://www.instagram.com/yunipakistan" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link"><InstagramIcon /></a>
                <a href="https://www.linkedin.com/company/yunipakistan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-link"><LinkedInIcon /></a>
                <a href="https://twitter.com/yunipakistan" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="social-link"><XIcon /></a>
              </div>
            </div>
          </div>

          {/* Right column – Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" required maxLength={50} />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" required maxLength={50} />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required maxLength={100} />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="03001234567" maxLength={15} />
              <small>Digits only, up to 15</small>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
                <option value="">Select a topic...</option>
                <option value="courses">Course Inquiry</option>
                <option value="cybersecurity">Cybersecurity Training</option>
                <option value="development">Web Development</option>
                <option value="ai">AI & Prompt Engineering</option>
                <option value="freelancing">Freelancing & E-Commerce</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us what we can help you with" required maxLength={1000} />
              <small>{formData.message.length}/1000 characters</small>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="agree" name="agree" checked={formData.agree} onChange={handleChange} required />
              <label htmlFor="agree">I agree to the <a href="/privacy-policy">Privacy Policy</a> and consent to YUNI Pakistan contacting me about my inquiry.</label>
            </div>

            {status.type !== 'idle' && <div className={`status-message ${status.type}`}>{status.message}</div>}
            
            <button type="submit" className="submit-btn" disabled={status.type === 'loading'}>
              {status.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        .rainbow-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
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

        .get-in-touch {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Inter', sans-serif;
          background: transparent;
        }

        /* Extra top padding for laptops/desktops to clear fixed navbar */
        @media (min-width: 1024px) {
          .get-in-touch {
            padding-top: 5rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .get-in-touch {
            padding-top: 3rem;
          }
        }

        .page-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
          text-align: center;
        }

        @media (min-width: 768px) {
          .page-title {
            text-align: left;
            font-size: 2.5rem;
            margin-bottom: 2rem;
          }
        }

        .contact-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .contact-container {
            flex-direction: row;
            gap: 2rem;
          }
          .contact-info {
            flex: 1;
          }
          .contact-form {
            flex: 1.2;
          }
        }

        .contact-info {
          background: rgba(20, 20, 20, 0.85);
          backdrop-filter: blur(8px);
          padding: 1.5rem;
          border-radius: 1.25rem;
          border: 1px solid rgba(10, 228, 72, 0.25);
          transition: all 0.2s;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 1.5rem;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0ae448;
        }

        .info-block {
          margin-bottom: 1.5rem;
        }
        .info-block:last-child {
          margin-bottom: 0;
        }
        .info-block h2 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #ffffff;
        }
        .info-block p {
          color: #e0e0e0;
          line-height: 1.5;
          font-size: 0.9rem;
        }
        .info-block a {
          color: #0ae448;
          text-decoration: none;
          word-break: break-word;
        }
        .social-icons {
          display: flex;
          gap: 1rem;
          margin-top: 0.5rem;
        }
        .social-link {
          color: #0ae448;
          transition: color 0.15s;
        }
        .social-link:hover {
          color: #ffffff;
        }

        .contact-form {
          background: rgba(20, 20, 20, 0.85);
          backdrop-filter: blur(8px);
          padding: 1.5rem;
          border-radius: 1.25rem;
          border: 1px solid rgba(10, 228, 72, 0.25);
          transition: all 0.2s;
        }

        .form-row {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (min-width: 640px) {
          .form-row {
            flex-direction: row;
            gap: 1rem;
          }
          .form-row .form-group {
            flex: 1;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .form-group label {
          font-weight: 500;
          color: #ffffff;
          font-size: 0.9rem;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          padding: 0.75rem 1rem;
          border: 1px solid #444;
          border-radius: 0.75rem;
          font-family: inherit;
          font-size: 1rem;
          background: rgba(30, 30, 30, 0.9);
          color: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
          width: 100%;
        }
        .form-group select {
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%230ae448' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }
        .form-group select option {
          background: #1a1a1a;
          color: #ffffff;
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: #0ae448;
          box-shadow: 0 0 0 3px rgba(10, 228, 72, 0.2);
        }
        small {
          color: #aaa;
          font-size: 0.7rem;
          margin-top: 0.25rem;
        }
        .checkbox-group {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin: 0.5rem 0;
        }
        .checkbox-group input {
          margin-top: 0.2rem;
          accent-color: #0ae448;
          flex-shrink: 0;
        }
        .checkbox-group label {
          font-size: 0.85rem;
          color: #e0e0e0;
          line-height: 1.4;
        }
        .status-message {
          padding: 0.75rem;
          border-radius: 0.75rem;
          font-size: 0.85rem;
          text-align: center;
        }
        .status-message.success {
          background: rgba(10, 228, 72, 0.15);
          border: 1px solid #0ae448;
          color: #0ae448;
        }
        .status-message.error {
          background: rgba(255, 80, 80, 0.15);
          border: 1px solid #ff5555;
          color: #ff8888;
        }
        .status-message.loading {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid #aaa;
          color: #ddd;
        }
        .submit-btn {
          background-color: #0ae448;
          color: #000000;
          font-weight: 600;
          padding: 0.85rem 1.5rem;
          border: none;
          border-radius: 0.75rem;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
          margin-top: 0.5rem;
        }
        .submit-btn:hover:not(:disabled) {
          background-color: #0a3d20;
          color: #ffffff;
          transform: translateY(-1px);
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ---------- MOBILE PERFORMANCE OPTIMIZATIONS ---------- */
        @media (max-width: 1023px) {
          .rainbow:nth-child(n+13) {
            display: none !important;
          }

          @keyframes slide {
            from { transform: translateX(-25vw); }
            to { transform: translateX(125vw); }
          }

          .rainbow {
            right: auto !important;
            left: 0;
            animation-name: slide-mobile !important;
            will-change: transform;
          }

          .rainbow:nth-child(n) {
            box-shadow: -50px 0 40px 20px #0a0a0a,
                        0 0 30px 15px #0e5a2c,
                        50px 0 40px 20px #0a0a0a !important;
          }

          @keyframes slide-mobile {
            from { transform: translateX(-50vw); }
            to { transform: translateX(150vw); }
          }

          .h {
            box-shadow: 0 0 50vh 30vh #0a0a0a;
          }
          .v {
            box-shadow: 0 0 35vw 20vw #0a0a0a;
          }
        }

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

export default GetInTouch;