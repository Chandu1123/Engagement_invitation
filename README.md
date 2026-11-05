# Premium Muslim Engagement Invitation Website

A luxurious, production-ready Islamic engagement digital invitation built with **React + Vite** and bespoke **Emerald & Champagne Gold** styling.

---

## ✨ Features

1. **Welcome Gate with Bismillah Calligraphy**: Royal entrance overlay with hanging lanterns, mosque arch (`Mihrab`) silhouette, and smooth entrance animation.
2. **Centralized Configuration (`src/config.js`)**: Update couple names, parent names, engagement date (December 13, configurable year), Hijri date, venue details, Google Maps link, itinerary schedule, Duas, WhatsApp share message, and RSVP number in **one single file**.
3. **Live Countdown Timer & Calendar Integration**: Real-time countdown to the engagement ceremony plus one-click **Add to Google Calendar** and **.ICS Calendar Download**.
4. **Venue & Evening Itinerary**: Detailed venue card with Google Maps directions and a chronological ceremony schedule.
5. **Sacred Quranic Ayat & Prophetic Dua**: Classical Arabic typography (`Amiri`) with transliteration and English translation.
6. **WhatsApp Invitation Sharing & Direct RSVP**: Forward the formatted invitation on WhatsApp or send an instant RSVP confirmation to the host.
7. **Optional Background Audio Control**: Visible floating Play/Pause button that plays your custom MP3 file (`public/audio/nasheed.mp3`) or automatically falls back to a gentle, peaceful acoustic ambient chime melody.
8. **Fully Responsive & Accessible**: Tailored for mobile phones, tablets, and laptops with full `prefers-reduced-motion` support.

---

## 📁 Project Folder Structure

```text
muslim-engagement-invitation/
├── public/
│   ├── audio/
│   │   └── README.txt                  # Place optional custom nasheed.mp3 here
│   └── favicon.svg                     # Emerald & Gold Crescent Moon icon
├── src/
│   ├── components/
│   │   ├── AudioPlayer.jsx             # Floating Play/Pause audio control
│   │   ├── CountdownTimer.jsx          # Live countdown & Add-to-Calendar
│   │   ├── CoupleSection.jsx           # Groom & Bride cards with parentage
│   │   ├── DuaSection.jsx              # Quranic verse & Prophetic blessing
│   │   ├── HeroSection.jsx             # Greeting, Couple showcase & Date seal
│   │   ├── IslamicOrnaments.jsx        # Reusable SVG arches, stars & borders
│   │   ├── Navbar.jsx                  # Responsive desktop & mobile navigation
│   │   ├── ShareAndRsvpSection.jsx     # WhatsApp sharing & direct RSVP form
│   │   └── WelcomeScreen.jsx           # Bismillah entrance gate
│   ├── App.jsx                         # Main application layout
│   ├── config.js                       # ⭐ CENTRAL CONFIGURATION FILE
│   ├── index.css                       # Luxury Emerald & Gold design system
│   └── main.jsx                        # React entry point
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

---

## 🚀 Quick Start (Local Development)

1. **Navigate to the project directory**:
   ```bash
   cd muslim-engagement-invitation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open the URL shown in your terminal (typically `http://localhost:5173`) to preview the invitation.

4. **Create a production build**:
   ```bash
   npm run build
   ```

---

## 📝 How to Edit the Invitation (`src/config.js`)

All text, names, dates, timings, venue details, and links live inside **`src/config.js`**. You never need to edit multiple React component files.

1. **Change Couple & Parent Names**:
   Open `src/config.js` and edit the `couple` object:
   ```js
   couple: {
     groomFirstName: "Zayd",
     groomFullName: "Zayd Bin Tariq Al-Mansoor",
     groomParents: "Son of Mr. Tariq Al-Mansoor & Mrs. Nadia Al-Mansoor",
     brideFirstName: "Amina",
     brideFullName: "Amina Bint Khalid Al-Farooq",
     brideParents: "Daughter of Mr. Khalid Al-Farooq & Mrs. Samira Al-Farooq",
     monogram: "Z & A",
     order: "groom-first", // Change to "bride-first" if preferred
   },
   ```

2. **Change the Engagement Year or Time**:
   Edit the `date` object in `src/config.js`:
   ```js
   date: {
     dayOfMonth: 13,
     monthName: "December",
     monthNumber: 12,
     year: 2026, // Change year here
     dayOfWeek: "Sunday",
     hijriDate: "3 Rajab 1448 AH",
     startTimeDisplay: "6:00 PM Onwards",
     endTimeDisplay: "10:30 PM",
     isoStartDateTime: "2026-12-13T18:00:00+05:30",
     isoEndDateTime: "2026-12-13T22:30:00+05:30",
     timezoneLabel: "IST (GMT+5:30)",
   },
   ```

3. **Change the Venue & Google Maps Link**:
   Edit the `venue` object in `src/config.js` and paste your exact Google Maps share link into `googleMapsUrl`.

4. **Change WhatsApp Share Message & Host RSVP Phone Number**:
   Edit `sharing.whatsappShareText` and `sharing.rsvpPhoneNumber` (use international format without `+` or spaces, e.g., `"919876543210"`).

5. **Use Your Own Background Nasheed / Instrumental MP3**:
   - Place your `.mp3` file at `public/audio/nasheed.mp3`.
   - Ensure `audio.customMp3Url` in `src/config.js` is set to `"/audio/nasheed.mp3"`.
   - If no MP3 file is placed there, the website automatically uses its built-in gentle ambient chime synthesizer.

---

## 📦 Git Commands to Push to GitHub

1. Create a new repository on [GitHub](https://github.com/new) (e.g., `muslim-engagement-invitation`).
2. Run the following commands inside the project folder:

```bash
git init
git add .
git commit -m "Initial commit: Luxury Muslim engagement invitation website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/muslim-engagement-invitation.git
git push -u origin main
```

---

## 🌐 Deploying to Vercel

1. Go to [vercel.com](https://vercel.com/) and sign in with your **GitHub** account.
2. Click **"Add New..." → "Project"**.
3. Select your `muslim-engagement-invitation` GitHub repository and click **Import**.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Within ~30 seconds, your live invitation URL (e.g., `https://zayd-amina-engagement.vercel.app`) will be ready to share on WhatsApp!

---

## 🔄 Updating the Website After Deployment

Whenever you want to update any detail (such as changing a timing, hall name, or year):

1. Open `src/config.js` on your computer (or directly in the GitHub web editor) and make your edits.
2. Commit and push the changes to GitHub:
   ```bash
   git add src/config.js
   git commit -m "Update invitation details in config.js"
   git push
   ```
3. **Vercel will automatically rebuild and publish** your updated invitation within seconds—no manual redeployment needed.
