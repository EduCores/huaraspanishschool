'use client';

import type { CheckoutData } from '@/lib/checkout';
import { priceLabel } from '@/lib/utils';
import CheckoutForm from './CheckoutForm';
import { useSite } from './SiteContext';

type Props = {
  onCheckout: (data: CheckoutData) => void;
};

export default function Addons({ onCheckout }: Props) {
  const { c, locale, t, addToCart } = useSite();
  return (
    <div className="container split2 reveal" id="addons">
      <div className="addons">
        <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '.14em' }}>{t.addonsEyebrow}</p>
        <h2 style={{ fontSize: '36px', margin: '8px 0 6px' }}>{t.addonsHeading}</h2>
        <p style={{ fontSize: '14px', color: 'var(--muted)' }}>{t.addonsSub}</p>
        <div style={{ marginTop: '10px' }}>
          {c.programs.map((program) => (
            <div className="addon-row" key={program.id}>
              <img src={program.img} alt={program.title[locale]} />
              <div>
                <strong>{program.title[locale]}</strong>
                <small>{priceLabel(program, t)}</small>
              </div>
              <button onClick={() => addToCart(program.id)}>{t.addPlus}</button>
            </div>
          ))}
        </div>
      </div>
      <CheckoutForm onCheckout={onCheckout} />
    </div>
  );
}
