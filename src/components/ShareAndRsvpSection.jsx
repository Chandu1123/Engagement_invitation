import React, { useState } from 'react';
import {
  FloralGoldDivider,
  CornerOrnament,
  CrescentMoonIcon,
} from './IslamicOrnaments';

/**
 * ShareAndRsvpSection Component
 * Enables one-click WhatsApp invitation sharing with family & friends,
 * copying the invitation link, and direct WhatsApp RSVP to the host.
 */
export default function ShareAndRsvpSection({ config }) {
  const { sharing, couple, date } = config;
  const [guestName, setGuestName] = useState('');
  const [guestCount, setGuestCount] = useState('2');
  const [copied, setCopied] = useState(false);

  // Share the invitation with family/friends via WhatsApp
  const handleShareOnWhatsApp = () => {
    const currentUrl = window.location.href;
    const fullShareMessage = `${sharing.whatsappShareText}\n${currentUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(fullShareMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Copy invitation URL to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    } catch {
      // Fallback if clipboard API is restricted
      const input = document.createElement('input');
      input.value = window.location.href;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }
  };

  // Send direct RSVP confirmation via WhatsApp to the host
  const handleSendRsvp = (e) => {
    e.preventDefault();
    const trimmedName = guestName.trim();
    const customMsg = trimmedName
      ? `Assalamu Alaikum! Insha'Allah, I (${trimmedName}) am delighted to confirm our attendance (${guestCount} ${
          Number(guestCount) === 1 ? 'guest' : 'guests'
        }) for the Engagement Ceremony of ${couple.groomFirstName} & ${
          couple.brideFirstName
        } on ${date.monthName} ${date.dayOfMonth}, ${date.year}.`
      : sharing.rsvpDefaultMessage;

    const cleanPhone = (sharing.rsvpPhoneNumber || '').replace(/[^0-9]/g, '');
    const rsvpUrl = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMsg)}`
      : `https://wa.me/?text=${encodeURIComponent(customMsg)}`;

    window.open(rsvpUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="share" className="section-wrapper share-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Join Our Celebration • مشاركة الدعوة</span>
          <h2 className="section-title">RSVP &amp; Share Invitation</h2>
          <FloralGoldDivider />
        </div>

        <div className="share-grid">
          {/* Card 1: Share Digital Invitation on WhatsApp */}
          <div className="share-card">
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />

            <div className="share-icon-circle" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>

            <h3 className="share-card-title">Share Invitation</h3>
            <p className="share-card-desc">
              Easily forward this digital engagement invitation to relatives,
              friends, and family groups on WhatsApp.
            </p>

            <div className="share-preview-box">
              <p className="share-preview-label">WhatsApp Message Preview:</p>
              <p className="share-preview-text">{sharing.whatsappShareText}</p>
            </div>

            <div className="share-btn-stack">
              <button
                type="button"
                onClick={handleShareOnWhatsApp}
                className="btn-gold-primary btn-full"
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
                onClick={handleCopyLink}
                className="btn-gold-outline btn-full"
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Invitation Link'}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Direct WhatsApp RSVP */}
          <div className="share-card">
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />

            <div className="share-icon-circle" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>

            <h3 className="share-card-title">Confirm Attendance (RSVP)</h3>
            <p className="share-card-desc">
              Let our family know you will be joining us Insha&apos;Allah by
              sending a quick confirmation on WhatsApp.
            </p>

            <form onSubmit={handleSendRsvp} className="rsvp-form">
              <div className="form-group">
                <label htmlFor="guestNameInput" className="form-label">
                  Your Name / Family Name (Optional)
                </label>
                <input
                  id="guestNameInput"
                  type="text"
                  className="form-input"
                  placeholder="e.g., Mr. & Mrs. Ahmed Khan"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="guestCountSelect" className="form-label">
                  Number of Guests Attending
                </label>
                <select
                  id="guestCountSelect"
                  className="form-select"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5+ Guests (Family)</option>
                </select>
              </div>

              <button type="submit" className="btn-gold-primary btn-full">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                <span>Send RSVP via WhatsApp</span>
              </button>
            </form>

            {sharing.contactPersonName && (
              <p className="host-contact-line">
                Host Contact: <strong>{sharing.contactPersonName}</strong> (
                <a href={`tel:${sharing.rsvpPhoneNumber}`} className="gold-link">
                  {sharing.contactPhoneDisplay}
                </a>
                )
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Royal Footer */}
      <footer className="invitation-footer">
        <div className="container">
          <CrescentMoonIcon size={36} />
          <p className="footer-monogram">{couple.monogram}</p>
          <p className="footer-names">
            {couple.groomFirstName} &amp; {couple.brideFirstName}
          </p>
          <p className="footer-date">
            {date.monthName} {date.dayOfMonth}, {date.year} • {config.venue.name}
          </p>
          <FloralGoldDivider />
          <p className="footer-blessing" lang="ar" dir="rtl">
            ما شاء الله لا قوة إلا بالله
          </p>
          <p className="footer-subtext">
            Masha&apos;Allah La Quwwata Illa Billah • We await the honor of your presence
          </p>
        </div>
      </footer>
    </section>
  );
}
