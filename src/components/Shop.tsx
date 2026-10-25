'use client';

import { useMemo } from 'react';
import { useSite } from './SiteContext';
import StartBadge from './StartBadge';

export default function Shop() {
  const { c, locale, t, filter, setFilter, addToCart, openQV } = useSite();

  const programs = useMemo(
    () => c.programs.filter((program) => filter === 'all' || program.cat === filter),
    [c.programs, filter],
  );

  const filters = [
    { id: 'all', label: t.filterAll },
    { id: 'presencial', label: t.filterPresencial },
    { id: 'online', label: t.filterOnline },
    { id: 'surf', label: t.filterSurf },
  ];

  return (
    <div className="container shop reveal" id="shop">
      <div className="shop-head">
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '.14em' }}>
            ● <span>{t.shopEyebrow}</span>
          </p>
          <h2>{t.shopHeading}</h2>
        </div>
        <div className="filters">
          {filters.map((item) => (
            <button
              key={item.id}
              className={filter === item.id ? 'active' : undefined}
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid4">
        {programs.map((program) => (
          <div className="pcard" key={program.id}>
            <div className="ph">
              <img src={program.img} alt={program.title[locale]} />
              <span className={`badge ${program.bc}`}>{program.badge[locale]}</span>
              <button
                className="quick"
                onClick={() => addToCart(program.id)}
                aria-label={`${t.add} ${program.title[locale]}`}
              >
                +
              </button>
              <StartBadge program={program} />
            </div>
            <div className="pb">
              <small>{program.tag[locale]}</small>
              <h3>{program.title[locale]}</h3>
              <div className="price-row" style={{ justifyContent: 'flex-start', alignItems: 'baseline' }}>
                <span className="price">${program.price}</span>
                <small style={{ color: 'var(--muted)' }}>/ {t.unitShort[program.unit]}</small>
              </div>
              {program.priceWk ? (
                <small style={{ display: 'block', color: 'var(--muted)', marginTop: '4px' }}>
                  ${program.priceWk}
                  {t.perWeekShort} {t.from2weeks}
                </small>
              ) : null}
              <button
                className="qv-btn"
                onClick={() => openQV(program.id)}
                style={{
                  marginTop: '10px',
                  width: '100%',
                  border: '1px solid var(--line)',
                  background: '#ff4d00',
                  borderRadius: '5px',
                  padding: '10px',
                  font: "600 18px Inter",
                  cursor: 'pointer',
                  color: '#fffdf8',
                }}
              >
                {t.quickView}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
