'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ReactElement } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/HOME/Hero';
import FeaturesReveal from '../components/HOME/FeaturesReveal';
import CTA from '../components/HOME/CTA';
import TextEffect from '../components/HOME/TextEffect';
import Slider from '../components/HOME/Slider';
import IntroAnimation from '../components/IntroAnimation';

// Register ScrollTrigger once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);
  const [mainKey, setMainKey] = useState(0);

  useEffect(() => {
    const hasShownIntro = sessionStorage.getItem('introShown');
    if (hasShownIntro) {
      setShowIntro(false);
      setMainKey(prev => prev + 1);
    } else {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('introShown', 'true');
    setShowIntro(false);
    setMainKey(prev => prev + 1);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  const logoImages = [
    'https://picsum.photos/id/100/100/100',
    'https://picsum.photos/id/101/100/100',
    'https://picsum.photos/id/104/100/100',
    'https://picsum.photos/id/107/100/100',
    'https://picsum.photos/id/116/100/100',
    'https://picsum.photos/id/119/100/100',
    'https://picsum.photos/id/120/100/100',
    'https://picsum.photos/id/155/100/100',
    'https://picsum.photos/id/169/100/100',
    'https://picsum.photos/id/176/100/100',
  ];

  const team = [
    { name: 'Abdul Moiz', role: 'Founder', icon: '👔', desc: 'Driving the macro-vision of YUNI to build an unparalleled educational empire.' },
    { name: 'Sahaf', role: 'Co-Founder & COO', icon: '🚀', desc: 'Architecting premium product experiences and overseeing operational excellence.' }
  ];

  const testimonials = [
    { name: 'Ahmed R.', course: 'Cybersecurity', text: 'The program at NASTP completely changed my trajectory. Landed a job immediately.', letter: 'A', rating: 5 },
    { name: 'Fatima S.', course: 'Amazon Mastery', text: 'Sahaf and Moiz built an incredible ecosystem. We launched a real product during training.', letter: 'F', rating: 5 },
    { name: 'Usman K.', course: 'Prompt Engineering', text: 'The YUNI LMS is smoother than my university. The gamification kept me hooked.', letter: 'U', rating: 5 }
  ];

  // Helper function to render stars with proper typing
  const renderStars = (rating: number): ReactElement[] => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars: ReactElement[] = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="star-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half-star" className="star-icon half-star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          <defs>
            <clipPath id="half-star-clip">
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
        </svg>
      );
    }
    
    return stars;
  };

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background-color: #000000;
        }

        .home-container {
          width: 100%;
          overflow-x: hidden;
          background-color: #000000;
        }

        /* Stats Section */
        .stats-section {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background-color: #000000;
          margin-top: 5rem;
          margin-bottom: 5rem;
        }

        @media (min-width: 768px) {
          .stats-section {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        @media (min-width: 1024px) {
          .stats-section {
            margin-top: 10rem;
            margin-bottom: 10rem;
          }
        }

        .stats-wrapper {
          max-width: 80rem;
          margin: 0 auto;
          padding: 4rem 1.5rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2.5rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .stats-wrapper {
            grid-template-columns: repeat(4, 1fr);
            padding: 5rem 1.5rem;
          }
        }

        .stat-item {
          text-align: center;
          transform: translateY(0);
          transition: transform 0.3s ease;
        }

        .stat-item:hover {
          transform: translateY(-5px);
        }

        .stat-number {
          font-family: var(--font-display, system-ui);
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .stat-number {
            font-size: 3.5rem;
          }
        }

        .stat-number.brand {
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-number.blue {
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-number.purple {
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .stat-label {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          color: #6b7280;
          transition: color 0.3s ease;
        }

        .stat-item:hover .stat-label {
          color: #10b981;
        }

        /* Marquee Section */
        .marquee-section {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 2rem 0;
          overflow: hidden;
          position: relative;
          background: #000000;
        }

        .marquee-content {
          overflow: hidden;
          position: relative;
          width: 100%;
        }

        .marquee-track {
          white-space: nowrap;
          display: flex;
          align-items: center;
          font-family: var(--font-display, system-ui);
          font-weight: 900;
          font-size: 1.25rem;
          color: #4b5563;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.6;
          animation: marquee 25s linear infinite;
        }

        @media (min-width: 768px) {
          .marquee-track {
            font-size: 1.5rem;
          }
        }

        .marquee-item {
          margin: 0 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        @media (min-width: 768px) {
          .marquee-item {
            margin: 0 3rem;
          }
        }

        .marquee-item:hover {
          color: #10b981;
          opacity: 1;
          transform: scale(1.05);
        }

        .marquee-item i {
          margin-right: 0.5rem;
          font-size: 1.25rem;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        /* Hover pause effect */
        .marquee-section:hover .marquee-track {
          animation-play-state: paused;
        }

        /* Features Reveal spacing */
        .features-wrapper {
          margin-top: 1rem;
          margin-bottom: 5rem;
          background-color: #000000;
        }

        @media (min-width: 768px) {
          .features-wrapper {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        /* Team Section */
        .team-section {
          background-color: #000000;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 8rem;
          padding-bottom: 8rem;
        }

        .container {
          max-width: 80rem;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .section-title {
          font-family: var(--font-display, system-ui);
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 5rem;
          text-align: center;
          text-transform: uppercase;
          background: linear-gradient(135deg, #ffffff, #fafafa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        @media (min-width: 768px) {
          .section-title {
            font-size: 4rem;
          }
        }

        .section-subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 3rem;
          font-size: 1.1rem;
          letter-spacing: 0.05em;
        }

        .text-brand {
          background: linear-gradient(135deg, #10b981, #34d399);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .text-green {
          background: linear-gradient(135deg, #ffffff, #10b981);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .team-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          max-width: 64rem;
          margin: 0 auto;
        }

        @media (min-width: 768px) {
          .team-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .testimonial-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        /* Card Styles */
        .team-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(2px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 2rem;
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .team-card:hover {
          transform: translateY(-8px);
          border-color: rgba(16, 185, 129, 0.4);
          background: rgba(16, 185, 129, 0.05);
          box-shadow: 0 20px 35px -12px rgba(0, 0, 0, 0.5);
        }

        .team-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .team-name {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.25rem;
          color: #ffffff;
        }

        .team-role {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #10b981;
          margin-bottom: 1rem;
        }

        .team-desc {
          color: #9ca3af;
          line-height: 1.5;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(2px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 1.5rem;
          padding: 1.5rem;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-5px);
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.05);
        }

        .testimonial-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .testimonial-avatar {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 1.25rem;
          color: white;
          background-color: #10b981;
        }

        .testimonial-name {
          font-weight: 800;
          font-size: 1.2rem;
          color: #ffffff;
        }

        .testimonial-course {
          font-size: 0.75rem;
          font-weight: 600;
          color: #10b981;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .testimonial-text {
          font-style: italic;
          color: #d1d5db;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        /* Star Rating Styles */
        .testimonial-rating {
          display: flex;
          gap: 0.25rem;
          align-items: center;
          margin-top: 0.75rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .star-icon {
          color: #fbbf24;
          filter: drop-shadow(0 0 2px rgba(251, 191, 36, 0.3));
          transition: transform 0.2s ease;
        }

        .star-icon:hover {
          transform: scale(1.1);
        }

        .half-star {
          clip-path: inset(0 50% 0 0);
        }

        .rating-text {
          margin-left: 0.5rem;
          font-size: 0.75rem;
          color: #6b7280;
          font-weight: 500;
        }

        /* Testimonials Section */
        .testimonials-section {
          max-width: 80rem;
          margin: 0 auto;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          padding-top: 8rem;
          padding-bottom: 8rem;
          background-color: #000000;
        }

        /* Slider spacing */
        .slider-wrapper {
          margin-top: 5rem;
          margin-bottom: 5rem;
          background-color: #000000;
        }

        @media (min-width: 768px) {
          .slider-wrapper {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        /* TextEffect spacing */
        .texteffect-wrapper {
          margin-top: 5rem;
          margin-bottom: 5rem;
          background-color: #000000;
        }

        @media (min-width: 768px) {
          .texteffect-wrapper {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        /* CTA spacing */
        .cta-wrapper {
          margin-top: 5rem;
          margin-bottom: 5rem;
          background-color: #000000;
        }

        @media (min-width: 768px) {
          .cta-wrapper {
            margin-top: 8rem;
            margin-bottom: 8rem;
          }
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .stat-number {
            font-size: 2rem;
          }
          
          .stat-label {
            font-size: 0.625rem;
          }
          
          .marquee-track {
            font-size: 0.875rem;
          }
          
          .marquee-item {
            margin: 0 1rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .team-section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }

          .testimonials-section {
            padding-top: 4rem;
            padding-bottom: 4rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .stats-section {
            background-color: #000000;
          }
          
          .stat-label {
            color: #9ca3af;
          }
          
          .marquee-section {
            background: #000000;
          }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
          background-color: #000000;
        }
      `}</style>

      <div key={mainKey} className="home-container">
        <Hero />

        <div className="stats-section">
          <div className="stats-wrapper">
            <div className="stat-item">
              <h3 className="stat-number brand">5000+</h3>
              <p className="stat-label">Students Trained</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number blue">12+</h3>
              <p className="stat-label">Premium Courses</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number purple">98%</h3>
              <p className="stat-label">Satisfaction Rate</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number brand">24h</h3>
              <p className="stat-label">Support Turnaround</p>
            </div>
          </div>

          <div className="marquee-section">
            <div className="marquee-content">
              <div className="marquee-track">
                <span className="marquee-item">AWS PARTNER</span>
                <span className="marquee-item">GOOGLE CLOUD</span>
                <span className="marquee-item">COMPTIA</span>
                <span className="marquee-item">NASTP</span>
                <span className="marquee-item">MICROSOFT</span>
                <span className="marquee-item">LINUX</span>
                <span className="marquee-item">AWS PARTNER</span>
                <span className="marquee-item">GOOGLE CLOUD</span>
                <span className="marquee-item">COMPTIA</span>
                <span className="marquee-item">NASTP</span>
                <span className="marquee-item">MICROSOFT</span>
                <span className="marquee-item">LINUX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="features-wrapper">
          <FeaturesReveal />
        </div>

        <div className="team-section">
          <div className="container">
            <h2 className="section-title">MEET THE <span className="text-green">COMMAND</span></h2>
            <p className="section-subtitle">The visionaries building tomorrow's educational empire</p>
            <div className="team-grid">
              {team.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-icon">{member.icon}</div>
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                  <div className="team-desc">{member.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="testimonials-section">
          <h2 className="section-title">STUDENT <span className="text-green">SUCCESS</span></h2>
          <p className="section-subtitle">Real stories from real learners who transformed their careers</p>
          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    {item.letter}
                  </div>
                  <span className="testimonial-name">{item.name}</span>
                </div>
                <div className="testimonial-course">{item.course}</div>
                <div className="testimonial-text">"{item.text}"</div>
                <div className="testimonial-rating">
                  {renderStars(item.rating)}
                  <span className="rating-text">5.0</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="slider-wrapper">
          <Slider
            images={logoImages.slice(0, 9)}
            width={230}
            height={230}
            reverse={true}
            quantity={9}
          />
        </div>

        <div className="texteffect-wrapper">
          <TextEffect />
        </div>

          <CTA />
      </div>
    </>
  );
}