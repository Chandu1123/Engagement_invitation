import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  CrescentMoonIcon,
  CornerOrnament,
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
 * InvitationBook
 * 
 * Interactive Luxury Resin-Style Engagement Invitation Book:
 * - Desktop: Centered closed cover (Face of the book) on load, opening into a grand 2-sided book spread.
 * - Mobile: Full-width luxury booklet starting with the 3D animated couple Face of the book,
 *   navigating smoothly between Cover -> Blessings & Couple -> Venue & Google Maps.
 */
export default function InvitationBook({ config, onFirstOpen }) {
  const { couple, welcome, greeting, date, venue, dua, sharing } = config;

  // Responsive state
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Desktop book state: isOpen = false (Cover centered), true (2-Sided Open Spread)
  const [isOpen, setIsOpen] = useState(false);

  // Mobile page index: 0 = Cover, 1 = Blessings & Couple, 2 = Venue & Map
  const [mobilePage, setMobilePage] = useState(0);

  const touchStartXRef = useRef(null);

  // 3D Parallax Tilt state for front cover portrait
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const handleCoverMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleCoverMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const firstPerson =
    couple.order === 'bride-first'
      ? couple.brideFullName
      : couple.groomFullName;
  const secondPerson =
    couple.order === 'bride-first'
      ? couple.groomFullName
      : couple.brideFullName;

  // Live countdown timer state
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

  // Trigger audio on first interaction if not yet triggered
  const triggerOpenAudio = useCallback(() => {
    if (onFirstOpen) {
      onFirstOpen();
    }
  }, [onFirstOpen]);

  // Open / Close actions for desktop
  const handleOpenDesktop = useCallback(() => {
    if (!isOpen) {
      triggerOpenAudio();
    }
    setIsOpen(true);
    setMobilePage(1);
  }, [isOpen, triggerOpenAudio]);

  const handleCloseDesktop = useCallback(() => {
    setIsOpen(false);
    setMobilePage(0);
  }, []);

  // Mobile page navigation
  const handleGoToMobilePage = useCallback(
    (pageIdx) => {
      if (pageIdx > 0) {
        triggerOpenAudio();
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
      setMobilePage(pageIdx);
    },
    [triggerOpenAudio]
  );

  const handleNext = useCallback(() => {
    if (isMobile) {
      if (mobilePage < 2) {
        handleGoToMobilePage(mobilePage + 1);
      }
    } else {
      handleOpenDesktop();
    }
  }, [isMobile, mobilePage, handleGoToMobilePage, handleOpenDesktop]);

  const handlePrev = useCallback(() => {
    if (isMobile) {
      if (mobilePage > 0) {
        handleGoToMobilePage(mobilePage - 1);
      }
    } else {
      handleCloseDesktop();
    }
  }, [isMobile, mobilePage, handleGoToMobilePage, handleCloseDesktop]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'Escape') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mobile touch swipe gestures
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX < -45) handleNext();
    if (deltaX > 45) handlePrev();
    touchStartXRef.current = null;
  };

  // WhatsApp share action
  const handleShareOnWhatsApp = (e) => {
    e.stopPropagation();
    const currentUrl = window.location.href;
    const text = `${sharing.whatsappShareText} ${currentUrl}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // --------------------------------------------------------------------------
  // SHARED PAGE CONTENT PIECES
  // --------------------------------------------------------------------------

  // 1. FRONT COVER (Face of the book with 3D Animated Couple)
  const renderCoverContent = () => (
    <>
      <div className="cover-spine-trim" aria-hidden="true" />
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      <div className="cover-ambient-effects" aria-hidden="true">
        <span className="floating-petal petal-1">🌸</span>
        <span className="floating-petal petal-2">🌸</span>
        <span className="floating-petal petal-3">✨</span>
        <span className="floating-petal petal-4">🌸</span>
        <span className="floating-petal petal-5">✨</span>
      </div>

      <div className="page-body cover-page-body">
        {/* Header Bismillah Calligraphy */}
        <div className="cover-header-group">
          <p className="arabic-bismillah-cover" lang="ar" dir="rtl">
            {welcome.bismillahArabic}
          </p>
        </div>

        {/* 3D Animated Couple Portrait with Interactive Parallax Tilt */}
        <div
          className="cover-portrait-wrapper"
          onMouseMove={handleCoverMouseMove}
          onMouseLeave={handleCoverMouseLeave}
          style={{
            transform: `perspective(750px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
          }}
          title="3D Animated Couple: Sarithala Chandu & Vuluvalapalli Kulsum"
        >
          <div className="portrait-glow-halo" aria-hidden="true" />
          <div className="portrait-arch-frame">
            <img
              src="./images/couple-3d.png"
              alt="3D Animated Couple — Sarithala Chandu & Vuluvalapalli Kulsum"
              className="cover-portrait-img"
              loading="eager"
            />
            <div
              className="portrait-shimmer-glare"
              style={{
                background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)`,
              }}
              aria-hidden="true"
            />
            <div className="portrait-gold-rim" aria-hidden="true" />
          </div>
        </div>

        {/* Title & Couple Names */}
        <div className="cover-info-group">
          <span className="welcome-badge-cover">
            ✦ {welcome.badgeText} ✦
          </span>

          <h1 className="book-cover-names">
            <span>{firstPerson}</span>
            <span className="book-ampersand">with</span>
            <span>{secondPerson}</span>
          </h1>

          <p className="welcome-date-pill">
            {date.dayOfWeek}, {date.monthName} {date.dayOfMonth}, {date.year}
          </p>

          <span className="cover-tap-prompt">
            Tap to open or click Next →
          </span>
        </div>
      </div>
    </>
  );

  // 2. INSIDE LEFT PAGE (Blessings & Couple Details)
  const renderLeftPageContent = () => (
    <>
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      <div className="page-body">
        <div className="islamic-emblem-header">
          <CrescentMoonIcon size={38} className="emblem-crescent" />
        </div>

        <div className="bismillah-block">
          <p className="bismillah-arabic" lang="ar" dir="rtl">
            {welcome.bismillahArabic}
          </p>
          <p className="bismillah-translation">
            {welcome.bismillahTranslation}
          </p>
        </div>

        <div className="salam-greeting-block">
          <p className="arabic-salam" lang="ar" dir="rtl">
            {greeting.salamArabic}
          </p>
          <p className="transliteration-salam">
            {greeting.salamTransliteration}
          </p>
        </div>

        <p className="invitation-lead-text">{greeting.invitationLead}</p>

        <div className="book-couple-container">
          <h2 className="couple-name-first">{firstPerson}</h2>
          <div className="names-ornament-separator" aria-hidden="true">
            <span className="ornament-line" />
            <span className="ornament-ampersand">&amp;</span>
            <span className="ornament-line" />
          </div>
          <h2 className="couple-name-second">{secondPerson}</h2>
        </div>

        <div className="dua-blessing-box">
          <p className="dua-arabic-text" lang="ar" dir="rtl">
            {dua.blessingDuaArabic}
          </p>
          <p className="dua-translation-text">
            {dua.blessingDuaTranslation}
          </p>
          <p className="closing-note-text">{dua.closingNote}</p>
        </div>
      </div>

      <div className="page-footer-row">
        <span className="page-num-label">Blessings &amp; Union</span>
        <button
          type="button"
          className="page-corner-btn page-corner-btn--highlight"
          onClick={handlePrev}
          title="Move backward to cover"
        >
          ← Back to Cover
        </button>
      </div>
    </>
  );

  // 3. INSIDE RIGHT PAGE (Venue, Google Maps, Countdown & Date)
  const renderRightPageContent = () => (
    <>
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      <div className="page-body">
        <div className="venue-map-icon-wrap" aria-hidden="true">
          <svg
            width="28"
            height="28"
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
          {date.dayOfWeek}, {date.monthName} {date.dayOfMonth}, {date.year}
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
            title="Open venue in Google Maps"
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

        {/* Live Countdown Timer */}
        <div className="book-countdown-section">
          <span className="countdown-eyebrow">Countdown to Ceremony</span>
          <div className="book-timer-grid">
            <div className="timer-tile">
              <span className="timer-number">
                {padNumber(timeLeft.days)}
              </span>
              <span className="timer-unit">Days</span>
            </div>
            <div className="timer-tile">
              <span className="timer-number">
                {padNumber(timeLeft.hours)}
              </span>
              <span className="timer-unit">Hours</span>
            </div>
            <div className="timer-tile">
              <span className="timer-number">
                {padNumber(timeLeft.minutes)}
              </span>
              <span className="timer-unit">Mins</span>
            </div>
            <div className="timer-tile">
              <span className="timer-number">
                {padNumber(timeLeft.seconds)}
              </span>
              <span className="timer-unit">Secs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="page-footer-row">
        <span className="page-num-label">Venue &amp; Location</span>
        <button
          type="button"
          className="page-corner-btn page-corner-btn--highlight"
          onClick={handlePrev}
          title="Move backward"
        >
          {isMobile ? '← Back to Blessings' : '← Back to Cover'}
        </button>
      </div>
    </>
  );

  // --------------------------------------------------------------------------
  // RENDER COMPONENT
  // --------------------------------------------------------------------------
  const isBackDisabled = isMobile ? mobilePage === 0 : !isOpen;
  const isNextDisabled = isMobile ? mobilePage === 2 : isOpen;

  return (
    <div
      className="twoside-book-viewport"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <header className="twoside-top-bar" aria-label="Invitation Navigation">
        {isMobile ? (
          /* Mobile Tabs: Cover, Blessings, Venue */
          <div className="top-nav-pills mobile-nav-pills">
            <button
              type="button"
              className={`spread-pill ${
                mobilePage === 0 ? 'spread-pill--active' : ''
              }`}
              onClick={() => handleGoToMobilePage(0)}
              title="Book Cover"
            >
              Cover
            </button>
            <button
              type="button"
              className={`spread-pill ${
                mobilePage === 1 ? 'spread-pill--active' : ''
              }`}
              onClick={() => handleGoToMobilePage(1)}
              title="Blessings & Couple"
            >
              Blessings
            </button>
            <button
              type="button"
              className={`spread-pill ${
                mobilePage === 2 ? 'spread-pill--active' : ''
              }`}
              onClick={() => handleGoToMobilePage(2)}
              title="Venue & Location"
            >
              Venue &amp; Map
            </button>
          </div>
        ) : (
          /* Desktop Tabs: Cover vs Inside Spread */
          <div className="top-nav-pills">
            <button
              type="button"
              className={`spread-pill ${!isOpen ? 'spread-pill--active' : ''}`}
              onClick={handleCloseDesktop}
              title="Book Cover"
            >
              Cover
            </button>
            <button
              type="button"
              className={`spread-pill ${isOpen ? 'spread-pill--active' : ''}`}
              onClick={handleOpenDesktop}
              title="Open Invitation Spread"
            >
              Inside Spread 📖
            </button>
          </div>
        )}

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

      {/* Main Book Stage */}
      <div className="twoside-scene">
        {/* Left Side Navigation: Move Backward */}
        <button
          type="button"
          className={`book-side-arrow book-side-arrow--prev ${
            isBackDisabled ? 'is-disabled' : ''
          }`}
          onClick={handlePrev}
          disabled={isBackDisabled}
          aria-label="Previous (Move Backward)"
          title="Move backward (← Left Arrow)"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span className="side-arrow-label">Back</span>
        </button>

        {isMobile ? (
          /* ================================================================
             MOBILE VIEW: Luxury single-page flip booklet
             Starts on Cover (0) full-width, perfectly legible & touch friendly!
             ================================================================ */
          <div className="mobile-book-card">
            {mobilePage === 0 && (
              <div
                className="leaf-face mobile-single-page cover-face mobile-cover-face"
                onClick={handleNext}
                role="button"
                tabIndex={0}
                aria-label="Open Invitation"
              >
                {renderCoverContent()}
              </div>
            )}
            {mobilePage === 1 && (
              <div className="leaf-face mobile-single-page page-left mobile-inner-page">
                {renderLeftPageContent()}
              </div>
            )}
            {mobilePage === 2 && (
              <div className="leaf-face mobile-single-page page-right mobile-inner-page">
                {renderRightPageContent()}
              </div>
            )}
          </div>
        ) : (
          /* ================================================================
             DESKTOP VIEW: Centered closed cover opening into 2-sided spread!
             ================================================================ */
          <div
            className={`twoside-book ${
              !isOpen ? 'twoside-book--closed' : 'twoside-book--open'
            }`}
          >
            {/* Center Book Spine Valley Crease */}
            <div className="twoside-center-spine" aria-hidden="true" />

            {/* Gilded stacked page depth layers */}
            <div className="book-page-depth-layers" aria-hidden="true" />

            {/* Hinged Cover Leaf: Front = Cover, Back = Left Page */}
            <div
              className={`book-leaf cover-leaf ${
                isOpen ? 'book-leaf--turned' : ''
              }`}
              style={{ zIndex: isOpen ? 20 : 35 }}
            >
              {/* FRONT: 3D ANIMATED COUPLE COVER */}
              <div
                className="leaf-face leaf-front cover-face"
                onClick={!isOpen ? handleOpenDesktop : undefined}
                role={!isOpen ? 'button' : undefined}
                tabIndex={!isOpen ? 0 : -1}
                aria-label={!isOpen ? 'Open Invitation Book' : undefined}
              >
                {renderCoverContent()}
              </div>

              {/* BACK: LEFT PAGE */}
              <div className="leaf-face leaf-back page-left">
                {renderLeftPageContent()}
              </div>
            </div>

            {/* BASE: RIGHT PAGE */}
            <div className="book-static-right page-right">
              {renderRightPageContent()}
            </div>
          </div>
        )}

        {/* Right Side Navigation: Move Forward */}
        <button
          type="button"
          className={`book-side-arrow book-side-arrow--next ${
            isNextDisabled ? 'is-disabled' : ''
          }`}
          onClick={handleNext}
          disabled={isNextDisabled}
          aria-label="Next (Move Forward)"
          title="Move forward (→ Right Arrow)"
        >
          <span className="side-arrow-label">Next</span>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <footer className="twoside-bottom-nav" aria-label="Book Navigation">
        <button
          type="button"
          className={`nav-btn-pill nav-btn-pill--prev ${
            isBackDisabled ? 'nav-btn-pill--disabled' : ''
          }`}
          onClick={handlePrev}
          disabled={isBackDisabled}
          title="Move backward"
          aria-label="Move backward"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Previous</span>
        </button>

        {/* Indicator dots */}
        <div className="book-spread-nav" role="tablist">
          {isMobile ? (
            <>
              <button
                type="button"
                className={`spread-dot-pill ${
                  mobilePage === 0 ? 'spread-dot-pill--active' : ''
                }`}
                onClick={() => handleGoToMobilePage(0)}
                title="Go to Cover"
                role="tab"
                aria-selected={mobilePage === 0}
              >
                <span className="dot-indicator" />
                <span className="dot-label">Cover</span>
              </button>
              <span className="spread-separator">•</span>
              <button
                type="button"
                className={`spread-dot-pill ${
                  mobilePage === 1 ? 'spread-dot-pill--active' : ''
                }`}
                onClick={() => handleGoToMobilePage(1)}
                title="Go to Blessings"
                role="tab"
                aria-selected={mobilePage === 1}
              >
                <span className="dot-indicator" />
                <span className="dot-label">Blessings</span>
              </button>
              <span className="spread-separator">•</span>
              <button
                type="button"
                className={`spread-dot-pill ${
                  mobilePage === 2 ? 'spread-dot-pill--active' : ''
                }`}
                onClick={() => handleGoToMobilePage(2)}
                title="Go to Venue"
                role="tab"
                aria-selected={mobilePage === 2}
              >
                <span className="dot-indicator" />
                <span className="dot-label">Venue</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={`spread-dot-pill ${
                  !isOpen ? 'spread-dot-pill--active' : ''
                }`}
                onClick={handleCloseDesktop}
                title="Go to Cover"
                role="tab"
                aria-selected={!isOpen}
              >
                <span className="dot-indicator" />
                <span className="dot-label">Cover</span>
              </button>
              <span className="spread-separator">•</span>
              <button
                type="button"
                className={`spread-dot-pill ${
                  isOpen ? 'spread-dot-pill--active' : ''
                }`}
                onClick={handleOpenDesktop}
                title="Go to Inside Spread"
                role="tab"
                aria-selected={isOpen}
              >
                <span className="dot-indicator" />
                <span className="dot-label">Inside</span>
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className={`nav-btn-pill nav-btn-pill--next ${
            isNextDisabled ? 'nav-btn-pill--disabled' : ''
          }`}
          onClick={handleNext}
          disabled={isNextDisabled}
          title="Move forward"
          aria-label="Move forward"
        >
          <span>Next</span>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

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
          <span>Share</span>
        </button>
      </footer>
    </div>
  );
}
