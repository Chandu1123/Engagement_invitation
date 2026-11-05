import React, { useState, useEffect, useCallback } from 'react';
import { FloralGoldDivider, CornerOrnament } from './IslamicOrnaments';

function calculateTimeLeft(targetDateString, fallbackDateObj) {
  const targetTime = new Date(targetDateString).getTime() || fallbackDateObj.getTime();
  const now = Date.now();
  const difference = targetTime - now;

  if (difference <= 0) {
    return {
      isComplete: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    isComplete: false,
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

/**
 * CountdownTimer Component
 * Clean live countdown to December 13.
 */
export default function CountdownTimer({ config }) {
  const { date } = config;
  const fallbackDate = new Date(date.year, date.monthNumber - 1, date.dayOfMonth, 18, 0, 0);

  const getInitialTime = useCallback(
    () => calculateTimeLeft(date.isoStartDateTime, fallbackDate),
    [date.isoStartDateTime, date.year, date.monthNumber, date.dayOfMonth]
  );

  const [timeLeft, setTimeLeft] = useState(getInitialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getInitialTime());
    }, 1000);
    return () => clearInterval(timer);
  }, [getInitialTime]);

  const padNumber = (num) => String(num).padStart(2, '0');

  const units = [
    { label: 'Days', value: padNumber(timeLeft.days) },
    { label: 'Hours', value: padNumber(timeLeft.hours) },
    { label: 'Minutes', value: padNumber(timeLeft.minutes) },
    { label: 'Seconds', value: padNumber(timeLeft.seconds) },
  ];

  return (
    <section id="countdown" className="section-wrapper countdown-section">
      <div className="container">
        <div className="countdown-panel">
          <CornerOrnament position="top-left" />
          <CornerOrnament position="top-right" />
          <CornerOrnament position="bottom-left" />
          <CornerOrnament position="bottom-right" />

          <div className="section-header">
            <span className="section-eyebrow">Save The Date</span>
            <h2 className="section-title">
              {date.monthName} {date.dayOfMonth}, {date.year}
            </h2>
            <FloralGoldDivider />
          </div>

          {timeLeft.isComplete ? (
            <div className="countdown-complete-banner" role="status">
              <h3>Alhamdulillah! Today is the Engagement Day</h3>
            </div>
          ) : (
            <div
              className="countdown-boxes"
              role="timer"
              aria-live="polite"
              aria-label="Countdown to engagement ceremony"
            >
              {units.map((unit) => (
                <div key={unit.label} className="countdown-unit-card">
                  <span className="countdown-number">{unit.value}</span>
                  <span className="countdown-label">{unit.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
