import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CrescentMoonIcon,
  FloralGoldDivider,
  CornerOrnament,
  MosqueArchCrown,
  IslamicStarIcon,
} from './IslamicOrnaments';

/**
 * Compute remaining time until target ISO date
 */
function calculateTimeLeft(targetDateString, fallbackDateObj) {
  const targetTime =
    new Date(targetDateString).getTime() || fallbackDateObj.getTime();
  const now = Date.now();
  const difference = targetTime - now;

  if (difference <= 0) {
    return { isComplete: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
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
 * InvitationBook Component
 * A true 2-sided 3D opening book with hinged leaves (Front/Back faces)
 * and zero webpage scrolling.
 *
 * Spreads:
 * - spread 0: Closed Front Cover
 * - spread 1: Open Book (Left: Invitation & Couple | Right: Countdown & Location)
 * - spread 2: Open Book (Left: Islamic Blessing Dua | Right: Share on WhatsApp)
 */
export default function InvitationBook({ config, onFirstOpen }) {
  const { couple, welcome, greeting, date, venue, dua, sharing } = config;

  // spread: 0 = Closed Cover, 1 = Open Spread 1 (Pages 1 & 2), 2 = Open Spread 2 (Pages 3 & 4)
  const [spread, setSpread] = useState(0);
  const touchStartXRef = useRef(null);

  const firstPerson =
    couple.order === 'bride-first'
      ? couple.brideFullName
      : couple.groomFullName;
  const secondPerson =
    couple.order === 'bride-first'
      ? couple.groomFullName
      : couple.brideFullName;

  // Live countdown state
  const fallbackDate = new Date(
    date.year,
    date.monthNumber - 1,
    date.dayOfMonth,
    18,
    0,
    0
  );
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

  const goToSpread = useCallback(
    (targetSpread) => {
      if (targetSpread < 0 || targetSpread > 2) return;
      if (spread === 0 && targetSpread > 0 && onFirstOpen) {
        onFirstOpen();
      }
      setSpread(targetSpread);
    },
    [spread, onFirstOpen]
  );

  const handleNext = useCallback(() => {
    if (spread < 2) goToSpread(spread + 1);
  }, [spread, goToSpread]);

  const handlePrev = useCallback(() => {
    if (spread > 0) goToSpread(spread - 1);
  }, [spread, goToSpread]);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe navigation
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX < -40) handleNext();
    if (deltaX > 40) handlePrev();
    touchStartXRef.current = null;
  };

  // Share on WhatsApp
  const handleShareOnWhatsApp = (e) => {
    e.stopPropagation();
    const currentUrl = window.location.href;
    const fullShareMessage = `${sharing.whatsappShareText}\n${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      fullShareMessage
    )}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="twoside-book-viewport"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Status & Quick Spread Controls */}
      <div className="twoside-top-bar">
        <button
          type="button"
          className={`spread-pill ${spread === 0 ? 'spread-pill--active' : ''}`}
          onClick={() => goToSpread(0)}
        >
          Book Cover
        </button>
        <button
          type="button"
          className={`spread-pill ${spread === 1 ? 'spread-pill--active' : ''}`}
          onClick={() => goToSpread(1)}
        >
          Pages 1–2 • Invitation &amp; Location
        </button>
        <button
          type="button"
          className={`spread-pill ${spread === 2 ? 'spread-pill--active' : ''}`}
          onClick={() => goToSpread(2)}
        >
          Pages 3–4 • Dua &amp; Share
        </button>
      </div>

      {/* 3D Two-Sided Book Stage */}
      <div className="twoside-scene">
        <div
          className={`twoside-book ${
            spread === 0 ? 'twoside-book--closed' : 'twoside-book--open'
          }`}
        >
          {/* Center Book Spine Crease (Visible when open) */}
          <div className="twoside-center-spine" aria-hidden="true" />

          {/* ================================================================
              LEAF 1:
              - Front Face: Book Front Cover (visible when closed)
              - Back Face: Left Page 1 (Invitation & Couple Names, visible on spread 1)
              ================================================================ */}
          <div
            className={`book-leaf leaf-1 ${
              spread >= 1 ? 'book-leaf--turned' : ''
            }`}
            style={{ zIndex: spread >= 1 ? 20 : 30 }}
          >
            {/* LEAF 1 FRONT: BOOK COVER */}
            <div className="leaf-face leaf-front cover-face">
              <div className="cover-spine-trim" aria-hidden="true" />
              <CornerOrnament position="top-left" />
              <CornerOrnament position="top-right" />
              <CornerOrnament position="bottom-left" />
              <CornerOrnament position="bottom-right" />
              <MosqueArchCrown className="page-arch" />

              <div className="page-body">
                <CrescentMoonIcon size={38} />
                <p className="arabic-bismillah" lang="ar" dir="rtl">
                  {welcome.bismillahArabic}
                </p>
                <p className="bismillah-translation">
                  {welcome.bismillahTranslation}
                </p>

                <FloralGoldDivider />

                <span className="welcome-badge">{welcome.badgeText}</span>

                <div className="welcome-monogram-seal" aria-hidden="true">
                  <span>{couple.monogram}</span>
                </div>

                <h1 className="book-cover-names">
                  <span>{firstPerson}</span>
                  <span className="book-ampersand">with</span>
                  <span>{secondPerson}</span>
                </h1>

                <p className="welcome-date-pill">
                  {date.dayOfWeek}, {date.monthName} {date.dayOfMonth},{' '}
                  {date.year}
                </p>

                <button
                  type="button"
                  className="btn-gold-primary open-book-btn"
                  onClick={() => goToSpread(1)}
                >
                  <span>Open Invitation Book</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* LEAF 1 BACK: LEFT PAGE 1 (GREETING & COUPLE) */}
            <div className="leaf-face leaf-back page-left">
              <CornerOrnament position="top-left" />
              <CornerOrnament position="bottom-left" />
              <MosqueArchCrown className="page-arch" />

              <div className="page-body">
                <p className="arabic-bismillah" lang="ar" dir="rtl">
                  {welcome.bismillahArabic}
                </p>
                <p className="arabic-salam" lang="ar" dir="rtl">
                  {greeting.salamArabic}
                </p>
                <p className="salam-transliteration">
                  {greeting.salamTransliteration}
                </p>

                <p className="invitation-lead">{greeting.invitationLead}</p>

                <div className="hero-couple-showcase">
                  <span className="couple-role-pill">Groom</span>
                  <h2 className="hero-couple-name">{firstPerson}</h2>

                  <span className="hero-couple-conjunction">
                    <IslamicStarIcon size={13} />
                    <span>with</span>
                    <IslamicStarIcon size={13} />
                  </span>

                  <span className="couple-role-pill">Bride</span>
                  <h2 className="hero-couple-name">{secondPerson}</h2>
                </div>

                <div className="hero-date-banner">
                  <span className="date-col-label">{date.dayOfWeek}</span>
                  <span className="date-inline-highlight">
                    {date.monthName} {date.dayOfMonth}, {date.year}
                  </span>
                  <span className="date-col-label">
                    {date.startTimeDisplay}
                  </span>
                </div>
              </div>

              <div className="page-footer-row">
                <button
                  type="button"
                  className="page-corner-btn"
                  onClick={() => goToSpread(0)}
                >
                  ← Cover
                </button>
                <span className="page-num-label">Page 1</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              LEAF 2:
              - Front Face: Right Page 2 (Countdown & Location, visible on spread 1)
              - Back Face: Left Page 3 (Islamic Blessing Dua, visible on spread 2)
              ================================================================ */}
          <div
            className={`book-leaf leaf-2 ${
              spread >= 2 ? 'book-leaf--turned' : ''
            }`}
            style={{ zIndex: spread >= 2 ? 25 : 20 }}
          >
            {/* LEAF 2 FRONT: RIGHT PAGE 2 (COUNTDOWN & VENUE) */}
            <div className="leaf-face leaf-front page-right">
              <CornerOrnament position="top-right" />
              <CornerOrnament position="bottom-right" />
              <MosqueArchCrown className="page-arch" />

              <div className="page-body">
                <span className="section-eyebrow">Save The Date</span>
                <h2 className="section-title">
                  {date.monthName} {date.dayOfMonth}, {date.year}
                </h2>

                {timeLeft.isComplete ? (
                  <div className="countdown-complete-banner">
                    <h3>Alhamdulillah! Today is the Engagement Day</h3>
                  </div>
                ) : (
                  <div className="book-countdown-boxes" role="timer">
                    {[
                      { label: 'Days', value: padNumber(timeLeft.days) },
                      { label: 'Hours', value: padNumber(timeLeft.hours) },
                      { label: 'Mins', value: padNumber(timeLeft.minutes) },
                      { label: 'Secs', value: padNumber(timeLeft.seconds) },
                    ].map((unit) => (
                      <div key={unit.label} className="countdown-unit-card">
                        <span className="countdown-number">{unit.value}</span>
                        <span className="countdown-label">{unit.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <FloralGoldDivider />

                <div className="book-venue-block">
                  <div className="venue-icon-badge" aria-hidden="true">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>

                  <span className="section-eyebrow">Location</span>
                  <h3 className="book-venue-title">{venue.name}</h3>
                  <p className="venue-clean-details">
                    {date.dayOfWeek}, {date.monthName} {date.dayOfMonth},{' '}
                    {date.year} • {date.startTimeDisplay}
                  </p>
                  <p className="venue-clean-address">
                    {venue.addressLine1}
                    {venue.cityStateZip ? ` — ${venue.cityStateZip}` : ''}
                  </p>

                  <a
                    href={venue.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-primary btn-compact"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>Google Maps Location</span>
                  </a>
                </div>
              </div>

              <div className="page-footer-row">
                <span className="page-num-label">Page 2</span>
                <button
                  type="button"
                  className="page-corner-btn page-corner-btn--highlight"
                  onClick={() => goToSpread(2)}
                >
                  Turn Page →
                </button>
              </div>
            </div>

            {/* LEAF 2 BACK: LEFT PAGE 3 (ISLAMIC DUA & BLESSINGS) */}
            <div className="leaf-face leaf-back page-left">
              <CornerOrnament position="top-left" />
              <CornerOrnament position="bottom-left" />
              <MosqueArchCrown className="page-arch" />

              <div className="page-body">
                <CrescentMoonIcon size={38} />
                <span className="section-eyebrow">Islamic Dua &amp; Blessings</span>

                <FloralGoldDivider />

                <p className="arabic-blessing" lang="ar" dir="rtl">
                  {dua.blessingDuaArabic}
                </p>
                <p className="dua-translation">{dua.blessingDuaTranslation}</p>

                <FloralGoldDivider />

                <p className="dua-closing-note">{dua.closingNote}</p>
              </div>

              <div className="page-footer-row">
                <button
                  type="button"
                  className="page-corner-btn page-corner-btn--highlight"
                  onClick={() => goToSpread(1)}
                >
                  ← Prev Page
                </button>
                <span className="page-num-label">Page 3</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              STATIC RIGHT BASE PAGE:
              - Right Page 4 (WhatsApp Share & Closing Seal, visible on spread 2)
              ================================================================ */}
          <div className="book-static-right page-right" style={{ zIndex: 10 }}>
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-right" />
            <MosqueArchCrown className="page-arch" />

            <div className="page-body">
              <div className="welcome-monogram-seal" aria-hidden="true">
                <span>{couple.monogram}</span>
              </div>

              <span className="section-eyebrow">With Love &amp; Prayers</span>
              <h2 className="book-closing-names">
                <span>{firstPerson}</span>
                <span className="book-ampersand">&amp;</span>
                <span>{secondPerson}</span>
              </h2>

              <p className="welcome-date-pill">
                {date.dayOfWeek}, {date.monthName} {date.dayOfMonth},{' '}
                {date.year}
              </p>

              <FloralGoldDivider />

              <p className="dua-closing-note">
                Share this digital engagement invitation with family &amp;
                friends on WhatsApp:
              </p>

              <div className="book-share-actions">
                <button
                  type="button"
                  onClick={handleShareOnWhatsApp}
                  className="btn-gold-primary"
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => goToSpread(0)}
                  className="btn-book-secondary"
                >
                  Close Book ↺
                </button>
              </div>
            </div>

            <div className="page-footer-row">
              <span className="page-num-label">Page 4</span>
              <button
                type="button"
                className="page-corner-btn"
                onClick={() => goToSpread(0)}
              >
                Close Book
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Book Navigation Bar */}
      <div className="twoside-bottom-bar">
        <button
          type="button"
          onClick={handlePrev}
          disabled={spread === 0}
          className="book-nav-btn"
        >
          ← {spread === 1 ? 'Close Cover' : 'Prev Page'}
        </button>

        <div className="book-dots">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goToSpread(idx)}
              className={`book-dot ${spread === idx ? 'book-dot--active' : ''}`}
              aria-label={`Go to spread ${idx + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={spread === 2}
          className="book-nav-btn"
        >
          {spread === 0 ? 'Open Book' : 'Next Page'} →
        </button>
      </div>
    </div>
  );
}
