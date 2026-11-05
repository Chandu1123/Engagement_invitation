/**
 * ============================================================================
 * CENTRAL INVITATION CONFIGURATION (src/config.js)
 * ============================================================================
 * Edit the values in this file to update the entire engagement invitation
 * website without touching any React component files.
 * Includes full bilingual support: English ('en') and Telugu ('te').
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
  // 3. ENGAGEMENT DATE CONFIGURATION
  // --------------------------------------------------------------------------
  date: {
    dayOfMonth: 13,
    monthName: "December",
    monthNumber: 12, // 1 = January ... 12 = December
    year: 2026, // Configurable year
    dayOfWeek: "Sunday",
    startTimeDisplay: "",
    // ISO 8601 timestamp used by the Live Countdown Timer
    isoStartDateTime: "2026-12-13T00:00:00+05:30",
    isoEndDateTime: "2026-12-13T23:59:59+05:30",
  },

  // --------------------------------------------------------------------------
  // 4. VENUE & GOOGLE MAPS DETAILS
  // --------------------------------------------------------------------------
  venue: {
    name: "Engagement Venue",
    addressLine1: "Hindupur, Sri Sathya Sai District",
    cityStateZip: "Andhra Pradesh, 515200",
    googleMapsUrl: "https://maps.app.goo.gl/TFqwUZuLNMvgzB3x8",
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
      "✨ *Bismillahir Rahmanir Rahim* ✨\n\nAssalamu Alaikum! You are cordially invited to the Engagement Ceremony of *Sarithala Chandu & Vuluvalapalli Kulsum* on *December 13, 2026*.\n\n📍 *Location:* https://maps.app.goo.gl/TFqwUZuLNMvgzB3x8\n\nView the invitation book here:",
  },

  // --------------------------------------------------------------------------
  // 7. BILINGUAL TRANSLATIONS (ENGLISH & TELUGU)
  // --------------------------------------------------------------------------
  translations: {
    en: {
      langLabel: "English",
      readInPrompt: "Language:",
      groomName: "Sarithala Chandu",
      brideName: "Vuluvalapalli Kulsum",
      withConjunction: "with",
      groomRole: "Groom",
      brideRole: "Bride",
      badgeText: "Engagement Invitation",
      openBookCta: "Tap to Open Book",
      salamTransliteration: "Assalamu Alaikum Wa Rahmatullahi Wa Barakatuh",
      invitationLead:
        "With the blessings of Allah (SWT) and our families, we joyfully invite you to share in our happiness as we celebrate our engagement.",
      blessingDuaTranslation:
        "“May Allah bless you both, shower His blessings upon you, and unite you both in goodness.”",
      saveTheDateEyebrow: "✦ Save The Date ✦",
      dayOfWeek: "Sunday",
      monthName: "December",
      fullDateDisplay: "Sunday, December 13, 2026",
      countdownPoeticText: "Counting Every Blessed Moment",
      countdownCompleteText: "✨ Alhamdulillah! Today is Our Engagement Day ✨",
      dialDays: "Days",
      dialHours: "Hours",
      dialMins: "Mins",
      dialSecs: "Secs",
      venueEyebrow: "Ceremony Venue",
      venueName: "Engagement Venue",
      venueAddress: "Hindupur, Sri Sathya Sai District, Andhra Pradesh, 515200",
      openMapsBtn: "Open Google Maps Location",
      shareWhatsAppBtn: "Share on WhatsApp",
      whatsappShareText:
        "✨ *Bismillahir Rahmanir Rahim* ✨\n\nAssalamu Alaikum! You are cordially invited to the Engagement Ceremony of *Sarithala Chandu & Vuluvalapalli Kulsum* on *December 13, 2026*.\n\n📍 *Location:* https://maps.app.goo.gl/TFqwUZuLNMvgzB3x8\n\nView the invitation book here:",
      navCover: "Cover",
      navBlessings: "Blessings",
      navVenue: "Venue",
      navInsideSpread: "Inside Spread 📖",
      navInsideShort: "Inside",
      navShareShort: "Share",
      navPrev: "Prev",
      navNext: "Next",
      navBack: "Back",
      pageBackToCover: "← Cover",
      pageBackToCoverFull: "← Back to Cover",
      pageToVenue: "Venue & Date →",
      pageBackToBlessings: "← Blessings",
      pageReturnCover: "Cover ↺",
      footerBlessingsLabel: "Blessings & Union",
      footerVenueLabel: "Venue & Date",
    },
    te: {
      langLabel: "తెలుగు",
      readInPrompt: "భాష:",
      groomName: "సరితాల చాందు",
      brideName: "వులువలపల్లి కుల్సుమ్",
      withConjunction: "మరియు",
      groomRole: "వరుడు",
      brideRole: "వధువు",
      badgeText: "నిశ్చితార్థ ఆహ్వాన పత్రిక",
      openBookCta: "ఆహ్వాన పత్రిక తెరవండి",
      salamTransliteration: "అస్సలాము అలైకుమ్ వ రహ్మతుల్లాహి వ బరకాతుహు",
      invitationLead:
        "అల్లాహ్ (SWT) కృపతో మరియు మా కుటుంబ సభ్యుల ఆశీస్సులతో, మా నిశ్చితార్థ వేడుకకు విచ్చేసి మమ్మల్ని ఆశీర్వదించాలని ఆనందంతో ఆహ్వానిస్తున్నాము.",
      blessingDuaTranslation:
        "“అల్లాహ్ మీ ఇద్దరినీ ఆశీర్వదించుగాక, మీపై తన కరుణను కురిపించి, మిమ్మల్ని సంతోషంతో మరియు మంచితనంతో ఏకం చేయుగాక.”",
      saveTheDateEyebrow: "✦ శుభ ముహూర్త తేదీ ✦",
      dayOfWeek: "ఆదివారం",
      monthName: "డిసెంబర్",
      fullDateDisplay: "ఆదివారం, డిసెంబర్ 13, 2026",
      countdownPoeticText: "ఆ శుభ ఘడియల కోసం ఎదురుచూస్తూ",
      countdownCompleteText: "✨ అల్హందులిల్లాహ్! నేడే మా నిశ్చితార్థ శుభదినం ✨",
      dialDays: "రోజులు",
      dialHours: "గంటలు",
      dialMins: "నిమిషాలు",
      dialSecs: "సెకన్లు",
      venueEyebrow: "వేడుక జరుగు స్థలం",
      venueName: "నిశ్చితార్థ వేదిక",
      venueAddress: "హిందూపురం, శ్రీ సత్యసాయి జిల్లా, ఆంధ్రప్రదేశ్, 515200",
      openMapsBtn: "గూగుల్ మ్యాప్స్ లొకేషన్ చూడండి",
      shareWhatsAppBtn: "వాట్సాప్‌లో షేర్ చేయండి",
      whatsappShareText:
        "✨ *బిస్మిల్లాహిర్ రహ్మానిర్ రహీమ్* ✨\n\nఅస్సలాము అలైకుమ్! *డిసెంబర్ 13, 2026 (ఆదివారం)* నాడు జరగబోయే *సరితాల చాందు & వులువలపల్లి కుల్సుమ్* గారి నిశ్చితార్థ వేడుకకు మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము.\n\n📍 *వేదిక లొకేషన్:* https://maps.app.goo.gl/TFqwUZuLNMvgzB3x8\n\nఆహ్వాన పత్రికను ఇక్కడ చూడండి:",
      navCover: "ముఖచిత్రం",
      navBlessings: "ఆశీస్సులు",
      navVenue: "వేదిక",
      navInsideSpread: "లోపలి పేజీలు 📖",
      navInsideShort: "లోపలి పేజీ",
      navShareShort: "షేర్",
      navPrev: "వెనుకకు",
      navNext: "ముందుకు",
      navBack: "వెనుకకు",
      pageBackToCover: "← ముఖచిత్రం",
      pageBackToCoverFull: "← ముఖచిత్రం",
      pageToVenue: "వేదిక & తేదీ →",
      pageBackToBlessings: "← ఆశీస్సులు",
      pageReturnCover: "ముఖచిత్రం ↺",
      footerBlessingsLabel: "ఆశీస్సులు & శుభవేళ",
      footerVenueLabel: "వేదిక & తేదీ",
    },
  },

  // --------------------------------------------------------------------------
  // 8. BACKGROUND AUDIO CONFIGURATION
  // --------------------------------------------------------------------------
  audio: {
    enabled: true,
    autoPlayOnOpen: true,
    label: "Background Audio",
    customMp3Url: "./audio/nasheed.mp3",
  },
};

export default invitationConfig;
