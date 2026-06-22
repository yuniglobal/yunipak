// src/components/HOME/Hero.tsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function Hero() {
  const navigate = useNavigate();
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.8, force3D: true } });
    tl.fromTo('.hero-title-main', { y: 150, opacity: 0, skewY: 10 }, { y: 0, opacity: 1, skewY: 0, delay: 0.3 })
      .fromTo('.hero-title-accent', { y: 80, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.4')
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2')
      .fromTo(btnsRef.current?.children || [], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.15 }, '-=1');
  }, []);

  return (
    <section className="hero">

      <div className="hero-mesh-bg">
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>
      </div>

      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <div>
          <div className="hero-badge">
            <span style={{ width: 8, height: 8, background: 'var(--pk-green-light)', borderRadius: '50%', boxShadow: '0 0 10px var(--pk-green-light)' }}></span>
            National Tech Fellowship
          </div>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-main">Awaken</span>
          <span className="hero-title-accent">Your Potential.</span>
        </h1>

        <p className="hero-sub" ref={subRef}>
          Yuni Pakistan is dedicated to transforming theoretical knowledge into 
          real-world economic power. Join the national tech fellowship to discover 
          your purpose, develop modern capabilities, and build a self-reliant digital Pakistan.
        </p>

        <div className="hero-btns" ref={btnsRef}>
          <button className="btn-tech btn-tech-primary" onClick={() => navigate('/summer-camp')}>
            Explore Summer Camp
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
          <button className="btn-tech btn-tech-outline" onClick={() => navigate('/contact')}>
            Contact Admissions
          </button>
        </div>
      </div>
    </section>
  );
}