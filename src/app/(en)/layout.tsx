import type { Metadata, Viewport } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://huaraspanishschool.com'),
  title: 'Huara Spanish School — Learn Spanish in Pichilemu, Chile | Spanish & Surf',
  description:
    'Spanish school in Pichilemu, Chile. Small group classes (max 5), private lessons, Spanish & Surf packages and online classes with real cultural immersion.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  alternates: {
    canonical: '/',
    languages: { en: '/', es: '/es/', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    siteName: 'Huara Spanish School',
    title: 'Huara Spanish School — Learn Spanish in Pichilemu, Chile',
    description:
      'Spanish school in Pichilemu, Chile. Small group classes (max 5), private lessons, Spanish & Surf packages and online classes with real cultural immersion.',
    url: '/',
    locale: 'en_US',
    alternateLocale: ['es_CL'],
    images: [
      {
        url: '/img/og-huara.jpg',
        width: 1200,
        height: 630,
        alt: 'Huara Spanish School in Pichilemu, Chile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huara Spanish School — Learn Spanish in Pichilemu, Chile',
    description:
      'Spanish school in Pichilemu, Chile. Small group classes (max 5), private lessons, Spanish & Surf packages and online classes.',
    images: ['/img/og-huara.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0e4457',
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,700&family=Inter:wght@400;500;600&family=Dancing+Script:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
