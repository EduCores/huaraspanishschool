'use client';

import { useSite } from './SiteContext';

export default function OrderModal() {
  const { t, order, closeOrder, emptyBag } = useSite();
  if (!order.open) return null;

  return (
    <div className="omodal show" role="dialog" aria-modal="true" aria-label={t.orderReady}>
      <div className="omodal-card">
        <div className="ocheck">✓</div>
        <h2 style={{ textAlign: 'center', fontSize: '30px', marginBottom: '6px' }}>{t.orderReady}</h2>
        <div>
          {[t.orderStep1, t.orderStep2, t.orderStep3].map((step, index) => (
            <div className="ostep" key={step}>
              <span className="onum">{index + 1}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
        <div className="omrecap">
          {order.lines.map((line) => (
            <div key={line}>{line}</div>
          ))}
          <div style={{ marginTop: '8px', fontWeight: 800 }}>
            {t.total}: ${order.total} USD — {order.name}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
          <button
            className="btn-pill"
            style={{ background: '#25d366', color: '#fff', flex: 1, justifyContent: 'center', minWidth: '170px' }}
            onClick={() => window.open(order.url, '_blank', 'noopener')}
          >
            {t.whatsappOpen}
          </button>
          <button
            className="btn-pill btn-dark"
            style={{ flex: 1, justifyContent: 'center', minWidth: '120px' }}
            onClick={closeOrder}
          >
            {t.ok}
          </button>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button
            onClick={emptyBag}
            style={{
              background: 'none',
              border: 0,
              color: 'var(--muted)',
              font: "600 12px Inter",
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {t.emptyOrder}
          </button>
        </div>
      </div>
    </div>
  );
}
