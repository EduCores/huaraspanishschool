'use client';

import { useSite } from './SiteContext';

export default function PromoBar() {
  const { c, locale } = useSite();
  const items = [...c.promo, ...c.promo];
  return (
    <div className="promo">
      <div className="promo-track">
        {items.map((item, index) => (
          <span key={`${index}-${item[locale]}`}>{item[locale]}</span>
        ))}
      </div>
    </div>
  );
}
