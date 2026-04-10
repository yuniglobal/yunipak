'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [showIntro, setShowIntro] = useState(true); // start with true, but will check storage
  const [mainKey, setMainKey] = useState(0); // to force remount

  useEffect(() => {
    const hasShownIntro = sessionStorage.getItem('introShown');
    if (hasShownIntro) {
      setShowIntro(false);
      setMainKey(prev => prev + 1); // force remount of main content
    } else {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem('introShown', 'true');
    setShowIntro(false);
    // Force a remount of the main content by changing key after intro is gone
    setMainKey(prev => prev + 1);
    // Refresh ScrollTrigger after a short delay to let DOM settle
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

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  // Use key to force a completely fresh mount of the main content
  return (
    <div key={mainKey}>
      <Hero />
      <FeaturesReveal />
      <Slider
        images={logoImages.slice(0, 9)}
        width={230}
        height={230}
        reverse={true}
        quantity={9}
      />
      <TextEffect />
      <CTA />
    </div>
  );
}