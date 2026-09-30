'use client';

import { useEffect, useRef } from 'react';

export default function CursedParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 5 + 2;
      const x = Math.random() * 100;
      const duration = Math.random() * 10 + 8;
      const delay = Math.random() * 5;

      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        bottom: -10px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `;
      container.appendChild(p);

      setTimeout(() => {
        if (container.contains(p)) container.removeChild(p);
      }, (duration + delay) * 1000);
    };

    // Create initial batch
    for (let i = 0; i < 25; i++) {
      setTimeout(createParticle, i * 250);
    }

    // Continuous spawning — slightly slower rate for light theme elegance
    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Background orbs */}
      <div className="cursed-bg" />
      <div className="cursed-orb cursed-orb-1" />
      <div className="cursed-orb cursed-orb-2" />
      <div className="cursed-orb cursed-orb-3" />

      {/* Particle stream */}
      <div className="particles-container" ref={containerRef} />
    </>
  );
}
