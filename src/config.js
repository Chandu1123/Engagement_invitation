/**
 * ============================================================================
 * CENTRAL INVITATION CONFIGURATION (src/config.js)
 * ============================================================================
 * Edit the values in this file to update the entire engagement invitation
 * website without touching any React component files.
 */

const invitationConfig = {
  // --------------------------------------------------------------------------
  // 1. COUPLE DETAILS
  // --------------------------------------------------------------------------
  couple: {
    groomFirstName: "Sarithala Chandu",
    groomFullName: "Sarithala Chandu",
    brideFirstName: "Vuluvalapalli Kulsum",
    brideFullName: "Vuluvalapalli Kulsum",
    monogram: "C & K",
    order: "groom-first", // "groom-first" or "bride-first"
  },

  // --------------------------------------------------------------------------
  // 2. WELCOME SCREEN & ISLAMIC GREETING
  // --------------------------------------------------------------------------
  welcome: {
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahTranslation: "In the Name of Allah, the Most Gracious, the Most Merciful",
    badgeText: "Engagement Invitation",
    ctaButtonText: "Open Invitation",
    guestHonorLabel: "We cordially invite you to celebrate with us",
  },

  greeting: {
    salamArabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
    salamTransliteration: "Assalamu Alaikum Wa Rahmatullahi Wa Barakatuh",
    invitationTitle: "Engagement Ceremony",
    invitationLead:
      "With the blessings of Allah (SWT) and our families, we joyfully invite you to share in our happiness as we celebrate our engagement.",
  },

  // --------------------------------------------------------------------------
  // 3. ENGAGEMENT DATE & TIME CONFIGURATION
  // --------------------------------------------------------------------------
  date: {
    dayOfMonth: 13,
    monthName: "December",
    monthNumber: 12, // 1 = January ... 12 = December
    year: 2026, // Configurable year
    dayOfWeek: "Sunday",
    startTimeDisplay: "6:00 PM Onwards",
    // ISO 8601 timestamp used by the Live Countdown Timer
    isoStartDateTime: "2026-12-13T18:00:00+05:30",
    isoEndDateTime: "2026-12-13T22:00:00+05:30",
  },

  // --------------------------------------------------------------------------
  // 4. VENUE & GOOGLE MAPS DETAILS
  // --------------------------------------------------------------------------
  venue: {
    name: "Engagement Venue",
    addressLine1: "Join us in celebrating this blessed occasion",
    cityStateZip: "Click below for exact location & directions",
    googleMapsUrl: "https://www.google.com/maps",
  },

  // --------------------------------------------------------------------------
  // 5. ISLAMIC DUA & BLESSINGS SECTION
  // --------------------------------------------------------------------------
  dua: {
    blessingDuaArabic:
      "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    blessingDuaTranslation:
      "“May Allah bless you both, shower His blessings upon you, and unite you both in goodness.”",
    closingNote: "Your presence and heartfelt Duas are our greatest blessing.",
  },

  // --------------------------------------------------------------------------
  // 6. WHATSAPP SHARE SETTINGS
  // --------------------------------------------------------------------------
  sharing: {
    whatsappShareText:
      "✨ *Bismillahir Rahmanir Rahim* ✨\n\nAssalamu Alaikum! You are cordially invited to the Engagement Ceremony of *Sarithala Chandu & Vuluvalapalli Kulsum* on *December 13, 2026*.\n\nView the invitation & location here:",
  },

  // --------------------------------------------------------------------------
  // 7. BACKGROUND AUDIO CONFIGURATION
  // --------------------------------------------------------------------------
  audio: {
    enabled: true,
    autoPlayOnOpen: true,
    label: "Background Audio",
    customMp3Url: "./audio/nasheed.mp3",
  },
};

export default invitationConfig;
