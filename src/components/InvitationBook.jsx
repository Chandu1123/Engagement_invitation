import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CrescentMoonIcon,
  FloralGoldDivider,
  CornerOrnament,
  MosqueArchCrown,
  IslamicStarIcon,
} from './IslamicOrnaments';

/**
 * Calculate countdown remaining time until the engagement date
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
 * Luxury Hardcover Invitation Book
 * - Starts with the closed front cover on the right side of the spine.
 * - When opened, the cover swings 180° to the left, revealing the full 2-sided book spread.
 * - Left Page: Bismillah, Greeting, Couple Names & Islamic Blessing Dua.
 * - Right Page: Date, Live Countdown Timer, Venue & Google Maps button.
 * - Timing omitted per user request.
 * - WhatsApp share option is conveniently placed in the header & quick-actions bar.
 * - Zero webpage scrolling; fully responsive across all screens.
 */
export default function InvitationBook({ config, onFirstOpen }) {
  const { couple, welcome, greeting, date, venue, dua, sharing } = config;

  // isOpen: false = Closed Cover on Right, true = Open 2-Sided Book Spread
  const [isOpen, setIsOpen] = useState(false);
  const touchStartXRef = useRef(null);

  const firstPerson =
    couple.order === 'bride-first'
      ? couple.brideFullName
      : couple.groomFullName;
  const secondPerson =
    couple.order === 'bride-first'
      ? couple.groomFullName
      : couple.brideFullName;

  // Live countdown timer state (counts down to engagement date)
  const fallbackDate = new Date(
    date.year,
    date.monthNumber - 1,
    date.dayOfMonth,
    0,
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

  const handleOpenBook = useCallback(() => {
    if (!isOpen && onFirstOpen) {
      onFirstOpen();
    }
    setIsOpen(true);
  }, [isOpen, onFirstOpen]);

  const handleCloseBook = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggleBook = useCallback(() => {
    if (isOpen) {
      handleCloseBook();
    } else {
      handleOpenBook();
    }
  }, [isOpen, handleCloseBook, handleOpenBook]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        if (!isOpen) handleOpenBook();
      } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
        if (isOpen) handleCloseBook();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleOpenBook, handleCloseBook]);

  // Mobile swipe gestures
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX < -45 && !isOpen) handleOpenBook();
    if (deltaX > 45 && isOpen) handleCloseBook();
    touchStartXRef.current = null;
  };

  // WhatsApp share action
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
      {/* Top Header Bar: Book state pills & WhatsApp share button */}
      <header className="twoside-top-bar" aria-label="Invitation Controls">
        <button
          type="button"
          className={`spread-pill ${!isOpen ? 'spread-pill--active' : ''}`}
          onClick={handleCloseBook}
        >
          Book Cover
        </button>
        <button
          type="button"
          className={`spread-pill ${isOpen ? 'spread-pill--active' : ''}`}
          onClick={handleOpenBook}
        >
          Open Invitation 📖
        </button>

        {/* WhatsApp Share Button in Header */}
        <button
          type="button"
          className="whatsapp-top-btn"
          onClick={handleShareOnWhatsApp}
          title="Share invitation on WhatsApp"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>Share</span>
        </button>
      </header>

      {/* 3D Two-Sided Book Stage */}
      <div className="twoside-scene">
        <div
          className={`twoside-book ${
            !isOpen ? 'twoside-book--closed' : 'twoside-book--open'
          }`}
        >
          {/* Center Book Spine Valley Crease (visible when book is open) */}
          <div className="twoside-center-spine" aria-hidden="true" />

          {/* Gilded stacked page edges along the right and bottom */}
          <div className="book-page-depth-layers" aria-hidden="true" />

          {/* ================================================================
              HINGED COVER LEAF:
              - Front Face (rotateY 0°): Closed Front Cover (starts on right of spine)
              - Back Face (rotateY 180°): Left Page (Bismillah, Salam, Couple, Dua)
              ================================================================ */}
          <div
            className={`book-leaf cover-leaf ${
              isOpen ? 'book-leaf--turned' : ''
            }`}
            style={{ zIndex: isOpen ? 20 : 35 }}
          >
            {/* FRONT FACE: HARDCOVER FRONT (Visible when book is closed) */}
            <div
              className="leaf-face leaf-front cover-face"
              onClick={!isOpen ? handleOpenBook : undefined}
              role={!isOpen ? 'button' : undefined}
              tabIndex={!isOpen ? 0 : -1}
              aria-label={!isOpen ? 'Open Invitation Book' : undefined}
            >
              {/* Spine Binding Trim on the Left Edge of the Front Cover */}
              <div className="cover-spine-trim" aria-hidden="true" />

              {/* Corner Pressed Floral & Pearl Clusters */}
              <CornerOrnament position="top-left" />
              <CornerOrnament position="top-right" />
              <CornerOrnament position="bottom-left" />
              <CornerOrnament position="bottom-right" />

              <MosqueArchCrown className="page-arch" />

              <div className="page-body">
                <CrescentMoonIcon size={36} />

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

                {!isOpen && (
                  <button
                    type="button"
                    className="btn-gold-primary open-book-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenBook();
                    }}
                  >
                    <span>Open Invitation Book</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* BACK FACE: LEFT PAGE (Visible when book is open) */}
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
                    <IslamicStarIcon size={12} />
                    <span>with</span>
                    <IslamicStarIcon size={12} />
                  </span>

                  <span className="couple-role-pill">Bride</span>
                  <h2 className="hero-couple-name">{secondPerson}</h2>
                </div>

                {/* Islamic Blessing Dua incorporated cleanly on the left page */}
                <div className="page-dua-container">
                  <FloralGoldDivider />
                  <p className="arabic-blessing-compact" lang="ar" dir="rtl">
                    {dua.blessingDuaArabic}
                  </p>
                  <p className="dua-translation-compact">
                    {dua.blessingDuaTranslation}
                  </p>
                </div>
              </div>

              <div className="page-footer-row">
                <button
                  type="button"
                  className="page-corner-btn"
                  onClick={handleCloseBook}
                  title="Close book back to front cover"
                >
                  ← Cover
                </button>
                <span className="page-num-label">Left Page</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              STATIC RIGHT PAGE:
              - Always rests on the right side of the spine
              - Visible when book is open: Date, Countdown, Venue & Google Maps
              ================================================================ */}
          <div className="book-static-right page-right" style={{ zIndex: 10 }}>
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
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>

                <span className="section-eyebrow">Ceremony Venue</span>
                <h3 className="book-venue-title">{venue.name}</h3>
                <p className="venue-clean-details">
                  {date.dayOfWeek}, {date.monthName} {date.dayOfMonth},{' '}
                  {date.year}
                </p>
                <p className="venue-clean-address">
                  {venue.addressLine1}
                  {venue.cityStateZip ? ` — ${venue.cityStateZip}` : ''}
                </p>

                <div className="right-page-actions">
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

                  <button
                    type="button"
                    onClick={handleShareOnWhatsApp}
                    className="btn-whatsapp-compact"
                    title="Share invitation on WhatsApp"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    <span>Share on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="page-footer-row">
              <span className="page-num-label">Right Page</span>
              <button
                type="button"
                className="page-corner-btn page-corner-btn--highlight"
                onClick={handleCloseBook}
                title="Close book back to front cover"
              >
                Close Book ↺
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spread Indicator */}
      <footer className="twoside-bottom-nav">
        <button
          type="button"
          className="book-nav-btn"
          onClick={handleToggleBook}
          title={isOpen ? 'Close Book' : 'Open Book'}
        >
          {isOpen ? '↺' : '📖'}
        </button>

        <div className="book-dots" role="tablist">
          <button
            type="button"
            className={`book-dot ${!isOpen ? 'book-dot--active' : ''}`}
            onClick={handleCloseBook}
            title="Book Cover"
          />
          <button
            type="button"
            className={`book-dot ${isOpen ? 'book-dot--active' : ''}`}
            onClick={handleOpenBook}
            title="Open Invitation"
          />
        </div>

        <button
          type="button"
          className="whatsapp-bottom-pill"
          onClick={handleShareOnWhatsApp}
          title="Share invitation on WhatsApp"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          <span>Share Invitation</span>
        </button>
      </footer>
    </div>
  );
}
