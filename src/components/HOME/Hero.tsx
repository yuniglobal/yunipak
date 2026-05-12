// src/components/HOME/Hero.tsx
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Hero() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  // Three.js Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Interaction & Performance Refs
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [hasWebGL, setHasWebGL] = useState(true);

  // Detect theme - direct DOM check is more reliable for Three.js init
  const getInitialTheme = () => document.documentElement.getAttribute('data-theme') || 'dark';
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(newTheme);
      updateParticleColor(newTheme);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const updateParticleColor = (newTheme: string) => {
    if (particlesRef.current) {
      const color = newTheme === 'dark' ? 0x00e676 : 0x008f4c;
      (particlesRef.current.material as THREE.PointsMaterial).color.setHex(color);
      (particlesRef.current.material as THREE.PointsMaterial).opacity = newTheme === 'dark' ? 0.8 : 0.6;
    }
  };

  useEffect(() => {
    // WebGL Support Check
    const checkWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setHasWebGL(false);
      return;
    }

    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 180;

    const isLowPerf = document.documentElement.getAttribute('data-perf') === 'low';
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: window.devicePixelRatio === 1 && !isLowPerf,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPerf ? 1 : 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.BufferGeometry();
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 1500 : 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 600;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 1.2,
      color: theme === 'dark' ? 0x00e676 : 0x008f4c,
      transparent: true,
      opacity: theme === 'dark' ? 0.8 : 0.6,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;
    scene.add(particles);

    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);

    const animate = () => {
      const id = requestAnimationFrame(animate);
      if (!isVisible) return id;

      targetRotationX = mouseRef.current.y * 0.8;
      targetRotationY = mouseRef.current.x * 0.8;

      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      const time = Date.now() * 0.0001;

      particles.rotation.x = currentRotationX + scrollRef.current * 0.0005;
      particles.rotation.y = currentRotationY + time;

      const targetCameraX = mouseRef.current.x * 30;
      const targetCameraY = mouseRef.current.y * 30;

      camera.position.x += (targetCameraX - camera.position.x) * 0.03;
      camera.position.y += (targetCameraY - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      return id;
    };
    const animId = animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.8, force3D: true } });
    tl.fromTo('.hero-title-main', { y: 150, opacity: 0, skewY: 10 }, { y: 0, opacity: 1, skewY: 0, delay: 0.3 })
      .fromTo('.hero-title-accent', { y: 80, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.4')
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=1.2')
      .fromTo(btnsRef.current?.children || [], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.15 }, '-=1');
  }, []);

  return (
    <section className="hero">
      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2rem 1.5rem;
          background: var(--bg-primary);
        }

        .hero-canvas-container {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .hero-fallback {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, #0a0a0a 0%, #000 100%);
          z-index: 0;
          overflow: hidden;
        }

        .fallback-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          animation: fallback-float 20s infinite alternate ease-in-out;
        }

        .orb-1 { width: 400px; height: 400px; background: var(--pk-green); top: -10%; left: -10%; }
        .orb-2 { width: 300px; height: 300px; background: #0085d1; bottom: 10%; right: 10%; animation-delay: -5s; }
        .orb-3 { width: 250px; height: 250px; background: #9d00ff; top: 40%; left: 30%; animation-delay: -10s; }

        @keyframes fallback-float {
          from { transform: translate(0, 0) rotate(0deg); }
          to { transform: translate(100px, 50px) rotate(30deg); }
        }

        .hero-overlay {
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1300px;
          width: 100%;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        @media (min-width: 1024px) {
          .hero-content {
            padding-left: 10%;
          }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 0.6rem 1.8rem;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          color: var(--pk-green);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          box-shadow: 0 4px 20px var(--glass-shadow);
        }

        .hero-title {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .hero-title-main {
          font-size: clamp(3.5rem, 15vw, 10rem);
          font-weight: 900;
          color: var(--text-primary);
          line-height: 0.8;
          letter-spacing: -0.07em;
          margin-bottom: 0.5rem;
        }

        .hero-title-accent {
          font-size: clamp(2rem, 10vw, 6rem);
          font-weight: 300;
          color: var(--pk-green);
          font-family: 'Inter', sans-serif;
          letter-spacing: -0.03em;
          opacity: 0.9;
        }

        .hero-sub {
          max-width: 550px;
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-weight: 400;
        }

        .hero-btns {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          margin-top: 1rem;
        }

        .mesh-decor {
          position: absolute;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, var(--pk-green-glow-subtle) 0%, transparent 70%);
          top: -10vw;
          right: -10vw;
          filter: blur(60px);
          opacity: 0.4;
          z-index: 0;
          pointer-events: none;
          will-change: filter;
        }
      `}</style>

      <div className="mesh-decor" />
      <div ref={containerRef} className="hero-canvas-container" />
      
      {!hasWebGL && (
        <div className="hero-fallback">
          <div className="fallback-orb orb-1"></div>
          <div className="fallback-orb orb-2"></div>
          <div className="fallback-orb orb-3"></div>
        </div>
      )}

      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div>
          <div className="hero-badge">
            <span style={{ width: 8, height: 8, background: 'var(--pk-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--pk-green)' }}></span>
          </div>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-main">BEYOND</span>
          <span className="hero-title-accent">The Interface.</span>
        </h1>

        <p className="hero-sub" ref={subRef}>
          Stop consuming technology. Start architecting it.
          The elite technical fellowship at NASTP is now accepting
          the next generation of Pakistani engineers.
        </p>

        <div className="hero-btns" ref={btnsRef}>
          <button className="btn-tech btn-tech-primary" onClick={() => navigate('/Programs')}>
            Initialize Training
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
          <button className="btn-tech btn-tech-outline" onClick={() => navigate('/contact')}>
            Consult Architects
          </button>
        </div>
      </div>
    </section>
  );
}