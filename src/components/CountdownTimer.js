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
    // Target date: 12 days from today
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 12);
    targetDate.setHours(targetDate.getHours() + 8);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

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

  if (!mounted) {
    return (
      <div className="countdown-container" id="sprint-countdown">
        {['DAYS', 'HOURS', 'MINUTES', 'SECONDS'].map((label) => (
          <div key={label} className="countdown-box">
            <div className="countdown-num">00</div>
            <div className="countdown-label">{label}</div>
          </div>
        ))}
      </div>
    );
  }

  const units = [
    { label: 'DAYS', value: formatUnit(timeLeft.days) },
    { label: 'HOURS', value: formatUnit(timeLeft.hours) },
    { label: 'MINUTES', value: formatUnit(timeLeft.minutes) },
    { label: 'SECONDS', value: formatUnit(timeLeft.seconds) },
  ];

  return (
    <div className="countdown-container" id="sprint-countdown">
      {units.map((unit) => (
        <div key={unit.label} className="countdown-box">
          <div className="countdown-num">{unit.value}</div>
          <div className="countdown-label">{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
