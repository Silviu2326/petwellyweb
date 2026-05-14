import type { Metadata } from 'next';
import { siteConfig } from './site';
import { locales, type Locale, getPathname, type AppPathname } from '@/i18n/routing';

interface BuildMetadataInput {
  /** Ruta interna (la clave de pathnames). Para la raíz: `/`. */
  path: AppPathname;
  /** Parámetros si la ruta es dinámica (`{ slug: '...' }`). */
  params?: Record<string, string>;
  /** Locale actual de la página. */
  locale: Locale;
  title: string;
  description: string;
  /** Si la página es indexable. Por defecto true. */
  index?: boolean;
  /** Imagen OG específica (path absoluto al public). */
  image?: string;
  /** Tipo OG ('website' | 'article'). Por defecto website. */
  ogType?: 'website' | 'article';
  /** Para artículos: fecha de publicación ISO. */
  publishedTime?: string;
  /** Para artículos: fecha de modificación ISO. */
  modifiedTime?: string;
  /** Para artículos: lista de autores. */
  authors?: string[];
  /** Tags / keywords adicionales. */
  keywords?: string[];
}

/**
 * Construye un objeto `Metadata` completo para Next.js incluyendo:
 *  - title con template "{título} · Petwellly"
 *  - description y keywords
 *  - canonical URL absoluta
 *  - alternates.languages (hreflang correcto a TODAS las versiones)
 *  - x-default apuntando a la versión `es` (defaultLocale)
 *  - OpenGraph y Twitter Card
 *  - robots según index
 *
 * Cualquier página debe llamar a esto desde su `generateMetadata` o
 * exportar el resultado directamente como `metadata`.
 */
export function buildMetadata({
  path,
  params,
  locale,
  title,
  description,
  index = true,
  image,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords,
}: BuildMetadataInput): Metadata {
  const baseUrl = siteConfig.url;
  const canonicalPath = getPathname({ locale, href: { pathname: path, params } as never });
  const canonical = `${baseUrl}${canonicalPath}`;

  const languages: Record<string, string> = {};
  for (const l of locales) {
    const p = getPathname({ locale: l, href: { pathname: path, params } as never });
    languages[l] = `${baseUrl}${p}`;
  }
  // x-default: versión por defecto (ES)
  languages['x-default'] = languages.es;

  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${baseUrl}${image}`
    : `${baseUrl}${siteConfig.defaultOgImage}`;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    robots: {
      index,
      follow: index,
      googleBot: {
        index,
        follow: index,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: ogType,
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(ogType === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      ...(siteConfig.social.twitterHandle && {
        site: siteConfig.social.twitterHandle,
        creator: siteConfig.social.twitterHandle,
      }),
      title,
      description,
      images: [ogImage],
    },
    verification: siteConfig.gscVerification
      ? { google: siteConfig.gscVerification }
      : undefined,
    other: {
      'theme-color': '#2D6A4F',
    },
  };
}

/**
 * Helper rápido para títulos: añade el sufijo de marca.
 * Útil cuando un page expone solo `title` y reusa `description` de mensajes.
 */
export function withBrand(title: string): string {
  return `${title} · ${siteConfig.name}`;
}
