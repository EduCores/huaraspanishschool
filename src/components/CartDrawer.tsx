'use client';

import { lineTotal, priceLabel, unitText } from '@/lib/utils';
import { useSite } from './SiteContext';

export default function CartDrawer() {
  const { c, locale, t, cart, cartOpen, setCartOpen, count, totals, changeQty } = useSite();
  const ids = Object.keys(cart);

  const goCheckout = () => {
    setCartOpen(false);
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className={`cart-drawer${cartOpen ? ' open' : ''}`} aria-hidden={!cartOpen}>
      <div className="cd-head">
        <span>
          {t.cartYourOrder} (<span>{count()}</span>)
        </span>
        <button className="icon-btn" onClick={() => setCartOpen(false)} aria-label={t.close}>
          ✕
        </button>
      </div>
      <div className="cd-body">
        {ids.length ? (
          ids.map((id) => {
            const program = c.programs.find((item) => item.id === id);
            if (!program) return null;
            const qty = cart[id];
            return (
              <div className="citem" key={id}>
                <img src={program.img} alt={program.title[locale]} />
                <div>
                  <strong style={{ fontSize: '17px' }}>{program.title[locale]}</strong>
                  <br />
                  <small style={{ color: 'var(--muted)' }}>{priceLabel(program, t)}</small>
                  <br />
                  <span className="qty">
                    <button onClick={() => changeQty(id, -1)} aria-label="-">-</button>
                    <b style={{ padding: '0 8px' }}>{unitText(program, qty, t)}</b>
                    <button onClick={() => changeQty(id, 1)} aria-label="+">+</button>
                  </span>
                </div>
                <b>${lineTotal(program, qty)}</b>
              </div>
            );
          })
        ) : (
          <p style={{ color: 'var(--muted)', fontSize: '15px' }}>{t.cartEmpty}</p>
        )}
      </div>
      <div className="cd-foot">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: "'Archivo'",
            fontWeight: 800,
            fontSize: '24px',
          }}
        >
          <span>{t.subtotal}</span>
          <span>${totals()}</span>
        </div>
        <button
          className="btn-pill btn-dark"
          style={{ width: '100%', justifyContent: 'center', marginTop: '12px' }}
          onClick={goCheckout}
        >
          {t.checkoutDrawer}
        </button>
      </div>
    </aside>
  );
}
