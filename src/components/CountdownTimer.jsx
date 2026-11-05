import React, { useState, useEffect, useCallback } from 'react';
import { FloralGoldDivider, CornerOrnament } from './IslamicOrnaments';

/**
 * Helper to compute remaining time until target ISO date
 */
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
 * Formats a Date into UTC YYYYMMDDTHHMMSSZ for Google Calendar / ICS
 */
function formatCalendarUtc(isoString) {
  const d = new Date(isoString);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * CountdownTimer Component
 * Live countdown to the Engagement Ceremony + Add to Calendar functionality.
 */
export default function CountdownTimer({ config }) {
  const { date, couple, venue } = config;

  // Fallback Date constructed from year, monthNumber, dayOfMonth in config.js
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

  // Build Google Calendar URL
  const eventTitle = `Engagement Ceremony: ${couple.groomFirstName} & ${couple.brideFirstName}`;
  const eventDetails = `Assalamu Alaikum! Join us for the Engagement Ceremony of ${couple.groomFullName} & ${couple.brideFullName} at ${venue.name}, ${venue.addressLine1}, ${venue.cityStateZip}.`;
  const eventLocation = `${venue.name}, ${venue.addressLine1}, ${venue.cityStateZip}`;

  const startUtc = formatCalendarUtc(date.isoStartDateTime);
  const endUtc = formatCalendarUtc(date.isoEndDateTime);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${startUtc}/${endUtc}&details=${encodeURIComponent(
    eventDetails
  )}&location=${encodeURIComponent(eventLocation)}`;

  // Download .ics calendar file for Apple/Outlook calendars
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Muslim Engagement Invitation//EN',
      'BEGIN:VEVENT',
      `DTSTART:${startUtc}`,
      `DTEND:${endUtc}`,
      `SUMMARY:${eventTitle}`,
      `DESCRIPTION:${eventDetails}`,
      `LOCATION:${eventLocation}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `${couple.groomFirstName}-${couple.brideFirstName}-Engagement.ics`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
            <span className="section-eyebrow">Counting Every Blessed Moment</span>
            <h2 className="section-title">
              {date.monthName} {date.dayOfMonth}, {date.year}
            </h2>
            <p className="countdown-subtitle">
              {date.dayOfWeek} • {date.startTimeDisplay} ({date.timezoneLabel})
            </p>
            <FloralGoldDivider />
          </div>

          {timeLeft.isComplete ? (
            <div className="countdown-complete-banner" role="status">
              <p className="arabic-salam" lang="ar" dir="rtl">
                الحمد لله الذي بنعمته تتم الصالحات
              </p>
              <h3>Alhamdulillah! The Blessed Day Has Arrived</h3>
              <p>We look forward to welcoming you with warmth and gratitude.</p>
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

          {/* Save the Date / Calendar Actions */}
          <div className="calendar-actions">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-primary"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Add to Google Calendar</span>
            </a>

            <button
              type="button"
              onClick={handleDownloadIcs}
              className="btn-gold-outline"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download .ICS Calendar</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
