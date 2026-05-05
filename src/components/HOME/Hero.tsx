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
          background-color: var(--bg-dark);
        }

        .hero {
          padding-top: 12rem;
          padding-bottom: 10rem;
          padding-left: 1.5rem;
          padding-right: 1.5rem;
          position: relative;
          overflow: visible;
        }

        .hero-container {
          padding: 0 1.5rem;
          overflow: visible;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
          overflow: visible;
        }

        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          position: relative;
          z-index: 2;
        }

        .hero-label {
          display: inline-block;
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: linear-gradient(135deg, #fff 0%, var(--primary) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff;
        }

        @media (min-width: 768px) {
          .hero-title {
            font-size: 5rem;
          }
        }

        .hero-title span {
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .hero-description {
          font-size: 1.125rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          max-width: 90%;
        }

        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1rem;
        }

        /* Button Styles */
        .btn-primary {
          background-color: var(--primary);
          color: #000000;
          padding: 0.875rem 2rem;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .btn-primary:hover {
          background-color: var(--primary-light);
          transform: translateY(-2px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .btn-secondary {
          backdrop-filter: blur(8px);
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 0.875rem 2rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.3s ease;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .hero-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          min-height: 500px;
        }

        .canvas-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 180%;
          height: 180%;
          overflow: visible;
          pointer-events: none;
        }

        .canvas-wrapper canvas {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          overflow: visible;
        }

        /* Tablet and small laptop adjustments */
        @media (max-width: 1366px) {
          .hero-visual {
            min-height: 380px;
          }
          .canvas-wrapper {
            width: 150%;
            height: 150%;
          }
        }

        /* iPad and touch laptops */
        @media (max-width: 1024px) {
          .hero-visual {
            min-height: 0;
          }
          .canvas-wrapper {
            width: 130%;
            height: 130%;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding-top: 8rem;
            padding-bottom: 6rem;
          }
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-description {
            font-size: 1rem;
          }
          .hero-visual {
            min-height: 0;
          }
          .btn-primary, .btn-secondary {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
          }
        }
      `}</style>

      <section className="hero">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-label">
                Welcome to YUNIPAKISTAN
              </span>
              <h1 className="hero-title">
                Architecting <span>The Future.</span>
              </h1>
              <p className="hero-description">
                Pakistan's premier tech ecosystem. We empower leaders to transform vision into digital reality through elite education.
              </p>
              <div className="hero-buttons">
                <button className="btn-primary">
                  Explore Courses <i className="fas fa-rocket"></i>
                </button>
                <button className="btn-secondary">
                  Free Consultation
                </button>
              </div>
            </div>

            <div className="hero-visual">
              {isGlobeVisible && <div className="canvas-wrapper" ref={containerRef} />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}