'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import JJKLoader from '@/components/JJKLoader';
import CursedParticles from '@/components/CursedParticles';
import CountdownTimer from '@/components/CountdownTimer';
import RegistrationForm from '@/components/RegistrationForm';
import MissionsSection from '@/components/MissionsSection';
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
  ExternalLink,
  ChevronDown
} from 'lucide-react';

// Custom hook for scroll-triggered animations
function useScrollReveal() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);
}

// Parallax tilt effect hook
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
}

// Floating animation component for decorative elements
function FloatingDecor({ style, delay = 0 }) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(2, 132, 199, 0.3))',
        animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

export default function Home() {
  const [loaderFinished, setLoaderFinished] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [selectedMission, setSelectedMission] = useState('');
  const [refreshSquadsTrigger, setRefreshSquadsTrigger] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const aboutImageRef = useRef(null);

  useScrollReveal();
  useTilt(aboutImageRef);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.toggleAmbient(nextState);
    if (nextState) {
      soundManager.playClick();
    }
  };

  const staggerClasses = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4', 'stagger-5', 'stagger-6'];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflowX: 'hidden' }}>
      {/* Cursed Energy Opening Loader */}
      {!loaderFinished && (
        <JJKLoader onComplete={() => setLoaderFinished(true)} />
      )}

      {/* Ambient Cursed Energy Glow & Rising Particles */}
      <CursedParticles />

      {/* Floating decorative elements */}
      <FloatingDecor style={{ top: '20%', left: '5%' }} delay={0} />
      <FloatingDecor style={{ top: '40%', right: '8%' }} delay={0.5} />
      <FloatingDecor style={{ top: '60%', left: '12%' }} delay={1} />
      <FloatingDecor style={{ top: '80%', right: '15%' }} delay={1.5} />
      <FloatingDecor style={{ top: '30%', left: '85%' }} delay={2} />

      {/* Fixed Glassmorphism Navigation Bar */}
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
              href="#missions" 
              className="nav-link"
              onClick={() => soundManager.playClick()}
            >
              Missions
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
              background: soundEnabled 
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(2, 132, 199, 0.1))'
                : 'rgba(255,255,255,0.5)',
              border: `1.5px solid ${soundEnabled ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.2)'}`,
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: soundEnabled ? '#6d28d9' : '#64748b',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: soundEnabled ? '0 0 15px rgba(139, 92, 246, 0.3)' : 'none',
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

          {/* Scroll indicator */}
          <div 
            className="animate-fadeInUp animate-delay-7"
            style={{
              marginTop: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.3em',
              color: 'rgba(71, 85, 105, 0.5)',
              textTransform: 'uppercase',
            }}>
              SCROLL TO EXPLORE
            </span>
            <ChevronDown 
              size={20} 
              style={{ 
                color: 'rgba(139, 92, 246, 0.5)', 
                animation: 'float 2s ease-in-out infinite' 
              }} 
            />
          </div>
        </div>
      </section>

      {/* ============================================================
          EVENT INTEL SECTION
          ============================================================ */}
      <section className="section" id="intel">
        <div className="section-header scroll-reveal">
          <div className="section-eyebrow">// CLASSIFIED INTEL</div>
          <h2 className="section-title">SPRINT SPECIFICATIONS</h2>
          <p className="section-description">
            Critical parameters and battleground rules for participants entering the NexaSoul arena.
          </p>
        </div>

        <div className="info-grid">
          <div className={`info-card scroll-reveal-scale ${staggerClasses[0]}`}>
            <div className="card-icon">
              <Calendar size={24} color="#8b5cf6" />
            </div>
            <div className="card-title">01. INVOCATION DATE</div>
            <div className="card-value">30 SEP 2026</div>
            <div className="card-desc">
              Sprint commences at 09:00 IST sharp. Keynotes, technical sandbox activation, and continuous building rounds.
            </div>
          </div>

          <div className={`info-card scroll-reveal-scale ${staggerClasses[1]}`}>
            <div className="card-icon">
              <MapPin size={24} color="#0284c7" />
            </div>
            <div className="card-title">02. ARENA COORDINATES</div>
            <div className="card-value">B1 &amp; B2 HALL</div>
            <div className="card-desc">
              State-of-the-art staging area equipped with high-throughput fiber connectivity and dedicated team pod power stations.
            </div>
          </div>

          <div className={`info-card scroll-reveal-scale ${staggerClasses[2]}`}>
            <div className="card-icon">
              <Users size={24} color="#c026d3" />
            </div>
            <div className="card-title">03. SQUAD SIZE</div>
            <div className="card-value">1 TO 4 BUILDERS</div>
            <div className="card-desc">
              Solo sorcerers or tactical teams up to 4 members. Cross-domain talent (UI/UX designers, developers, and architects).
            </div>
          </div>

          <div className={`info-card scroll-reveal-scale ${staggerClasses[3]}`}>
            <div className="card-icon">
              <Code2 size={24} color="#0ea5e9" />
            </div>
            <div className="card-title">04. CORE TECH STACK</div>
            <div className="card-value">REACT &amp; NEON</div>
            <div className="card-desc">
              Modern frontend toolchains (Next.js 15, React 19, Vanilla CSS/animations) connected to Neon Serverless PostgreSQL.
            </div>
          </div>

          <div className={`info-card scroll-reveal-scale ${staggerClasses[4]}`}>
            <div className="card-icon">
              <Trophy size={24} color="#d97706" />
            </div>
            <div className="card-title">05. GRADES &amp; BOUNTIES</div>
            <div className="card-value">SPECIAL GRADE</div>
            <div className="card-desc">
              Cash rewards, Special Grade commemorative artifacts, exclusive mentorship access, and builder certificates.
            </div>
          </div>

          <div className={`info-card scroll-reveal-scale ${staggerClasses[5]}`}>
            <div className="card-icon">
              <Flame size={24} color="#dc2626" />
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
          CURSED MISSIONS SECTION (8 PROBLEM STATEMENTS)
          ============================================================ */}
      <MissionsSection 
        onSelectMission={(missionTitle) => {
          setSelectedMission(missionTitle);
          const reg = document.getElementById('register');
          if (reg) {
            reg.scrollIntoView({ behavior: 'smooth' });
          }
        }} 
      />

      {/* ============================================================
          ABOUT / DOMAIN LORE SECTION
          ============================================================ */}
      <section 
        className="section" 
        id="about" 
        style={{ 
          background: 'rgba(8, 8, 16, 0.75)', 
          borderTop: '1px solid rgba(139, 92, 246, 0.2)', 
          borderBottom: '1px solid rgba(139, 92, 246, 0.2)' 
        }}
      >
        <div className="about-grid">
          <div className="about-image-wrapper scroll-reveal-left" ref={aboutImageRef}>
            <img 
              src="/images/jjk_event_card.jpg" 
              alt="NexaSoul BuildSprint Arena" 
              className="about-image"
            />
          </div>

          <div className="about-content scroll-reveal-right">
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
        <div className="section-header scroll-reveal">
          <div className="section-eyebrow">// INVOCATION GATE</div>
          <h2 className="section-title">SQUAD REGISTRATION</h2>
          <p className="section-description">
            Complete the protocol below to inscribe your team into the official sprint database. 
            Registrations are stored live in Neon PostgreSQL.
          </p>
        </div>

        <div className="scroll-reveal-scale">
          <RegistrationForm 
            selectedMission={selectedMission}
            onRegistered={() => setRefreshSquadsTrigger((p) => p + 1)}
          />
        </div>

        {/* Live Squad Registry Telemetry */}
        <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(139, 92, 246, 0.2)' }} id="registered-squads">
          <div className="section-header scroll-reveal">
            <div className="section-eyebrow">// TELEMETRY FEED</div>
            <h3 className="section-title" style={{ fontSize: '1.85rem' }}>LIVE SQUAD REGISTRY</h3>
            <p className="section-description">
              Real-time records queried directly from the Neon PostgreSQL database cluster.
            </p>
          </div>

          <RegisteredSquads refreshTrigger={refreshSquadsTrigger} />
        </div>
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
            <Link href="/register" style={{ color: '#6d28d9', textDecoration: 'none', transition: 'color 0.3s ease' }}>
              DIRECT REGISTRATION GATE &rarr;
            </Link>
            <a href="#overview" style={{ color: '#0284c7', textDecoration: 'none', transition: 'color 0.3s ease' }}>
              RETURN TO TOP &uarr;
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
