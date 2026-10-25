import { createClient } from '@sanity/client';
import {
  DEFAULT_CONTENT,
  type CommunityPhoto,
  type EditorialCard,
  type FaqItem,
  type L,
  type LookbookImage,
  type MethodItem,
  type Program,
  type Review,
  type SiteOverrides,
} from './content';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01';

const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

const QUERY = /* groq */ `{
  "programs": *[_type == "program"] | order(order asc) {
    id, order, cat, badge, bc, tag, unit, title, desc, price, priceWk,
    "img": img.asset->url, colors, startDays, spots
  },
  "reviews": *[_type == "review"] | order(order asc) { id, author, meta, quote, source, order },
  "faq": *[_type == "faq"] | order(order asc) { q, a, order },
  "story": *[_id == "story"][0] {
    eyebrow, "paragraphsEn": paragraphsEn, "paragraphsEs": paragraphsEs, sign, name
  },
  "lookbook": *[_id == "lookbook"][0] {
    "h": h[].asset->url, "v": v[].asset->url
  },
  "siteSettings": *[_id == "siteSettings"][0] {
    siteName, domain, surfTarget,
    hero { eyebrow, title1, title2, sub, cta1, cta2, "img": img.asset->url },
    promo,
    marquee,
    method { num, icon, title, desc },
    editorial { eyebrow, title, text, "img": img.asset->url, programId },
    surf { eyebrow, title, desc, "img": img.asset->url, programId },
    community {
      eyebrow, heading,
      photos[] { "src": image.asset->url, alt, caption },
      instagram[] { "src": image.asset->url, alt },
      facebook
    },
    footer { tagline, payment, methods },
    legal { privacy, cookies, terms },
    contact { address, phone, phoneDisplay, whatsapp, hours, mapsUrl },
    social { instagram, facebook },
    reviewsInfo { score, count, googleUrl, writeUrl, placeId }
  }
}`;

const isL = (value: unknown): value is L =>
  !!value &&
  typeof value === 'object' &&
  typeof (value as L).en === 'string' &&
  typeof (value as L).es === 'string';

const str = (value: unknown) => (typeof value === 'string' && value.trim() ? value : undefined);
const num = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : undefined);
const list = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);

