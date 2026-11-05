import React from 'react';
import {
  FloralGoldDivider,
  CornerOrnament,
  MosqueArchCrown,
  CrescentMoonIcon,
} from './IslamicOrnaments';

/**
 * DuaSection Component
 * Displays the Quranic verse on love & tranquility (Surah Ar-Rum 30:21)
 * and the Prophetic Dua for a blessed union.
 */
export default function DuaSection({ config }) {
  const { dua } = config;

  return (
    <section id="dua" className="section-wrapper dua-section">
      <div className="container">
        <div className="dua-showcase-card">
          <CornerOrnament position="top-left" />
          <CornerOrnament position="top-right" />
          <CornerOrnament position="bottom-left" />
          <CornerOrnament position="bottom-right" />

          <MosqueArchCrown />

          <div className="dua-inner">
            <div className="dua-header-icon">
              <CrescentMoonIcon size={46} />
            </div>

            <span className="section-eyebrow">Sacred Blessings • الدعاء</span>
            <h2 className="section-title">Islamic Dua &amp; Blessings</h2>
            <FloralGoldDivider />

            {/* Quranic Verse Box */}
            <div className="dua-block">
              <p className="arabic-verse" lang="ar" dir="rtl">
                {dua.quranVerseArabic}
              </p>
              <blockquote className="verse-translation">
                {dua.quranVerseTranslation}
              </blockquote>
              <cite className="verse-reference">— {dua.quranVerseReference}</cite>
            </div>

            <FloralGoldDivider />

            {/* Prophetic Blessing Dua Box */}
            <div className="dua-block">
              <p className="arabic-blessing" lang="ar" dir="rtl">
                {dua.blessingDuaArabic}
              </p>
              <p className="dua-transliteration">
                {dua.blessingDuaTransliteration}
              </p>
              <p className="dua-translation">{dua.blessingDuaTranslation}</p>
            </div>

            <p className="dua-closing-note">{dua.closingNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
