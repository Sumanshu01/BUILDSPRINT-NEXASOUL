'use client';

import { useState, useEffect } from 'react';
import { Shield, Database, Users, RefreshCw, CheckCircle, Clock } from 'lucide-react';

export default function RegisteredSquads({ refreshTrigger }) {
  const [teams, setTeams] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const [teamsRes, statusRes] = await Promise.all([
        fetch('/api/teams'),
        fetch('/api/db-status'),
      ]);

      if (teamsRes.ok) {
        const teamsData = await teamsRes.json();
        setTeams(teamsData.teams || []);
      }
      if (statusRes.ok) {
        const statusData = await statusRes.json();
        setDbStatus(statusData);
      }
    } catch (err) {
      console.error('Error fetching registered squads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [refreshTrigger]);

  const formatDate = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      {/* Database & Telemetry Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1rem 1.5rem',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        borderRadius: '8px',
        marginBottom: '2rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Database size={18} color="#00d4ff" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.15em', color: '#e2e8f0' }}>
            DATABASE PROTOCOL:
          </span>
          <span style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-tech)',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            background: dbStatus?.connected ? 'rgba(74, 222, 128, 0.15)' : 'rgba(168, 85, 247, 0.15)',
            color: dbStatus?.connected ? '#4ade80' : '#a855f7',
            border: `1px solid ${dbStatus?.connected ? 'rgba(74, 222, 128, 0.3)' : 'rgba(168, 85, 247, 0.3)'}`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: dbStatus?.connected ? '#4ade80' : '#00d4ff',
              boxShadow: `0 0 8px ${dbStatus?.connected ? '#4ade80' : '#00d4ff'}`,
            }} />
            {dbStatus?.connected ? 'NEON POSTGRESQL (LIVE)' : 'NEON ENGINE (STANDBY BUFFER)'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94a3b8' }}>
            REGISTERED SQUADS: <strong style={{ color: '#00d4ff' }}>{teams.length}</strong>
          </span>
          <button
            onClick={fetchTeams}
            type="button"
            title="Refresh Squads"
            style={{
              background: 'transparent',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              color: '#a855f7',
              padding: '0.4rem 0.75rem',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
            }}
          >
            <RefreshCw size={12} className={loading ? 'spin' : ''} />
            SYNC
          </button>
        </div>
      </div>

      {/* Squad Cards Grid */}
      {teams.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          background: 'rgba(255, 255, 255, 0.01)',
          border: '1px dashed rgba(168, 85, 247, 0.25)',
          borderRadius: '8px',
        }}>
          <Users size={32} color="#a855f7" style={{ margin: '0 auto 1rem', opacity: 0.6 }} />
          <div style={{ fontFamily: 'var(--font-tech)', fontSize: '1rem', color: '#e2e8f0', marginBottom: '0.5rem' }}>
            NO SQUADS INSCRIBED YET
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#94a3b8', maxWidth: '400px', margin: '0 auto' }}>
            Be the first sorcerer squad to expand your domain and claim your spot on the NexaSoul leaderboard.
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {teams.map((t, idx) => (
            <div
              key={t.id || idx}
              style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '8px',
                padding: '1.5rem',
                position: 'relative',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: '#00d4ff',
                  letterSpacing: '0.1em',
                }}>
                  #{t.id ? `TEAM-${t.id}` : `SQUAD-${idx + 1}`}
                </span>
                <span style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  color: '#f0abfc',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '3px',
                }}>
                  {t.cursed_grade || 'Special Grade'}
                </span>
              </div>

              <div style={{
                fontFamily: 'var(--font-tech)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '0.5rem',
              }}>
                {t.team_name}
              </div>

              <div style={{
                fontSize: '0.85rem',
                color: '#94a3b8',
                marginBottom: '0.25rem',
              }}>
                Leader: <strong style={{ color: '#e2e8f0' }}>{t.leader_name}</strong>
              </div>

              {t.mission && (
                <div style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#38bdf8',
                  background: 'rgba(2, 132, 199, 0.12)',
                  border: '1px solid rgba(2, 132, 199, 0.35)',
                  padding: '0.35rem 0.6rem',
                  borderRadius: '4px',
                  marginTop: '0.5rem',
                  marginBottom: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  lineHeight: 1.3,
                }}>
                  <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>⚔️</span>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {t.mission}
                  </span>
                </div>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid rgba(168, 85, 247, 0.1)',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: '#64748b',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#94a3b8' }}>
                  <Users size={12} color="#00d4ff" /> {t.total_members || 1} Builder{(t.total_members || 1) > 1 ? 's' : ''}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={12} /> {formatDate(t.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
