'use client';

import { useSite } from './SiteContext';

export default function Editorial() {
  const { c, locale, t, addToCart, openQV } = useSite();

  return (
    <div className="container reveal" id="modalidades">
      <div className="edit">
        {c.editorial.map((card, index) => {
          const program = c.programs.find((item) => item.id === card.programId);
          return (
            <div className="edit-card" key={card.programId}>
              <img src={card.img} alt={card.title[locale]} />
              {index === 0 ? (
                <>
                  <span className="hotspot" style={{ top: '22px', left: '22px' }}>
                    ⚡ max 5
                  </span>
                  <span className="hotspot" style={{ top: '22px', right: '22px' }}>
                    ● Pichilemu
                  </span>
                </>
              ) : (
                <span className="hotspot" style={{ top: '22px', left: '22px' }}>
                  ● Google Meet
                </span>
              )}
              <div className="edit-copy">
                <p style={{ fontSize: '12px', letterSpacing: '.14em' }}>{card.eyebrow[locale]}</p>
                <h3>{card.title[locale]}</h3>
                <p style={{ opacity: 0.85, fontSize: '14px' }}>{card.text[locale]}</p>
                <div>
                  {index === 0 && program ? (
                    <button className="btn-pill btn-white" onClick={() => addToCart(program.id)}>
                      {t.add} — ${program.price}
                    </button>
                  ) : (
                    <button
                      className="btn-pill btn-white"
                      onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      {t.editorialSeePrograms}
                    </button>
                  )}
                  <button
                    className="btn-pill"
                    style={{ border: '1px solid #fff', color: '#fff', background: 'transparent' }}
                    onClick={() => openQV(card.programId)}
                  >
                    {t.editorialQuickView}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
