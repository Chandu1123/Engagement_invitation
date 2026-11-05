import React from 'react';
import {
  FloralGoldDivider,
  CornerOrnament,
  IslamicStarIcon,
} from './IslamicOrnaments';

/**
 * VenueSection Component
 * Presents the Engagement Venue, Timings, Google Maps navigation button,
 * and the Ceremony Schedule / Timeline.
 */
export default function VenueSection({ config }) {
  const { venue, date, schedule } = config;

  return (
    <section id="venue" className="section-wrapper venue-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Location &amp; Program • مكان الحفل</span>
          <h2 className="section-title">Venue &amp; Timings</h2>
          <FloralGoldDivider />
        </div>

        <div className="venue-layout-grid">
          {/* Left Card: Venue & Google Maps */}
          <div className="venue-card">
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />

            <div className="venue-icon-badge" aria-hidden="true">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>

            <h3 className="venue-title">{venue.name}</h3>
            <p className="venue-hall">{venue.hallDetails}</p>

            <div className="venue-address-box">
              <p>{venue.addressLine1}</p>
              <p>{venue.cityStateZip}</p>
              {venue.landmark && (
                <p className="venue-landmark">
                  <IslamicStarIcon size={13} />
                  <span>{venue.landmark}</span>
                </p>
              )}
            </div>

            <div className="venue-meta-list">
              <div className="venue-meta-item">
                <span className="meta-label">Date</span>
                <span className="meta-value">
                  {date.dayOfWeek}, {date.monthName} {date.dayOfMonth}, {date.year}
                </span>
              </div>
              <div className="venue-meta-item">
                <span className="meta-label">Ceremony Time</span>
                <span className="meta-value">
                  {date.startTimeDisplay} – {date.endTimeDisplay}
                </span>
              </div>
              {venue.parkingNote && (
                <div className="venue-meta-item">
                  <span className="meta-label">Parking</span>
                  <span className="meta-value">{venue.parkingNote}</span>
                </div>
              )}
              {venue.dressCode && (
                <div className="venue-meta-item">
                  <span className="meta-label">Attire</span>
                  <span className="meta-value">{venue.dressCode}</span>
                </div>
              )}
            </div>

            <a
              href={venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-primary venue-map-btn"
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
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Right Card: Ceremony Schedule / Timeline */}
          <div className="venue-card schedule-card">
            <CornerOrnament position="top-left" />
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-left" />
            <CornerOrnament position="bottom-right" />

            <div className="venue-icon-badge" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>

            <h3 className="venue-title">Evening Itinerary</h3>
            <p className="venue-hall">Insha&apos;Allah, Program Highlights</p>

            <div className="timeline-list">
              {schedule.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker">
                    <IslamicStarIcon size={16} />
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-time">{item.time}</span>
                    <h4 className="timeline-event-title">{item.title}</h4>
                    <p className="timeline-event-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
