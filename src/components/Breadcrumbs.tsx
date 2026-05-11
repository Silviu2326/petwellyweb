import { ChevronRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { JsonLd } from './JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { siteConfig } from '@/lib/site';

interface BreadcrumbsProps {
  items: { label: string; href?: string; absoluteUrl?: string }[];
  /** Locale, sólo para construir URLs absolutas en JSON-LD. */
  locale: 'es' | 'en';
}

/**
 * Breadcrumbs visuales + JSON-LD `BreadcrumbList` para SEO.
 * Cada item con href se renderiza como `<Link>`; el último (sin href)
 * indica la página actual.
 */
export function Breadcrumbs({ items, locale }: BreadcrumbsProps) {
  const jsonItems = items.map((item) => ({
    name: item.label,
    url:
      item.absoluteUrl ||
      (item.href
        ? `${siteConfig.url}/${locale}${item.href === '/' ? '' : item.href}`
        : `${siteConfig.url}/${locale}`),
  }));

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-ink-muted">
          {items.map((item, i) => (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={12} aria-hidden className="text-ink-muted" />}
              {item.href && i < items.length - 1 ? (
                <Link
                  // @ts-expect-error pathnames typed
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={i === items.length - 1 ? 'text-ink font-semibold' : ''}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(jsonItems)} id="breadcrumb-jsonld" />
    </>
  );
}
