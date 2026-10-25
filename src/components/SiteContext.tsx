'use client';

import { createContext, useContext } from 'react';
import type { Locale, SiteContent } from '@/lib/content';
import type { Dict } from '@/lib/i18n';

export type Cart = Record<string, number>;

export type OrderInfo = {
  open: boolean;
  url: string;
  lines: string[];
  total: number;
  name: string;
};

export type Consent = 'yes' | 'no' | null;

export type SiteCtxValue = {
  locale: Locale;
  c: SiteContent;
  t: Dict;
  cart: Cart;
  addToCart: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  totals: () => number;
  count: () => number;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  qvId: string | null;
  openQV: (id: string) => void;
  closeQV: () => void;
  lbOpen: boolean;
  lbSrcs: string[];
  lbIndex: number;
  openLB: (src: string) => void;
  closeLB: () => void;
  lbNav: (delta: number) => void;
  order: OrderInfo;
  closeOrder: () => void;
  emptyBag: () => void;
  toast: (message: string) => void;
  filter: string;
  setFilter: (filter: string) => void;
  now: number;
  startAt: Record<string, number>;
  surfTarget: number;
  scrolled: boolean;
  atBottom: boolean;
  consent: Consent;
  consentReady: boolean;
  setConsent: (value: Consent) => void;
  showCookieBar: boolean;
  openCookieSettings: () => void;
};

const SiteCtx = createContext<SiteCtxValue | null>(null);

export const SiteProvider = SiteCtx.Provider;

export function useSite() {
  const ctx = useContext(SiteCtx);
  if (!ctx) throw new Error('useSite must be used inside SiteProvider');
  return ctx;
}
