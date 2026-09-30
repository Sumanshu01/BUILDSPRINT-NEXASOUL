'use client';

import { useState, useEffect } from 'react';
import { soundManager } from '@/components/SoundEffects';
import { MISSIONS_DATA } from '@/data/missions';
import confetti from 'canvas-confetti';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle,
  Copy,
  Check,
  Target
} from 'lucide-react';

export default function RegistrationForm({ onRegistered, selectedMission }) {
  const [teamName, setTeamName] = useState('');
  const [mission, setMission] = useState(selectedMission || 'Mission 01: CURSED CAMPUS — "THE VEIL"');
  const [leader, setLeader] = useState({
    name: '',
    uid: '',
    phone: '',
    email: '',
  });
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', isError: false });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedMission) {
      setMission(selectedMission);
    }
  }, [selectedMission]);

  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(() => {
      setToast({ show: false, message: '', isError: false });
    }, 4500);
  };

  const handleLeaderChange = (field, val) => {
    setLeader((prev) => ({ ...prev, [field]: val }));
  };

  const handleMemberChange = (index, field, val) => {
    setMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: val };
      return updated;
    });
  };

  const addMember = () => {
    if (members.length >= 3) {
      showToast('Maximum team size is 4 sorcerers (Leader + 3 Members).', true);
      soundManager.playClick();
      return;
    }
    soundManager.playClick();
    setMembers((prev) => [
      ...prev,
      { name: '', uid: '', phone: '', email: '' }
    ]);
  };

  const removeMember = (index) => {
    soundManager.playClick();
    setMembers((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundManager.playClick();

    if (!teamName.trim()) {
      showToast('Please enter your Squad / Team Name.', true);
      return;
    }
    if (!leader.name.trim() || !leader.uid.trim() || !leader.phone.trim() || !leader.email.trim()) {
      showToast('Please fill all required Leader information fields.', true);
      return;
    }
    if (!leader.email.includes('@')) {
      showToast('Please provide a valid Leader email address.', true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamName: teamName.trim(),
          mission,
          leader,
          members,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration failed.');
      }

      setSuccessData(data);
      soundManager.playSuccess();

      // Launch Jujutsu cursed confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.6 },
          colors: ['#c084fc', '#38bdf8', '#f0abfc', '#0ea5e9', '#7c3aed'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 60,
            origin: { x: 0.1, y: 0.7 },
            colors: ['#c084fc', '#38bdf8'],
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 60,
            origin: { x: 0.9, y: 0.7 },
            colors: ['#38bdf8', '#c084fc'],
          });
        }, 300);
      } catch {
        // confetti fallback
      }

      showToast(`Domain Sealed! Squad ${data.teamName} is registered.`, false);
      if (onRegistered) {
        onRegistered(data);
      }
    } catch (err) {
      console.error('Registration submission error:', err);
      showToast(err.message || 'Failed to submit registration. Check connectivity.', true);
    } finally {
      setLoading(false);
    }
  };

  const copyTeamId = () => {
    if (successData?.teamId) {
      navigator.clipboard?.writeText(successData.teamId);
      setCopied(true);
      soundManager.playClick();
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const resetForm = () => {
    soundManager.playClick();
    setSuccessData(null);
    setTeamName('');
    setMission(selectedMission || 'Mission 01: CURSED CAMPUS — "THE VEIL"');
    setLeader({ name: '', uid: '', phone: '', email: '' });
    setMembers([]);
  };

  return (
    <div className="registration-wrapper">
      {/* Toast Notification */}
      <div className={`toast ${toast.show ? 'show' : ''} ${toast.isError ? 'error' : ''}`}>
        <span className="toast-icon">
          {toast.isError ? <AlertCircle size={18} color="#ef4444" /> : <Sparkles size={18} color="#38bdf8" />}
        </span>
        <span>{toast.message}</span>
      </div>

      <div className="reg-form-container">
        {/* Form Header */}
        <div className="form-header">
          <div className="form-header-icon">
            <Users size={22} color="#c084fc" />
          </div>
          <div>
            <div className="form-header-title">SQUAD INVOCATION PROTOCOL</div>
            <div className="form-header-sub">
              NEON POSTGRESQL PERSISTENCE // SQUAD SIZE: 1 TO 4 BUILDERS
            </div>
          </div>
        </div>

        {/* Success Overlay View */}
        {successData ? (
          <div className="success-overlay">
            <div className="success-seal">呪</div>
            <div className="success-title">DOMAIN EXPANSION CONFIRMED</div>
            <div className="success-subtitle">
              SQUAD REGISTERED // STATUS: SPECIAL GRADE
            </div>

            <div style={{
              background: 'rgba(25, 18, 50, 0.7)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              borderRadius: '16px',
              padding: '1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.6rem',
              marginTop: '0.5rem',
              maxWidth: '520px',
              width: '100%',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
            }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', letterSpacing: '0.15em', fontFamily: 'var(--font-mono)' }}>
                ASSIGNED PROTOCOL ID
              </div>
              <div style={{
                fontSize: '1.6rem',
                fontFamily: 'var(--font-tech)',
                fontWeight: 800,
                color: '#38bdf8',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span>{successData.teamId}</span>
                <button
                  onClick={copyTeamId}
                  type="button"
                  style={{
                    background: 'rgba(56, 189, 248, 0.15)',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    color: '#38bdf8',
                    padding: '0.4rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Copy Protocol ID"
                >
                  {copied ? <Check size={16} color="#4ade80" /> : <Copy size={16} />}
                </button>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#ffffff', marginTop: '0.25rem' }}>
                Squad: <strong>{successData.teamName}</strong> ({successData.totalMembers} Member{successData.totalMembers > 1 ? 's' : ''})
              </div>
              {successData.mission && (
                <div style={{
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#f0abfc',
                  background: 'rgba(168, 85, 247, 0.15)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  textAlign: 'center',
                }}>
                  Target: {successData.mission}
                </div>
              )}
              <div style={{ fontSize: '0.65rem', color: '#a855f7', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>
                Storage: {successData.source === 'neon_database' ? 'Neon Serverless Postgres' : 'Resilient In-Memory Buffer'}
              </div>
            </div>

            <p className="success-message">
              Your squad has been inscribed into the NexaSoul BuildSprint registry. 
              Report to B1 &amp; B2 Seminar Hall on September 30, 2026, with your builder gear.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                type="button"
                onClick={resetForm}
                className="btn-primary"
                style={{ padding: '0.75rem 2rem' }}
              >
                Register Another Squad
              </button>
            </div>
          </div>
        ) : (
          /* Registration Form View */
          <form onSubmit={handleSubmit} className="form-body">
            {/* Squad Identity */}
            <div className="form-section-label">
              <span>01. SQUAD IDENTITY &amp; TARGET MISSION</span>
              <div className="label-line" />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-team-name">
                  SQUAD / TEAM NAME <span>*</span>
                </label>
                <input
                  id="reg-team-name"
                  type="text"
                  required
                  placeholder="e.g., Domain Architects, Jujutsu Coders, Void Breakers"
                  className="form-input"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-mission">
                  TARGET PROBLEM STATEMENT / MISSION <span>*</span>
                </label>
                <select
                  id="reg-mission"
                  className="form-input"
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  style={{ cursor: 'pointer', background: 'rgba(25, 18, 50, 0.95)', color: '#ffffff' }}
                >
                  {MISSIONS_DATA.map((m) => (
                    <option key={m.id} value={m.title}>
                      Mission {m.number}: {m.title} [{m.threatLevel}]
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Squad Leader */}
            <div className="form-section-label">
              <span>02. SQUAD LEADER (PRIMARY SORCERER)</span>
              <div className="label-line" />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-leader-name">
                  FULL NAME <span>*</span>
                </label>
                <input
                  id="reg-leader-name"
                  type="text"
                  required
                  placeholder="Leader full name"
                  className="form-input"
                  value={leader.name}
                  onChange={(e) => handleLeaderChange('name', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-leader-uid">
                  STUDENT UID / ROLL NO. <span>*</span>
                </label>
                <input
                  id="reg-leader-uid"
                  type="text"
                  required
                  placeholder="e.g., 23BCS10192"
                  className="form-input"
                  value={leader.uid}
                  onChange={(e) => handleLeaderChange('uid', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-leader-email">
                  COLLEGE / BUILDER EMAIL <span>*</span>
                </label>
                <input
                  id="reg-leader-email"
                  type="email"
                  required
                  placeholder="leader@college.edu or email"
                  className="form-input"
                  value={leader.email}
                  onChange={(e) => handleLeaderChange('email', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-leader-phone">
                  CONTACT / WHATSAPP NUMBER <span>*</span>
                </label>
                <input
                  id="reg-leader-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="form-input"
                  value={leader.phone}
                  onChange={(e) => handleLeaderChange('phone', e.target.value)}
                />
              </div>
            </div>

            {/* Additional Squad Members */}
            <div className="form-section-label">
              <span>03. SQUAD COMPOSITION (UP TO 3 ADDITIONAL MEMBERS)</span>
              <div className="label-line" />
            </div>

            {members.map((member, idx) => (
              <div key={idx} className="member-block">
                <div className="member-block-header">
                  <span className="member-number">
                    // SQUAD MEMBER {idx + 2}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeMember(idx)}
                    className="remove-member-btn"
                  >
                    <Trash2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    REMOVE
                  </button>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      MEMBER NAME <span>*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`Member ${idx + 2} name`}
                      className="form-input"
                      value={member.name}
                      onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      STUDENT UID / ROLL NO.
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 23BCS10244"
                      className="form-input"
                      value={member.uid}
                      onChange={(e) => handleMemberChange(idx, 'uid', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      placeholder="member@college.edu"
                      className="form-input"
                      value={member.email}
                      onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">CONTACT NUMBER</label>
                    <input
                      type="tel"
                      placeholder="+91 Phone"
                      className="form-input"
                      value={member.phone}
                      onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            {members.length < 3 && (
              <button
                type="button"
                onClick={addMember}
                className="add-member-btn"
                id="add-member-btn"
              >
                <UserPlus size={16} />
                <span>+ ADD SQUAD MEMBER ({members.length + 1}/4)</span>
              </button>
            )}

            {/* Form Submit */}
            <div className="form-submit">
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
                id="submit-registration-btn"
              >
                {loading ? (
                  <span>EXPANDING DOMAIN // SEALING DATA...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>SEAL REGISTRATION // SUBMIT SQUAD</span>
                  </>
                )}
              </button>
              <div className="submit-note">
                <ShieldCheck size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                SUBMISSIONS VERIFIED &amp; STORED IN NEON POSTGRESQL // REGISTRATION CLOSES 29 SEP 23:59 IST
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
