import React, { useState, useEffect } from 'react';
import invitationConfig from './config';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import CountdownTimer from './components/CountdownTimer';
import VenueSection from './components/VenueSection';
import DuaSection from './components/DuaSection';
import ShareAndRsvpSection from './components/ShareAndRsvpSection';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

  // Dynamically keep the browser tab title synced with src/config.js
  useEffect(() => {
    const { groomFirstName, brideFirstName, order } = invitationConfig.couple;
    const first = order === 'bride-first' ? brideFirstName : groomFirstName;
    const second = order === 'bride-first' ? groomFirstName : brideFirstName;
    document.title = `Engagement Invitation | ${first} & ${second}`;
  }, []);

  // Lock background scrolling while the Welcome Gate is closed
  useEffect(() => {
    if (!isInvitationOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isInvitationOpened]);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="invitation-app">
      {/* Subtle fixed Islamic geometric pattern backdrop */}
      <div className="islamic-geometric-backdrop" aria-hidden="true" />

      {/* Section 1: Welcome Screen with Bismillah & entrance animation */}
      {!isInvitationOpened && (
        <WelcomeScreen
          config={invitationConfig}
          onOpenInvitation={handleOpenInvitation}
        />
      )}

      {/* Top Navigation */}
      <Navbar config={invitationConfig} />

      {/* Main Content */}
      <main
        className={`main-invitation-content ${
          isInvitationOpened ? 'main-invitation-content--revealed' : ''
        }`}
      >
        {/* Sections 2, 3 & 4: Islamic Greeting, Prominent Couple Names & Engagement Date */}
        <HeroSection config={invitationConfig} />

        {/* Detailed Couple & Family Showcase */}
        <CoupleSection config={invitationConfig} />

        {/* Section 5: Live Countdown Timer & Add to Calendar */}
        <CountdownTimer config={invitationConfig} />

        {/* Section 6: Engagement Venue, Timings, Google Maps & Schedule */}
        <VenueSection config={invitationConfig} />

        {/* Section 7: Islamic Dua & Blessing Section */}
        <DuaSection config={invitationConfig} />

        {/* Section 8: WhatsApp Invitation Sharing & Direct RSVP */}
        <ShareAndRsvpSection config={invitationConfig} />
      </main>

      {/* Section 9: Optional Background Music with Play/Pause Control */}
      <AudioPlayer
        config={invitationConfig}
        triggerAutoPlay={isInvitationOpened}
      />
    </div>
  );
}
