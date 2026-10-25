import type { Locale, Program, Unit } from './content';
import type { Dict } from './i18n';

export const money = (n: number) => `$${n}`;

export function lineTotal(program: Program, qty: number) {
  const unitPrice = program.priceWk && qty >= 2 ? program.priceWk : program.price;
  return unitPrice * qty;
}

export function unitText(program: Program, qty: number, t: Dict) {
  const unit = t.units[program.unit as Unit];
  return `${qty} ${qty === 1 ? unit.one : unit.other}`;
}

export function priceLabel(program: Program, t: Dict) {
  const short = t.unitShort[program.unit as Unit];
  let label = `${money(program.price)} / ${short}`;
  if (program.priceWk) {
    label += ` · ${money(program.priceWk)}${t.perWeekShort} ${t.from2weeks}`;
  }
  return label;
}

export function nextMonday9(now = new Date()) {
  const date = new Date(now);
  const day = date.getDay();
  const add = (8 - day) % 7 || 7;
  date.setDate(date.getDate() + add);
  date.setHours(9, 0, 0, 0);
  return date;
}

export function fmtLeft(ms: number) {
  if (ms < 0) ms = 0;
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = String(Math.floor((total % 86400) / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const seconds = String(total % 60).padStart(2, '0');
  return `${days > 0 ? `${days}d ` : ''}${hours}:${minutes}:${seconds}`;
}

export function emailOk(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function todayPlus(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function shareOnWhatsApp(text: string) {
  if (typeof window === 'undefined') return;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
}

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void; __ga?: boolean };
  if (w.gtag && w.__ga) w.gtag('event', event, params || {});
}

export function preferredLocale(locale: Locale) {
  return locale === 'es' ? 'es-CL' : 'en-US';
}
