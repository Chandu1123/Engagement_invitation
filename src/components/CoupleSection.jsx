import React from 'react';
import {
  FloralGoldDivider,
  CornerOrnament,
  IslamicStarIcon,
} from './IslamicOrnaments';

/**
 * CoupleSection Component
 * Displays full names and family parentage for the Groom and Bride
 * in twin emerald & champagne-gold arch cards.
 */
export default function CoupleSection({ config }) {
  const { couple } = config;

  const groomCard = {
    role: 'The Groom-to-Be',
    arabicRole: 'العريس',
    firstName: couple.groomFirstName,
    fullName: couple.groomFullName,
    parents: couple.groomParents,
    initial: couple.groomFirstName.charAt(0),
  };

  const brideCard = {
    role: 'The Bride-to-Be',
    arabicRole: 'العروس',
    firstName: couple.brideFirstName,
    fullName: couple.brideFullName,
    parents: couple.brideParents,
    initial: couple.brideFirstName.charAt(0),
  };

  const orderedCards =
    couple.order === 'bride-first'
      ? [brideCard, groomCard]
      : [groomCard, brideCard];

  return (
    <section id="couple" className="section-wrapper couple-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Blessed Union • الخطوبة</span>
          <h2 className="section-title">The Happy Couple</h2>
          <FloralGoldDivider />
        </div>

        <div className="couple-grid">
          {orderedCards.map((person, index) => (
            <React.Fragment key={person.role}>
              <article className="couple-card">
                <CornerOrnament position="top-left" />
                <CornerOrnament position="top-right" />
                <CornerOrnament position="bottom-left" />
                <CornerOrnament position="bottom-right" />

                <div className="couple-arch-avatar" aria-hidden="true">
                  <span className="couple-avatar-initial">{person.initial}</span>
                </div>

                <p className="couple-role-tag">
                  <span>{person.role}</span>
                  <span className="role-dot">•</span>
                  <span lang="ar" dir="rtl">
                    {person.arabicRole}
                  </span>
                </p>

                <h3 className="couple-full-name">{person.fullName}</h3>
                <p className="couple-parents">{person.parents}</p>
              </article>

              {index === 0 && (
                <div className="couple-center-emblem" aria-hidden="true">
                  <div className="emblem-ring">
                    <IslamicStarIcon size={28} />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
