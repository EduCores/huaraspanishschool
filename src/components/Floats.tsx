'use client';

import { useEffect, useState } from 'react';
import { useSite } from './SiteContext';
import { WhatsAppIcon } from './Icons';

export default function Floats() {
  const { c, locale, atBottom, t } = useSite();
  const [showTop, setShowTop] = useState(false);
  const message = locale === 'es' ? t.waFloatMessageEs : t.waFloatMessage;
  const lifted = atBottom ? ' lifted' : '';

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <button
        className={`top-btn${showTop ? ' show' : ''}${lifted}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={locale === 'es' ? 'Subir' : 'Back to top'}
      >
        ↑
      </button>
      <a
        className={`wa-float${lifted}`}
        href={`https://wa.me/${c.contact.whatsapp}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener"
        aria-label={t.whatsapp}
      >
        <WhatsAppIcon />
      </a>
    </>
  );
}
