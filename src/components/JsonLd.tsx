import { DEFAULT_CONTENT, type Locale, type SiteOverrides } from '@/lib/content';

type Props = {
  locale: Locale;
  content?: SiteOverrides;
};

export default function JsonLd({ locale, content }: Props) {
  const c = { ...DEFAULT_CONTENT, ...content };
  const description =
    locale === 'es'
      ? 'Escuela de español en Pichilemu, Chile. Clases grupales pequeñas (máx. 5), clases privadas, packs de español y surf y clases online con inmersión cultural real.'
      : 'Spanish school in Pichilemu, Chile. Small group classes (max 5), private lessons, Spanish & Surf packages and online classes with real cultural immersion.';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LanguageSchool',
    name: c.siteName,
    alternateName: 'HUARA°',
    url: `${c.domain}/`,
    logo: `${c.domain}${c.seo.logo}`,
    image: `${c.domain}${c.seo.ogImage}`,
    description,
    inLanguage: locale === 'es' ? 'es-CL' : 'en-US',
    telephone: c.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pasaje Vista Hermosa 0248',
      postalCode: '3220000',
      addressLocality: 'Pichilemu',
      addressRegion: "O'Higgins",
      addressCountry: 'CL',
    },
    areaServed: ['Pichilemu', 'Online'],
    availableLanguage: ['Spanish', 'English'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [c.social.instagram, c.social.facebook],
    makesOffer: c.programs.map((program) => ({
      '@type': 'Offer',
      name: program.title[locale],
      price: String(program.price),
      priceCurrency: 'USD',
    })),
    hasMap: c.reviews.googleUrl,
    foundingDate: '2013-08-10',
    founder: { '@type': 'Person', name: 'Katterina Cuesta Lepe' },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
