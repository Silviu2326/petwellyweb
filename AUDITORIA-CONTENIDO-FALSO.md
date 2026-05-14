# Auditoría de contenido falso — `petwelly-web`

> Fecha: 2026-05-14
> Objetivo: identificar todo el copy del sitio público que afirma cosas que NO son verdad o que no existen en el ERP real (`petwelly/`, `petwelly-backend/`).
> Estado: **nada corregido todavía** — este documento es solo el inventario.

---

## 🚨 CRÍTICO

### 1. "Auditorías" — no las hacemos

| Archivo | Línea | Texto a eliminar |
|---|---|---|
| `messages/es.json` | 348 | `"Auditoría completa con antes/después"` (Plan Kennel Pro) |
| `messages/en.json` | 347 | equivalente en inglés |

**Acción:** eliminar el bullet del plan Kennel Pro en ambos idiomas.

---

### 2. Testimonios completamente inventados presentados como reales

| Archivo | Línea | Contenido falso |
|---|---|---|
| `messages/es.json` | 115–134 | Testimonios: *"Marta R. — Criadero Estrella Polar · Madrid"*, *"Jorge L. — Bulldog del Valle · Barcelona"*, *"Lucía S. — Cría del Bosque · Asturias"* |
| `messages/en.json` | 115–134 | equivalentes en inglés |
| `messages/es.json` | ~115 | Badge **`"4.9/5 según criadores reales"`** |
| `messages/en.json` | ~115 | `"4.9/5 from real breeders"` |

**Acción:** eliminar el bloque de testimonios o sustituirlo por un placeholder honesto ("Aún no tenemos testimonios públicos") hasta tener clientes reales con permiso para citarlos.

---

### 3. Casos de éxito inventados con métricas inventadas

| Archivo | Contenido falso |
|---|---|
| `src/lib/case-studies.ts` | 3 criaderos ficticios completos (Estrella Polar, Bulldog del Valle, Cría del Bosque) con cifras antes/después inventadas |
| `messages/es.json:463-464` | `caseStudies.subtitle = "Criaderos reales con cifras reales antes y después de Petwellly"` |

**Adicional:** las covers que referencia (`/case-studies/estrella-polar.svg`, etc.) **no existen** en `public/`.

**Acción:** eliminar la página de casos de éxito completa hasta tener casos reales documentados con permiso.

---

### 4. Stats home sin fuente

| Archivo | Línea | Claim sin respaldo |
|---|---|---|
| `messages/es.json` | `home.stats.items.rating` | `"4.9/5"` "satisfacción de criadores" |
| `messages/es.json` | `home.stats.items.time` | `"1.5–2 h"` ahorradas |
| `messages/es.json` | `home.stats.items.setup` | `"30 min"` setup |

**Acción:** eliminar el bloque de stats o sustituir por afirmaciones cualitativas verificables.

---

### 5. Claim "criaderos de toda España"

| Archivo | Línea | Texto |
|---|---|---|
| `messages/es.json` | 50 | `"Confían en Petwellly criaderos de toda España"` |
| `messages/en.json` | 50 | `"Trusted by breeders across Spain"` |

**Acción:** eliminar hasta que sea verdad.

---

### 6. Equipo ficticio

| Archivo | Contenido falso |
|---|---|
| `messages/es.json` y `messages/en.json` namespace `about.team` | 4 miembros con cargos C-level y biografías concretas: *Diego A., Sara M., Iván P., Noa T.* |
| `messages/es.json` | `about.story.body` cita haber empezado con "Criadero Estrella Polar" (el mismo nombre que aparece en los testimonios y casos inventados → confirma que es placeholder) |

**Acción:** página `/equipo` debe contener solo personas reales con su nombre real, o eliminarse hasta entonces.

---

### 7. Features publicitadas que NO existen en el ERP

Cruzado con `petwelly/src/` y `petwelly-backend/src/`.

