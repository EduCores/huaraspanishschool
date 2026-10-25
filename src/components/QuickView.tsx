'use client';

import { priceLabel } from '@/lib/utils';
import { useSite } from './SiteContext';

export default function QuickView() {
  const { c, locale, t, qvId, closeQV, addToCart } = useSite();
  const program = c.programs.find((item) => item.id === qvId);

  return (
    <div
      className={`qv${program ? ' show' : ''}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeQV();
      }}
      aria-hidden={!program}
    >
      <div className="qv-card">
        {program ? (
          <>
            <img src={program.img} alt={program.title[locale]} />
            <div className="qv-info">
              <button className="icon-btn" onClick={closeQV} aria-label={t.quickViewClose}>
                ✕
              </button>
              <p
                style={{
                  fontSize: '11px',
                  letterSpacing: '.14em',
                  fontWeight: 700,
                  color: 'var(--accent)',
                }}
              >
                {program.tag[locale]}
              </p>
              <h2 style={{ fontSize: 'clamp(26px,5vw,36px)', margin: '8px 0' }}>
                {program.title[locale]}
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{program.desc[locale]}</p>
              <p
                style={{
                  fontFamily: "'Archivo'",
                  fontWeight: 800,
                  fontSize: '24px',
                  margin: '14px 0',
                }}
              >
                {priceLabel(program, t)}
              </p>
              <button
                className="btn-pill btn-dark"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  addToCart(program.id);
                  closeQV();
                }}
              >
                {t.addToOrder}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
