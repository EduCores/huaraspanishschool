'use client';

import { useEffect, useState } from 'react';
import { useSite } from './SiteContext';
import Newsletter from './Newsletter';
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from './Icons';

export default function Footer() {
  const { c, locale, t } = useSite();
  const [year, setYear] = useState<number | null>(null);
  const letters = ['H', 'U', 'A', 'R', 'A', '°'];

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer>
      <video className="foot-video" autoPlay muted loop playsInline preload="auto">
        <source src="/1.mp4" type="video/mp4" />
      </video>
      <div className="container foot-grid">
        <div>
          <h4 style={{ fontFamily: "'Archivo'", fontSize: '28px' }}>
            HUARA<span style={{ color: 'var(--accent)' }}>°</span>
          </h4>
          <p style={{ fontSize: '13px', opacity: 0.7 }}>{t.footerTagline}</p>
          <div style={{ marginTop: '12px' }}>
            <div className="contact-line">
              <i>
                <MapPinIcon />
              </i>
              <a href={c.contact.mapsUrl} target="_blank" rel="noopener">
                {c.contact.address}
              </a>
            </div>
            <div className="contact-line">
              <i>
                <ClockIcon />
              </i>
              <span>{c.contact.hours[locale]}</span>
            </div>
            <div className="contact-line">
              <i>
                <PhoneIcon />
              </i>
              <a href={`https://wa.me/${c.contact.whatsapp}`} target="_blank" rel="noopener">
                {c.contact.phoneDisplay}
              </a>
            </div>
          </div>
          <div className="social-row">
            <a
              className="soc"
              href={c.social.instagram}
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <InstagramIcon stroke="#fff" />
            </a>
            <a
              className="soc"
              href={c.social.facebook}
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <FacebookIcon fill="#fff" />
            </a>
            <a
              className="soc"
              href={`https://wa.me/${c.contact.whatsapp}`}
              target="_blank"
              rel="noopener"
              aria-label={t.whatsapp}
            >
              <WhatsAppIcon fill="#fff" />
            </a>
          </div>
        </div>
        <div>
          <h4>{t.footerSchool}</h4>
          <a href="#shop" style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
            {t.allPrograms}
          </a>
          <a href="#surf" style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
            {t.menuSurf}
          </a>
          <a href="#metodo" style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
            {t.method}
          </a>
          <a href="#casa" style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
            {t.community}
          </a>
        </div>
        <div>
          <h4>{t.footerLegal}</h4>
          <a href={c.legal.privacy} style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
            {t.privacy}
          </a>
          <a href={c.legal.cookies} style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
            {t.cookies}
          </a>
          <a href={c.legal.terms} style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
            {t.terms}
          </a>
          <div style={{ marginTop: '16px' }}>
            <h4>{t.footerHelp}</h4>
            <a href="#faq" style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
              {t.menuFaq}
            </a>
            <a href="#booking" style={{ display: 'block', fontSize: '13px', opacity: 0.7, padding: '3px 0' }}>
              {t.bookNow}
            </a>
          </div>
        </div>
        <div>
          <Newsletter />
        </div>
      </div>
      <div className="container pay-strip">
        <span>🔒 {t.securePayment}</span>
        {c.footer.methods.map((method) => (
          <span key={method}>{method}</span>
        ))}
      </div>
      <div className="giant" aria-label="HUARA°">
        {letters.map((letter, index) => (
          <span key={`${letter}-${index}`} className={index === letters.length - 1 ? 'deg' : undefined}>
            {letter}
          </span>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: '11px', opacity: 0.5, padding: '0 16px' }} suppressHydrationWarning>
        © {year ?? ''} Huara Spanish School
      </p>
    </footer>
  );
}
