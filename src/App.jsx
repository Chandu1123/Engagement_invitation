import React, { useState, useEffect } from 'react';
import invitationConfig from './config';
import WelcomeScreen from './components/WelcomeScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CountdownTimer from './components/CountdownTimer';
import VenueSection from './components/VenueSection';
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

      {/* Welcome Screen with Bismillah & entrance animation */}
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
        {/* Greeting, Prominent Couple Names & Engagement Date */}
        <HeroSection config={invitationConfig} />

        {/* Live Countdown Timer */}
        <CountdownTimer config={invitationConfig} />

        {/* Engagement Venue & Google Maps Link */}
        <VenueSection config={invitationConfig} />

        {/* Blessing Dua & WhatsApp Share */}
        <ShareAndRsvpSection config={invitationConfig} />
      </main>

      {/* Optional Background Music with Play/Pause Control */}
      <AudioPlayer
        config={invitationConfig}
        triggerAutoPlay={isInvitationOpened}
      />
    </div>
  );
}
