import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * robots.txt dinámico. Permite indexar todo lo público y bloquea
 * rutas internas y de API. Apunta al sitemap absoluto.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'GPTBot',
        // Permitimos para que aparezcamos en respuestas, podrían cambiarlo si lo prefieren bloqueado
        allow: '/',
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
