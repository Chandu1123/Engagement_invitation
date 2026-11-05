import React from 'react';
import {
  FloralGoldDivider,
  CornerOrnament,
} from './IslamicOrnaments';

/**
 * VenueSection Component
 * Clean, centered Venue & Location card with Google Maps directions.
 */
export default function VenueSection({ config }) {
  const { venue, date } = config;

  return (
    <section id="venue" className="section-wrapper venue-section">
      <div className="container">
        <div className="venue-single-card">
          <CornerOrnament position="top-left" />
          <CornerOrnament position="top-right" />
          <CornerOrnament position="bottom-left" />
          <CornerOrnament position="bottom-right" />

          <div className="venue-icon-badge venue-icon-centered" aria-hidden="true">
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

          <span className="section-eyebrow">Date &amp; Location</span>
          <h2 className="section-title">{venue.name}</h2>
          <FloralGoldDivider />

          <p className="venue-clean-details">
            <strong>
              {date.dayOfWeek}, {date.monthName} {date.dayOfMonth}, {date.year}
            </strong>{' '}
            • {date.startTimeDisplay}
          </p>

          <p className="venue-clean-address">
            {venue.addressLine1}
            {venue.cityStateZip ? ` — ${venue.cityStateZip}` : ''}
          </p>

          <div className="venue-btn-wrap">
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
              <span>View Location on Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
