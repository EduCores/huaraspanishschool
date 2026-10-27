/**
 * Sincroniza el contenido de Sanity (proyecto n6lxjxkf / dataset production)
 * con el contenido del sitio (src/lib/content.ts), incluyendo imágenes.
 *
 * Uso (2 pasos desde la raíz del proyecto):
 *   1) npx tsc src/lib/content.ts --outDir scripts/.tmp-content --module commonjs --target es2020 --skipLibCheck
 *   2) node scripts/sync-sanity.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createClient } from '@sanity/client';

const require = createRequire(import.meta.url);
const { DEFAULT_CONTENT } = require('./.tmp-content/content.js');

// Token del CLI de Sanity (sesión del admin del proyecto)
const cfgPath = path.join(process.env.USERPROFILE, '.config', 'sanity', 'config.json');
const token = JSON.parse(fs.readFileSync(cfgPath, 'utf8')).authToken;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'n6lxjxkf';
const client = createClient({
  projectId,
  dataset: 'production',
  token,
  useCdn: false,
  apiVersion: '2025-01-01',
});

const PUBLIC_DIR = path.resolve('./public');

// ---------- subida de imágenes ----------
const cache = new Map();
let pending = Promise.resolve();

async function uploadAsset(relPath) {
  if (cache.has(relPath)) return cache.get(relPath);
  const run = async () => {
    const abs = path.join(PUBLIC_DIR, relPath.replace(/^\//, ''));
    if (!fs.existsSync(abs)) throw new Error(`No existe la imagen: ${abs}`);
    const asset = await client.assets.upload('image', fs.readFileSync(abs), {
      filename: path.basename(abs),
    });
    cache.set(relPath, asset._id);
    console.log(`  ✓ subida ${relPath}`);
    return asset._id;
  };
  const result = pending.then(run, run);
  pending = result.catch(() => {});
  return result;
}
const imgRef = async (p) => ({ _type: 'image', asset: { _ref: await uploadAsset(p) } });

// ---------- documentos ----------
const bil = (l, type) => (l ? { _type: type, en: l.en, es: l.es } : undefined);

async function buildDocuments() {
  const docs = [];
  const C = DEFAULT_CONTENT;

  // siteSettings
  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: C.siteName,
    domain: C.domain,
    surfTarget: C.surfTarget ?? null,
    hero: {
      eyebrow: { _type: 'bilingual', ...C.hero.eyebrow },
      title1: { _type: 'bilingual', ...C.hero.title1 },
      title2: { _type: 'bilingual', ...C.hero.title2 },
      sub: { _type: 'bilingualText', ...C.hero.sub },
      cta1: { _type: 'bilingual', ...C.hero.cta1 },
      cta2: { _type: 'bilingual', ...C.hero.cta2 },
      img: await imgRef(C.hero.img),
    },
    promo: C.promo.map((l) => ({ _type: 'bilingual', ...l })),
    marquee: C.marquee,
    method: C.method.map((m) => ({
      _type: 'object',
      num: m.num,
      icon: m.icon,
      title: { _type: 'bilingual', ...m.title },
      desc: { _type: 'bilingualText', ...m.desc },
    })),
    editorial: await Promise.all(
      C.editorial.map(async (e) => ({
        _type: 'object',
        eyebrow: { _type: 'bilingual', ...e.eyebrow },
        title: { _type: 'bilingual', ...e.title },
        text: { _type: 'bilingualText', ...e.text },
        img: await imgRef(e.img),
        programId: e.programId,
      })),
    ),
    surf: {
      eyebrow: { _type: 'bilingual', ...C.surf.eyebrow },
      title: { _type: 'bilingual', ...C.surf.title },
      desc: { _type: 'bilingualText', ...C.surf.desc },
      img: await imgRef(C.surf.img),
      programId: C.surf.programId,
    },
    community: {
      eyebrow: { _type: 'bilingual', ...C.community.eyebrow },
      heading: { _type: 'bilingual', ...C.community.heading },
      photos: await Promise.all(
        C.community.photos.map(async (p) => ({
          _type: 'object',
          image: await imgRef(p.src),
          alt: p.alt,
          caption: { _type: 'bilingual', ...p.caption },
        })),
      ),
      instagram: await Promise.all(
        C.community.instagram.map(async (p) => ({
          _type: 'object',
          image: await imgRef(p.src),
          alt: p.alt,
        })),
      ),
      facebook: C.community.facebook,
    },
    footer: {
      tagline: { _type: 'bilingual', ...C.footer.tagline },
      payment: { _type: 'bilingual', ...C.footer.payment },
      methods: C.footer.methods,
    },
    legal: C.legal,
    contact: {
      address: C.contact.address,
      phone: C.contact.phone,
      phoneDisplay: C.contact.phoneDisplay,
      whatsapp: C.contact.whatsapp,
      hours: { _type: 'bilingual', ...C.contact.hours },
      mapsUrl: C.contact.mapsUrl,
    },
    social: C.social,
    reviewsInfo: C.reviews,
  });

  // story
  docs.push({
    _id: 'story',
    _type: 'story',
    eyebrow: { _type: 'bilingual', ...C.story.eyebrow },
    paragraphsEn: C.story.paragraphs.en,
    paragraphsEs: C.story.paragraphs.es,
    sign: { _type: 'bilingual', ...C.story.sign },
    name: C.story.name,
  });

  // lookbook
  docs.push({
    _id: 'lookbook',
    _type: 'lookbook',
    h: await Promise.all(C.lookbook.h.map((i) => imgRef(i.src))),
    v: await Promise.all(C.lookbook.v.map((i) => imgRef(i.src))),
  });

  // programs (6)
  for (const [i, p] of C.programs.entries()) {
    docs.push({
      _id: `program-${p.id}`,
      _type: 'program',
      id: p.id,
      order: i + 1,
      cat: p.cat,
      badge: { _type: 'bilingual', ...p.badge },
      bc: p.bc,
      tag: { _type: 'bilingual', ...p.tag },
      unit: p.unit,
      title: { _type: 'bilingual', ...p.title },
      desc: { _type: 'bilingualText', ...p.desc },
      price: p.price,
      priceWk: p.priceWk,
      img: await imgRef(p.img),
      colors: p.colors,
      startDays: p.startDays,
      spots: p.spots,
    });
  }

  // reviews (3)
  for (const [i, r] of C.community.reviews.entries()) {
    docs.push({
      _id: `review-${r.id}`,
      _type: 'review',
      id: r.id,
      order: i + 1,
      author: { _type: 'bilingual', ...r.author },
      meta: { _type: 'bilingual', ...r.meta },
      quote: r.quote,
      source: r.source,
    });
  }

  // faq (5)
  for (const [i, f] of C.faq.entries()) {
    docs.push({
      _id: `faq-${i + 1}`,
      _type: 'faq',
      order: i + 1,
      q: { _type: 'bilingual', ...f.q },
      a: { _type: 'bilingualText', ...f.a },
    });
  }

  return docs.filter((d) => !!d);
}

async function main() {
  console.log(`Sincronizando con proyecto ${projectId} (production)…`);

  console.log('Eliminando contenido anterior…');
  await client.delete({ query: '*[_type in ["program","review","faq","story","lookbook","siteSettings"]]' });

  console.log('Preparando documentos y subiendo imágenes…');
  const docs = await buildDocuments();
  console.log(`${docs.length} documentos listos, ${cache.size} imágenes subidas.`);

  const tx = client.transaction();
  for (const d of docs) tx.createOrReplace(d);
  await tx.commit();

  console.log('✓ Sincronización finalizada.');
}

// logs de subidas en paralelo sin bloquear el orden de use
const orig = console.log;
main().catch((err) => {
  orig.error('✗ Error:', err.message ?? err);
  process.exit(1);
});
