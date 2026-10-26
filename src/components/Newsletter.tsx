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
      style={{ padding: '24px', textAlign: 'center' }}
    >
      <h4 style={{ margin: '0 0 6px', fontFamily: "'Archivo'" }}>Newletter</h4>
      <p style={{ margin: '0 0 12px', fontSize: '13px', opacity: 0.7, display: 'block', padding: '3px 0' }}>Receive news and offers directly in your email.</p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', margin: '0' }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{ flex: '2', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '13px', opacity: 0.7, minWidth: 0 }}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{ padding: '10px 18px', background: '#ff4d00', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
        >
          {status === 'loading' ? 'Sending...' : 'Subscribe'}
        </button>
      </form>
      {status === 'success' && <p style={{ color: 'green', marginTop: '8px' }}>Subscription successful!</p>}
      {status === 'error' && <p style={{ color: 'red', marginTop: '8px' }}>Error, try again.</p>}
    </div>
  );
}