export async function fetchSanityContent(): Promise<SiteOverrides | null> {
  if (!client) return null;
  try {
    const raw = await client.fetch<Record<string, unknown>>(QUERY);
    if (!raw || typeof raw !== 'object') return null;
    const override: SiteOverrides = {};
    const settings = raw.siteSettings as Record<string, unknown> | undefined;

    const programs = list<Record<string, unknown>>(raw.programs)
      .map((item): Program | null => {
        const id = str(item.id);
        const title = isL(item.title) ? item.title : null;
        const desc = isL(item.desc) ? item.desc : null;
        const tag = isL(item.tag) ? item.tag : null;
        if (!id || !title || !desc || !tag) return null;
        const fallback = DEFAULT_CONTENT.programs.find((program) => program.id === id);
        const cat = item.cat === 'online' || item.cat === 'surf' ? item.cat : 'presencial';
        const unit = item.unit === 'hour' || item.unit === 'month' ? item.unit : 'week';
        const price = num(item.price) ?? fallback?.price ?? 0;
        const priceWk = num(item.priceWk);
        const colors = list<string>(item.colors).filter((color) => typeof color === 'string');
        return {
          id,
          cat,
          badge: isL(item.badge) ? item.badge : (fallback?.badge ?? { en: '', es: '' }),
          bc: item.bc === 'sand' ? 'sand' : 'orange',
          tag,
          unit,
          title,
          desc,
          price,
          ...(priceWk !== undefined ? { priceWk } : {}),
          img: str(item.img) ?? fallback?.img ?? DEFAULT_CONTENT.programs[0].img,
          colors: colors.length ? colors : (fallback?.colors ?? ['#1c6e8c', '#c3623f']),
          startDays: num(item.startDays) ?? fallback?.startDays ?? 4,
          spots: num(item.spots) ?? fallback?.spots ?? 3,
        };
      })
      .filter((item): item is Program => !!item);
    if (programs.length) override.programs = programs;

    const reviews = list<Record<string, unknown>>(raw.reviews)
      .map((item, index): Review | null => {
        if (!isL(item.author) || !str(item.quote)) return null;
        return {
          id: str(item.id) ?? `r${index + 1}`,
          author: item.author,
          meta: isL(item.meta)
            ? item.meta
            : { en: 'Google review · 5 stars', es: 'Reseña en Google · 5 estrellas' },
          quote: str(item.quote)!,
          source: item.source === 'Instagram' ? 'Instagram' : 'Google',
        };
      })
      .filter((item): item is Review => !!item);
    if (reviews.length) {
      override.community = { ...DEFAULT_CONTENT.community, reviews };
    }

    const faq = list<Record<string, unknown>>(raw.faq)
      .map((item): FaqItem | null => (isL(item.q) && isL(item.a) ? { q: item.q, a: item.a } : null))
      .filter((item): item is FaqItem => !!item);
    if (faq.length) override.faq = faq;

    const story = raw.story as Record<string, unknown> | undefined;
    if (story && isL(story.eyebrow) && isL(story.sign)) {
      const en = list<unknown>(story.paragraphsEn).filter((item): item is string => typeof item === 'string');
      const es = list<unknown>(story.paragraphsEs).filter((item): item is string => typeof item === 'string');
      if (en.length && es.length) {
        override.story = {
          eyebrow: story.eyebrow,
          paragraphs: { en, es },
          sign: story.sign,
          name: str(story.name) ?? DEFAULT_CONTENT.story.name,
        };
      }
    }

    const lookbook = raw.lookbook as Record<string, unknown> | undefined;
    if (lookbook) {
      const h = list<unknown>(lookbook.h).filter((item): item is string => typeof item === 'string');
      const v = list<unknown>(lookbook.v).filter((item): item is string => typeof item === 'string');
      if (h.length || v.length) {
        override.lookbook = {
          h: h.length
            ? h.map((src, index): LookbookImage => ({ src, alt: `Huara Spanish School ${index + 1}` }))
            : DEFAULT_CONTENT.lookbook.h,
          v: v.length
            ? v.map((src, index): LookbookImage => ({ src, alt: `Huara Spanish School ${index + 1}` }))
            : DEFAULT_CONTENT.lookbook.v,
        };
      }
    }

    if (settings) {
      const siteName = str(settings.siteName);
      const domain = str(settings.domain);
      const surfTarget = str(settings.surfTarget);
      if (siteName) override.siteName = siteName;
      if (domain) override.domain = domain;
      if (surfTarget) override.surfTarget = surfTarget;

      const heroRaw = settings.hero as Record<string, unknown> | undefined;
      if (heroRaw) {
        override.hero = {
          ...DEFAULT_CONTENT.hero,
          ...(isL(heroRaw.eyebrow) ? { eyebrow: heroRaw.eyebrow } : {}),
          ...(isL(heroRaw.title1) ? { title1: heroRaw.title1 } : {}),
          ...(isL(heroRaw.title2) ? { title2: heroRaw.title2 } : {}),
          ...(isL(heroRaw.sub) ? { sub: heroRaw.sub } : {}),
          ...(isL(heroRaw.cta1) ? { cta1: heroRaw.cta1 } : {}),
          ...(isL(heroRaw.cta2) ? { cta2: heroRaw.cta2 } : {}),
          ...(str(heroRaw.img) ? { img: str(heroRaw.img)! } : {}),
        };
      }

      const promo = list<unknown>(settings.promo)
        .map((item) => (isL(item) ? item : null))
        .filter((item): item is L => !!item);
      if (promo.length) override.promo = promo;

      const marquee = list<unknown>(settings.marquee).filter(
        (item): item is string => typeof item === 'string',
      );
      if (marquee.length) override.marquee = marquee;

      const method = list<Record<string, unknown>>(settings.method)
        .map((item): MethodItem | null => {
          if (!isL(item.title) || !isL(item.desc)) return null;
          const icon = item.icon === 'pot' || item.icon === 'bag' || item.icon === 'compass' ? item.icon : 'chat';
          return { num: str(item.num) ?? '', icon, title: item.title, desc: item.desc };
        })
        .filter((item): item is MethodItem => !!item);
      if (method.length) override.method = method;

      const editorial = list<Record<string, unknown>>(settings.editorial)
        .map((item, index): EditorialCard | null => {
          if (!isL(item.eyebrow) || !isL(item.title) || !isL(item.text)) return null;
          const fallback = DEFAULT_CONTENT.editorial[index];
          return {
            eyebrow: item.eyebrow,
            title: item.title,
            text: item.text,
            img: str(item.img) ?? fallback?.img ?? DEFAULT_CONTENT.editorial[0].img,
            programId: str(item.programId) ?? fallback?.programId ?? 'group',
          };
        })
        .filter((item): item is EditorialCard => !!item);
      if (editorial.length) override.editorial = editorial;

      const surfRaw = settings.surf as Record<string, unknown> | undefined;
      if (surfRaw) {
        override.surf = {
          ...DEFAULT_CONTENT.surf,
          ...(isL(surfRaw.eyebrow) ? { eyebrow: surfRaw.eyebrow } : {}),
          ...(isL(surfRaw.title) ? { title: surfRaw.title } : {}),
          ...(isL(surfRaw.desc) ? { desc: surfRaw.desc } : {}),
          ...(str(surfRaw.img) ? { img: str(surfRaw.img)! } : {}),
          ...(str(surfRaw.programId) ? { programId: str(surfRaw.programId)! } : {}),
        };
      }

      const communityRaw = settings.community as Record<string, unknown> | undefined;
      if (communityRaw) {
        const photos = list<Record<string, unknown>>(communityRaw.photos)
          .map((photo): CommunityPhoto | null => {
            const src = str(photo.src);
            if (!src) return null;
            return {
              src,
              alt: str(photo.alt) ?? 'Huara Spanish School',
              caption: isL(photo.caption) ? photo.caption : { en: '', es: '' },
            };
          })
          .filter((photo): photo is CommunityPhoto => !!photo);
        const instagram = list<Record<string, unknown>>(communityRaw.instagram)
          .map((photo): LookbookImage | null => {
            const src = str(photo.src);
            if (!src) return null;
            return { src, alt: str(photo.alt) ?? 'Huara Spanish School' };
          })
          .filter((photo): photo is LookbookImage => !!photo);
        const facebook = list<unknown>(communityRaw.facebook).filter(
          (url): url is string => typeof url === 'string' && url.startsWith('http'),
        );
        override.community = {
          ...(override.community ?? DEFAULT_CONTENT.community),
          ...(isL(communityRaw.eyebrow) ? { eyebrow: communityRaw.eyebrow } : {}),
          ...(isL(communityRaw.heading) ? { heading: communityRaw.heading } : {}),
          ...(photos.length ? { photos } : {}),
          ...(instagram.length ? { instagram } : {}),
          ...(facebook.length ? { facebook } : {}),
        };
      }

      const footerRaw = settings.footer as Record<string, unknown> | undefined;
      if (footerRaw) {
        override.footer = {
          ...DEFAULT_CONTENT.footer,
          ...(isL(footerRaw.tagline) ? { tagline: footerRaw.tagline } : {}),
          ...(isL(footerRaw.payment) ? { payment: footerRaw.payment } : {}),
          ...(list<unknown>(footerRaw.methods).some((item) => typeof item === 'string')
            ? {
                methods: list<unknown>(footerRaw.methods).filter(
                  (item): item is string => typeof item === 'string',
                ),
              }
            : {}),
        };
      }

      const legalRaw = settings.legal as Record<string, unknown> | undefined;
      if (legalRaw) {
        override.legal = {
          ...DEFAULT_CONTENT.legal,
          ...(str(legalRaw.privacy) ? { privacy: str(legalRaw.privacy)! } : {}),
          ...(str(legalRaw.cookies) ? { cookies: str(legalRaw.cookies)! } : {}),
          ...(str(legalRaw.terms) ? { terms: str(legalRaw.terms)! } : {}),
        };
      }

      const contactRaw = settings.contact as Record<string, unknown> | undefined;
      if (contactRaw) {
        override.contact = {
          ...DEFAULT_CONTENT.contact,
          ...(str(contactRaw.address) ? { address: str(contactRaw.address)! } : {}),
          ...(str(contactRaw.phone) ? { phone: str(contactRaw.phone)! } : {}),
          ...(str(contactRaw.phoneDisplay) ? { phoneDisplay: str(contactRaw.phoneDisplay)! } : {}),
          ...(str(contactRaw.whatsapp) ? { whatsapp: str(contactRaw.whatsapp)! } : {}),
          ...(isL(contactRaw.hours) ? { hours: contactRaw.hours } : {}),
          ...(str(contactRaw.mapsUrl) ? { mapsUrl: str(contactRaw.mapsUrl)! } : {}),
        };
      }

      const socialRaw = settings.social as Record<string, unknown> | undefined;
      if (socialRaw) {
        override.social = {
          ...DEFAULT_CONTENT.social,
          ...(str(socialRaw.instagram) ? { instagram: str(socialRaw.instagram)! } : {}),
          ...(str(socialRaw.facebook) ? { facebook: str(socialRaw.facebook)! } : {}),
        };
      }

      const reviewsRaw = settings.reviewsInfo as Record<string, unknown> | undefined;
      if (reviewsRaw) {
        override.reviews = {
          ...DEFAULT_CONTENT.reviews,
          ...(num(reviewsRaw.score) !== undefined ? { score: num(reviewsRaw.score)! } : {}),
          ...(num(reviewsRaw.count) !== undefined ? { count: num(reviewsRaw.count)! } : {}),
          ...(str(reviewsRaw.googleUrl) ? { googleUrl: str(reviewsRaw.googleUrl)! } : {}),
          ...(str(reviewsRaw.writeUrl) ? { writeUrl: str(reviewsRaw.writeUrl)! } : {}),
          ...(str(reviewsRaw.placeId) ? { placeId: str(reviewsRaw.placeId)! } : {}),
        };
      }
    }

    return Object.keys(override).length ? override : null;
  } catch (error) {
    console.warn(
      '[sanity] fetch failed, using local content:',
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

export const sanityDatasetName = dataset;
