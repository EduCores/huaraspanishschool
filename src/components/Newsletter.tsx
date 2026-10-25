'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div
      style={{ padding: '24px', textAlign: 'center', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}
    >
      <h3 style={{ margin: '0 0 6px' }}>Newletter</h3>
      <p style={{ margin: '0 0 12px', opacity: 0.8 }}>Receive news and offers directly in your email.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px' }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{ padding: '10px 18px', background: '#ff4d00', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}
        >
          {status === 'loading' ? 'Sending...' : 'Subscribe'}
        </button>
      </form>
      {status === 'success' && <p style={{ color: 'green', marginTop: '8px' }}>Subscription successful!</p>}
      {status === 'error' && <p style={{ color: 'red', marginTop: '8px' }}>Error, try again.</p>}
    </div>
  );
}
