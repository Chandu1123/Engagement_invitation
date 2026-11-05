import React, { useState, useEffect } from 'react';
import { CrescentMoonIcon } from './IslamicOrnaments';

/**
 * Navbar Component
 * Provides a responsive top header and mobile bottom/drawer navigation
 * so guests can effortlessly jump to any section on mobile, tablet, or desktop.
 */
export default function Navbar({ config }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Invitation', href: '#greeting' },
    { label: 'The Couple', href: '#couple' },
    { label: 'Date & Countdown', href: '#countdown' },
    { label: 'Venue & Schedule', href: '#venue' },
    { label: 'Blessings', href: '#dua' },
    { label: 'Share & RSVP', href: '#share' },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`site-navbar ${scrolled ? 'site-navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#greeting" className="navbar-brand" aria-label="Back to top">
          <CrescentMoonIcon size={28} />
          <span className="navbar-monogram">{config.couple.monogram}</span>
          <span className="navbar-date-tag">
            {config.date.monthName.slice(0, 3)} {config.date.dayOfMonth}, {config.date.year}
          </span>
        </a>

        {/* Desktop navigation links */}
        <nav className="navbar-links-desktop" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="navbar-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          className="navbar-mobile-toggle"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile collapsible navigation drawer */}
      {mobileMenuOpen && (
        <nav className="navbar-mobile-drawer" aria-label="Mobile Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="navbar-mobile-link"
              onClick={handleNavClick}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
