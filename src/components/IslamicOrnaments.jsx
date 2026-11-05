import React from 'react';

/**
 * Crescent Moon & Star SVG Emblem
 */
export function CrescentMoonIcon({ className = '', size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="crescentGold" x1="12" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F9E8B2" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9E7B1C" />
        </linearGradient>
      </defs>
      {/* Outer decorative halo ring */}
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="url(#crescentGold)"
        strokeWidth="0.75"
        strokeDasharray="3 3"
        opacity="0.55"
      />
      {/* Crescent Moon */}
      <path
        d="M39.8 40.5C31.2 40.5 24.2 33.5 24.2 24.9C24.2 19.3 27.2 14.3 31.7 11.5C21.6 12.3 13.6 20.7 13.6 31C13.6 41.9 22.4 50.7 33.3 50.7C41.2 50.7 48 46 51.1 39.3C47.7 40.1 43.8 40.5 39.8 40.5Z"
        fill="url(#crescentGold)"
      />
      {/* 8-pointed star nestled in crescent */}
      <path
        d="M42 16L43.8 20.2L48 22L43.8 23.8L42 28L40.2 23.8L36 22L40.2 20.2L42 16Z"
        fill="#F9E8B2"
      />
      {/* Subtle small stars */}
      <circle cx="29" cy="19" r="1.2" fill="#F9E8B2" opacity="0.85" />
      <circle cx="48" cy="31" r="1.4" fill="#F9E8B2" opacity="0.75" />
    </svg>
  );
}

/**
 * Rub el Hizb (8-pointed Islamic Geometric Star)
 */
export function IslamicStarIcon({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="7"
        y="7"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <rect
        x="7"
        y="7"
        width="18"
        height="18"
        transform="rotate(45 16 16)"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}

/**
 * Delicate Floral & Geometric Gold Divider
 */
export function FloralGoldDivider({ className = '' }) {
  return (
    <div className={`floral-divider ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 360 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="floral-divider-svg"
      >
        <defs>
          <linearGradient id="divGold" x1="0" y1="18" x2="360" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
            <stop offset="25%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#F9E8B2" stopOpacity="1" />
            <stop offset="75%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Horizontal tapered lines */}
        <line x1="10" y1="18" x2="135" y2="18" stroke="url(#divGold)" strokeWidth="1" />
        <line x1="225" y1="18" x2="350" y2="18" stroke="url(#divGold)" strokeWidth="1" />

        {/* Left & Right floral arabesque curls */}
        <path
          d="M140 18C146 11 154 11 160 18C154 25 146 25 140 18Z"
          stroke="#D4AF37"
          strokeWidth="1.1"
          fill="rgba(212, 175, 55, 0.12)"
        />
        <path
          d="M200 18C206 11 214 11 220 18C214 25 206 25 200 18Z"
          stroke="#D4AF37"
          strokeWidth="1.1"
          fill="rgba(212, 175, 55, 0.12)"
        />
        <circle cx="128" cy="18" r="2" fill="#D4AF37" />
        <circle cx="232" cy="18" r="2" fill="#D4AF37" />

        {/* Center 8-pointed star & floral blossom */}
        <g transform="translate(180, 18)">
          <rect x="-7" y="-7" width="14" height="14" stroke="#F5E6B8" strokeWidth="1.2" />
          <rect
            x="-7"
            y="-7"
            width="14"
            height="14"
            transform="rotate(45)"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />
          <circle r="3" fill="#F5E6B8" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Corner Arabesque Gold Frame Ornament (placed at 4 corners of luxury cards)
 */
export function CornerOrnament({ position = 'top-left' }) {
  return (
    <svg
      className={`corner-ornament corner-${position}`}
       width="44"
      height="44"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 46V14C2 7.37258 7.37258 2 14 2H46"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 46V16C7 11.0294 11.0294 7 16 7H46"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.7"
      />
      {/* Corner floral motif */}
      <path
        d="M14 14C14 9.5 18 7 22 7C18 11 16 14 14 14Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <path
        d="M14 14C9.5 14 7 18 7 22C11 18 14 16 14 14Z"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <circle cx="13" cy="13" r="2.2" fill="currentColor" />
    </svg>
  );
}

/**
 * Elegant Mosque Arch / Mihrab Silhouette Header SVG
 */
export function MosqueArchCrown({ className = '' }) {
  return (
    <svg
      viewBox="0 0 500 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`mosque-arch-crown ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="archGold" x1="0" y1="0" x2="500" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#F5E6B8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* Outer pointed Islamic arch */}
      <path
        d="M15 118C15 74 95 52 175 38C215 31 238 18 250 4C262 18 285 31 325 38C405 52 485 74 485 118"
        stroke="url(#archGold)"
        strokeWidth="1.6"
      />
      {/* Inner scalloped arch line */}
      <path
        d="M32 118C32 82 105 62 182 48C218 41 238 29 250 15C262 29 282 41 318 48C395 62 468 82 468 118"
        stroke="url(#archGold)"
        strokeWidth="0.9"
        strokeDasharray="4 4"
      />
      {/* Finial spire at apex */}
      <circle cx="250" cy="4" r="2.5" fill="#F5E6B8" />
    </svg>
  );
}

/**
 * Hanging Islamic Fanoos / Lantern SVG
 */
export function HangingLantern({ className = '' }) {
  return (
    <svg
      viewBox="0 0 60 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`hanging-lantern ${className}`}
      aria-hidden="true"
    >
      {/* Chain */}
      <line
        x1="30"
        y1="0"
        x2="30"
        y2="52"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeDasharray="3 2"
      />
      {/* Ring */}
      <circle cx="30" cy="55" r="3.5" stroke="#D4AF37" strokeWidth="1.2" />
      {/* Dome */}
      <path
        d="M18 72C18 63 24 58 30 56C36 58 42 63 42 72H18Z"
        fill="rgba(212, 175, 55, 0.22)"
        stroke="#D4AF37"
        strokeWidth="1.2"
      />
      {/* Lantern body */}
      <path
        d="M15 72H45L40 118H20L15 72Z"
        fill="rgba(249, 232, 178, 0.1)"
        stroke="#D4AF37"
        strokeWidth="1.3"
      />
      {/* Inner warm glow */}
      <circle cx="30" cy="95" r="8" fill="#F9E8B2" opacity="0.45" />
      {/* Inner arch lattice */}
      <path
        d="M23 118V88C23 82 26 78 30 76C34 78 37 82 37 88V118"
        stroke="#D4AF37"
        strokeWidth="0.9"
        opacity="0.8"
      />
      {/* Base */}
      <path
        d="M20 118H40L34 128H26L20 118Z"
        fill="rgba(212, 175, 55, 0.3)"
        stroke="#D4AF37"
        strokeWidth="1.2"
      />
      <path d="M30 128V138" stroke="#D4AF37" strokeWidth="1.2" />
      <circle cx="30" cy="140" r="2" fill="#F9E8B2" />
    </svg>
  );
}
