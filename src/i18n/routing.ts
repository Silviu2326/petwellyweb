import { defineRouting } from 'next-intl/routing';
import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation';

/**
 * Locales soportados:
 *  - `es` por defecto (España / LATAM)
 *  - `en` para mercado anglo
 *
 * Hreflang lo emite cada página en `alternates.languages` apuntando a la
 * versión correspondiente vía los pathnames localizados de abajo.
 */
export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

/**
 * Pathnames localizados.
 *
 * - La CLAVE es la ruta interna usada en App Router (carpetas en `src/app/[locale]/`).
 *   Por convención todas en inglés.
 * - El VALOR es la URL visible al usuario por idioma (slug traducido).
 *
 * El middleware (`src/middleware.ts`) hace el rewrite, así que el visitante
 * ve `/es/funcionalidades` aunque internamente Next.js sirva `[locale]/features`.
 *
 * Mantener sincronizado con las carpetas de `src/app/[locale]/`.
 */
export const pathnames = {
  '/': '/',
  '/features': {
    es: '/funcionalidades',
    en: '/features',
  },
  '/pricing': {
    es: '/precios',
    en: '/pricing',
  },
  '/about': {
    es: '/sobre',
    en: '/about',
  },
  '/blog': {
    es: '/blog',
    en: '/blog',
  },
  '/blog/[slug]': {
    es: '/blog/[slug]',
    en: '/blog/[slug]',
  },
  '/solutions': {
    es: '/soluciones',
    en: '/solutions',
  },
  '/solutions/[breed]': {
    es: '/soluciones/[breed]',
    en: '/solutions/[breed]',
  },
  '/contact': {
    es: '/contacto',
    en: '/contact',
  },
  '/privacy': {
    es: '/privacidad',
    en: '/privacy',
  },
  '/terms': {
    es: '/terminos',
    en: '/terms',
  },
  '/cookies': {
    es: '/cookies',
    en: '/cookies',
  },
} satisfies Pathnames<typeof locales>;

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'always',
  pathnames,
});

export type AppPathname = keyof typeof pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales: routing.locales,
    pathnames: routing.pathnames,
    localePrefix: routing.localePrefix,
  });
