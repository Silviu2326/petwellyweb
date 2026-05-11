import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

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
      { src: '/logo.png', sizes: 'any', type: 'image/png', purpose: 'any' },
      { src: '/logo.png', sizes: 'any', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
