import React, { useState } from 'react';
import {
  CrescentMoonIcon,
  FloralGoldDivider,
  CornerOrnament,
  HangingLantern,
  MosqueArchCrown,
} from './IslamicOrnaments';

/**
 * WelcomeScreen Component
 * Displays a royal Islamic entrance screen with Bismillah calligraphy,
 * mosque arch silhouette, couple monogram, and an "Open Invitation" trigger.
 */
export default function WelcomeScreen({ config, onOpenInvitation }) {
  const [isOpening, setIsOpening] = useState(false);

  const firstPerson =
    config.couple.order === 'bride-first'
      ? config.couple.brideFirstName
      : config.couple.groomFirstName;
  const secondPerson =
    config.couple.order === 'bride-first'
      ? config.couple.groomFirstName
      : config.couple.brideFirstName;

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpenInvitation();
    }, 650);
  };

  return (
    <div
      className={`welcome-overlay ${isOpening ? 'welcome-overlay--opening' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Engagement Invitation Welcome Screen"
    >
      {/* Decorative hanging lanterns */}
      <div className="welcome-lanterns" aria-hidden="true">
        <HangingLantern className="lantern-left" />
        <HangingLantern className="lantern-right" />
      </div>

      <div className="welcome-card">
        <CornerOrnament position="top-left" />
        <CornerOrnament position="top-right" />
        <CornerOrnament position="bottom-left" />
        <CornerOrnament position="bottom-right" />

        <MosqueArchCrown className="welcome-arch-top" />

        <div className="welcome-card-inner">
          <div className="welcome-crescent-wrap">
            <CrescentMoonIcon size={54} />
          </div>

          {/* Bismillah Calligraphy */}
          <p className="arabic-bismillah" lang="ar" dir="rtl">
            {config.welcome.bismillahArabic}
          </p>
          <p className="bismillah-translation">
            {config.welcome.bismillahTranslation}
          </p>

          <FloralGoldDivider />

          <span className="welcome-badge">{config.welcome.badgeText}</span>

          {/* Couple Monogram & Names */}
          <div className="welcome-monogram-seal" aria-hidden="true">
            <span>{config.couple.monogram}</span>
          </div>

          <h1 className="welcome-couple-names">
            <span>{firstPerson}</span>
            <span className="welcome-ampersand">&amp;</span>
            <span>{secondPerson}</span>
          </h1>

          <p className="welcome-date-pill">
            {config.date.dayOfWeek}, {config.date.monthName}{' '}
            {config.date.dayOfMonth}, {config.date.year}
          </p>

          <p className="welcome-honor-note">{config.welcome.guestHonorLabel}</p>

          <button
            type="button"
            className="btn-gold-primary welcome-open-btn"
            onClick={handleOpen}
          >
            <span className="btn-gold-shine" aria-hidden="true" />
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span>{config.welcome.ctaButtonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