| Feature publicitada | Dónde se promete | Estado real en el código |
|---|---|---|
| **Whelping log** | `home.features.items.litter`, `home.testimonials`, `caseStudies`, `features.groups.litters` | **0 coincidencias** de "whelping" en todo el ERP |
| **Integraciones SEUR / Correos / MRW** con tracking automático y albarán PDF | `messages/es.json:248-256`, `features.groups.shipping`, planes Breeder+ y Kennel Pro (`messages/es.json:331`) | Solo aparece la palabra `'SEUR'` como string literal en `petwelly-backend/tests/whatsapp-auto-notify.test.ts:518`. **No hay clientes API, ni webhooks, ni tracking automático** |
| **Microsite drag & drop**, calendario público de camadas, datos Schema.org, botón "Reservar este cachorro" al CRM, WhatsApp flotante con mensaje pre-rellenado | `features.groups.site` (`messages/es.json:271-282`, `messages/en.json:271-282`) | **No existe ningún microsite editable**. `MyBreederPage.tsx` es un panel interno, no un sitio público con bloques |
| **Firma de contrato por clic** desde plantilla PDF | `features.groups.reservations` (`messages/es.json:228`) | Sin integración tipo DocuSign ni librería de firma en el código |
| **Protocolos genéticos preconfigurados por raza** (HUU, JHC, CMR1, BAER, CEA, TNS, NCL, PRA-prcd, IGS, ICT-A, CL, EPI, "Hemofilia A"…) | `lib/breeds.ts`, `features.groups.dogs` | El modelo de datos solo soporta 6 tipos: `'DM' \| 'PRA' \| 'MDR1' \| 'HD' \| 'ED' \| 'panel'` (`petwelly/src/types/index.ts:1066`). El resto **no existe** |
| **Protocolos preconfigurados por raza y edad** (salud) | `features.groups.health` (`messages/es.json:206`) | No hay tal cosa |
| **Reportes mensuales automáticos en PDF al email** | Blog `kpis-financieros-criadero.mdx:40` | Sin scheduler de reportes |
| **Checklist que bloquea la marca de 'entregado'** | Blog `checklist-entrega-cachorro.mdx:38-40` | Sin evidencia del bloqueo en código |
| **API e integraciones a medida** (Kennel Pro) | Planes | No hay documentación pública de API |
| **Apps iOS / Android** | JSON-LD `operatingSystem: 'Web, iOS, Android'` (`src/lib/jsonld.ts`) | Solo existe la web Vite. **Esto es publicidad engañosa indexable por Google** |

**Acción:** para cada fila, o eliminar el claim del copy, o marcarlo como "Próximamente" si está realmente en roadmap.

---

### 8. Inconsistencia de marca: "Petwellly" (web) vs "Petwelly" (ERP)

| Lugar | Nombre usado |
|---|---|
| `petwelly-web` (sitio público) | **Petwellly** (doble L): `messages/es.json:3,5`, `src/lib/site.ts:30-31`, `package.json:5`, emails `*@petwellly.com`, dominio `petwellly.com` |
| ERP real (`petwelly/`) | **Petwelly** (una L): `petwelly/package.json:2`, `petwelly/index.html:15`, carpeta `petwelly-backend/` |

**Acción:** decidir cuál es el nombre correcto y unificar todo.

---

## ⚠️ ALTO

### 9. Datos legales y de contacto sin verificar

| Dato | Origen | Comentario |
|---|---|---|
| `legalName: 'Petwellly Software, S.L.'` | `src/lib/site.ts:31`, usado en `/privacy`, `/terms` | ¿La sociedad existe? Sin CIF ni dirección registral |
| `founded: '2024'` | `src/lib/site.ts:55` | Sin verificar |
| WhatsApp `+34 683 52 96 29` | `src/lib/site.ts:41`, `messages/*.json:570` | ¿Es un número real operativo? |
| Emails `hola@petwellly.com`, `soporte@petwellly.com`, `hello@petwellly.com`, `support@petwellly.com` | `src/lib/site.ts` | ¿Están dados de alta? |

**Acción:** verificar cada dato. Si no es real, no puede aparecer en políticas legales públicas.

---

### 10. README contradice al código

| Línea README | Lo que dice | Realidad |
|---|---|---|
| `README.md:37,121` | `icon.svg, apple-icon.svg` | Los archivos son `icon.png` y `apple-icon.png` (los SVG **no existen**) |
| `README.md:218` | "Sin generador de OG dinámico, usamos `/og-default.svg`" | Sí hay generador dinámico en `src/app/api/og/route.tsx`. El archivo `/og-default.svg` **no existe** |
| `README.md:108` | JSON-LD lleva `AggregateRating` | `src/lib/jsonld.ts:76-93` **no emite** `aggregateRating` |
| `README.md:227` (roadmap) | "[ ] Generador de OG dinámico por post" | El genérico ya está hecho |

