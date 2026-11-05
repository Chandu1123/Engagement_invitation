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
 * - When opened, the cover swings 180 degrees to the left, unfolding into an authentic 2-sided book spread.
 * - Leaf 2 flips over to reveal Spread 2 (Dua & WhatsApp sharing).
 * - Zero vertical or horizontal scrolling; fully adaptive across all screen sizes.
 */
export default function InvitationBook({ config, onFirstOpen }) {
  const { couple, welcome, greeting, date, venue, dua, sharing } = config;

  // spread: 0 = Closed Cover, 1 = Pages 1 & 2 (Spread 1), 2 = Pages 3 & 4 (Spread 2)
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

  // Live countdown timer state
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

  // Navigate between spreads
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

  // Keyboard navigation (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Mobile swipe gestures
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
      {/* Top Navigation Bar: Spread Tabs & Audio status indicator */}
      <header className="twoside-top-bar" aria-label="Book Navigation">
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
          Pages 1–2 • Invitation
        </button>
        <button
          type="button"
          className={`spread-pill ${spread === 2 ? 'spread-pill--active' : ''}`}
          onClick={() => goToSpread(2)}
        >
          Pages 3–4 • Dua &amp; Share
        </button>
      </header>

      {/* 3D Two-Sided Book Stage */}
      <div className="twoside-scene">
        <div
          className={`twoside-book ${
            spread === 0 ? 'twoside-book--closed' : 'twoside-book--open'
          }`}
          data-spread={spread}
        >
          {/* Center Book Spine Valley Crease (visible when book is open) */}
          <div className="twoside-center-spine" aria-hidden="true" />

          {/* Gilded stacked page edges effect along the outer book borders */}
          <div className="book-page-depth-layers" aria-hidden="true" />

          {/* ================================================================
              LEAF 1: HINGED FRONT COVER / LEFT PAGE 1
              - Front Face (rotateY 0°): Closed Front Cover (starts on right side of spine)
              - Back Face (rotateY 180°): Left Page 1 (Bismillah, Salam, Couple Names)
              ================================================================ */}
          <div
            className={`book-leaf leaf-1 ${
              spread >= 1 ? 'book-leaf--turned' : ''
            }`}
            style={{ zIndex: spread >= 1 ? 20 : 35 }}
          >
            {/* FRONT FACE OF LEAF 1: HARDCOVER FRONT (Visible when closed) */}
            <div
              className="leaf-face leaf-front cover-face"
              onClick={spread === 0 ? () => goToSpread(1) : undefined}
              role={spread === 0 ? 'button' : undefined}
              tabIndex={spread === 0 ? 0 : -1}
              aria-label={spread === 0 ? 'Open Invitation Book' : undefined}
            >
              {/* Spine Binding Trim on the Left Edge */}
              <div className="cover-spine-trim" aria-hidden="true">
                <span className="spine-emboss-dots" />
              </div>

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

                {spread === 0 && (
                  <button
                    type="button"
                    className="btn-gold-primary open-book-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSpread(1);
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

            {/* BACK FACE OF LEAF 1: LEFT PAGE 1 (Visible on Spread 1) */}
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
                  title="Close book back to front cover"
                >
                  ← Cover
                </button>
                <span className="page-num-label">Page 1</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              LEAF 2: HINGED INNER LEAF
              - Front Face (rotateY 0°): Right Page 2 (Countdown & Venue details)
              - Back Face (rotateY 180°): Left Page 3 (Islamic Dua & Blessings)
              ================================================================ */}
          <div
            className={`book-leaf leaf-2 ${
              spread >= 2 ? 'book-leaf--turned' : ''
            }`}
            style={{ zIndex: spread >= 2 ? 30 : 25 }}
          >
            {/* FRONT FACE OF LEAF 2: RIGHT PAGE 2 (Visible on Spread 1) */}
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
                  title="Turn to next page"
                >
                  Turn Page →
                </button>
              </div>
            </div>

            {/* BACK FACE OF LEAF 2: LEFT PAGE 3 (Visible on Spread 2) */}
            <div className="leaf-face leaf-back page-left">
              <CornerOrnament position="top-left" />
              <CornerOrnament position="bottom-left" />
              <MosqueArchCrown className="page-arch" />

              <div className="page-body">
                <CrescentMoonIcon size={36} />
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
                  title="Return to previous page"
                >
                  ← Prev Page
                </button>
                <span className="page-num-label">Page 3</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              STATIC RIGHT BASE PAGE: RIGHT PAGE 4
              - Always rests under Leaf 2 on the right side
              - Visible on Spread 2: Monogram, Closing Blessings, WhatsApp Share
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
                Share this blessed digital engagement invitation with family &amp;
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
                    aria-hidden="true"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <span>Share on WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => goToSpread(0)}
                  className="btn-book-secondary"
                  title="Close book back to front cover"
                >
                  Close Book ↺
                </button>
              </div>
            </div>

            <div className="page-footer-row">
              <button
                type="button"
                className="page-corner-btn"
                onClick={() => goToSpread(1)}
              >
                ← Prev Page
              </button>
              <span className="page-num-label">Page 4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Spread Dots & Quick Nav Indicator */}
      <footer className="twoside-bottom-nav">
        <button
          type="button"
          className="book-nav-btn"
          onClick={handlePrev}
          disabled={spread === 0}
          aria-label="Previous Page"
        >
          ‹
        </button>

        <div className="book-dots" role="tablist">
          <button
            type="button"
            className={`book-dot ${spread === 0 ? 'book-dot--active' : ''}`}
            onClick={() => goToSpread(0)}
            title="Cover"
          />
          <button
            type="button"
            className={`book-dot ${spread === 1 ? 'book-dot--active' : ''}`}
            onClick={() => goToSpread(1)}
            title="Pages 1 & 2"
          />
          <button
            type="button"
            className={`book-dot ${spread === 2 ? 'book-dot--active' : ''}`}
            onClick={() => goToSpread(2)}
            title="Pages 3 & 4"
          />
        </div>

        <button
          type="button"
          className="book-nav-btn"
          onClick={handleNext}
          disabled={spread === 2}
          aria-label="Next Page"
        >
          ›
        </button>
      </footer>
    </div>
  );
}
