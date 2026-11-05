import React from 'react';
import {
  CrescentMoonIcon,
  FloralGoldDivider,
  CornerOrnament,
  MosqueArchCrown,
  IslamicStarIcon,
} from './IslamicOrnaments';

/**
 * HeroSection Component
 * Combines the Islamic Greeting, Invitation Message, Prominent Couple Names
 * inside a royal Mosque Arch frame, and the Engagement Date highlight.
 */
export default function HeroSection({ config }) {
  const firstPerson =
    config.couple.order === 'bride-first'
      ? config.couple.brideFirstName
      : config.couple.groomFirstName;
  const secondPerson =
    config.couple.order === 'bride-first'
      ? config.couple.groomFirstName
      : config.couple.brideFirstName;

  return (
    <section id="greeting" className="section-wrapper hero-section">
      <div className="container">
        <div className="luxury-arch-card">
          <CornerOrnament position="top-left" />
          <CornerOrnament position="top-right" />
          <CornerOrnament position="bottom-left" />
          <CornerOrnament position="bottom-right" />

          <MosqueArchCrown />

          <div className="hero-inner">
            <div className="hero-crescent">
              <CrescentMoonIcon size={58} />
            </div>

            {/* Bismillah */}
            <p className="arabic-bismillah" lang="ar" dir="rtl">
              {config.welcome.bismillahArabic}
            </p>
            <p className="bismillah-translation">
              {config.welcome.bismillahTranslation}
            </p>

            <FloralGoldDivider />

            {/* Islamic Greeting (Salam) */}
            <p className="arabic-salam" lang="ar" dir="rtl">
              {config.greeting.salamArabic}
            </p>
            <p className="salam-transliteration">
              {config.greeting.salamTransliteration}
            </p>

            {/* Invitation Message */}
            <h2 className="invitation-heading">
              {config.greeting.invitationTitle}
            </h2>
            <p className="invitation-lead">
              {config.greeting.invitationLead}
            </p>
            <p className="invitation-host-badge">
              {config.greeting.familyHostLine}
            </p>

            {/* Prominent Couple Names */}
            <div className="hero-couple-showcase" aria-label="Couple Names">
              <span className="hero-couple-name">{firstPerson}</span>
              <span className="hero-couple-conjunction">
                <IslamicStarIcon size={20} />
                <span>&amp;</span>
                <IslamicStarIcon size={20} />
              </span>
              <span className="hero-couple-name">{secondPerson}</span>
            </div>

            {/* Engagement Date Seal */}
            <div className="hero-date-banner">
              <div className="date-banner-col">
                <span className="date-col-label">{config.date.dayOfWeek}</span>
              </div>
              <div className="date-banner-center">
                <span className="date-month">{config.date.monthName}</span>
                <span className="date-day-number">{config.date.dayOfMonth}</span>
                <span className="date-year">{config.date.year}</span>
              </div>
              <div className="date-banner-col">
                <span className="date-col-label">{config.date.startTimeDisplay}</span>
              </div>
            </div>

            {config.date.hijriDate && (
              <p className="hijri-date-tag">
                <IslamicStarIcon size={14} />
                <span>{config.date.hijriDate}</span>
                <IslamicStarIcon size={14} />
              </p>
            )}

            {/* Quick CTA buttons */}
            <div className="hero-cta-group">
              <a href="#venue" className="btn-gold-primary">
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
                <span>Venue &amp; Directions</span>
              </a>
              <a href="#share" className="btn-gold-outline">
                <span>RSVP &amp; Share</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
