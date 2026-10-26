'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DEFAULT_CONTENT,
  type Locale,
  type SiteOverrides,
} from '@/lib/content';
import type { CheckoutData } from '@/lib/checkout';
import { getDict } from '@/lib/i18n';
import { lineTotal, nextMonday9, track, unitText } from '@/lib/utils';
import { SiteProvider, type Consent, type OrderInfo } from './SiteContext';

import PromoBar from './PromoBar';
import Header from './Header';
import SearchPanel from './SearchPanel';
import MenuDrawer from './MenuDrawer';
import Hero from './Hero';
import BigMarquee from './BigMarquee';
import Shop from './Shop';
import Editorial from './Editorial';
import Method from './Method';
import Surf from './Surf';
import Addons from './Addons';
import Lookbook from './Lookbook';
import Story from './Story';
import Community from './Community';
import Faq from './Faq';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import QuickView from './QuickView';
import OrderModal from './OrderModal';
import Lightbox from './Lightbox';
import Floats from './Floats';
import Toast from './Toast';
import CookieBar from './CookieBar';

const CART_KEY = 'huara_cart_v2';
const CONSENT_KEY = 'huara_consent_v1';

type Props = {
  locale: Locale;
  content?: SiteOverrides;
};

export default function Site({ locale, content }: Props) {
  const c = useMemo(() => ({ ...DEFAULT_CONTENT, ...content }), [content]);
  const t = useMemo(() => getDict(locale), [locale]);
  const all = c.programs;

  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartReady, setCartReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [qvId, setQvId] = useState<string | null>(null);
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [order, setOrder] = useState<OrderInfo>({
    open: false,
    url: '',
    lines: [],
    total: 0,
    name: '',
  });
  const [toastMsg, setToastMsg] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [now, setNow] = useState(0);
  const [startAt, setStartAt] = useState<Record<string, number>>({});
  const [surfTarget, setSurfTarget] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [consent, setConsentState] = useState<Consent>(null);
  const [consentReady, setConsentReady] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);

  const toast = useCallback((message: string) => {
    setToastMsg(message);
    setToastOn(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 2600);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      if (parsed && typeof parsed === 'object') {
        const valid: Record<string, number> = {};
        Object.entries(parsed).forEach(([id, qty]) => {
          if (all.some((p) => p.id === id) && Number.isFinite(Number(qty)) && Number(qty) > 0) {
            valid[id] = Number(qty);
          }
        });
        setCart(valid);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setCartReady(true);
  }, [all]);

  useEffect(() => {
    if (!cartReady) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage may be unavailable */
    }
  }, [cart, cartReady]);

  useEffect(() => {
    const base = Date.now();
    const targets: Record<string, number> = {};
    c.programs.forEach((program) => {
      targets[program.id] = base + program.startDays * 864e5;
    });
    setStartAt(targets);
    setNow(base);
    const configured = c.surfTarget ? new Date(c.surfTarget).getTime() : 0;
    setSurfTarget(configured > base ? configured : nextMonday9().getTime());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [c.programs, c.surfTarget]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.55);
      setAtBottom(
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 140,
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === 'yes' || stored === 'no') setConsentState(stored);
    } catch {
      /* ignore */
    }
    setConsentReady(true);
  }, []);

  useEffect(() => {
    if (consent !== 'yes' || !c.analyticsId) return;
    const w = window as typeof window & {
      __ga?: boolean;
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    };
    if (w.__ga) return;
    w.__ga = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${c.analyticsId}`;
    document.head.appendChild(script);
    w.dataLayer = w.dataLayer || [];
    w.gtag = (...args: unknown[]) => {
      w.dataLayer?.push(args);
    };
    w.gtag('js', new Date());
    w.gtag('config', c.analyticsId, { anonymize_ip: true });
  }, [consent, c.analyticsId]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const link = target?.closest?.('a[href*="wa.me"]') as HTMLAnchorElement | null;
      if (link) track('whatsapp_click', { link_url: link.href });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const setConsent = useCallback((value: Consent) => {
    setConsentState(value);
    setCookieOpen(false);
    try {
      if (value) localStorage.setItem(CONSENT_KEY, value);
      else localStorage.removeItem(CONSENT_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const count = useCallback(() => Object.keys(cart).length, [cart]);

  const totals = useCallback(
    () =>
      Object.entries(cart).reduce((sum, [id, qty]) => {
        const program = all.find((item) => item.id === id);
        return sum + (program ? lineTotal(program, qty) : 0);
      }, 0),
    [all, cart],
  );

  const addToCart = useCallback(
    (id: string) => {
      const program = all.find((item) => item.id === id);
      if (!program) return;
      setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
      setCartOpen(true);
      toast(t.added + program.title[locale]);
      track('add_to_cart', { item_id: id, currency: 'USD', value: program.price });
    },
    [all, locale, t, toast],
  );

  const changeQty = useCallback((id: string, delta: number) => {
    setCart((current) => {
      const next = { ...current };
      const qty = (next[id] || 0) + delta;
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setCartOpen(false);
    setSearchOpen(false);
    setQvId(null);
    setOrder((current) => ({ ...current, open: false }));
    setLbOpen(false);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  const emptyBag = useCallback(() => {
    setCart({});
    setOrder((current) => ({ ...current, open: false }));
  }, []);

  const lbSrcs = useMemo(
    () => Array.from(new Set([...c.lookbook.h.map((item) => item.src), ...c.lookbook.v.map((item) => item.src)])),
    [c.lookbook],
  );

  const openLB = useCallback(
    (src: string) => {
      setLbIndex(Math.max(0, lbSrcs.indexOf(src)));
      setLbOpen(true);
    },
    [lbSrcs],
  );

  const lbNav = useCallback(
    (delta: number) => {
      if (!lbSrcs.length) return;
      setLbIndex((index) => (index + delta + lbSrcs.length) % lbSrcs.length);
    },
    [lbSrcs.length],
  );

  const checkout = useCallback(
    (data: CheckoutData) => {
      if (!count()) {
        toast(t.orderEmptyCheckout);
        return;
      }
      const total = totals();
      const lines = Object.entries(cart).map(([id, qty]) => {
        const program = all.find((item) => item.id === id)!;
        return `- ${program.title[locale]} · ${unitText(program, qty, t)} ($${lineTotal(program, qty)})`;
      });
      let extra = `${data.modalityLabel} · ${t.waLevel}${data.levelLabel}`;
      if (data.isPres) extra += ` · ${t.waClasses}${data.acc}`;
      else extra += ` · ${data.prog} · ${data.tz}`;
      const hello = locale === 'es' ? t.waHelloEs : t.waHello;
      const message =
        `${hello}\n${lines.join('\n')}\nTotal: $${total} USD\n— ${data.name} (${data.email})\n` +
        `${t.waStart}${data.date} · ${extra}` +
        (data.notes ? `\n${t.waNotes}${data.notes}` : '');
      const url = `https://wa.me/${c.contact.whatsapp}?text=${encodeURIComponent(message)}`;
      track('booking_request', { value: total, currency: 'USD' });
      window.open(url, '_blank', 'noopener');
      setOrder({ open: true, url, lines, total, name: data.name });
    },
    [all, c.contact.whatsapp, cart, count, locale, t, toast, totals],
  );

  const showCookieBar = consentReady && (consent === null || cookieOpen);
  const openCookieSettings = useCallback(() => setCookieOpen(true), []);

  const value = {
    locale,
    c,
    t,
    cart,
    addToCart,
    changeQty,
    totals,
    count,
    menuOpen,
    setMenuOpen,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
    qvId,
    openQV: setQvId,
    closeQV: () => setQvId(null),
    lbOpen,
    lbSrcs,
    lbIndex,
    openLB,
    closeLB: () => setLbOpen(false),
    lbNav,
    order,
    closeOrder: () => setOrder((current) => ({ ...current, open: false })),
    emptyBag,
    toast,
    filter,
    setFilter,
    now,
    startAt,
    surfTarget,
    scrolled,
    atBottom,
    consent,
    consentReady,
    setConsent,
    showCookieBar,
    openCookieSettings,
  };

  return (
    <SiteProvider value={value}>
      <PromoBar />
      <Header />
      <SearchPanel />
      <div
        className={`overlay${menuOpen || cartOpen ? ' show' : ''}`}
        onClick={() => {
          setMenuOpen(false);
          setCartOpen(false);
        }}
      />
        <Hero />
        <BigMarquee />
      <MenuDrawer />
      <main>
        <Hero />
        <BigMarquee />
        <Shop />
        <Editorial />
        <Method />
        <Surf />
        <Addons onCheckout={checkout} />
        <Lookbook />
        <Story />
        <Community />
        <Faq />
        <BigMarquee />
      </main>
      <Footer />
      <CartDrawer />
      <QuickView />
      <OrderModal />
      <Lightbox />
      <Floats />
      <Toast message={toastMsg} show={toastOn} />
      <CookieBar />
    </SiteProvider>
  );
}
