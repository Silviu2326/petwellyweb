import type { MetadataRoute } from 'next';

import { siteConfig } from '@/lib/site';
import { locales, pathnames, getPathname } from '@/i18n/routing';
import { breeds } from '@/lib/breeds';
import { caseStudies } from '@/lib/case-studies';
import { getAllPostSlugs } from '@/lib/blog';

/**
 * Sitemap dinámico, XML conforme a https://www.sitemaps.org/protocol.html
 *
 * Para CADA ruta interna recorremos todos los locales y emitimos un
 * `<url>` con `loc` (canonical) y `alternates.languages` (hreflang).
 *
 * Cubre:
 *  - Rutas estáticas (home, features, pricing, about, blog, contact, legal, etc.)
 *  - `solutions/[breed]` para cada raza
 *  - `case-studies/[slug]` para cada caso
 *  - `blog/[slug]` para cada post (por locale, no traducido entre idiomas)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const out: MetadataRoute.Sitemap = [];

  type StaticPath = keyof typeof pathnames;
  const staticPaths: { path: StaticPath; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/features', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/case-studies', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/solutions', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'daily' },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/cookies', priority: 0.3, changeFrequency: 'monthly' },
  ];

  for (const sp of staticPaths) {
    for (const locale of locales) {
      const url = `${base}${getPathname({ locale, href: { pathname: sp.path } as never })}`;
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${base}${getPathname({ locale: l, href: { pathname: sp.path } as never })}`;
      }
      languages['x-default'] = languages.es;
      out.push({
        url,
        lastModified: new Date(),
        changeFrequency: sp.changeFrequency,
        priority: sp.priority,
        alternates: { languages },
      });
    }
  }

  // /solutions/[breed]
  for (const b of breeds) {
    for (const locale of locales) {
      const url = `${base}${getPathname({
        locale,
        href: { pathname: '/solutions/[breed]', params: { breed: b.slug } } as never,
      })}`;
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${base}${getPathname({
          locale: l,
          href: { pathname: '/solutions/[breed]', params: { breed: b.slug } } as never,
        })}`;
      }
      languages['x-default'] = languages.es;
      out.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  // /case-studies/[slug]
  for (const c of caseStudies) {
    for (const locale of locales) {
      const url = `${base}${getPathname({
        locale,
        href: { pathname: '/case-studies/[slug]', params: { slug: c.slug } } as never,
      })}`;
      const languages: Record<string, string> = {};
      for (const l of locales) {
        languages[l] = `${base}${getPathname({
          locale: l,
          href: { pathname: '/case-studies/[slug]', params: { slug: c.slug } } as never,
        })}`;
      }
      languages['x-default'] = languages.es;
      out.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: { languages },
      });
    }
  }

  // /blog/[slug] · cada locale por separado (no asumimos traducciones 1:1)
  for (const locale of locales) {
    for (const slug of getAllPostSlugs(locale)) {
      const url = `${base}${getPathname({
        locale,
        href: { pathname: '/blog/[slug]', params: { slug } } as never,
      })}`;
      out.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  return out;
}
