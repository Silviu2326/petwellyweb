/**
 * Configuración global del sitio. Datos canónicos para SEO,
 * sitemap, JSON-LD, OpenGraph y enlaces de marca.
 *
 * Las URLs se leen de variables de entorno cuando están disponibles
 * y caen al valor por defecto en local/dev.
 */

const fallbackSiteUrl = 'http://localhost:3000';

function clean(url: string | undefined, fallback: string) {
  const v = (url || fallback).trim();
  return v.endsWith('/') ? v.slice(0, -1) : v;
}

export const siteConfig = {
  name: 'Petwelly',
  legalName: 'Petwelly Software, S.L.',
  description:
    'ERP profesional para criaderos de perros: salud, camadas, ventas, portal del cliente y finanzas en un único sitio.',
  descriptionEn:
    'Professional ERP for dog kennels: health, litters, sales, client portal and finance in one place.',
  url: clean(process.env.NEXT_PUBLIC_SITE_URL, fallbackSiteUrl),
  appUrl: clean(process.env.NEXT_PUBLIC_APP_URL, 'https://app.petwelly.com'),
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || '',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '34600000000',
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || '',
  email: {
    sales: 'hola@petwelly.com',
    support: 'soporte@petwelly.com',
  },
  social: {
    twitter: 'https://twitter.com/petwelly',
    instagram: 'https://instagram.com/petwelly',
    linkedin: 'https://www.linkedin.com/company/petwelly',
    youtube: 'https://www.youtube.com/@petwelly',
    twitterHandle: '@petwelly',
  },
  founded: '2024',
  address: {
    country: 'ES',
    region: 'Madrid',
    locality: 'Madrid',
  },
  defaultOgImage: '/og-default.svg',
} as const;

export type SiteConfig = typeof siteConfig;
