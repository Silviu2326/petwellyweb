import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  /**
   * Aplica el middleware a todo lo que NO sea:
   *   - assets de Next (`/_next/...`)
   *   - el handler de feed (`/feed.xml`), sitemap, robots y manifest
   *     (que viven en la raíz y no se localizan)
   *   - archivos estáticos públicos (favicon, og, imágenes, etc.)
   *   - rutas de API (no las hay aquí, pero por si acaso)
   *
   * Cualquier otra URL se localiza con prefijo (ES/EN) y, si procede,
   * se reescribe al pathname interno mediante `routing.pathnames`.
   */
  matcher: [
    '/((?!api|_next|_vercel|sitemap.xml|robots.txt|manifest.webmanifest|feed.xml|favicon.ico|favicon.svg|og-default.svg|og-default.png|.*\\..*).*)',
  ],
};
