'use client';

import { useEffect } from 'react';
import { useSite } from './SiteContext';

export default function Lightbox() {
  const { lbOpen, lbSrcs, lbIndex, closeLB, lbNav, t } = useSite();

  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') lbNav(-1);
      if (event.key === 'ArrowRight') lbNav(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lbOpen, lbNav]);

  return (
    <div
      className={`lbox${lbOpen ? ' show' : ''}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeLB();
      }}
      aria-hidden={!lbOpen}
    >
      <button className="lbox-x" onClick={closeLB} aria-label={t.close}>
        ✕
      </button>
      <button className="lbox-nav prev" onClick={() => lbNav(-1)} aria-label="Previous">
        ‹
      </button>
      <img src={lbSrcs[lbIndex] || ''} alt="Huara Spanish School" />
      <button className="lbox-nav next" onClick={() => lbNav(1)} aria-label="Next">
        ›
      </button>
      <div className="lbox-count">
        {lbSrcs.length ? `${lbIndex + 1} / ${lbSrcs.length}` : ''}
      </div>
    </div>
  );
}
