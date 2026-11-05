import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
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
 * Creative Celestial Pearl & Rose-Gold Medallion Dial for Countdown
 */
function CelestialCountdownDial({
  value,
  label,
  gradId,
  progressPercent,
  isSeconds,
}) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(4, Math.min(100, progressPercent));
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={`celestial-dial-item ${
        isSeconds ? 'celestial-dial-item--pulse' : ''
      }`}
    >
      <div className="celestial-dial-circle">
        {/* Crown Pearl at 12 o'clock */}
        <span className="dial-crown-pearl" aria-hidden="true" />

        {/* Rotating Outer Filigree Halo + Live Progress Ring */}
        <svg
          className="celestial-dial-svg"
          viewBox="0 0 64 64"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id={`dialGrad-${gradId}`}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#d88c9a" />
              <stop offset="50%" stopColor="#9e3d55" />
              <stop offset="100%" stopColor="#5e1b2c" />
            </linearGradient>
          </defs>

          {/* Outer dotted pearl track */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="rgba(181, 101, 118, 0.35)"
            strokeWidth="1"
            strokeDasharray="2 3.5"
            className="dial-rotating-halo"
          />

          {/* Soft inner track */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="rgba(255, 250, 252, 0.9)"
            stroke="rgba(194, 120, 110, 0.22)"
            strokeWidth="2.8"
          />

          {/* Animated Rose-Gold Progress Arc */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke={`url(#dialGrad-${gradId})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 32 32)"
            className="dial-progress-arc"
          />
        </svg>

        {/* Center Number */}
        <div className="celestial-dial-center">
          <span className="celestial-dial-number">{value}</span>
        </div>
      </div>

      {/* Ribbon Pill Label */}
      <span className="celestial-dial-label">{label}</span>
    </div>
  );
}

/**
 * InvitationBook
 *
 * Interactive Luxury Handcrafted Floral-Resin & Pearl Engagement Invitation Book:
 * - Bilingual Support: Instant toggle between English ('en') and Telugu ('te' - తెలుగు).
 * - Guaranteed to ALWAYS start on the Front Cover (Face of the Book) on both Phone and Desktop.
 * - Mobile View: 3D Page-Turning Hardcover Book (Cover -> Blessings -> Venue & Maps).
 * - Desktop View: Centered closed cover unfolding into a 2-sided open book spread.
 * - Creative Celestial Pearl & Rose-Gold Medallion Dials for the live countdown.
 */
export default function InvitationBook({ config, onFirstOpen }) {
  const { couple, welcome, greeting, date, venue, dua, sharing, translations } =
    config;

  // Language state: 'en' (English) or 'te' (Telugu)
  const [language, setLanguage] = useState('en');
  const t =
    (translations && translations[language]) ||
    (translations && translations.en) ||
    {};

  // Responsive state (Phone / Tablet portrait <= 768px)
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

  // Desktop book state: ALWAYS starts false (Closed Front Cover)
  const [isOpen, setIsOpen] = useState(false);

  // Mobile 3D book page index: ALWAYS starts 0 (Front Cover)
  const [mobilePage, setMobilePage] = useState(0);

  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const lastNavTimeRef = useRef(0);

  // 3D Parallax Tilt state for front cover portrait (Mouse + Touch)
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const applyTiltFromPoint = (clientX, clientY, rect) => {
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = Math.max(
      -14,
      Math.min(14, ((y - centerY) / centerY) * -12)
    );
    const rotateY = Math.max(-14, Math.min(14, ((x - centerX) / centerX) * 12));
    const glareX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const glareY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleCoverMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    applyTiltFromPoint(e.clientX, e.clientY, rect);
  };

  const handleCoverTouchMove = (e) => {
    if (!e.touches || !e.touches[0]) return;
    const rect = e.currentTarget.getBoundingClientRect();
    applyTiltFromPoint(e.touches[0].clientX, e.touches[0].clientY, rect);
  };

  const handleCoverLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const groomDisplay = t.groomName || couple.groomFullName;
  const brideDisplay = t.brideName || couple.brideFullName;

  const firstPerson =
    couple.order === 'bride-first' ? brideDisplay : groomDisplay;
  const secondPerson =
    couple.order === 'bride-first' ? groomDisplay : brideDisplay;

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

  const triggerOpenAudio = useCallback(() => {
    if (onFirstOpen) {
      onFirstOpen();
    }
  }, [onFirstOpen]);

  // Desktop open / close
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

  // Mobile page navigation (with 350ms debounce to prevent touch + click double-jumps)
  const handleGoToMobilePage = useCallback(
    (pageIdx) => {
      const now = Date.now();
      if (now - lastNavTimeRef.current < 350) return;
      lastNavTimeRef.current = now;

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
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = Math.abs(
      e.changedTouches[0].clientY - (touchStartYRef.current || 0)
    );
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > deltaY) {
      if (deltaX < -40) handleNext();
      if (deltaX > 40) handlePrev();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Language switch handler (stops propagation so tapping on the cover doesn't flip page)
  const handleSelectLanguage = (langCode, e) => {
    if (e) e.stopPropagation();
    setLanguage(langCode);
  };

  // WhatsApp share action (shares in currently selected language!)
  const handleShareOnWhatsApp = (e) => {
    e.stopPropagation();
    const currentUrl = window.location.href;
    const shareMsg = t.whatsappShareText || sharing.whatsappShareText;
    const text = `${shareMsg} ${currentUrl}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // --------------------------------------------------------------------------
  // SHARED PAGE CONTENT RENDERERS
  // --------------------------------------------------------------------------

  // 1. FRONT COVER (Face of the Book with 3D Animated Couple & Language Selector)
  const renderCoverContent = () => (
    <>
      <div className="cover-spine-trim" aria-hidden="true">
        <span className="spine-gold-rib" />
        <span className="spine-gold-rib" />
        <span className="spine-gold-rib" />
        <span className="spine-gold-rib" />
        <span className="spine-gold-rib" />
      </div>

      {/* 4 Lush Pressed-Floral & Pearl Resin Corners */}
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />

      {/* Side Pearl & Blossom Resin Accents */}
      <div className="resin-edge-pearls" aria-hidden="true">
        <span className="edge-pearl pearl-left-top" />
        <span className="edge-pearl pearl-left-bottom" />
        <span className="edge-pearl pearl-right-top" />
        <span className="edge-pearl pearl-right-bottom" />
      </div>

      {/* Ambient Floating Rose Petals & Sparkles */}
      <div className="cover-ambient-effects" aria-hidden="true">
        <span className="floating-petal petal-1">🌸</span>
        <span className="floating-petal petal-2">✨</span>
        <span className="floating-petal petal-3">🌸</span>
        <span className="floating-petal petal-4">✨</span>
        <span className="floating-petal petal-5">🌸</span>
      </div>

      <div className="page-body cover-page-body">
        {/* Top Bismillah Calligraphy & Language Selector */}
        <div className="cover-header-group">
          <p className="arabic-bismillah-cover" lang="ar" dir="rtl">
            {welcome.bismillahArabic}
          </p>

          {/* Interactive Language Selector Pill right on the Cover */}
          <div
            className="cover-lang-selector"
            role="group"
            aria-label="Choose Language / భాషను ఎంచుకోండి"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={`cover-lang-btn ${
                language === 'en' ? 'cover-lang-btn--active' : ''
              }`}
              onClick={(e) => handleSelectLanguage('en', e)}
            >
              English
            </button>
            <button
              type="button"
              className={`cover-lang-btn cover-lang-btn--te ${
                language === 'te' ? 'cover-lang-btn--active' : ''
              }`}
              onClick={(e) => handleSelectLanguage('te', e)}
              lang="te"
            >
              తెలుగు
            </button>
          </div>

          <span className="welcome-badge-cover">
            ✦ {t.badgeText || welcome.badgeText} ✦
          </span>
        </div>

        {/* 3D Animated Couple Portrait in Royal Islamic Arch Frame */}
        <div
          className="cover-portrait-wrapper"
          onMouseMove={handleCoverMouseMove}
          onMouseLeave={handleCoverLeave}
          onTouchMove={handleCoverTouchMove}
          onTouchEnd={handleCoverLeave}
          style={
            tilt.x !== 0 || tilt.y !== 0
              ? {
                  transform: `perspective(750px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`,
                }
              : undefined
          }
          title={`${firstPerson} & ${secondPerson}`}
        >
          <div className="portrait-glow-halo" aria-hidden="true" />
          <div className="portrait-crown-pearl" aria-hidden="true" />
          <div className="portrait-arch-frame">
            <img
              src="./images/couple-3d.png"
              alt="3D Animated Couple — Sarithala Chandu & Vuluvalapalli Kulsum"
              className="cover-portrait-img"
              loading="eager"
            />
            <div className="portrait-light-sweep" aria-hidden="true" />
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

        {/* Couple Names & Date */}
        <div className="cover-info-group">
          <h1
            className={`book-cover-names ${
              language === 'te' ? 'book-cover-names--te' : ''
            }`}
          >
            <span className="cover-person-line">{firstPerson}</span>
            <span className="book-ampersand">
              <span className="amp-line" />
              <em>{t.withConjunction || 'with'}</em>
              <span className="amp-line" />
            </span>
            <span className="cover-person-line">{secondPerson}</span>
          </h1>

          <div className="cover-date-ribbon">
            <span className="ribbon-star">✦</span>
            <span className="welcome-date-pill">
              {t.fullDateDisplay ||
                `${date.dayOfWeek}, ${date.monthName} ${date.dayOfMonth}, ${date.year}`}
            </span>
            <span className="ribbon-star">✦</span>
          </div>

          <div className="cover-open-cta-pill">
            <span>{t.openBookCta || 'Tap to Open Book'}</span>
            <svg
              width="14"
              height="14"
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
          </div>
        </div>
      </div>
    </>
  );

  // 2. INSIDE PAGE 1 (Blessings, Greeting, Couple Showcase & Dua)
  const renderLeftPageContent = () => (
    <>
      <CornerOrnament position="top-left" />
      <CornerOrnament position="top-right" />
      <CornerOrnament position="bottom-left" />
      <CornerOrnament position="bottom-right" />
      <MosqueArchCrown className="page-arch" />

      <div className="page-body">
        <p className="arabic-bismillah" lang="ar" dir="rtl">
          {welcome.bismillahArabic}
        </p>
        <p className="arabic-salam" lang="ar" dir="rtl">
          {greeting.salamArabic}
        </p>
        <p className="salam-transliteration">
          {t.salamTransliteration || greeting.salamTransliteration}
        </p>

        <p className="invitation-lead">
          {t.invitationLead || greeting.invitationLead}
        </p>

        {/* Royal Couple Showcase Plaque with Cameo Medallion */}
        <div className="hero-couple-showcase">
          <div className="couple-mini-cameo" aria-hidden="true">
            <img
              src="./images/couple-3d.png"
              alt=""
              className="couple-mini-cameo-img"
            />
          </div>

          <span className="couple-role-pill">{t.groomRole || 'Groom'}</span>
          <h2
            className={`hero-couple-name ${
              language === 'te' ? 'hero-couple-name--te' : ''
            }`}
          >
            {firstPerson}
          </h2>

          <span className="hero-couple-conjunction">
            <IslamicStarIcon size={11} />
            <span>{t.withConjunction || 'with'}</span>
            <IslamicStarIcon size={11} />
          </span>

          <span className="couple-role-pill">{t.brideRole || 'Bride'}</span>
          <h2
            className={`hero-couple-name ${
              language === 'te' ? 'hero-couple-name--te' : ''
            }`}
          >
            {secondPerson}
          </h2>
        </div>

        {/* Islamic Blessing Dua */}
        <div className="page-dua-container">
          <FloralGoldDivider />
          <p className="arabic-blessing-compact" lang="ar" dir="rtl">
            {dua.blessingDuaArabic}
          </p>
          <p className="dua-translation-compact">
            {t.blessingDuaTranslation || dua.blessingDuaTranslation}
          </p>
        </div>
      </div>

      <div className="page-footer-row">
        <button
          type="button"
          className="page-corner-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (isMobile) handleGoToMobilePage(0);
            else handleCloseDesktop();
          }}
          title={t.pageBackToCover || 'Back to Book Cover'}
        >
          {t.pageBackToCover || '← Cover'}
        </button>

        {isMobile ? (
          <button
            type="button"
            className="page-corner-btn page-corner-btn--highlight"
            onClick={(e) => {
              e.stopPropagation();
              handleGoToMobilePage(2);
            }}
            title={t.pageToVenue || 'Turn to Venue & Date page'}
          >
            {t.pageToVenue || 'Venue & Date →'}
          </button>
        ) : (
          <span className="page-num-label">
            {t.footerBlessingsLabel || 'Blessings & Union'}
          </span>
        )}
      </div>
    </>
  );

  // 3. INSIDE PAGE 2 (Save The Date, Creative Celestial Countdown & Venue)
  const renderRightPageContent = () => {
    const daysProgress = Math.min(
      100,
      Math.max(8, ((365 - (timeLeft.days % 365)) / 365) * 100)
    );
    const hoursProgress = (timeLeft.hours / 24) * 100;
    const minsProgress = (timeLeft.minutes / 60) * 100;
    const secsProgress = (timeLeft.seconds / 60) * 100;

    return (
      <>
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />
        <MosqueArchCrown className="page-arch" />

        <div className="page-body">
          <span className="section-eyebrow">
            {t.saveTheDateEyebrow || '✦ Save The Date ✦'}
          </span>

          {/* Royal 3-Column Date Showcase */}
          <div className="royal-date-showcase">
            <span className="date-col-side">
              {t.dayOfWeek || date.dayOfWeek}
            </span>
            <div className="date-col-center">
              <span className="date-month-label">
                {t.monthName || date.monthName}
              </span>
              <span className="date-day-giant">{date.dayOfMonth}</span>
            </div>
            <span className="date-col-side">{date.year}</span>
          </div>

          {/* Creative Celestial Pearl & Rose-Gold Medallion Countdown */}
          {timeLeft.isComplete ? (
            <div className="countdown-complete-banner">
              <h3>
                {t.countdownCompleteText ||
                  '✨ Alhamdulillah! Today is Our Engagement Day ✨'}
              </h3>
            </div>
          ) : (
            <div className="creative-countdown-stage" role="timer">
              <div className="countdown-poetic-pill">
                <span className="hourglass-sparkle">⏳</span>
                <span>
                  {t.countdownPoeticText || 'Counting Every Blessed Moment'}
                </span>
                <span className="hourglass-sparkle">✨</span>
              </div>

              <div className="celestial-dials-row">
                <CelestialCountdownDial
                  value={padNumber(timeLeft.days)}
                  label={t.dialDays || 'Days'}
                  gradId="days"
                  progressPercent={daysProgress}
                  isSeconds={false}
                />
                <span className="dial-star-connector" aria-hidden="true">
                  ✦
                </span>
                <CelestialCountdownDial
                  value={padNumber(timeLeft.hours)}
                  label={t.dialHours || 'Hours'}
                  gradId="hours"
                  progressPercent={hoursProgress}
                  isSeconds={false}
                />
                <span className="dial-star-connector" aria-hidden="true">
                  ✦
                </span>
                <CelestialCountdownDial
                  value={padNumber(timeLeft.minutes)}
                  label={t.dialMins || 'Mins'}
                  gradId="mins"
                  progressPercent={minsProgress}
                  isSeconds={false}
                />
                <span className="dial-star-connector" aria-hidden="true">
                  ✦
                </span>
                <CelestialCountdownDial
                  value={padNumber(timeLeft.seconds)}
                  label={t.dialSecs || 'Secs'}
                  gradId="secs"
                  progressPercent={secsProgress}
                  isSeconds={true}
                />
              </div>
            </div>
          )}

          <FloralGoldDivider />

          {/* Ceremony Venue & Direct Actions */}
          <div className="book-venue-block">
            <div className="venue-icon-badge" aria-hidden="true">
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>

            <span className="section-eyebrow">
              {t.venueEyebrow || 'Ceremony Venue'}
            </span>
            <h3 className="book-venue-title">{t.venueName || venue.name}</h3>
            <p className="venue-clean-address">
              {t.venueAddress ||
                `${venue.addressLine1}${
                  venue.cityStateZip ? `, ${venue.cityStateZip}` : ''
                }`}
            </p>

            <div className="right-page-actions">
              <a
                href={venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-primary btn-compact"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t.openMapsBtn || 'Open Google Maps Location'}</span>
              </a>

              <button
                type="button"
                onClick={handleShareOnWhatsApp}
                className="btn-whatsapp-compact"
                title={t.shareWhatsAppBtn || 'Share invitation on WhatsApp'}
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
                <span>{t.shareWhatsAppBtn || 'Share on WhatsApp'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="page-footer-row">
          {isMobile ? (
            <>
              <button
                type="button"
                className="page-corner-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGoToMobilePage(1);
                }}
                title={t.pageBackToBlessings || 'Back to Blessings page'}
              >
                {t.pageBackToBlessings || '← Blessings'}
              </button>
              <button
                type="button"
                className="page-corner-btn page-corner-btn--highlight"
                onClick={(e) => {
                  e.stopPropagation();
                  handleGoToMobilePage(0);
                }}
                title={t.pageReturnCover || 'Return to Front Cover'}
              >
                {t.pageReturnCover || 'Cover ↺'}
              </button>
            </>
          ) : (
            <>
              <span className="page-num-label">
                {t.footerVenueLabel || 'Venue & Date'}
              </span>
              <button
                type="button"
                className="page-corner-btn page-corner-btn--highlight"
                onClick={handlePrev}
                title={t.pageBackToCoverFull || 'Move backward to cover'}
              >
                {t.pageBackToCoverFull || '← Back to Cover'}
              </button>
            </>
          )}
        </div>
      </>
    );
  };

  // --------------------------------------------------------------------------
  // RENDER COMPONENT
  // --------------------------------------------------------------------------
  const isBackDisabled = isMobile ? mobilePage === 0 : !isOpen;
  const isNextDisabled = isMobile ? mobilePage === 2 : isOpen;

  return (
    <div
      className={`twoside-book-viewport ${
        language === 'te' ? 'lang-te' : 'lang-en'
      }`}
      lang={language}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar: Page Pills + Language Switcher + WhatsApp Share */}
      <header className="twoside-top-bar" aria-label="Invitation Navigation">
        {isMobile ? (
          <div className="top-nav-pills mobile-nav-pills">
            <button
              type="button"
              className={`spread-pill ${
                mobilePage === 0 ? 'spread-pill--active' : ''
              }`}
              onClick={() => handleGoToMobilePage(0)}
            >
              📖 {t.navCover || 'Cover'}
            </button>
            <button
              type="button"
              className={`spread-pill ${
                mobilePage === 1 ? 'spread-pill--active' : ''
              }`}
              onClick={() => handleGoToMobilePage(1)}
            >
              ✨ {t.navBlessings || 'Blessings'}
            </button>
            <button
              type="button"
              className={`spread-pill ${
                mobilePage === 2 ? 'spread-pill--active' : ''
              }`}
              onClick={() => handleGoToMobilePage(2)}
            >
              📍 {t.navVenue || 'Venue'}
            </button>
          </div>
        ) : (
          <div className="top-nav-pills">
            <button
              type="button"
              className={`spread-pill ${!isOpen ? 'spread-pill--active' : ''}`}
              onClick={handleCloseDesktop}
            >
              {t.navCover || 'Cover'}
            </button>
            <button
              type="button"
              className={`spread-pill ${isOpen ? 'spread-pill--active' : ''}`}
              onClick={handleOpenDesktop}
            >
              {t.navInsideSpread || 'Inside Spread 📖'}
            </button>
          </div>
        )}

        <div className="top-bar-right-controls">
          {/* Global Language Toggle Pill (English | తెలుగు) */}
          <div
            className="lang-switcher-pill"
            role="group"
            aria-label="Select Language"
          >
            <button
              type="button"
              className={`lang-switch-btn ${
                language === 'en' ? 'lang-switch-btn--active' : ''
              }`}
              onClick={(e) => handleSelectLanguage('en', e)}
              title="Read in English"
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-switch-btn lang-switch-btn--te ${
                language === 'te' ? 'lang-switch-btn--active' : ''
              }`}
              onClick={(e) => handleSelectLanguage('te', e)}
              title="తెలుగులో చదవండి (Read in Telugu)"
              lang="te"
            >
              తెలుగు
            </button>
          </div>

          <button
            type="button"
            className="whatsapp-top-btn"
            onClick={handleShareOnWhatsApp}
            title={t.shareWhatsAppBtn || 'Share invitation on WhatsApp'}
          >
            <svg
              width="14"
              height="14"
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
            <span className="whatsapp-top-label">
              {t.navShareShort || 'Share'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Book Stage */}
      <div className="twoside-scene">
        {/* Desktop Left Side Arrow */}
        {!isMobile && (
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
            <span className="side-arrow-label">{t.navBack || 'Back'}</span>
          </button>
        )}

        {isMobile ? (
          /* ================================================================
             MOBILE VIEW: 3D Page-Turning Hardcover Book
             DOM order: Sheet 2 (bottom) -> Sheet 1 (middle) -> Sheet 0 Cover (TOP)
             Guaranteed to ALWAYS start on Sheet 0 (Front Cover)!
             ================================================================ */
          <div className="mobile-3d-book">
            {/* Bound Velvet & Gold Left Spine */}
            <div className="mobile-book-spine" aria-hidden="true">
              <span className="spine-gold-rib" />
              <span className="spine-gold-rib" />
              <span className="spine-gold-rib" />
              <span className="spine-gold-rib" />
              <span className="spine-gold-rib" />
            </div>

            {/* Stacked Gilded Paper Edges on Right & Bottom */}
            <div className="mobile-book-edges" aria-hidden="true" />

            {/* SHEET 2 (Base in DOM): INSIDE PAGE 2 (Save the Date, Countdown & Venue) */}
            <div
              className={`mobile-3d-sheet mobile-sheet--page2 ${
                mobilePage === 2 ? 'mobile-sheet--active' : 'mobile-sheet--under'
              }`}
              aria-hidden={mobilePage !== 2}
            >
              <div className="leaf-face page-right mobile-sheet-face">
                {renderRightPageContent()}
              </div>
            </div>

            {/* SHEET 1 (Middle in DOM): INSIDE PAGE 1 (Blessings & Couple) */}
            <div
              className={`mobile-3d-sheet mobile-sheet--page1 ${
                mobilePage > 1
                  ? 'mobile-sheet--turned'
                  : mobilePage === 1
                  ? 'mobile-sheet--active'
                  : 'mobile-sheet--under'
              }`}
              aria-hidden={mobilePage !== 1}
            >
              <div className="leaf-face page-right mobile-sheet-face">
                {renderLeftPageContent()}
              </div>
            </div>

            {/* SHEET 0 (Top in DOM): FRONT COVER (Face of the Book) */}
            <div
              className={`mobile-3d-sheet mobile-sheet--cover ${
                mobilePage > 0 ? 'mobile-sheet--turned' : 'mobile-sheet--active'
              }`}
              onClick={
                mobilePage === 0 ? () => handleGoToMobilePage(1) : undefined
              }
              role={mobilePage === 0 ? 'button' : undefined}
              tabIndex={mobilePage === 0 ? 0 : -1}
              aria-hidden={mobilePage !== 0}
              aria-label={t.openBookCta || 'Open Invitation Book'}
            >
              <div className="leaf-face cover-face mobile-sheet-face">
                {renderCoverContent()}
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================
             DESKTOP VIEW: Centered closed cover unfolding into 2-sided spread
             DOM order: Static Right Page first (hidden when closed),
             Hinged Cover Leaf last (on top when closed)!
             ================================================================ */
          <div
            className={`twoside-book ${
              !isOpen ? 'twoside-book--closed' : 'twoside-book--open'
            }`}
          >
            <div className="twoside-center-spine" aria-hidden="true" />
            <div className="book-page-depth-layers" aria-hidden="true" />

            {/* BASE: RIGHT PAGE (First in DOM, hidden when book is closed so Cover is 100% on top) */}
            <div
              className={`book-static-right page-right ${
                !isOpen ? 'book-static-right--hidden' : ''
              }`}
              aria-hidden={!isOpen}
            >
              {renderRightPageContent()}
            </div>

            {/* HINGED COVER LEAF (Last in DOM so Front Cover is guaranteed on top when closed) */}
            <div
              className={`book-leaf cover-leaf ${
                isOpen ? 'book-leaf--turned' : ''
              }`}
            >
              {/* FRONT: 3D ANIMATED COUPLE COVER */}
              <div
                className="leaf-face leaf-front cover-face"
                onClick={!isOpen ? handleOpenDesktop : undefined}
                role={!isOpen ? 'button' : undefined}
                tabIndex={!isOpen ? 0 : -1}
                aria-label={
                  !isOpen ? t.openBookCta || 'Open Invitation Book' : undefined
                }
              >
                {renderCoverContent()}
              </div>

              {/* BACK: LEFT PAGE */}
              <div className="leaf-face leaf-back page-left">
                {renderLeftPageContent()}
              </div>
            </div>
          </div>
        )}

        {/* Desktop Right Side Arrow */}
        {!isMobile && (
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
            <span className="side-arrow-label">{t.navNext || 'Next'}</span>
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
        )}
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
          title={t.navPrev || 'Previous Page'}
          aria-label={t.navPrev || 'Previous Page'}
        >
          <svg
            width="14"
            height="14"
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
          <span>{t.navPrev || 'Prev'}</span>
        </button>

        {/* Page Indicator Dots */}
        <div className="book-spread-nav" role="tablist">
          {isMobile ? (
            <>
              {[
                { idx: 0, label: t.navCover || 'Cover' },
                { idx: 1, label: t.navBlessings || 'Blessings' },
                { idx: 2, label: t.navVenue || 'Venue' },
              ].map((item, i) => (
                <React.Fragment key={item.idx}>
                  {i > 0 && <span className="spread-separator">•</span>}
                  <button
                    type="button"
                    className={`spread-dot-pill ${
                      mobilePage === item.idx ? 'spread-dot-pill--active' : ''
                    }`}
                    onClick={() => handleGoToMobilePage(item.idx)}
                    role="tab"
                    aria-selected={mobilePage === item.idx}
                  >
                    <span className="dot-indicator" />
                    <span className="dot-label">{item.label}</span>
                  </button>
                </React.Fragment>
              ))}
            </>
          ) : (
            <>
              <button
                type="button"
                className={`spread-dot-pill ${
                  !isOpen ? 'spread-dot-pill--active' : ''
                }`}
                onClick={handleCloseDesktop}
                role="tab"
                aria-selected={!isOpen}
              >
                <span className="dot-indicator" />
                <span className="dot-label">{t.navCover || 'Cover'}</span>
              </button>
              <span className="spread-separator">•</span>
              <button
                type="button"
                className={`spread-dot-pill ${
                  isOpen ? 'spread-dot-pill--active' : ''
                }`}
                onClick={handleOpenDesktop}
                role="tab"
                aria-selected={isOpen}
              >
                <span className="dot-indicator" />
                <span className="dot-label">
                  {t.navInsideShort || 'Inside'}
                </span>
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
          title={t.navNext || 'Next Page'}
          aria-label={t.navNext || 'Next Page'}
        >
          <span>{t.navNext || 'Next'}</span>
          <svg
            width="14"
            height="14"
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
      </footer>
    </div>
  );
}
