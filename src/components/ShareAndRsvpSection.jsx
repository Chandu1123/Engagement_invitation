import React from 'react';
import {
  FloralGoldDivider,
  CornerOrnament,
  CrescentMoonIcon,
} from './IslamicOrnaments';

/**
 * ShareAndRsvpSection Component
 * Combines the concise Islamic Blessing Dua and the WhatsApp Share button
 * in one clean closing section.
 */
export default function ShareAndRsvpSection({ config }) {
  const { sharing, dua, couple, date } = config;

  const handleShareOnWhatsApp = () => {
    const currentUrl = window.location.href;
    const fullShareMessage = `${sharing.whatsappShareText}\n${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullShareMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="share" className="section-wrapper share-section">
      <div className="container">
        <div className="dua-showcase-card">
          <CornerOrnament position="top-left" />
          <CornerOrnament position="top-right" />
          <CornerOrnament position="bottom-left" />
          <CornerOrnament position="bottom-right" />

          <div className="dua-inner">
            <div className="dua-header-icon">
              <CrescentMoonIcon size={42} />
            </div>

            <span className="section-eyebrow">Dua &amp; Blessings</span>
            <p className="arabic-blessing" lang="ar" dir="rtl">
              {dua.blessingDuaArabic}
            </p>
            <p className="dua-translation">{dua.blessingDuaTranslation}</p>

            <FloralGoldDivider />

            <p className="dua-closing-note">{dua.closingNote}</p>

            <div className="venue-btn-wrap">
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
            </div>
          </div>
        </div>
      </div>

      <footer className="invitation-footer">
        <div className="container">
          <p className="footer-names">
            {couple.groomFirstName} &amp; {couple.brideFirstName}
          </p>
          <p className="footer-date">
            {date.monthName} {date.dayOfMonth}, {date.year}
          </p>
        </div>
      </footer>
    </section>
  );
}
