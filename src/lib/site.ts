/**
 * Configuración global del sitio. Datos canónicos para SEO,
 * sitemap, JSON-LD, OpenGraph y enlaces de marca.
 *
 * Las URLs se leen de variables de entorno cuando están disponibles
 * y caen al valor por defecto en local/dev.
 *
 * Datos legales y de contacto: vacíos por defecto. Rellena vía
 * variables de entorno (NEXT_PUBLIC_*) cuando la S.L., los emails
 * y el WhatsApp estén dados de alta.
 */

const PROD_SITE_URL = 'https://www.petwellly.com';
const fallbackSiteUrl = process.env.NODE_ENV === 'production'
  ? PROD_SITE_URL
  : 'http://localhost:3000';

function clean(url: string | undefined, fallback: string) {
  const v = (url || fallback).trim();
  return v.endsWith('/') ? v.slice(0, -1) : v;
}

if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) {
  // Falla ruidosamente en build de prod si falta la env var, en lugar de
  // emitir sitemap/canonical apuntando a www.petwellly.com por accidente.
  console.warn(
    '[site.ts] NEXT_PUBLIC_SITE_URL no está definida — usando fallback ' + PROD_SITE_URL,
  );
}

const appUrl = clean(process.env.NEXT_PUBLIC_APP_URL, 'https://app.petwellly.com');

export const siteConfig = {
  name: 'Petwellly',
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || '',
  description:
    'ERP profesional para criaderos de perros: salud, camadas, ventas, portal del cliente y finanzas en un único sitio.',
  descriptionEn:
    'Professional ERP for dog kennels: health, litters, sales, client portal and finance in one place.',
  url: clean(process.env.NEXT_PUBLIC_SITE_URL, fallbackSiteUrl),
  appUrl,
  /** Entry público al modo demo del ERP (sesión fake, escrituras bloqueadas). */
  demoUrl: `${appUrl}/demo`,
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
  email: {
    sales: process.env.NEXT_PUBLIC_EMAIL_SALES || '',
    support: process.env.NEXT_PUBLIC_EMAIL_SUPPORT || '',
  },
  social: {
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || '',
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || '',
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || '',
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE || '',
    twitterHandle: process.env.NEXT_PUBLIC_SOCIAL_TWITTER_HANDLE || '',
  },
  founded: process.env.NEXT_PUBLIC_FOUNDED || '',
  address: {
    country: 'ES',
    region: 'Madrid',
    locality: 'Madrid',
  },
  defaultOgImage: '/api/og',
} as const;

export type SiteConfig = typeof siteConfig;
