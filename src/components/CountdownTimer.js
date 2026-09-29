'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Event Date: September 30, 2026, 09:00:00 AM IST
    const targetDate = new Date('2026-09-30T09:00:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUnit = (val) => String(val).padStart(2, '0');

  const units = [
    { label: 'DAYS', value: mounted ? formatUnit(timeLeft.days) : '00' },
    { label: 'HOURS', value: mounted ? formatUnit(timeLeft.hours) : '00' },
    { label: 'MINUTES', value: mounted ? formatUnit(timeLeft.minutes) : '00' },
    { label: 'SECONDS', value: mounted ? formatUnit(timeLeft.seconds) : '00' },
  ];

  return (
    <div className="countdown-wrapper" id="sprint-countdown">
      {units.map((unit, index) => (
        <div key={unit.label} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div className="countdown-unit">
            <div className="countdown-number">{unit.value}</div>
            <div className="countdown-label">{unit.label}</div>
          </div>
          {index < units.length - 1 && <div className="countdown-sep">:</div>}
        </div>
      ))}
    </div>
  );
}
