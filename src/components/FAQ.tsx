'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { JsonLd } from './JsonLd';
import { faqJsonLd } from '@/lib/jsonld';

interface FAQItem { q: string; a: string }
interface FAQProps {
  items: FAQItem[];
  /** Si true incluye JSON-LD `FAQPage`. Por defecto true. */
  withJsonLd?: boolean;
  defaultOpen?: number;
}

/**
 * Acordeón accesible de FAQ con JSON-LD `FAQPage` integrado.
 * Cada item se controla con un único índice abierto; click en el abierto
 * lo cierra. Compatible con teclado (botón nativo, foco visible).
 */
export function FAQ({ items, withJsonLd = true, defaultOpen = 0 }: FAQProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <>
      <ul className="divide-y divide-line-light rounded-2xl bg-surface border border-line-light">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                className="w-full flex items-start justify-between gap-4 text-left px-5 sm:px-6 py-5 hover:bg-background-secondary/40 transition-colors"
              >
                <span className="text-base sm:text-lg font-bold text-ink">{item.q}</span>
                <ChevronDown
                  size={20}
                  aria-hidden
                  className={cn('text-ink-secondary shrink-0 transition-transform mt-1', isOpen && 'rotate-180')}
                />
              </button>
              {isOpen && (
                <div id={`faq-${i}`} className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-ink-secondary leading-relaxed">
                  {item.a}
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {withJsonLd && <JsonLd data={faqJsonLd(items)} id="faq-jsonld" />}
    </>
  );
}
