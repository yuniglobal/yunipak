'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // We'll create layers of particles for a parallax effect
    const particles: Particle[] = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 60 : 160;

    // Mouse tracking for interactive effect
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      z: number; // For depth/parallax
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height * 2 - height; // Spread vertically for scrolling
        this.z = Math.random() * 0.8 + 0.2; // Depth (0.2 to 1.0)
        
        // Continuous movement, significantly faster
        this.vx = (Math.random() - 0.5) * 1.5 * this.z;
        this.vy = (Math.random() - 0.5) * 1.5 * this.z;
        
        this.size = (Math.random() * 3.5 + 1.5) * this.z;
        
        // Colors from the YUNI brand
        const colors = [
          'rgba(0, 143, 76, 0.9)',   // --pk-green
          'rgba(0, 230, 118, 0.9)',  // --pk-green-light
          'rgba(255, 255, 255, 0.6)' // white accents
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(scrollOffset: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Mouse avoidance/attraction based on depth
        // Only top layer reacts significantly to mouse
        if (this.z > 0.6) {
            const dx = mouseX - this.x;
            // Adjust visual Y based on scroll for accurate mouse interaction
            const visualY = this.y - scrollOffset * this.z;
            const dy = mouseY - visualY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 250) {
                const force = (250 - dist) / 250;
                this.x -= (dx / dist) * force * 3;
                this.y -= (dy / dist) * force * 3;
            }
        }

        // Wrap around horizontally
        if (this.x < -50) this.x = width + 50;
        if (this.x > width + 50) this.x = -50;
        
        // Logical bounds for continuous flow vertically
        const maxScrollHeight = document.body.scrollHeight || height * 3;
        if (this.y < -height) this.y = maxScrollHeight;
        if (this.y > maxScrollHeight + height) this.y = -height;
      }

      draw(scrollOffset: number) {
        if (!ctx) return;
        
        // Calculate screen Y based on scroll and depth
        const screenY = this.y - scrollOffset * this.z * 1.2;

        // Don't draw if completely off-screen to save performance
        if (screenY < -100 || screenY > height + 100) return;

        ctx.beginPath();
        ctx.arc(this.x, screenY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add a strong glow effect to particles
        if (this.z > 0.5) {
            ctx.shadowBlur = 20 * this.z;
            ctx.shadowColor = this.color;
        } else {
            ctx.shadowBlur = 0;
        }
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const render = () => {
      // Smooth scroll interpolation (lerping)
      targetScroll = window.scrollY;
      currentScroll += (targetScroll - currentScroll) * 0.08;

      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 0; // Reset shadow blur for lines

      // Draw background ambient gradient that pulses stronger
      const time = Date.now() * 0.001;
      const pulse = Math.sin(time) * 0.15 + 0.15;
      
      const gradient = ctx.createRadialGradient(
        width/2, height/2 + (currentScroll * 0.1), 0, 
        width/2, height/2 + (currentScroll * 0.1), Math.max(width, height)
      );
      
      // Match the dark theme background subtly
      gradient.addColorStop(0, `rgba(0, 143, 76, ${pulse})`); 
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw lines between particles in the same depth layer
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          
          // Only connect particles that are roughly on the same depth plane
          if (Math.abs(p1.z - p2.z) > 0.3) continue;

          const screenY1 = p1.y - currentScroll * p1.z * 1.2;
          const screenY2 = p2.y - currentScroll * p2.z * 1.2;

          // Skip if both are offscreen
          if ((screenY1 < -50 || screenY1 > height + 50) && 
              (screenY2 < -50 || screenY2 > height + 50)) {
              continue;
          }

          const dx = p1.x - p2.x;
          const dy = screenY1 - screenY2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 180 * ((p1.z + p2.z) / 2); // Connect further if closer to camera

          if (distance < maxDist) {
            ctx.beginPath();
            // High opacity for lively connections
            const alpha = (1 - distance / maxDist) * 0.8 * ((p1.z + p2.z) / 2);
            ctx.strokeStyle = `rgba(0, 230, 118, ${alpha})`;
            ctx.lineWidth = 2 * ((p1.z + p2.z) / 2);
            ctx.moveTo(p1.x, screenY1);
            ctx.lineTo(p2.x, screenY2);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach(p => {
        p.update(currentScroll);
        p.draw(currentScroll);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="canvas-bg-container">
      <canvas ref={canvasRef} className="animated-canvas" />
      <style>{`
        .canvas-bg-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -5;
          background-color: var(--bg-primary); /* Base color */
          pointer-events: none;
        }

        .animated-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 1;
          transition: opacity 0.5s ease;
        }
        
        [data-theme="dark"] .animated-canvas {
          opacity: 1; /* More visible in dark mode */
        }
        
        [data-theme="light"] .animated-canvas {
           /* In light mode, lower opacity slightly to maintain readability but keep it lively */
           opacity: 0.6;
        }
      `}</style>
    </div>
  );
}
