/**
 * ============================================================================
 * CENTRAL INVITATION CONFIGURATION (src/config.js)
 * ============================================================================
 * Edit the values in this file to update the entire engagement invitation
 * website without touching any React component files.
 */

const invitationConfig = {
  // --------------------------------------------------------------------------
  // 1. COUPLE & FAMILY DETAILS
  // --------------------------------------------------------------------------
  couple: {
    groomFirstName: "Zayd",
    groomFullName: "Zayd Bin Tariq Al-Mansoor",
    groomParents: "Son of Mr. Tariq Al-Mansoor & Mrs. Nadia Al-Mansoor",
    brideFirstName: "Amina",
    brideFullName: "Amina Bint Khalid Al-Farooq",
    brideParents: "Daughter of Mr. Khalid Al-Farooq & Mrs. Samira Al-Farooq",
    monogram: "Z & A",
    order: "groom-first", // "groom-first" or "bride-first"
  },

  // --------------------------------------------------------------------------
  // 2. WELCOME SCREEN & ISLAMIC GREETING
  // --------------------------------------------------------------------------
  welcome: {
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahTranslation: "In the Name of Allah, the Most Gracious, the Most Merciful",
    badgeText: "Engagement Ceremony • الخطوبة المباركة",
    ctaButtonText: "Open Invitation",
    guestHonorLabel: "Peace, Mercy, and Blessings of Allah be upon you",
  },

  greeting: {
    salamArabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
    salamTransliteration: "Assalamu Alaikum Wa Rahmatullahi Wa Barakatuh",
    invitationTitle: "With Joyful Hearts & Gratitude to Allah (SWT)",
    invitationLead:
      "Together with our beloved parents and families, we humbly request the honor of your presence and prayers as we celebrate the joyous occasion of our Engagement Ceremony.",
    familyHostLine:
      "Cordially invited by the Al-Mansoor & Al-Farooq Families",
  },

  // --------------------------------------------------------------------------
  // 3. ENGAGEMENT DATE & TIME CONFIGURATION
  // --------------------------------------------------------------------------
  date: {
    dayOfMonth: 13,
    monthName: "December",
    monthNumber: 12, // 1 = January ... 12 = December
    year: 2026, // Change year anytime (e.g., 2026, 2027)
    dayOfWeek: "Sunday",
    hijriDate: "3 Rajab 1448 AH", // Optional Islamic Hijri date display
    startTimeDisplay: "6:00 PM Onwards",
    endTimeDisplay: "10:30 PM",
    // ISO 8601 timestamp used by the Live Countdown Timer & Calendar export
    isoStartDateTime: "2026-12-13T18:00:00+05:30",
    isoEndDateTime: "2026-12-13T22:30:00+05:30",
    timezoneLabel: "IST (GMT+5:30)",
  },

  // --------------------------------------------------------------------------
  // 4. VENUE & GOOGLE MAPS DETAILS
  // --------------------------------------------------------------------------
  venue: {
    name: "The Grand Emerald Ballroom",
    hallDetails: "Royal Heritage Palace, 2nd Floor, Mezban Wing",
    addressLine1: "42 Crescent Avenue, Banjara Hills",
    cityStateZip: "Hyderabad, Telangana 500034",
    landmark: "Opposite Royal Mosque Gardens",
    parkingNote: "Complimentary Valet Parking Available at Gate 2",
    dressCode: "Modest Traditional / Formal Attire (Emerald, Ivory & Gold accents welcomed)",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Banjara+Hills+Hyderabad",
  },

  // --------------------------------------------------------------------------
  // 5. CEREMONY ITINERARY / TIMELINE
  // --------------------------------------------------------------------------
  schedule: [
    {
      time: "6:00 PM",
      title: "Welcome & Guest Arrival",
      description: "Warm reception with Arabic kahwa, dates, and rosewater greeting.",
    },
    {
      time: "6:45 PM",
      title: "Qirat & Opening Dua",
      description: "Recitation from the Holy Quran and prayers for the couple's blessed union.",
    },
    {
      time: "7:30 PM",
      title: "Ring Ceremony & Mubarakbad",
      description: "Formal exchange of engagement rings and blessings from elders.",
    },
    {
      time: "8:30 PM",
      title: "Royal Festive Dinner",
      description: "A celebratory feast shared with family, loved ones, and well-wishers.",
    },
  ],

  // --------------------------------------------------------------------------
  // 6. ISLAMIC DUA & BLESSINGS SECTION
  // --------------------------------------------------------------------------
  dua: {
    quranVerseArabic:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً",
    quranVerseTranslation:
      "“And among His Signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts.”",
    quranVerseReference: "Surah Ar-Rum (30:21)",
    blessingDuaArabic:
      "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    blessingDuaTransliteration:
      "Barakallahu lakuma wa baraka 'alaykuma wa jama'a baynakuma fi khayr",
    blessingDuaTranslation:
      "“May Allah bless you both, shower His blessings upon you, and unite you both in goodness.”",
    closingNote:
      "Your presence and heartfelt Duas are the most cherished gifts we could ask for as we embark on this blessed journey together.",
  },

  // --------------------------------------------------------------------------
  // 7. WHATSAPP SHARE & RSVP SETTINGS
  // --------------------------------------------------------------------------
  sharing: {
    // Message used when someone clicks "Share Invitation on WhatsApp"
    whatsappShareText:
      "✨ *Bismillahir Rahmanir Rahim* ✨\n\nAssalamu Alaikum! With joyful hearts, the families of *Zayd & Amina* cordially invite you to celebrate their Engagement Ceremony on *December 13, 2026* at *The Grand Emerald Ballroom*.\n\nView the full digital invitation, venue map, and timings here:",
    // Optional host WhatsApp number (international format without '+' or spaces) for direct RSVP
    rsvpPhoneNumber: "919876543210",
    rsvpDefaultMessage:
      "Assalamu Alaikum! Insha'Allah, we are delighted to confirm our attendance for the Engagement Ceremony of Zayd & Amina on December 13, 2026.",
    contactPersonName: "Mr. Tariq Al-Mansoor",
    contactPhoneDisplay: "+91 98765 43210",
  },

  // --------------------------------------------------------------------------
  // 8. BACKGROUND AUDIO CONFIGURATION
  // --------------------------------------------------------------------------
  audio: {
    enabled: true,
    autoPlayOnOpen: true, // Starts gently when user clicks "Open Invitation"
    label: "Background Nasheed / Chime",
    // Place your custom MP3 file in `public/audio/nasheed.mp3` and set customMp3Url: "/audio/nasheed.mp3".
    // If left empty or if the file isn't found, the built-in gentle acoustic harp/oud-inspired ambient synthesizer plays automatically.
    customMp3Url: "./audio/nasheed.mp3",
  },
};

export default invitationConfig;
