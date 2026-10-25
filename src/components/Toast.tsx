'use client';

type Props = { message: string; show: boolean };

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export default function Toast({ message, show }: Props) {
  const html = escapeHtml(message).replace('✓', '<b class="t-check">✓</b>');
  return (
    <div
      className={`toast${show ? ' show' : ''}`}
      role="status"
      aria-live="polite"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
