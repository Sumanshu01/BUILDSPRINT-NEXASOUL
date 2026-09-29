'use client';

import { useState } from 'react';
import Link from 'next/link';
import CursedParticles from '@/components/CursedParticles';
import RegistrationForm from '@/components/RegistrationForm';
import RegisteredSquads from '@/components/RegisteredSquads';
import { soundManager } from '@/components/SoundEffects';
import { Volume2, VolumeX, ArrowLeft, Shield, Sparkles, Cpu } from 'lucide-react';

export default function RegisterPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [refreshSquadsTrigger, setRefreshSquadsTrigger] = useState(0);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.toggleAmbient(nextState);
    if (nextState) soundManager.playClick();
  };

  const handleRegistered = () => {
    setRefreshSquadsTrigger((prev) => prev + 1);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      <CursedParticles />

      {/* Navigation */}
      <nav className="navbar">
        <Link 
          href="/" 
          className="nav-logo"
          onClick={() => soundManager.playClick()}
        >
          <div className="nav-logo-icon">呪</div>
          <div className="nav-logo-text">
            <span className="nav-brand">NEXASOUL</span>
            <span className="nav-sub">BUILDSPRINT 2026</span>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <Link
            href="/"
            onClick={() => soundManager.playClick()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#94a3b8',
              textDecoration: 'none',
              fontFamily: 'var(--font-tech)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              transition: 'color 0.2s',
            }}
          >
            <ArrowLeft size={16} /> RETURN TO DOMAIN (HOME)
          </Link>

          <button
            onClick={toggleSound}
            style={{
              background: 'transparent',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: soundEnabled ? '#00d4ff' : '#94a3b8',
              cursor: 'pointer',
            }}
            title={soundEnabled ? 'Mute ambient cursed hum' : 'Enable ambient cursed hum'}
            type="button"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
        </div>
      </nav>

      {/* Main Registration Content */}
      <main style={{ position: 'relative', zIndex: 10, padding: '7rem 2rem 4rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>OFFICIAL SPRINT ENROLLMENT GATE</span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff, #a855f7 50%, #00d4ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}>
            DOMAIN REGISTRATION
          </h1>

          <p style={{
            fontFamily: 'var(--font-ui)',
            color: 'rgba(226, 232, 240, 0.75)',
            fontSize: '1rem',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Assemble your squad of 1 to 4 sorcerers for the NexaSoul BuildSprint Frontend Product Challenge. 
            All submissions are indexed into our serverless Neon database instance.
          </p>
        </div>

        {/* The Registration Form */}
        <RegistrationForm onRegistered={handleRegistered} />

        {/* Registered Squads Telemetry Section */}
        <section style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(168, 85, 247, 0.15)' }} id="teams">
          <div className="section-header" style={{ marginBottom: '2rem' }}>
            <div className="section-eyebrow">// TELEMETRY FEED</div>
            <h2 className="section-title" style={{ fontSize: '2rem' }}>LIVE SQUAD REGISTRY</h2>
            <p className="section-description" style={{ fontSize: '0.9rem' }}>
              Real-time records queried directly from the Neon PostgreSQL database cluster.
            </p>
          </div>

          <RegisteredSquads refreshTrigger={refreshSquadsTrigger} />
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">NEXASOUL // BUILDSPRINT 2026</div>
          <div className="footer-text">
            SEPTEMBER 30, 2026 &bull; B1 &amp; B2 SEMINAR HALL &bull; POWERED BY NEON POSTGRESQL &bull; ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}
