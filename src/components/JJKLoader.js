'use client';

import { useEffect, useState } from 'react';

export default function JJKLoader({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // loading | sealing | complete
  const [progress, setProgress] = useState(0);
  const [sealText, setSealText] = useState('INITIALIZING CURSED ENERGY...');

  const phases = [
    'INITIALIZING CURSED ENERGY...',
    'EXPANDING DOMAIN...',
    'SUMMONING BARRIER...',
    'ACTIVATING TECHNIQUE...',
    'DOMAIN ACHIEVED — ENTER NOW',
  ];

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setPhase('sealing');
        setTimeout(() => {
          setPhase('complete');
          setTimeout(() => onComplete?.(), 600);
        }, 600);
      }
      setProgress(Math.min(current, 100));
      const idx = Math.floor((current / 100) * (phases.length - 1));
      setSealText(phases[Math.min(idx, phases.length - 1)]);
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loader-overlay ${phase === 'complete' ? 'hidden' : ''}`}>
      {/* Animated seal rings */}
      <div className="loader-seal">
        <div className="seal-ring seal-ring-1" />
        <div className="seal-ring seal-ring-2" />
        <div className="seal-ring seal-ring-3" />
        <div className="seal-ring seal-ring-4" />
        <div className="seal-core">
          <span>呪</span>
        </div>
      </div>

      {/* Brand */}
      <div style={{
        fontFamily: "'Cinzel', serif",
        fontSize: '1.6rem',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #ffffff, #a855f7, #00d4ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '0.15em',
        marginBottom: '0.25rem',
      }}>
        NEXASOUL
      </div>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '0.65rem',
        color: '#a855f7',
        letterSpacing: '0.4em',
        marginBottom: '1.5rem',
      }}>
        BUILDSPRINT
      </div>

      {/* Status text */}
      <div className="loader-text">{sealText}</div>
      <div className="loader-subtitle">FRONTEND PRODUCT CHALLENGE // 30 SEP 2026</div>

      {/* Progress bar */}
      <div className="loader-bar-container" style={{ marginTop: '1.5rem' }}>
        <div
          className="loader-bar"
          style={{ width: `${progress}%`, transition: 'width 0.15s ease' }}
        />
      </div>
      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: '0.6rem',
        color: 'rgba(168,85,247,0.6)',
        marginTop: '0.5rem',
        letterSpacing: '0.1em',
      }}>
        {Math.floor(progress)}% SYNCED
      </div>
    </div>
  );
}
