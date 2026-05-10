'use client';

import { useEffect, useRef } from 'react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedTitle({ children, className = '', style }: AnimatedTitleProps) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        backgroundSize: '100% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'center 90%',
          end: 'center 40%',
          scrub: 0.5,
        },
      });
    }
  }, []);

  return (
    <>
      <h2 ref={textRef} className={`scroll-fill-title ${className}`} style={style}>
        {children}
      </h2>
      <style>{`
        .scroll-fill-title {
          color: rgba(148, 163, 184, 0.2); /* Dimmed base color */
          background: linear-gradient(to right, var(--text-primary), var(--text-primary)) no-repeat;
          -webkit-background-clip: text;
          background-clip: text;
          background-size: 0% 100%;
          width: fit-content;
          position: relative;
        }

        [data-theme="dark"] .scroll-fill-title {
          color: rgba(255, 255, 255, 0.15);
          background-image: linear-gradient(to right, #ffffff, #ffffff);
        }
        
        [data-theme="light"] .scroll-fill-title {
          color: rgba(0, 0, 0, 0.15);
          background-image: linear-gradient(to right, #000000, #000000);
        }

        /* If there's a gradient span inside, it overrides the color but keeps the background-clip behavior if we're careful. 
           Actually, the parent's background-clip will clip its own background. The child will render its own color on top. 
           To make the child reveal, it's better to NOT use nested gradients. */
        .scroll-fill-title .text-gradient {
          background: none;
          -webkit-text-fill-color: currentcolor;
          color: inherit;
          /* We just let it be the same color as the rest of the text for a clean fill effect */
        }
      `}</style>
    </>
  );
}
