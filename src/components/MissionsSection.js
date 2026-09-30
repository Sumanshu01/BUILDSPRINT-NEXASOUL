'use client';

import { useState } from 'react';
import { MISSIONS_DATA, INTEGRATION_MECHANIC } from '@/data/missions';
import { soundManager } from '@/components/SoundEffects';
import { 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Camera, 
  Flame, 
  Zap, 
  Compass, 
  GraduationCap, 
  BatteryCharging, 
  TreePine, 
  AlertTriangle, 
  CalendarDays, 
  UserCheck, 
  Award,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

const CATEGORY_ICONS = {
  Navigation: Compass,
  'Student Life': GraduationCap,
  Productivity: BatteryCharging,
  Sustainability: TreePine,
  Emergency: AlertTriangle,
  Events: CalendarDays,
  Intelligence: UserCheck,
  Gamification: Award,
};

export default function MissionsSection({ onSelectMission }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [expandedMissionId, setExpandedMissionId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'Navigation', 'Student Life', 'Productivity', 'Sustainability', 'Emergency', 'Events', 'Intelligence', 'Gamification'];

  const filteredMissions = MISSIONS_DATA.filter((m) => {
    const matchCategory = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.missionBrief.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.pairA.technique.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.pairB.technique.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.finalDomain.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleExpand = (id) => {
    soundManager.playClick();
    setExpandedMissionId(expandedMissionId === id ? null : id);
  };

  const handleSelect = (mission) => {
    soundManager.playClick();
    if (onSelectMission) {
      onSelectMission(mission.title);
    }
    const regSection = document.getElementById('register');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section" id="missions" style={{ position: 'relative', zIndex: 10 }}>
      {/* Section Header */}
      <div className="section-header">
        <div className="section-eyebrow">// CLASSIFIED BATTLEGROUND MISSIONS</div>
        <h2 className="section-title">CHOOSE YOUR DOMAIN: 8 PROBLEM STATEMENTS</h2>
        <p className="section-description">
          Each 4-person squad is divided into <strong>Pair A</strong> and <strong>Pair B</strong>. Both receive the same mission from two complementary cursed perspectives, then forge their modules into one final domain.
        </p>
      </div>

      {/* ============================================================
          THE INTEGRATION MECHANIC & ARTIFACT MANDATE
          ============================================================ */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Mechanic Flow Card */}
        <div className="mechanic-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <Layers size={22} color="#a855f7" />
            <h3 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.15rem', color: '#ffffff', letterSpacing: '0.1em' }}>
              {INTEGRATION_MECHANIC.title}
            </h3>
            <span className="pill-badge-cyan">SQUAD COMPOSITION RULE</span>
          </div>

          <p style={{ color: 'rgba(226, 232, 240, 0.8)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            {INTEGRATION_MECHANIC.description}
          </p>

          <div className="mechanic-flow-grid">
            {INTEGRATION_MECHANIC.steps.map((s, idx) => (
              <div key={s.step} className="mechanic-step-box">
                <div className="step-num">{s.step}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
                {idx < INTEGRATION_MECHANIC.steps.length - 1 && (
                  <div className="step-arrow">&rarr;</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Cursed Artifact Mandate Card */}
        <div className="artifact-mandate-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <Camera size={22} color="#f59e0b" />
            <h4 style={{ fontFamily: 'var(--font-tech)', fontSize: '1.05rem', color: '#f59e0b', letterSpacing: '0.1em' }}>
              {INTEGRATION_MECHANIC.cursedArtifactRule.title}
            </h4>
            <span className="pill-badge-gold">ANTI-AI FLUFF PROTOCOL</span>
          </div>
          <p style={{ color: 'rgba(245, 243, 255, 0.9)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            {INTEGRATION_MECHANIC.cursedArtifactRule.rule}
          </p>
          <div style={{
            marginTop: '0.75rem',
            padding: '0.5rem 1rem',
            background: 'rgba(245, 158, 11, 0.1)',
            borderLeft: '3px solid #f59e0b',
            borderRadius: '4px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: '#fde68a',
          }}>
            &ldquo;We discovered X on campus &rarr; therefore we architected Y.&rdquo;
          </div>
        </div>
      </div>

      {/* ============================================================
          CATEGORY FILTERS & SEARCH
          ============================================================ */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 2.5rem' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
        }}>
          {/* Category Tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat === 'ALL' ? 'ALL 8 MISSIONS' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search missions, techniques..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mission-search-input"
            />
          </div>
        </div>
      </div>

      {/* ============================================================
          MISSION CARDS GRID
          ============================================================ */}
      <div className="missions-grid" style={{ maxWidth: '1200px', margin: '0 auto 5rem' }}>
        {filteredMissions.map((mission) => {
          const IconComp = CATEGORY_ICONS[mission.category] || Compass;
          const isExpanded = expandedMissionId === mission.id;
          const isSpecialGrade = mission.threatLevel === 'Special Grade';

          return (
            <div 
              key={mission.id} 
              className={`mission-card ${isSpecialGrade ? 'special-grade' : ''}`}
              id={mission.id}
            >
              {/* Mission Header */}
              <div className="mission-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="mission-number-box">
                    <span>{mission.number}</span>
                  </div>
                  <div className="mission-kanji-symbol">{mission.kanji}</div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.2em',
                      color: isSpecialGrade ? '#f59e0b' : '#38bdf8',
                      textTransform: 'uppercase'
                    }}>
                      MISSION #{mission.number} // {mission.codeName}
                    </div>
                    <h3 className="mission-card-title">{mission.title}</h3>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className={`threat-badge ${isSpecialGrade ? 'threat-special' : 'threat-grade1'}`}>
                    {mission.threatLevel}
                  </span>
                </div>
              </div>

              {/* Tagline & Brief */}
              <div className="mission-tagline">
                <IconComp size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                {mission.tagline}
              </div>
              <p className="mission-brief-text">{mission.missionBrief}</p>

              {/* Pair A & Pair B Architecture Split */}
              <div className="pairs-container">
                {/* Pair A Column */}
                <div className="pair-box pair-a-box">
                  <div className="pair-header">
                    <span className="pair-tag pair-a-tag">🟦 PAIR A</span>
                    <span className="pair-technique">{mission.pairA.technique}</span>
                  </div>
                  <div className="pair-objective">
                    <strong>Objective:</strong> {mission.pairA.objective}
                  </div>
                  <div className="pair-build">
                    <strong>Build:</strong> {mission.pairA.buildModule}
                  </div>

                  {isExpanded && (
                    <div className="pair-expanded-content">
                      <div className="expanded-subhead">INVESTIGATE ON CAMPUS:</div>
                      <ul className="expanded-list">
                        {mission.pairA.investigate.map((item, idx) => (
                          <li key={idx}>&bull; {item}</li>
                        ))}
                      </ul>

                      <div className="expanded-subhead" style={{ marginTop: '0.75rem' }}>KEY MODULE FEATURES:</div>
                      <ul className="expanded-list">
                        {mission.pairA.possibleFeatures.map((feat, idx) => (
                          <li key={idx}>&check; {feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Pair B Column */}
                <div className="pair-box pair-b-box">
                  <div className="pair-header">
                    <span className="pair-tag pair-b-tag">🟥 PAIR B</span>
                    <span className="pair-technique">{mission.pairB.technique}</span>
                  </div>
                  <div className="pair-objective">
                    <strong>Objective:</strong> {mission.pairB.objective}
                  </div>
                  <div className="pair-build">
                    <strong>Build:</strong> {mission.pairB.buildModule}
                  </div>

                  {isExpanded && (
                    <div className="pair-expanded-content">
                      <div className="expanded-subhead">INVESTIGATE ON CAMPUS:</div>
                      <ul className="expanded-list">
                        {mission.pairB.investigate.map((item, idx) => (
                          <li key={idx}>&bull; {item}</li>
                        ))}
                      </ul>

                      <div className="expanded-subhead" style={{ marginTop: '0.75rem' }}>KEY MODULE FEATURES:</div>
                      <ul className="expanded-list">
                        {mission.pairB.possibleFeatures.map((feat, idx) => (
                          <li key={idx}>&check; {feat}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Final Domain Section */}
              <div className="final-domain-box">
                <div className="domain-label">
                  <Sparkles size={14} color="#00d4ff" />
                  <span>FINAL DOMAIN (UNIFIED PRODUCT):</span>
                  <strong style={{ color: '#ffffff' }}>{mission.finalDomain.name}</strong>
                </div>
                <div className="domain-formula">{mission.finalDomain.formula}</div>
                {isExpanded && (
                  <p style={{ fontSize: '0.85rem', color: 'rgba(226, 232, 240, 0.75)', marginTop: '0.5rem', lineHeight: '1.6' }}>
                    {mission.finalDomain.description}
                  </p>
                )}
              </div>

              {/* Cursed Artifact Requirement */}
              <div className="artifact-pill">
                <Camera size={13} color="#f59e0b" />
                <span><strong>Required Artifact:</strong> {mission.cursedArtifact}</span>
              </div>

              {/* Card Footer Actions */}
              <div className="mission-card-footer">
                <button
                  type="button"
                  onClick={() => toggleExpand(mission.id)}
                  className="mission-expand-btn"
                >
                  {isExpanded ? (
                    <><span>COLLAPSE DOSSIER</span> <ChevronUp size={14} /></>
                  ) : (
                    <><span>INSPECT FULL DOSSIER</span> <ChevronDown size={14} /></>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleSelect(mission)}
                  className="mission-claim-btn"
                >
                  <span>CLAIM MISSION</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================================
          EIGHT MISSIONS AT A GLANCE (COMPARISON MATRIX)
          ============================================================ */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="section-eyebrow">// QUICK REFERENCE MATRIX</div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #ffffff, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
          }}>
            THE 8 MISSIONS AT A GLANCE
          </h3>
          <p style={{ color: 'rgba(226, 232, 240, 0.7)', fontSize: '0.9rem' }}>
            Instant overview of Pair A, Pair B techniques, and their final unified domain formulas.
          </p>
        </div>

        <div className="missions-table-wrapper">
          <table className="missions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>MISSION NAME</th>
                <th>THREAT LEVEL</th>
                <th>🟦 PAIR A (TECHNIQUE)</th>
                <th>🟥 PAIR B (TECHNIQUE)</th>
                <th>⚔️ FINAL DOMAIN</th>
              </tr>
            </thead>
            <tbody>
              {MISSIONS_DATA.map((m) => (
                <tr key={m.id}>
                  <td style={{ fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{m.number}</td>
                  <td>
                    <div style={{ fontWeight: 700, color: '#ffffff' }}>{m.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{m.tagline}</div>
                  </td>
                  <td>
                    <span className={`threat-badge ${m.threatLevel === 'Special Grade' ? 'threat-special' : 'threat-grade1'}`}>
                      {m.threatLevel}
                    </span>
                  </td>
                  <td>
                    <div style={{ color: '#38bdf8', fontWeight: 600 }}>{m.pairA.technique}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(226, 232, 240, 0.7)' }}>{m.pairA.buildModule}</div>
                  </td>
                  <td>
                    <div style={{ color: '#f87171', fontWeight: 600 }}>{m.pairB.technique}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(226, 232, 240, 0.7)' }}>{m.pairB.buildModule}</div>
                  </td>
                  <td>
                    <div style={{ color: '#c084fc', fontWeight: 700, fontFamily: 'var(--font-tech)' }}>
                      {m.finalDomain.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#00d4ff' }}>
                      {m.finalDomain.formula}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