---

### 11. Archivos referenciados que no existen

- `src/lib/case-studies.ts:43,112,175` → `/case-studies/estrella-polar.svg`, `bulldog-del-valle.svg`, `cria-del-bosque.svg`. La carpeta `public/case-studies/` **no existe**.

---

### 12. JSON-LD a Google con `operatingSystem` falso

`src/lib/jsonld.ts:76-93` declara `operatingSystem: 'Web, iOS, Android'` en `SoftwareApplication`. **No hay apps nativas**. Esto se indexa y se muestra como dato estructurado.

**Acción:** cambiar a `operatingSystem: 'Web'`.

---

## ⚠️ MEDIO

### 13. Textos hardcoded en español aunque el usuario navegue en inglés

| Archivo | Línea | Texto hardcoded |
|---|---|---|
| `src/components/NewsletterForm.tsx` | 46-49 | `"¡Hecho! Te llegará el primer email muy pronto."` |
| `src/components/NewsletterForm.tsx` | 76 | `"No se pudo enviar. Vuelve a intentarlo."` |
| `src/app/manifest.ts` | 6 | `name: "${siteConfig.name} — ERP para criaderos"` (siempre español) |
| `src/app/manifest.ts` | 13 | `lang: 'es-ES'` forzado |

---

### 14. Vídeo huérfano con nombre = prompt de IA

`public/Veterinary_Clinic_Scene_In_a_cinematic_style_a_person_with_dark_hair_SCreIaYl.mp4` (1.6 MB) **no se referencia en ningún sitio del código**. El nombre del archivo revela la prompt de generación de IA.

**Acción:** eliminar.

---

## ⚠️ BAJO

### 15. Detalles menores

- `src/components/Footer.tsx:112` — emoji 🇪🇸 siempre presente aunque el usuario navegue en inglés.
- `src/components/Header.tsx:50-58` — usa `<img>` en vez de `<Image>` de Next; `alt=""` vacío.
- `manifest.ts:17-19` — `sizes: 'any'` para `/logo.png`; PWAs estándar esperan 192/512 dedicados.
- `productPlansJsonLd` (`src/lib/jsonld.ts:179`) — usa URL `/precios` (ES) aunque sirva versión EN.

---

## Resumen para priorizar

| Prioridad | Bloque | Acción |
|---|---|---|
| 1 | Eliminar **"Auditoría"** del plan Kennel Pro (ES + EN) | Edit puntual |
| 2 | Eliminar **testimonios, casos de éxito, equipo, stats "4.9/5", "criaderos de toda España"** | Edit en `messages/*.json`, borrar `case-studies.ts`, valorar borrar `/equipo` y `/casos` |
| 3 | Quitar **features inexistentes** (whelping log, SEUR/Correos/MRW, microsite drag&drop, firma por clic, pruebas genéticas inventadas, reportes PDF, apps iOS/Android) | Edit `messages/*.json`, `lib/breeds.ts`, `lib/jsonld.ts` |
| 4 | Decidir nombre **Petwelly vs Petwellly** y unificar | Refactor global |
| 5 | Verificar **datos legales** (S.L., teléfono, emails) o quitar | Verificación + edit `site.ts` |
| 6 | Reparar **README** (iconos, OG, AggregateRating) | Edit README |
| 7 | Borrar **archivos fantasma/huérfanos** (case-studies covers, mp4 IA) | rm + limpieza |
| 8 | i18n: **mensajes hardcoded** + manifest bilingüe | Edit componente + manifest |

---

## Archivos clave para tocar

- `messages/es.json` y `messages/en.json` — la mayor parte del copy
- `src/lib/site.ts` — branding y datos legales
- `src/lib/case-studies.ts` — borrar o vaciar
- `src/lib/breeds.ts` — pruebas genéticas no soportadas
- `src/lib/jsonld.ts` — `operatingSystem`, `AggregateRating`
- `src/app/manifest.ts` — locale forzado
- `src/components/NewsletterForm.tsx` — mensajes hardcoded
- `README.md` — varias inexactitudes
- `public/` — borrar `Veterinary_Clinic_Scene_...mp4`; decidir qué hacer con covers faltantes
