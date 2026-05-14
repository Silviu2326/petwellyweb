import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * Web App Manifest (PWA). Next.js sirve esto en `/manifest.webmanifest`.
 *
 * Es un manifest monolingüe (Next.js solo emite uno); usamos el
 * locale por defecto (ES). Para los iconos usamos `/logo.png` con
 * sizes='any' — sustituye por iconos dedicados 192/512 cuando estén.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFBF5',
    theme_color: '#2D6A4F',
    lang: 'es-ES',
    dir: 'ltr',
    categories: ['business', 'productivity', 'lifestyle'],
    icons: [
      { src: '/logo.png', sizes: 'any', type: 'image/png', purpose: 'any' },
      { src: '/logo.png', sizes: 'any', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
