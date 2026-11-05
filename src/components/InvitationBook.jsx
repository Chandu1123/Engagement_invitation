import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CrescentMoonIcon,
  FloralGoldDivider,
  CornerOrnament,
  MosqueArchCrown,
  IslamicStarIcon,
} from './IslamicOrnaments';

/**
 * Helper to compute remaining time until target ISO date
 */
function calculateTimeLeft(targetDateString, fallbackDateObj) {
  const targetTime = new Date(targetDateString).getTime() || fallbackDateObj.getTime();
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
 * Presents the Muslim Engagement Invitation as an interactive 3D Flip-Book
 * styled like a Frosted Blush-Pink Resin, Dried Floral & White Pearl keepsake book.
 */
export default function InvitationBook({ config, onFirstOpen }) {
  const { couple, welcome, greeting, date, venue, dua, sharing } = config;

  // 4 Pages in the Book:
  // 0: Front Cover (Bismillah, Couple Names, Open Book CTA)
  // 1: Page 1 - Islamic Greeting, Couple Names & Engagement Date Seal
  // 2: Page 2 - Live Countdown Timer & Venue / Google Maps Location
  // 3: Page 3 - Islamic Blessing Dua & WhatsApp Invitation Share
  const TOTAL_PAGES = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [flipDirection, setFlipDirection] = useState(null); // 'next' | 'prev' | null
  const [isFlipping, setIsFlipping] = useState(false);

  const touchStartXRef = useRef(null);

  const firstPerson =
    couple.order === 'bride-first' ? couple.brideFullName : couple.groomFullName;
  const secondPerson =
    couple.order === 'bride-first' ? couple.groomFullName : couple.brideFullName;

  // Live countdown state
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

  const goToPage = useCallback(
    (targetPage) => {
      if (isFlipping || targetPage === currentPage) return;
      if (targetPage < 0 || targetPage >= TOTAL_PAGES) return;

      if (currentPage === 0 && targetPage > 0 && onFirstOpen) {
        onFirstOpen();
      }

      const direction = targetPage > currentPage ? 'next' : 'prev';
      setFlipDirection(direction);
      setIsFlipping(true);

      setTimeout(() => {
        setCurrentPage(targetPage);
      }, 280);

      setTimeout(() => {
        setIsFlipping(false);
        setFlipDirection(null);
      }, 600);
    },
    [currentPage, isFlipping, onFirstOpen]
  );

  const handleNext = useCallback(() => {
    if (currentPage < TOTAL_PAGES - 1) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, goToPage]);

  const handlePrev = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe navigation on mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX < -45) {
      handleNext();
    } else if (deltaX > 45) {
      handlePrev();
    }
    touchStartXRef.current = null;
  };

  // Share on WhatsApp
  const handleShareOnWhatsApp = () => {
    const currentUrl = window.location.href;
    const fullShareMessage = `${sharing.whatsappShareText}\n${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullShareMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const pageLabels = ['Cover', 'Invitation', 'Date & Location', 'Dua & Share'];

  return (
    <div className="book-stage-wrapper">
      {/* Top Book Chapter Pills */}
      <nav className="book-top-tabs" aria-label="Invitation Book Pages">
        {pageLabels.map((label, index) => (
          <button
            key={label}
            type="button"
            onClick={() => goToPage(index)}
            className={`book-tab-pill ${
              currentPage === index ? 'book-tab-pill--active' : ''
            }`}
          >
            <span className="book-tab-num">{index + 1}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* 3D Book Container */}
      <div
        className="book-3d-scene"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={`book-frame ${
            currentPage === 0 ? 'book-frame--cover' : 'book-frame--open'
          } ${isFlipping ? `book-frame--flip-${flipDirection}` : ''}`}
        >
          {/* Left Metallic Rose-Gold & Pearl Book Spine */}
          <div className="book-spine" aria-hidden="true">
            <div className="spine-ring spine-ring-1" />
            <div className="spine-ring spine-ring-2" />
            <div className="spine-ring spine-ring-3" />
            <div className="spine-ring spine-ring-4" />
          </div>

          {/* Stacked Paper Edges on the Right */}
          <div className="book-page-edges" aria-hidden="true" />

          {/* Active Book Page Surface */}
          <article className="book-page-surface" aria-live="polite">
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />

            <MosqueArchCrown className="book-arch-header" />

            <div className="book-page-content">
              {/* ============================================================
                  PAGE 0: BOOK FRONT COVER
                  ============================================================ */}
              {currentPage === 0 && (
                <div className="book-page-inner page-cover">
                  <div className="book-crescent-badge">
                    <CrescentMoonIcon size={50} />
                  </div>

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

                  <p className="welcome-honor-note">
                    {welcome.guestHonorLabel}
                  </p>

                  <button
                    type="button"
                    className="btn-gold-primary book-open-cta"
                    onClick={handleNext}
                  >
                    <span>Open Invitation Book</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              {/* ============================================================
                  PAGE 1: GREETING, COUPLE & ENGAGEMENT DATE
                  ============================================================ */}
              {currentPage === 1 && (
                <div className="book-page-inner page-invitation">
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
                      <IslamicStarIcon size={16} />
                      <span>with</span>
                      <IslamicStarIcon size={16} />
                    </span>

                    <span className="couple-role-pill">Bride</span>
                    <h2 className="hero-couple-name">{secondPerson}</h2>
                  </div>

                  <div className="hero-date-banner">
                    <div className="date-banner-col">
                      <span className="date-col-label">{date.dayOfWeek}</span>
                    </div>
                    <div className="date-banner-center">
                      <span className="date-month">{date.monthName}</span>
                      <span className="date-day-number">{date.dayOfMonth}</span>
                      <span className="date-year">{date.year}</span>
                    </div>
                    <div className="date-banner-col">
                      <span className="date-col-label">
                        {date.startTimeDisplay}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================
                  PAGE 2: COUNTDOWN TIMER & VENUE LOCATION
                  ============================================================ */}
              {currentPage === 2 && (
                <div className="book-page-inner page-venue-countdown">
                  <span className="section-eyebrow">Counting Down To</span>
                  <h2 className="section-title">
                    {date.monthName} {date.dayOfMonth}, {date.year}
                  </h2>

                  {timeLeft.isComplete ? (
                    <div className="countdown-complete-banner">
                      <h3>Alhamdulillah! Today is the Engagement Day</h3>
                    </div>
                  ) : (
                    <div
                      className="countdown-boxes book-countdown-boxes"
                      role="timer"
                      aria-live="polite"
                    >
                      {[
                        { label: 'Days', value: padNumber(timeLeft.days) },
                        { label: 'Hours', value: padNumber(timeLeft.hours) },
                        { label: 'Minutes', value: padNumber(timeLeft.minutes) },
                        { label: 'Seconds', value: padNumber(timeLeft.seconds) },
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
                    <div
                      className="venue-icon-badge venue-icon-centered"
                      aria-hidden="true"
                    >
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>

                    <span className="section-eyebrow">Location</span>
                    <h3 className="book-venue-title">{venue.name}</h3>
                    <p className="venue-clean-details">
                      <strong>
                        {date.dayOfWeek}, {date.monthName} {date.dayOfMonth},{' '}
                        {date.year}
                      </strong>{' '}
                      • {date.startTimeDisplay}
                    </p>
                    <p className="venue-clean-address">
                      {venue.addressLine1}
                      {venue.cityStateZip ? ` — ${venue.cityStateZip}` : ''}
                    </p>

                    <a
                      href={venue.googleMapsUrl}
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
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>Open Location in Google Maps</span>
                    </a>
                  </div>
                </div>
              )}

              {/* ============================================================
                  PAGE 3: ISLAMIC BLESSING DUA & WHATSAPP SHARE
                  ============================================================ */}
              {currentPage === 3 && (
                <div className="book-page-inner page-dua-share">
                  <div className="dua-header-icon">
                    <CrescentMoonIcon size={44} />
                  </div>

                  <span className="section-eyebrow">Dua &amp; Blessings</span>
                  <p className="arabic-blessing" lang="ar" dir="rtl">
                    {dua.blessingDuaArabic}
                  </p>
                  <p className="dua-translation">{dua.blessingDuaTranslation}</p>

                  <FloralGoldDivider />

                  <p className="dua-closing-note">{dua.closingNote}</p>

                  <p className="footer-names book-closing-names">
                    {firstPerson} &amp; {secondPerson}
                  </p>
                  <p className="footer-date">
                    {date.monthName} {date.dayOfMonth}, {date.year}
                  </p>

                  <div className="book-share-actions">
                    <button
                      type="button"
                      onClick={handleShareOnWhatsApp}
                      className="btn-gold-primary"
                    >
                      <svg
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        aria-hidden="true"
                      >
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                      </svg>
                      <span>Share Invitation on WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => goToPage(0)}
                      className="btn-book-secondary"
                    >
                      <span>Back to Book Cover</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Page Footer Number */}
              <div className="book-page-number">
                <span>
                  Page {currentPage + 1} of {TOTAL_PAGES}
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Bottom Flip-Book Turn Controls */}
      <div className="book-bottom-controls">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 0 || isFlipping}
          className="book-nav-btn"
          aria-label="Previous Page"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M11 19l-7-7 7-7" />
          </svg>
          <span>Prev Page</span>
        </button>

        <div className="book-dots" role="tablist" aria-label="Page Indicators">
          {pageLabels.map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => goToPage(idx)}
              className={`book-dot ${currentPage === idx ? 'book-dot--active' : ''}`}
              aria-label={`Go to ${label}`}
              aria-selected={currentPage === idx}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === TOTAL_PAGES - 1 || isFlipping}
          className="book-nav-btn"
          aria-label="Next Page"
        >
          <span>Next Page</span>
          <svg
            width="18"
            height="18"
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
  );
}
