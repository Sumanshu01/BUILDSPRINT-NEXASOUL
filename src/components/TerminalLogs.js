'use client';

import { useState, useEffect, useRef } from 'react';

const INITIAL_LOGS = [
  { time: '00:00:01', msg: 'NexaSoul kernel v4.8.2 booting...', type: 'normal' },
  { time: '00:00:02', msg: 'BuildSprint telemetry initialized.', type: 'highlight' },
  { time: '00:00:04', msg: 'Verifying decentralized sandbox clusters [OK]', type: 'success' },
  { time: '00:00:07', msg: 'Connecting builders network nodes (4,892 pinging)...', type: 'normal' },
  { time: '00:00:10', msg: 'PROTOCOL STATUS: LOADING SOON (PHASE 0x1)', type: 'highlight' },
];

const STREAMING_MESSAGES = [
  'Allocating real-time compiler sandboxes...',
  'Syncing global developer registry...',
  'Preheating AI-assisted test runtimes...',
  'Synthesizing sprint bounty contracts...',
  'Verifying zero-latency mesh connections...',
  'BuildSprint event queue: 100% operational.',
];

export default function TerminalLogs() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [isOpen, setIsOpen] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < STREAMING_MESSAGES.length) {
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        setLogs((prev) => [
          ...prev,
          {
            time: timeStr,
            msg: STREAMING_MESSAGES[index],
            type: index % 2 === 0 ? 'highlight' : 'normal',
          },
        ]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="terminal-panel" id="telemetry-terminal">
      <div 
        className="terminal-header" 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ cursor: 'pointer' }}
        title="Toggle terminal view"
      >
        <div className="terminal-dots">
          <div className="terminal-dot red" />
          <div className="terminal-dot yellow" />
          <div className="terminal-dot green" />
        </div>
        <div className="terminal-title">
          TELEMETRY // NEXASOUL-BUILDSPRINT-DAEMON {isOpen ? '[-]' : '[+]'}
        </div>
        <div style={{ width: 30 }} />
      </div>

      {isOpen && (
        <div className="terminal-body" ref={scrollRef}>
          {logs.map((log, i) => (
            <div key={i} className="log-line">
              <span className="log-timestamp">[{log.time}]</span>
              <span className={`log-msg ${log.type}`}>{log.msg}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
