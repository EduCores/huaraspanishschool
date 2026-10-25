'use client';

import Link from 'next/link';
import { useSite } from './SiteContext';

export default function Header() {
  const { locale, t, count, setCartOpen, setMenuOpen, setSearchOpen, scrolled, atBottom } =
    useSite();
  const className = [scrolled ? 'solid' : '', atBottom ? 'at-bottom' : ''].filter(Boolean).join(' ');

  return (
    <header id="siteHeader" className={className || undefined}>
      <div className="hbar">
        <div className="hleft">
          <button
            className="icon-btn"
            onClick={() => setMenuOpen(true)}
            aria-label={locale === 'es' ? 'Abrir menú' : 'Open menu'}
          >
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
          <button
            className="icon-btn"
            onClick={() => setSearchOpen(true)}
            aria-label={t.search}
          >
            <svg viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
          </button>
        </div>
        <Link className="logo" href={locale === 'es' ? '/es/' : '/'}>
          HUARA<span>°</span>
        </Link>
        <div className="hright">
          <div className="lang-mini">
            <Link className={locale === 'en' ? 'active' : undefined} href="/" hrefLang="en">
              <span>EN</span>
            </Link>
            <Link className={locale === 'es' ? 'active' : undefined} href="/es/" hrefLang="es">
              <span>ES</span>
            </Link>
          </div>
          <span style={{ opacity: 0.7 }} className="hide-m">
            {t.account}
          </span>
          <button className="bag-btn" onClick={() => setCartOpen(true)}>
            <span>{t.order}</span> (<span>{count()}</span>)
          </button>
        </div>
      </div>
    </header>
  );
}
