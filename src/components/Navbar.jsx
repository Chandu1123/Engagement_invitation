import React, { useState, useEffect } from 'react';
import { CrescentMoonIcon } from './IslamicOrnaments';

/**
 * Navbar Component
 * Minimal, clean navigation for Invitation, Date, Location, and Share.
 */
export default function Navbar({ config }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Invitation', href: '#greeting' },
    { label: 'Countdown', href: '#countdown' },
    { label: 'Location', href: '#venue' },
    { label: 'Share', href: '#share' },
  ];

  return (
    <header className={`site-navbar ${scrolled ? 'site-navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#greeting" className="navbar-brand" aria-label="Back to top">
          <CrescentMoonIcon size={26} />
          <span className="navbar-monogram">{config.couple.monogram}</span>
          <span className="navbar-date-tag">
            {config.date.monthName.slice(0, 3)} {config.date.dayOfMonth}
          </span>
        </a>

        <nav className="navbar-links-simple" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="navbar-link">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
