'use client';

import { useSite } from './SiteContext';

export default function Surf() {
  const { c, locale, t, now, surfTarget, addToCart, openQV } = useSite();
  const left = Math.max(0, surfTarget - now);
  const seconds = Math.floor(left / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const pad = (value: number) => String(value).padStart(2, '0');
  const show = now ? pad : () => '--';

  return (
    <div className="container reveal" id="surf">
      <div className="surf-full">
        <img src={c.surf.img} alt={c.surf.title[locale]} style={{ objectPosition: 'center 35%' }} />
        <div className="surf-inner">
          <p style={{ fontSize: '12px', letterSpacing: '.16em' }}>{c.surf.eyebrow[locale]}</p>
          <h2>{c.surf.title[locale]}</h2>
          <p style={{ opacity: 0.9, marginTop: '10px' }}>{c.surf.desc[locale]}</p>
          <div className="count">
            <div>
              <strong>{show(days)}</strong>
              <span>{t.daysShort}</span>
            </div>
            <div>
              <strong>{show(hours)}</strong>
              <span>{t.hrsShort}</span>
            </div>
            <div>
              <strong>{show(minutes)}</strong>
              <span>{t.minShort}</span>
            </div>
            <div>
              <strong>{show(secs)}</strong>
              <span>{t.secShort}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-pill btn-white" onClick={() => addToCart(c.surf.programId)}>
              {t.addSurfPack}
            </button>
            <button
              className="btn-pill"
              style={{ background: 'transparent', border: '1px solid #fff', color: '#fff' }}
              onClick={() => openQV(c.surf.programId)}
            >
              {t.quickView}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
