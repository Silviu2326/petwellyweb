import type { ReactNode } from 'react';

/**
 * Root layout. Casi vacío porque el HTML real (con `lang` correcto)
 * lo emite `app/[locale]/layout.tsx` por idioma. Aquí sólo dejamos
 * el shell mínimo para que Next.js esté contento.
 *
 * Cualquier metadata canónica vive en los layouts/páginas localizadas.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
