'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSite } from './SiteContext';
import { priceLabel } from '@/lib/utils';

export default function SearchPanel() {
  const { c, locale, t, searchOpen, setSearchOpen, addToCart } = useSite();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return c.programs.filter((program) => {
      if (!q) return true;
      const hay = `${program.title.en} ${program.title.es} ${program.tag.en} ${program.tag.es} ${program.desc.en} ${program.desc.es}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 8);
  }, [c.programs, query]);

  return (
    <div className={`search-panel${searchOpen ? ' open' : ''}`} aria-hidden={!searchOpen}>
      <div className="search-box">
        <div className="search-bar">
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.search}
          />
          <button
            className="btn-pill btn-dark"
            style={{ padding: '14px 22px' }}
            onClick={() => setSearchOpen(false)}
            aria-label={t.searchClose}
          >
            ✕
          </button>
        </div>
        <div className="sres">
          {results.length ? (
            results.map((program) => (
              <div className="srow" key={program.id}>
                <img src={program.img} alt={program.title[locale]} />
                <div>
                  <strong>{program.title[locale]}</strong>
                  <small>{priceLabel(program, t)}</small>
                </div>
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    addToCart(program.id);
                  }}
                >
                  + {t.add}
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: 'var(--muted)', fontSize: '14px', padding: '8px 2px' }}>{t.noResults}</p>
          )}
        </div>
      </div>
    </div>
  );
}
