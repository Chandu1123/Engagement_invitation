import React, { useState, useEffect } from 'react';
import invitationConfig from './config';
import InvitationBook from './components/InvitationBook';
import AudioPlayer from './components/AudioPlayer';
import { HangingLantern } from './components/IslamicOrnaments';

export default function App() {
  const [hasOpenedBook, setHasOpenedBook] = useState(false);

  // Dynamically keep the browser tab title synced with src/config.js
  useEffect(() => {
    const { groomFirstName, brideFirstName, order } = invitationConfig.couple;
    const first = order === 'bride-first' ? brideFirstName : groomFirstName;
    const second = order === 'bride-first' ? groomFirstName : brideFirstName;
    document.title = `Engagement Invitation | ${first} & ${second}`;
  }, []);

  return (
    <div className="invitation-app book-mode-app">
      {/* Subtle fixed floral & geometric lace backdrop */}
      <div className="islamic-geometric-backdrop" aria-hidden="true" />

      {/* Decorative hanging lanterns */}
      <div className="welcome-lanterns" aria-hidden="true">
        <HangingLantern className="lantern-left" />
        <HangingLantern className="lantern-right" />
      </div>

      {/* Interactive 3D Flip-Book Invitation */}
      <main className="book-main-stage">
        <InvitationBook
          config={invitationConfig}
          onFirstOpen={() => setHasOpenedBook(true)}
        />
      </main>

      {/* Optional Background Music with Play/Pause Control */}
      <AudioPlayer
        config={invitationConfig}
        triggerAutoPlay={hasOpenedBook}
      />
    </div>
  );
}
