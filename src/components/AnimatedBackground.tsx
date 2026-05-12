import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const orbs = container.querySelectorAll('.liquid-orb');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetX = mouseX;
    let targetY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const isLowPerf = document.documentElement.getAttribute('data-perf') === 'low';
    
    const update = () => {
      // Pause if tab is not visible or if we want to save power
      if (document.visibilityState === 'hidden') {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      // Easing for liquid feel
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      orbs.forEach((orb, i) => {
        const speed = 0.02 + (i * 0.01);
        const xOffset = Math.sin(Date.now() * 0.001 * speed + i) * 100;
        const yOffset = Math.cos(Date.now() * 0.001 * speed + i) * 100;
        
        // Combine mouse position with floating movement
        const x = mouseX + xOffset - (window.innerWidth / 2);
        const y = mouseY + yOffset - (window.innerHeight / 2);
        
        (orb as HTMLElement).style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="liquid-bg-container" ref={containerRef}>
      <div className="liquid-orb orb-1"></div>
      <div className="liquid-orb orb-2"></div>
      <div className="liquid-orb orb-3"></div>
      <div className="liquid-orb orb-4"></div>
      <div className="noise-overlay"></div>
      
      <style>{`
        .liquid-bg-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -5;
          background: var(--bg-primary);
          overflow: hidden;
          pointer-events: none;
        }

        .liquid-orb {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 60vw;
          height: 60vw;
          margin-left: -30vw;
          margin-top: -30vw;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.4;
          mix-blend-mode: var(--orb-blend-mode);
          pointer-events: none;
          will-change: transform;
        }

        .orb-1 {
          background: radial-gradient(circle, var(--pk-green) 0%, transparent 70%);
          width: 70vw;
          height: 70vw;
          opacity: 0.3;
        }

        .orb-2 {
          background: radial-gradient(circle, #00c853 0%, transparent 70%);
          width: 50vw;
          height: 50vw;
          opacity: 0.2;
        }

        .orb-3 {
          background: radial-gradient(circle, #004d40 0%, transparent 70%);
          width: 80vw;
          height: 80vw;
          opacity: 0.15;
        }

        .orb-4 {
          background: radial-gradient(circle, var(--pk-green-light) 0%, transparent 70%);
          width: 40vw;
          height: 40vw;
          opacity: 0.1;
        }

        .noise-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3%3Ffilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.05;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        @media (max-width: 768px) {
          .liquid-orb {
            width: 100vw;
            height: 100vw;
            margin-left: -50vw;
            margin-top: -50vw;
            filter: blur(40px);
          }
        }

        [data-perf="low"] .liquid-orb,
        [data-webgl="false"] .liquid-orb {
          filter: blur(40px);
          opacity: 0.2;
          will-change: auto; /* Reduce compositor pressure */
        }

        [data-webgl="false"] .liquid-orb {
          display: none !important;
        }
      `}</style>
    </div>
  );
}
