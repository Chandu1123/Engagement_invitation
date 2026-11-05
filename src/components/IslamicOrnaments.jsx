import React from 'react';

/**
 * Crescent Moon & Star SVG Emblem in Rose Gold & Pearl
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
        <linearGradient id="roseGoldGrad" x1="12" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D69586" />
          <stop offset="50%" stopColor="#B56576" />
          <stop offset="100%" stopColor="#7A3244" />
        </linearGradient>
      </defs>
      {/* Outer pearl dotted halo */}
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="url(#roseGoldGrad)"
        strokeWidth="1"
        strokeDasharray="2 4"
        opacity="0.65"
      />
      {/* Crescent Moon */}
      <path
        d="M39.8 40.5C31.2 40.5 24.2 33.5 24.2 24.9C24.2 19.3 27.2 14.3 31.7 11.5C21.6 12.3 13.6 20.7 13.6 31C13.6 41.9 22.4 50.7 33.3 50.7C41.2 50.7 48 46 51.1 39.3C47.7 40.1 43.8 40.5 39.8 40.5Z"
        fill="url(#roseGoldGrad)"
      />
      {/* Star nestled in crescent */}
      <path
        d="M42 16L43.8 20.2L48 22L43.8 23.8L42 28L40.2 23.8L36 22L40.2 20.2L42 16Z"
        fill="#B56576"
      />
      {/* Tiny pearls */}
      <circle cx="29" cy="19" r="1.6" fill="#FFFDF9" stroke="#C88A7B" strokeWidth="0.6" />
      <circle cx="48" cy="31" r="1.8" fill="#FFFDF9" stroke="#C88A7B" strokeWidth="0.6" />
    </svg>
  );
}

/**
 * 8-pointed Islamic Star with Pearl Center
 */
