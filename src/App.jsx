import React, { useEffect } from 'react';
import invitationConfig from './config';
import InvitationBook from './components/InvitationBook';
import { HangingLantern } from './components/IslamicOrnaments';

export default function App() {
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
        <InvitationBook config={invitationConfig} />
      </main>
    </div>
  );
}
