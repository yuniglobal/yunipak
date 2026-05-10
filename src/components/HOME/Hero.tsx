// src/components/HOME/Hero.tsx
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const renderingParentRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseTweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleTweenRef = useRef<gsap.core.Tween | null>(null);
  const rotateTweenRef = useRef<gsap.core.Tween | null>(null);

  // Helper to determine globe visibility based on viewport dimensions
  const isViewportLargeEnough = () => {
    return window.innerWidth >= 1024 && window.innerHeight >= 700;
  };

  // Get scale range based on viewport size
  const getScaleRange = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // For smaller screens (laptops with 1366x768, tablets, etc.)
    if (width <= 1366 || height <= 768) {
      return { min: 0.45, max: 0.65 };
    }
    // For medium screens (1440x900, 1536x864)
    if (width <= 1536 || height <= 900) {
      return { min: 0.55, max: 0.75 };
    }
    // For 1080p and above
    if (width <= 1920 || height <= 1080) {
      return { min: 0.7, max: 0.9 };
    }
    // For large/2K+ screens
    return { min: 0.85, max: 1.0 };
  };

  // Get particle size based on viewport
  const getParticleSize = () => {
    const width = window.innerWidth;
    if (width <= 1366) return 1.4;
    if (width <= 1536) return 1.8;
    if (width <= 1920) return 2.0;
    return 2.2;
  };

  // State to control globe visibility
  const [isGlobeVisible, setIsGlobeVisible] = useState(isViewportLargeEnough);

  // Handle resize to show/hide globe based on width AND height
  useEffect(() => {
    const handleResize = () => {
      setIsGlobeVisible(isViewportLargeEnough());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Three.js initialization and cleanup
  useEffect(() => {
    if (!isGlobeVisible) {
      // Clean up any existing Three.js resources when globe should be hidden
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
        rendererRef.current = null;
      }
      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        const material = particlesRef.current.material;
        if (Array.isArray(material)) material.forEach(mat => mat.dispose());
        else material.dispose();
        particlesRef.current = null;
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      if (mouseTweenRef.current) mouseTweenRef.current.kill();
      if (scaleTweenRef.current) scaleTweenRef.current.kill();
      if (rotateTweenRef.current) rotateTweenRef.current.kill();
      sceneRef.current = null;
      cameraRef.current = null;
      renderingParentRef.current = null;
      return;
    }

    // Only initialize if globe is visible and container exists
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const scaleRange = getScaleRange();
    const particleSize = getParticleSize();

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 280);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Adjust radius based on screen size
    const baseRadius = 110;
    const scaleFactor = window.innerWidth <= 1366 ? 0.7 : window.innerWidth <= 1536 ? 0.85 : 1;
    const radius = baseRadius * scaleFactor;
    
    const particlesCount = window.innerWidth <= 1366 ? 1000 : window.innerWidth <= 1536 ? 1300 : 1600;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = 2 * Math.PI * Math.random();

      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(theta);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x0ae448,
      size: particleSize,
      transparent: true,
      opacity: 0.9,
    });

    const particles = new THREE.Points(geometry, material);
    particlesRef.current = particles;

    const renderingParent = new THREE.Group();
    renderingParent.add(particles);
    renderingParentRef.current = renderingParent;

    // Set initial scale
    renderingParent.scale.set(scaleRange.min, scaleRange.min, scaleRange.min);

    scene.add(renderingParent);

    // Reduce mouse sensitivity on smaller screens
    const getMouseSensitivity = () => {
      const width = window.innerWidth;
      if (width <= 1366) return 0.5;
      if (width <= 1536) return 0.65;
      return 0.8;
    };

    const mouseSensitivity = getMouseSensitivity();

    const onMouseMove = (event: MouseEvent) => {
      if (mouseTweenRef.current) mouseTweenRef.current.kill();

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      mouseTweenRef.current = gsap.to(particles.rotation, {
        duration: 0.1,
        x: mouseY * mouseSensitivity,
        y: mouseX * mouseSensitivity,
        overwrite: true,
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    const animProps = { scale: scaleRange.min, xRot: 0, yRot: 0 };

    scaleTweenRef.current = gsap.to(animProps, {
      duration: 10,
      scale: scaleRange.max,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      onUpdate: () => {
        if (renderingParentRef.current) {
          renderingParentRef.current.scale.set(animProps.scale, animProps.scale, animProps.scale);
        }
      },
    });

    rotateTweenRef.current = gsap.to(animProps, {
      duration: 120,
      xRot: Math.PI * 2,
      yRot: Math.PI * 4,
      repeat: -1,
      yoyo: true,
      ease: 'none',
      onUpdate: () => {
        if (renderingParentRef.current) {
          renderingParentRef.current.rotation.set(animProps.xRot, animProps.yRot, 0);
        }
      },
    });

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Cleanup function for this initialization
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      if (mouseTweenRef.current) mouseTweenRef.current.kill();
      if (scaleTweenRef.current) scaleTweenRef.current.kill();
      if (rotateTweenRef.current) rotateTweenRef.current.kill();

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.domElement.remove();
        rendererRef.current = null;
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        const material = particlesRef.current.material;
        if (Array.isArray(material)) material.forEach((mat) => mat.dispose());
        else material.dispose();
        particlesRef.current = null;
      }

      sceneRef.current = null;
      cameraRef.current = null;
      renderingParentRef.current = null;
    };
  }, [isGlobeVisible]);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          overflow-y: auto;
          background-color: #000000;
          color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
  
        /* Announcement Bar */
        .announcement-bar {
          width: 100%;
          background: #00c896;
          overflow: hidden;
          white-space: nowrap;
          padding: 10px 0;
          position: fixed;
          top: 0;
          z-index: 1000;
        }
  
        .announcement-track {
          display: inline-block;
          animation: scroll-left 20s linear infinite;
        }
  
        .announcement-track span {
          margin-right: 60px;
          font-size: 13px;
          font-weight: 600;
          color: #000000;
          letter-spacing: 0.5px;
        }
  
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
  
        /* Hero */
        .hero {
          min-height: 100vh;
          padding-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          position: relative;
        }
  
        /* HQ Badge */
        .hq-badge {
          display: inline-block;
          border: 1px solid #444;
          border-radius: 50px;
          padding: 6px 18px;
          font-size: 13px;
          font-weight: 600;
          color: #cccccc;
          letter-spacing: 1px;
          margin-bottom: 28px;
        }
  
        /* Main Title */
        .hero-title {
          font-size: clamp(52px, 10vw, 120px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -2px;
          color: #00c8ff;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
  
        /* Subtitle */
        .hero-sub {
          font-size: clamp(15px, 2vw, 18px);
          color: #888888;
          max-width: 600px;
          line-height: 1.7;
          margin-bottom: 48px;
        }
  
        /* Buttons row */
        .hero-btns {
          display: flex;
          gap: 16px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
  
        .btn-primary {
          background: #00c896;
          color: #000000;
          border: none;
          border-radius: 50px;
          padding: 16px 36px;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: opacity 0.2s;
        }
  
        .btn-primary:hover { opacity: 0.85; }
  
        .btn-secondary {
          background: transparent;
          color: #ffffff;
          border: 1.5px solid #444;
          border-radius: 50px;
          padding: 16px 36px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.2s;
        }
  
        .btn-secondary:hover { border-color: #00c896; color: #00c896; }
      `}</style>
  
      
  
      {/* Hero Section */}
      <div className="hero">
  
        {/* HQ Badge */}
        <div className="hq-badge">HQ: NASTP, PAKISTAN</div>
  
        {/* Title */}
        <h1 className="hero-title">
          ARCHITECTING<br />THE FUTURE.
        </h1>
  
        {/* Subtitle */}
        <p className="hero-sub">
          Pakistan's premier tech ecosystem. We empower leaders to transform
          vision into digital reality through elite education.
        </p>
  
        {/* Buttons */}
        <div className="hero-btns">
          <button className="btn-primary">
            EXPLORE COURSES 🚀
          </button>
          <button className="btn-secondary">
            Free Consultation
          </button>
        </div>
  
      </div>
    </>
  )}