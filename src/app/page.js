'use client';

import { useState } from 'react';
import Link from 'next/link';
import JJKLoader from '@/components/JJKLoader';
import CursedParticles from '@/components/CursedParticles';
import CountdownTimer from '@/components/CountdownTimer';
import RegistrationForm from '@/components/RegistrationForm';
import RegisteredSquads from '@/components/RegisteredSquads';
import { soundManager } from '@/components/SoundEffects';
import { 
  Volume2, 
  VolumeX, 
  Calendar, 
  MapPin, 
  Users, 
  Trophy, 
  Code2, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Terminal,
  ExternalLink
} from 'lucide-react';

export default function Home() {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [squadsRefreshTrigger, setSquadsRefreshTrigger] = useState(0);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.toggleAmbient(nextState);
    if (nextState) {
      soundManager.playClick();
    }
  };

  const handleSquadRegistered = () => {
    setSquadsRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Cursed Energy Opening Loader */}
      {!loaderFinished && (
        <JJKLoader onComplete={() => setLoaderFinished(true)} />
      )}

      {/* Ambient Cursed Energy Glow & Rising Particles */}
      <CursedParticles />

      {/* Fixed Cyber/JJK Navigation Bar */}
      <nav className="navbar" id="top-nav">
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

        <ul className="nav-links">
          <li>
            <a 
              href="#overview" 
              className="nav-link"
              onClick={() => soundManager.playClick()}
            >
              Overview
            </a>
          </li>
          <li>
            <a 
              href="#intel" 
              className="nav-link"
              onClick={() => soundManager.playClick()}
            >
              Event Intel
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className="nav-link"
              onClick={() => soundManager.playClick()}
            >
              Domain Lore
            </a>
          </li>
          <li>
            <a 
              href="#teams" 
              className="nav-link"
              onClick={() => soundManager.playClick()}
            >
              Squads
            </a>
          </li>
          <li>
            <a 
              href="#register" 
              className="nav-link"
              onClick={() => soundManager.playClick()}
            >
              Register
            </a>
          </li>
        </ul>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={toggleSound}
            style={{
              background: 'transparent',
              border: `1px solid ${soundEnabled ? 'rgba(0, 212, 255, 0.6)' : 'rgba(168, 85, 247, 0.3)'}`,
              borderRadius: '50%',
              width: '38px',
              height: '38px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: soundEnabled ? '#00d4ff' : '#94a3b8',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: soundEnabled ? '0 0 15px rgba(0, 212, 255, 0.4)' : 'none',
            }}
            title={soundEnabled ? 'Mute ambient cursed drone' : 'Enable ambient cursed drone'}
            id="sound-toggle-btn"
            type="button"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>

          <a 
            href="#register" 
            className="nav-cta"
            onClick={() => soundManager.playClick()}
          >
            REGISTER SQUAD
          </a>
        </div>
      </nav>

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="hero-section" id="overview">
        <div className="hero-bg-image" />
        <div className="hero-bg-gradient" />

        <div className="hero-content">
          {/* Status Badge */}
          <div className="hero-badge animate-fadeInUp animate-delay-1">
            <span className="badge-dot" />
            <span>BUILDSPRINT PROTOCOL // SEPTEMBER 30, 2026</span>
          </div>

          <div className="hero-eyebrow animate-fadeInUp animate-delay-2">
            NEXT-GEN FRONTEND PRODUCT CHALLENGE
          </div>

          <h1 className="hero-title animate-fadeInUp animate-delay-2">
            NEXASOUL
          </h1>

          <div className="hero-title-sub animate-fadeInUp animate-delay-3">
            JUJUTSU FRONTEND CHALLENGE 2026
          </div>

          <div className="hero-divider animate-fadeInUp animate-delay-3">
            <div className="divider-line" />
            <span className="divider-symbol">呪</span>
            <div className="divider-line" />
          </div>

          <p className="hero-description animate-fadeInUp animate-delay-4">
            An elite, high-velocity engineering and UI architecture sprint designed for builders 
            pushing the frontier of anime aesthetic interfaces, high-performance web applications, 
            and resilient distributed cloud data on Neon PostgreSQL.
          </p>

          {/* Quick Event Metadata */}
          <div className="hero-meta animate-fadeInUp animate-delay-4">
            <div className="meta-item">
              <span className="meta-label">DATE OF BATTLE</span>
              <span className="meta-value highlight">30 SEP 2026</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">DOMAIN GROUNDS</span>
              <span className="meta-value">B1 &amp; B2 HALL</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SQUAD MATRIX</span>
              <span className="meta-value">1 – 4 BUILDERS</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">DATABASE CLUSTER</span>
              <span className="meta-value highlight">NEON SERVERLESS</span>
            </div>
          </div>

          {/* Target Countdown Timer */}
          <div className="animate-fadeInUp animate-delay-5" style={{ marginBottom: '2.5rem' }}>
            <CountdownTimer />
          </div>

          {/* Action CTAs */}
          <div className="hero-actions animate-fadeInUp animate-delay-5">
            <a 
              href="#register" 
              className="btn-primary"
              onClick={() => soundManager.playClick()}
            >
              <Zap size={16} />
              <span>EXPAND DOMAIN // REGISTER SQUAD</span>
            </a>

            <a 
              href="#intel" 
              className="btn-secondary"
              onClick={() => soundManager.playClick()}
            >
              <Sparkles size={16} />
              <span>EXPLORE EVENT INTEL</span>
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
          EVENT INTEL SECTION
          ============================================================ */}
      <section className="section" id="intel">
        <div className="section-header">
          <div className="section-eyebrow">// CLASSIFIED INTEL</div>
          <h2 className="section-title">SPRINT SPECIFICATIONS</h2>
          <p className="section-description">
            Critical parameters and battleground rules for participants entering the NexaSoul arena.
          </p>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <div className="card-icon">
              <Calendar size={24} color="#a855f7" />
            </div>
            <div className="card-title">01. INVOCATION DATE</div>
            <div className="card-value">30 SEP 2026</div>
            <div className="card-desc">
              Sprint commences at 09:00 IST sharp. Keynotes, technical sandbox activation, and continuous building rounds.
            </div>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <MapPin size={24} color="#00d4ff" />
            </div>
            <div className="card-title">02. ARENA COORDINATES</div>
            <div className="card-value">B1 &amp; B2 HALL</div>
            <div className="card-desc">
              State-of-the-art staging area equipped with high-throughput fiber connectivity and dedicated team pod power stations.
            </div>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <Users size={24} color="#f0abfc" />
            </div>
            <div className="card-title">03. SQUAD SIZE</div>
            <div className="card-value">1 TO 4 BUILDERS</div>
            <div className="card-desc">
              Solo sorcerers or tactical teams up to 4 members. Cross-domain talent (UI/UX designers, developers, and architects).
            </div>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <Code2 size={24} color="#38bdf8" />
            </div>
            <div className="card-title">04. CORE TECH STACK</div>
            <div className="card-value">REACT &amp; NEON</div>
            <div className="card-desc">
              Modern frontend toolchains (Next.js 15, React 19, Vanilla CSS/animations) connected to Neon Serverless PostgreSQL.
            </div>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <Trophy size={24} color="#f59e0b" />
            </div>
            <div className="card-title">05. GRADES &amp; BOUNTIES</div>
            <div className="card-value">SPECIAL GRADE</div>
            <div className="card-desc">
              Cash rewards, Special Grade commemorative artifacts, exclusive mentorship access, and builder certificates.
            </div>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <Flame size={24} color="#c0392b" />
            </div>
            <div className="card-title">06. EVALUATION MATRIX</div>
            <div className="card-value">LIVE SHOWCASE</div>
            <div className="card-desc">
              Judged on Aesthetic Execution (40%), Technical Architecture (30%), Innovation (20%), and Pitch Polish (10%).
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          ABOUT / DOMAIN LORE SECTION
          ============================================================ */}
      <section className="section" id="about" style={{ background: 'rgba(5, 5, 8, 0.5)' }}>
        <div className="about-grid">
          <div className="about-image-wrapper">
            <img 
              src="/images/jjk_event_card.jpg" 
              alt="NexaSoul BuildSprint Arena" 
              className="about-image"
            />
          </div>

          <div className="about-content">
            <div className="section-eyebrow" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
              // DOMAIN ARCHITECTURE
            </div>
            <h2>Channel Cursed Energy into Digital Masterpieces</h2>
            <p>
              NexaSoul BuildSprint is not an ordinary hackathon. Inspired by the intensity, discipline, and domain expansion of Jujutsu Kaisen, this product challenge pushes front-end developers to manifest their ultimate technical imagination.
            </p>
            <p>
              Whether you are architecting micro-interactions, designing hyper-responsive glassmorphic interfaces, or wiring real-time serverless persistence with Neon PostgreSQL, your squad will build something memorable before the clock runs out.
            </p>

            <div className="about-tags">
              <span className="about-tag">NEXT.JS 15</span>
              <span className="about-tag">REACT 19</span>
              <span className="about-tag">NEON POSTGRESQL</span>
              <span className="about-tag">CURSED ENERGY UI</span>
              <span className="about-tag">WEB AUDIO API</span>
              <span className="about-tag">EDGE SERVERLESS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          REGISTRATION SECTION
          ============================================================ */}
      <section className="section" id="register">
        <div className="section-header">
          <div className="section-eyebrow">// INVOCATION GATE</div>
          <h2 className="section-title">SQUAD REGISTRATION</h2>
          <p className="section-description">
            Complete the protocol below to inscribe your team into the official sprint database. 
            Registrations are stored live in Neon PostgreSQL.
          </p>
        </div>

        <RegistrationForm onRegistered={handleSquadRegistered} />
      </section>

      {/* ============================================================
          REGISTERED SQUADS TELEMETRY SECTION
          ============================================================ */}
      <section className="section" id="teams" style={{ borderTop: '1px solid rgba(168, 85, 247, 0.15)' }}>
        <div className="section-header">
          <div className="section-eyebrow">// LIVE TELEMETRY</div>
          <h2 className="section-title">REGISTERED SQUADS</h2>
          <p className="section-description">
            Live squad roster queried in real-time from the Neon database.
          </p>
        </div>

        <RegisteredSquads refreshTrigger={squadsRefreshTrigger} />
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">NEXASOUL // BUILDSPRINT 2026</div>
          <div className="footer-text">
            SEPTEMBER 30, 2026 &bull; B1 &amp; B2 SEMINAR HALL &bull; SECURED BY NEON POSTGRESQL &bull; ALL SYSTEMS NOMINAL
          </div>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            marginTop: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: '#64748b',
          }}>
            <Link href="/register" style={{ color: '#00d4ff', textDecoration: 'none' }}>
              DIRECT REGISTRATION GATE &rarr;
            </Link>
            <a href="#overview" style={{ color: '#a855f7', textDecoration: 'none' }}>
              RETURN TO TOP &uarr;
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
