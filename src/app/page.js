'use client';

import { useState } from 'react';
import ParticleBackground from '@/components/ParticleBackground';
import CountdownTimer from '@/components/CountdownTimer';
import TerminalLogs from '@/components/TerminalLogs';
import { soundManager } from '@/components/SoundEffects';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.toggleAmbient(nextState);
    if (nextState) {
      soundManager.playClick();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    soundManager.playClick();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      soundManager.playSuccess();

      // Launch futuristic confetti bursts
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#00f0ff', '#9d4edd', '#00ffaa', '#ffffff'],
      });
    }, 700);
  };

  return (
    <main className="main-wrapper">
      <ParticleBackground />
      <div className="cursor-ambient-light" />

      {/* Header Bar */}
      <header className="top-nav">
        <div className="brand-badge">
          <div className="brand-symbol">
            <Cpu size={14} color="#05070d" />
          </div>
          <span className="brand-name">NEXASOUL</span>
        </div>

        <div className="nav-actions">
          <button
            onClick={toggleSound}
            className={`icon-btn ${soundEnabled ? 'active' : ''}`}
            title={soundEnabled ? 'Mute ambient sound' : 'Enable ambient sci-fi sound'}
            id="sound-toggle-btn"
            type="button"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
        </div>
      </header>

      {/* Main Hero Section */}
      <section className="hero-container">
        {/* Status Pill */}
        <div className="status-pill" id="sprint-status-indicator">
          <span className="pulse-indicator" />
          <span>BUILDSPRINT PROTOCOL // LOADING SOON</span>
        </div>

        {/* Hero Title */}
        <div className="hero-title-group">
          <div className="brand-pretitle">NEXT-GEN ENGINEERING ADVENTURE</div>
          <h1 className="title-nexasoul">NEXASOUL</h1>
          <span className="title-buildsprint">BUILDSPRINT</span>
          <div className="hero-subtitle">
            <span className="glitch-bar" />
            LOADING SOON
            <span className="glitch-bar" />
          </div>
        </div>

        {/* Hero Description */}
        <p className="hero-desc">
          An elite, high-velocity engineering and architecture sprint designed for builders 
          pushing the frontier of software, AI agents, and resilient distributed systems.
        </p>

        {/* Countdown */}
        <CountdownTimer />

        {/* Protocol Progress */}
        <div className="protocol-sync-bar">
          <div className="protocol-header">
            <span className="protocol-title">
              <Sparkles size={14} color="#00f0ff" /> SYSTEM INITIALIZATION
            </span>
            <span className="protocol-percent">88.4% SYNCED</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: '88.4%' }} />
          </div>
          <div className="protocol-nodes">
            <span className="node-active">✓ Core Architecture</span>
            <span className="node-active">✓ GPU Mesh Sandboxes</span>
            <span className="node-active">● Launch Gate (Standing By)</span>
          </div>
        </div>

        {/* Early Access Form */}
        <div className="action-box">
          {submitted ? (
            <div className="form-success-badge" id="success-notification">
              <CheckCircle2 size={20} />
              <span>ACCESS RESERVED // BUILDER PROTOCOL GRANTED</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="notify-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter builder email for early access..."
                className="notify-input"
                id="email-input"
                aria-label="Email address for sprint notification"
              />
              <button
                type="submit"
                disabled={loading}
                className="notify-btn"
                id="notify-submit-btn"
              >
                {loading ? 'SYNCING...' : 'NOTIFY ME'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          )}
        </div>

        {/* Live Terminal Telemetry */}
        <TerminalLogs />
      </section>

      {/* Footer Bar */}
      <footer className="footer-bar">
        <div className="footer-copy">
          <ShieldCheck size={16} color="#00f0ff" />
          <span>NEXASOUL &copy; {new Date().getFullYear()} // ALL SYSTEMS NOMINAL</span>
        </div>
        <div className="footer-links">
          <span className="footer-link">PHASE: PRE-LAUNCH</span>
          <span className="footer-link">ENCRYPTION: 4096-BIT</span>
          <span className="footer-link">CLUSTER: GLOBAL-EDGE</span>
        </div>
      </footer>
    </main>
  );
}
