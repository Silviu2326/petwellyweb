import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * Web App Manifest. Permite instalar el sitio como PWA en móviles.
 *
 * Las imágenes de los iconos las espera Next.js en `/icon-*.png`. Para
 * generarlas a partir del SVG, ejecuta el script `npx pwa-asset-generator`
 * cuando dispongas del logo final en alta resolución.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ERP para criaderos`,
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
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
    ],
  };
}
