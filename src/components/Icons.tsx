import type { CSSProperties } from 'react';

type IconProps = { className?: string; style?: CSSProperties };

export function ChatIcon({ style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={style}>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8 9h8M8 12.5h5" />
    </svg>
  );
}

export function PotIcon({ style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={style}>
      <path d="M4 17h16" />
      <path d="M12 8a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8z" />
      <circle cx="12" cy="5.5" r="1.2" />
    </svg>
  );
}

export function BagIcon({ style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={style}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function CompassIcon({ style }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" style={style}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2z" />
    </svg>
  );
}

export function InstagramIcon({ stroke = 'currentColor', fill = 'none' }: { stroke?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.2" fill={stroke} stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ fill = 'currentColor' }: { fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} aria-hidden="true">
      <path d="M14 8.5V7c0-.8.2-1.5 1.5-1.5H17V2.5h-2.5C11.7 2.5 11 4.3 11 7v1.5H9V12h2v9.5h3V12h2.3l.7-3.5H14z" />
    </svg>
  );
}

export function WhatsAppIcon({ fill = 'currentColor', style }: { fill?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill} style={style} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3A2.5 2.5 0 0 1 17.5 19C9.5 19 5 14.5 5 6.5A2.5 2.5 0 0 1 6.5 3z" />
    </svg>
  );
}