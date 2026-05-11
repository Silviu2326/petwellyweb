'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Globe } from 'lucide-react';
import type { Locale } from '@/i18n/routing';
import { useState, useTransition } from 'react';
import { cn } from '@/lib/cn';

const labels: Record<Locale, { native: string; short: string }> = {
  es: { native: 'Español', short: 'ES' },
  en: { native: 'English', short: 'EN' },
};

/**
 * Selector de idioma. Cambia el locale conservando la página actual.
 *
 * Importante: usa el hook tipado de `@/i18n/routing` para que el cambio
 * preserve la pathname (incluida la versión localizada de la URL,
 * ej. de `/es/precios` a `/en/pricing`).
 */
export function LocaleSwitcher({ compact = false }: { compact?: boolean }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const switchTo = (target: Locale) => {
    if (target === locale) return setOpen(false);
    startTransition(() => {
      router.replace(
        // @ts-expect-error pathname from usePathname is a string, router.replace expects a typed pathname union
        { pathname, params },
        { locale: target },
      );
    });
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${labels[locale].native} — change language`}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold transition-colors',
          'text-ink-secondary hover:text-ink hover:bg-background-secondary',
          compact ? 'h-9 px-2' : 'h-9 px-3',
          isPending && 'opacity-60',
        )}
      >
        <Globe size={15} aria-hidden />
        {compact ? labels[locale].short : labels[locale].native}
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-surface border border-line-light rounded-xl shadow-cardHover overflow-hidden z-50"
        >
          {(Object.keys(labels) as Locale[]).map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className={cn(
                  'w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors',
                  'hover:bg-primary-lighter',
                  l === locale ? 'text-primary bg-primary-lighter/60' : 'text-ink-secondary',
                )}
              >
                {labels[l].native}
                <span className="ml-2 text-xs uppercase opacity-60">{labels[l].short}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
