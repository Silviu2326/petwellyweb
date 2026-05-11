import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/lib/site';
import { locales, type Locale } from '@/i18n/routing';

/**
 * RSS 2.0 del blog.
 *
 *   /feed.xml             → ES (default)
 *   /feed.xml?locale=es   → ES
 *   /feed.xml?locale=en   → EN
 *
 * Devuelve `application/rss+xml` con `Cache-Control` de 1 hora.
 */

function escapeXml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const localeParam = url.searchParams.get('locale') as Locale | null;
  const locale = localeParam && locales.includes(localeParam) ? localeParam : 'es';
  const posts = getAllPosts(locale);

  const title = locale === 'es' ? 'Blog Petwelly' : 'Petwelly Blog';
  const description =
    locale === 'es'
      ? 'Guías prácticas de gestión, salud y crecimiento para criaderos profesionales.'
      : 'Practical guides on management, health and growth for professional kennels.';
  const baseUrl = siteConfig.url;

  const items = posts
    .map((p) => {
      const link = `${baseUrl}/${locale}/blog/${p.slug}`;
      const pub = new Date(p.frontmatter.date).toUTCString();
      return `
    <item>
      <title>${escapeXml(p.frontmatter.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pub}</pubDate>
      <author>${escapeXml(p.frontmatter.author)}</author>
      ${p.frontmatter.tags.map((t) => `<category>${escapeXml(t)}</category>`).join('')}
      <description><![CDATA[${p.frontmatter.description}]]></description>
    </item>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${baseUrl}/${locale}/blog</link>
    <description>${escapeXml(description)}</description>
    <language>${locale === 'es' ? 'es-ES' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml?locale=${locale}" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