export function IslamicStarIcon({ size = 22, className = '' }) {
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
      <circle cx="16" cy="16" r="3" fill="#FFF9FA" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Delicate Rose-Gold, Blush Blossom & Pearl Divider (matching the resin card line)
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
          <linearGradient id="roseLine" x1="0" y1="18" x2="360" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9E5263" stopOpacity="0" />
            <stop offset="20%" stopColor="#9E5263" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#6B2737" stopOpacity="1" />
            <stop offset="80%" stopColor="#9E5263" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#9E5263" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="15" y1="18" x2="142" y2="18" stroke="url(#roseLine)" strokeWidth="1.2" />
        <line x1="218" y1="18" x2="345" y2="18" stroke="url(#roseLine)" strokeWidth="1.2" />

        {/* Left & Right rose leaves */}
        <path
          d="M144 18C150 11 158 11 164 18C158 25 150 25 144 18Z"
          fill="#E899A8"
          fillOpacity="0.5"
          stroke="#9E5263"
          strokeWidth="1"
        />
        <path
          d="M196 18C202 11 210 11 216 18C210 25 202 25 196 18Z"
          fill="#E899A8"
          fillOpacity="0.5"
          stroke="#9E5263"
          strokeWidth="1"
        />

        {/* Pearl Beads */}
        <circle cx="132" cy="18" r="3" fill="#FFFDFB" stroke="#C27D8A" strokeWidth="0.9" />
        <circle cx="228" cy="18" r="3" fill="#FFFDFB" stroke="#C27D8A" strokeWidth="0.9" />

        {/* Center Blush Flower + Pearl */}
        <g transform="translate(180, 18)">
          <circle cx="0" cy="-6" r="4.5" fill="#F092A5" opacity="0.85" />
          <circle cx="6" cy="0" r="4.5" fill="#F4ACB7" opacity="0.85" />
          <circle cx="0" cy="6" r="4.5" fill="#F092A5" opacity="0.85" />
          <circle cx="-6" cy="0" r="4.5" fill="#F4ACB7" opacity="0.85" />
          <circle cx="0" cy="0" r="3.8" fill="#FFFDFB" stroke="#A65667" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Pressed Floral, Baby's Breath & Pearl Resin Corner Cluster
 * Inspired directly by the handmade blush floral & pearl resin border in the reference image.
 */
export function CornerOrnament({ position = 'top-left' }) {
  return (
    <svg
      className={`corner-ornament corner-${position}`}
      width="86"
      height="86"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pearlShade" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#F8EFEF" />
          <stop offset="100%" stopColor="#D8B8BE" />
        </radialGradient>
      </defs>

      {/* Organic Rose Gold Wavy Resin Edge Line */}
      <path
        d="M4 88C3 64 6 42 5 22C5 11 11 5 22 5C42 6 64 3 88 4"
        stroke="#C58376"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Dried Baby's Breath Sprigs */}
      <path d="M18 18L36 8M18 18L28 24M18 18L8 38" stroke="#B6766B" strokeWidth="1" opacity="0.7" />
      <path d="M14 42L26 52M42 14L52 26" stroke="#B6766B" strokeWidth="0.9" opacity="0.65" />

      {/* Coral & Blush Pressed Flowers */}
      <g transform="translate(20, 20)">
        <circle cx="0" cy="-7" r="6" fill="#E57A8E" opacity="0.85" />
        <circle cx="7" cy="0" r="6" fill="#F29CAE" opacity="0.85" />
        <circle cx="0" cy="7" r="6" fill="#E57A8E" opacity="0.85" />
        <circle cx="-7" cy="0" r="6" fill="#F29CAE" opacity="0.85" />
        <circle cx="5" cy="-5" r="5" fill="#F7BBC7" opacity="0.8" />
        <circle cx="-5" cy="5" r="5" fill="#F7BBC7" opacity="0.8" />
        <circle cx="0" cy="0" r="4" fill="url(#pearlShade)" />
      </g>

      {/* Secondary Blush Blossom */}
      <g transform="translate(44, 14)">
        <circle cx="0" cy="-4.5" r="4.2" fill="#EDA08E" opacity="0.82" />
        <circle cx="4.5" cy="0" r="4.2" fill="#F6C0B4" opacity="0.82" />
        <circle cx="0" cy="4.5" r="4.2" fill="#EDA08E" opacity="0.82" />
        <circle cx="-4.5" cy="0" r="4.2" fill="#F6C0B4" opacity="0.82" />
        <circle cx="0" cy="0" r="2.6" fill="#FFFDFB" />
      </g>

      {/* Third Blush Blossom along vertical edge */}
      <g transform="translate(14, 46)">
        <circle cx="0" cy="-4.5" r="4.2" fill="#EC8B9E" opacity="0.82" />
        <circle cx="4.5" cy="0" r="4.2" fill="#F7B7C4" opacity="0.82" />
        <circle cx="0" cy="4.5" r="4.2" fill="#EC8B9E" opacity="0.82" />
        <circle cx="-4.5" cy="0" r="4.2" fill="#F7B7C4" opacity="0.82" />
        <circle cx="0" cy="0" r="2.6" fill="#FFFDFB" />
      </g>

      {/* White Lustrous Pearl Beads & Baby's Breath Buds */}
      <circle cx="32" cy="28" r="5.2" fill="url(#pearlShade)" stroke="#D1A6AE" strokeWidth="0.6" />
      <circle cx="11" cy="30" r="4" fill="url(#pearlShade)" stroke="#D1A6AE" strokeWidth="0.6" />
      <circle cx="30" cy="10" r="3.8" fill="url(#pearlShade)" stroke="#D1A6AE" strokeWidth="0.6" />
      <circle cx="62" cy="11" r="4.4" fill="url(#pearlShade)" stroke="#D1A6AE" strokeWidth="0.6" />
      <circle cx="11" cy="64" r="4.4" fill="url(#pearlShade)" stroke="#D1A6AE" strokeWidth="0.6" />

      {/* Tiny white baby's breath dots */}
      <circle cx="52" cy="22" r="2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="57" cy="17" r="1.6" fill="#FFFFFF" opacity="0.9" />
      <circle cx="22" cy="54" r="2" fill="#FFFFFF" opacity="0.9" />
      <circle cx="17" cy="58" r="1.6" fill="#FFFFFF" opacity="0.9" />
      <circle cx="27" cy="42" r="2.2" fill="#F29CAE" opacity="0.8" />
    </svg>
  );
}

/**
 * Elegant Mosque Arch / Mihrab Silhouette in Rose Gold & Pearl
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
        <linearGradient id="archRoseGold" x1="0" y1="0" x2="500" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C58376" stopOpacity="0.18" />
          <stop offset="50%" stopColor="#9E475B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C58376" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <path
        d="M15 118C15 74 95 52 175 38C215 31 238 18 250 4C262 18 285 31 325 38C405 52 485 74 485 118"
        stroke="url(#archRoseGold)"
        strokeWidth="1.6"
      />
      <path
        d="M32 118C32 82 105 62 182 48C218 41 238 29 250 15C262 29 282 41 318 48C395 62 468 82 468 118"
        stroke="url(#archRoseGold)"
        strokeWidth="1"
        strokeDasharray="3 5"
      />
      <circle cx="250" cy="5" r="4" fill="#FFFDFB" stroke="#B56576" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * Hanging Rose-Gold & Pearl Islamic Lantern SVG
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
      <line
        x1="30"
        y1="0"
        x2="30"
        y2="52"
        stroke="#B56576"
        strokeWidth="1.3"
        strokeDasharray="3 3"
      />
      <circle cx="30" cy="55" r="3.5" fill="#FFFDFB" stroke="#B56576" strokeWidth="1.2" />
      <path
        d="M18 72C18 63 24 58 30 56C36 58 42 63 42 72H18Z"
        fill="rgba(229, 122, 142, 0.25)"
        stroke="#9E475B"
        strokeWidth="1.2"
      />
      <path
        d="M15 72H45L40 118H20L15 72Z"
        fill="rgba(255, 245, 247, 0.55)"
        stroke="#9E475B"
        strokeWidth="1.3"
      />
      <circle cx="30" cy="95" r="8" fill="#F4A2B2" opacity="0.45" />
      <path
        d="M23 118V88C23 82 26 78 30 76C34 78 37 82 37 88V118"
        stroke="#9E475B"
        strokeWidth="0.9"
        opacity="0.8"
      />
      <path
        d="M20 118H40L34 128H26L20 118Z"
        fill="rgba(229, 122, 142, 0.32)"
        stroke="#9E475B"
        strokeWidth="1.2"
      />
      <path d="M30 128V138" stroke="#9E475B" strokeWidth="1.2" />
      <circle cx="30" cy="141" r="3.2" fill="#FFFDFB" stroke="#B56576" strokeWidth="1" />
    </svg>
  );
}
