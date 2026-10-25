'use client';

import Link from 'next/link';
import { useSite } from './SiteContext';
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './Icons';

export default function MenuDrawer() {
  const { locale, c, t, menuOpen, setMenuOpen, setCartOpen, count } = useSite();
  const close = () => setMenuOpen(false);
  const base = locale === 'es' ? '/es/' : '/';

  return (
    <nav className={`mmenu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
      <button className="icon-btn" style={{ color: 'var(--ink)' }} onClick={close} aria-label={t.close}>
        ✕
      </button>
      <div style={{ marginTop: '16px' }}>
        <a className="big" href={`${base}#shop`} onClick={close}>
          {t.menuShop}
        </a>
        <a className="big" href={`${base}#modalidades`} onClick={close}>
          {t.menuModes}
        </a>
        <a className="big" href={`${base}#surf`} onClick={close}>
          {t.menuSurf}
        </a>
        <a className="big" href={`${base}#addons`} onClick={close}>
          {t.menuPrices}
        </a>
        <a className="big" href={`${base}#faq`} onClick={close}>
          {t.menuFaq}
        </a>
      </div>
      <div className="m-lang">
        <Link className={locale === 'en' ? 'active' : undefined} href="/" hrefLang="en">
          EN
        </Link>
        <Link className={locale === 'es' ? 'active' : undefined} href="/es/" hrefLang="es">
          ES
        </Link>
      </div>
      <p style={{ marginTop: '20px', fontSize: '13px', color: 'var(--muted)' }}>
        Pichilemu, Chile
        <br />
        <a
          href={`https://wa.me/${c.contact.whatsapp}`}
          target="_blank"
          rel="noopener"
          style={{ color: 'inherit' }}
        >
          WhatsApp {c.contact.phoneDisplay}
        </a>
      </p>
      <div className="social-row" style={{ marginTop: '12px' }}>
        <a
          className="soc-d"
          href={c.social.instagram}
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
        <a
          className="soc-d"
          href={c.social.facebook}
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          className="soc-d"
          href={`https://wa.me/${c.contact.whatsapp}`}
          target="_blank"
          rel="noopener"
          aria-label={t.whatsapp}
        >
          <WhatsAppIcon />
        </a>
      </div>
      <button
        className="btn-pill btn-dark"
        style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}
        onClick={() => {
          close();
          setCartOpen(true);
        }}
      >
        {t.order} ( <span>{count()}</span> ) →
      </button>
    </nav>
  );
}
