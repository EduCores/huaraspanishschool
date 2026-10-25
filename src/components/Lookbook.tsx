'use client';

import { useSite } from './SiteContext';

export default function Lookbook() {
  const { c, t, openLB } = useSite();
  const horizontal = [...c.lookbook.h, ...c.lookbook.h];
  const vertical = [...c.lookbook.v, ...c.lookbook.v];

  return (
    <div className="container reveal" id="lookbook" style={{ marginBottom: '40px' }}>
      <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '.14em' }}>{t.lookbookEyebrow}</p>
      <h2 style={{ fontSize: 'clamp(30px,4vw,44px)', margin: '8px 0 16px' }}>{t.lookbookHeading}</h2>
      <div className="strip">
        <div className="strip-track">
          {horizontal.map((image, index) => (
            <img
              key={`h-${index}`}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              onClick={() => openLB(image.src)}
            />
          ))}
        </div>
        <div className="strip-track reverse">
          {vertical.map((image, index) => (
            <img
              key={`v-${index}`}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              onClick={() => openLB(image.src)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
