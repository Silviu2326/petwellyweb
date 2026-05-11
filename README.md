# petwelly-web

Web pública de marketing de **Petwellly** (el ERP para criaderos profesionales).
Construida con **Next.js 14 App Router + TypeScript + Tailwind CSS + next-intl + MDX**.

> Convive en el monorepo con `petwelly/` (Vite/React, el ERP autenticado). Esta carpeta sirve **únicamente** las páginas públicas (Home, Funcionalidades, Precios, Casos de éxito, Soluciones por raza, Sobre nosotros, Blog, Contacto y páginas legales) en español e inglés con SEO completo.

---

## Stack

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | Next.js 14 App Router | RSC, streaming, SSG por defecto y file-based routing. |
| Lenguaje | TypeScript estricto | Tipos en pathnames, mensajes y props. |
| Estilos | Tailwind 3 + plugin de `tailwind-merge` | Tema centralizado en `src/theme/colors.ts`, mismo que el ERP. |
| i18n | `next-intl` 3.x | Mensajes JSON, pathnames localizados, formatters. |
| Blog | MDX local con `gray-matter` + `next-mdx-remote/rsc` | Cero CMS externo, contenido versionado en git. |
| SEO | `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, JSON-LD propios | Sin dependencias extra. |
| Iconografía | `lucide-react` | Mismo set que el ERP. |
| Fuentes | `next/font/google` (Inter + Plus Jakarta Sans) | Sin layout shift. |

---

## Estructura

```
petwelly-web/
├── content/blog/{es,en}/*.mdx          ← Posts del blog (frontmatter + MDX)
├── messages/{es,en}.json               ← Strings UI por idioma
├── public/                             ← Assets (favicon, og, blog covers)
└── src/
    ├── app/
    │   ├── layout.tsx                  ← Shell mínimo (sin <html>, lo emite [locale])
    │   ├── not-found.tsx               ← 404 root (HTML básico bilingüe)
    │   ├── icon.svg, apple-icon.svg    ← File-conventions de Next
    │   ├── sitemap.ts, robots.ts       ← Infra SEO dinámica
    │   ├── manifest.ts                 ← PWA manifest
    │   ├── feed.xml/route.ts           ← RSS 2.0 del blog
    │   └── [locale]/
    │       ├── layout.tsx              ← <html lang>, <body>, providers, header/footer
    │       ├── not-found.tsx           ← 404 dentro del locale
    │       ├── page.tsx                ← Home
    │       ├── features/page.tsx
    │       ├── pricing/page.tsx
    │       ├── about/page.tsx
    │       ├── contact/page.tsx
    │       ├── case-studies/{page,[slug]/page}.tsx
    │       ├── solutions/{page,[breed]/page}.tsx
    │       ├── blog/{page,[slug]/page}.tsx
    │       └── {privacy,terms,cookies}/page.tsx
    ├── components/                     ← UI compartida
    │   ├── Header.tsx, Footer.tsx, LocaleSwitcher.tsx
    │   ├── Button.tsx, Badge.tsx, Card.tsx, Container.tsx, Section.tsx
    │   ├── FeatureGrid.tsx, PricingTable.tsx, FAQ.tsx, CTASection.tsx
    │   ├── BlogCard.tsx, ContactForm.tsx, NewsletterForm.tsx
    │   ├── Breadcrumbs.tsx, JsonLd.tsx, LegalLayout.tsx, WhatsAppFloat.tsx
    ├── i18n/
    │   ├── routing.ts                  ← locales, pathnames localizados, navigation tipada
    │   └── request.ts                  ← loader de mensajes
    ├── lib/
    │   ├── cn.ts                       ← clsx + tailwind-merge
    │   ├── site.ts                     ← config canónica (URL, social, contacto)
    │   ├── seo.ts                      ← `buildMetadata()` con hreflang + OG + Twitter
    │   ├── jsonld.ts                   ← Generadores Schema.org
    │   ├── blog.ts                     ← Loader MDX desde filesystem
    │   ├── breeds.ts                   ← Catálogo de razas (soluciones)
    │   └── case-studies.ts             ← Catálogo de casos de éxito
    ├── middleware.ts                   ← next-intl rewrites (URLs localizadas)
    ├── styles/globals.css               ← Tailwind base + utilidades (.prose-petwelly)
    └── theme/colors.ts                 ← Mismos colores que el ERP
```

---

## Páginas y rutas

| Ruta interna | URL ES | URL EN |
|---|---|---|
| `/` | `/es` | `/en` |
| `/features` | `/es/funcionalidades` | `/en/features` |
| `/pricing` | `/es/precios` | `/en/pricing` |
| `/about` | `/es/sobre` | `/en/about` |
| `/blog`, `/blog/[slug]` | `/es/blog/...` | `/en/blog/...` |
| `/case-studies`, `/case-studies/[slug]` | `/es/casos-de-exito/...` | `/en/case-studies/...` |
| `/solutions`, `/solutions/[breed]` | `/es/soluciones/...` | `/en/solutions/...` |
| `/contact` | `/es/contacto` | `/en/contact` |
| `/privacy` | `/es/privacidad` | `/en/privacy` |
| `/terms` | `/es/terminos` | `/en/terms` |
| `/cookies` | `/es/cookies` | `/en/cookies` |

Las URLs se traducen automáticamente al cambiar de idioma con `LocaleSwitcher` (preserva la página actual).

---

## SEO — qué se genera para cada página

- **Metadata** dinámica con `lib/seo.ts → buildMetadata()`:
  - `title`, `description`, `keywords`
  - `canonical` absoluto
  - `alternates.languages` con TODAS las versiones (ES/EN/x-default) → **hreflang** correcto
  - OpenGraph (`og:type`, `og:url`, `og:image`, locale + alternateLocale)
  - Twitter Card (`summary_large_image`)
  - `robots` (configurable por página)
  - Verificación Google Search Console (vía env)
- **JSON-LD** inyectado en cada página relevante:
  - **Layout root**: `Organization` + `WebSite` (con SearchAction)
  - **Home / Features / Solutions**: `SoftwareApplication` con `AggregateRating` y `featureList`
  - **Pricing**: `Product` con `Offer` por plan + `FAQPage`
  - **Blog post**: `Article` con autor, fecha, modificación, imagen, locale
  - **Case study**: `BreadcrumbList`
  - **Cualquier FAQ**: `FAQPage`
- **Sitemap dinámico** (`/sitemap.xml`):
  - Recorre todas las rutas estáticas × locales
  - Genera URLs para cada `solutions/[breed]` y `case-studies/[slug]`
  - Incluye posts del blog por locale
  - Cada entrada con `alternates.languages` (hreflang)
- **robots.txt** dinámico con sitemap absoluto.
- **RSS 2.0** del blog en `/feed.xml?locale=es|en`.
- **manifest.webmanifest** PWA-ready.
- **Iconos**: `icon.svg`, `apple-icon.svg` (file-conventions).
- **Favicon SVG** vectorial (escala perfecta).

---

## Setup local

```bash
cd petwelly-web

# 1. Instalar deps
npm install     # o pnpm / yarn

# 2. Crear .env.local desde el ejemplo
cp .env.example .env.local
#  ↑ rellena al menos NEXT_PUBLIC_SITE_URL si vas a probar SEO localmente

# 3. Arrancar
npm run dev
#  → http://localhost:3000 (redirige a /es)
```

### Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con HMR. |
| `npm run build` | Build de producción (genera SSG donde puede). |
| `npm run start` | Sirve la build. |
| `npm run lint` | ESLint con reglas Next core-web-vitals. |
| `npm run typecheck` | `tsc --noEmit`. |

---

## Variables de entorno

| Var | Para qué |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canónica (sitemap, OG, JSON-LD). **Imprescindible en prod.** |
| `NEXT_PUBLIC_APP_URL` | URL del ERP (CTAs «Entrar» y «Empezar gratis»). |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Endpoint POST JSON para el formulario y newsletter. Si vacío, fallback a `mailto:`. |
| `NEXT_PUBLIC_WHATSAPP` | Número en formato internacional sin `+` (ej. `34600000000`). |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Token de verificación de Google Search Console. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Dominio en Plausible para analítica simple (opcional). |

---

## Añadir contenido

### Un post nuevo en el blog

```bash
# ES
content/blog/es/<slug>.mdx
# EN (opcional, no es traducción 1:1)
content/blog/en/<slug>.mdx
```

Frontmatter mínimo:

```mdx
---
title: "Tu título SEO"
description: "Descripción de 150-160 caracteres."
date: 2026-05-01
author: "Sara M."
tags: [salud, vacunas]
cover: /blog/mi-portada.svg
---

## Empieza con un H2

El `H1` lo emite la página automáticamente.
```

El sitemap, RSS y la página de índice del blog lo recogen sin tocar nada.

### Una raza nueva en `/solutions/[breed]`

Edita `src/lib/breeds.ts` y añade un objeto al array. La URL `/es/soluciones/<slug>` y `/en/solutions/<slug>` se generan solas, igual que el sitemap y los hreflang.

### Un caso de éxito nuevo

Edita `src/lib/case-studies.ts`. Mismo patrón.

### Una página estática nueva

1. Crea la carpeta `src/app/[locale]/<ruta-interna>/page.tsx`.
2. Añade la entrada a `pathnames` en `src/i18n/routing.ts` con sus traducciones.
3. Añádela a `staticPaths` en `src/app/sitemap.ts` con su prioridad.

---

## Decisiones de diseño relevantes

- **Theme único**: los colores se importan literalmente desde `src/theme/colors.ts` (espejo de `petwelly/src/theme/colors.ts`). Cambia ahí y se propaga.
- **Carpetas internas en inglés**: convención de código; la URL visible se traduce vía `pathnames`.
- **Sin generador de OG dinámico**: usamos un SVG estático compartido (`/og-default.svg`). Si quieres OG por post/raza, añade `app/<ruta>/opengraph-image.tsx` con `ImageResponse`.
- **Sin CMS**: el contenido vive en MDX y archivos TS bajo `src/lib`. Versionado, revisable en PR, sin pagos a Contentful o Sanity.
- **Sin Tailwind Typography plugin**: `globals.css` define `.prose-petwelly` para el blog, ligero y sin cambios entre versiones del plugin.
- **Sin dark mode**: la marca es luminosa; añadirlo después implica una variante de `theme/colors` y un toggle. No bloqueamos.

---

## Roadmap sugerido

- [ ] Generador de OG dinámico por post (`opengraph-image.tsx`).
- [ ] Search interna del blog (Pagefind o Fuse.js sobre el frontmatter).
- [ ] Conexión real del formulario de contacto a un endpoint serverless (Vercel/AWS Lambda).
- [ ] Traducir 1:1 los posts ES↔EN cuando los volúmenes lo justifiquen.
- [ ] Página `/changelog` con releases del ERP por mes.

---

## Despliegue

Optimizado para **Vercel** (build hint del `next-intl` plugin incluido). En cualquier proveedor que soporte Node 20+, basta con:

```bash
npm run build
npm run start
```

`output: 'standalone'` no está activado por defecto para mantener flexibilidad; actívalo en `next.config.mjs` si vas a Docker.
