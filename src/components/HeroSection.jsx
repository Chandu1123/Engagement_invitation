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
 * Clean, focused presentation of Bismillah, Salam, Couple Names
 * (Sarithala Chandu & Vuluvalapalli Kulsum), and the Engagement Date.
 */
export default function HeroSection({ config }) {
  const firstPerson =
    config.couple.order === 'bride-first'
      ? config.couple.brideFullName
      : config.couple.groomFullName;
  const secondPerson =
    config.couple.order === 'bride-first'
      ? config.couple.groomFullName
      : config.couple.brideFullName;

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
              <CrescentMoonIcon size={54} />
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
            <p className="invitation-lead">
              {config.greeting.invitationLead}
            </p>

            {/* Prominent Couple Names */}
            <div className="hero-couple-showcase" aria-label="Couple Names">
              <span className="couple-role-pill">Groom</span>
              <span className="hero-couple-name">{firstPerson}</span>
              <span className="hero-couple-conjunction">
                <IslamicStarIcon size={18} />
                <span>&amp;</span>
                <IslamicStarIcon size={18} />
              </span>
              <span className="couple-role-pill">Bride</span>
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
          </div>
        </div>
      </div>
    </section>
  );
}
