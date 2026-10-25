'use client';

import { useSite } from './SiteContext';

export default function Faq() {
  const { c, locale, t } = useSite();
  return (
    <div className="faq container reveal" id="faq">
      <h2 style={{ fontSize: '36px', textAlign: 'center', marginBottom: '10px' }}>{t.faqHeading}</h2>
      {c.faq.map((item, index) => (
        <details key={index} open={index === 0}>
          <summary>
            {item.q[locale]} <span />
          </summary>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginTop: '8px' }}>{item.a[locale]}</p>
        </details>
      ))}
    </div>
  );
}
