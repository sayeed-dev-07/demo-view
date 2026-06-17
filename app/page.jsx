/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import EditorialHero from '@/components/HomePage';
import IntroOverlay from '@/components/Perloader';
import React, { useState, useEffect } from 'react';


export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldPlayIntro, setShouldPlayIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {

    setIsMounted(true);

    // 2. Check storage
    const hasPlayed = sessionStorage.getItem('portfolio-intro-played');
    if (hasPlayed === 'true') {
      setShouldPlayIntro(false);
      setIntroFinished(true); // Skip straight to page animations
    }
  }, []);


  if (!isMounted) {
    return <main className="min-h-screen bg-white" />;
  }

  const handleIntroComplete = () => {
    setIntroFinished(true);
  };

  return (
    <main className="relative bg-white">
      <IntroOverlay
        shouldPlay={shouldPlayIntro}
        onComplete={handleIntroComplete}
      />

      <EditorialHero playAnimations={introFinished} />
    </main>
  );
}