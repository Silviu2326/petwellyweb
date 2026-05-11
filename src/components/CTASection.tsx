import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/cn';

interface CTASectionProps {
  title: string;
  body: string;
  primary: { label: string; href?: '/' | '/features' | '/pricing' | '/about' | '/blog' | '/contact' | '/case-studies' | '/solutions'; external?: string };
  secondary?: { label: string; href?: '/' | '/features' | '/pricing' | '/about' | '/blog' | '/contact' | '/case-studies' | '/solutions'; external?: string };
  variant?: 'primary' | 'mesh';
  className?: string;
}

/**
 * Sección de CTA (call-to-action) reutilizable. Dos variantes:
 *   - `primary`: bloque verde brillante (foco máximo, fin de página).
 *   - `mesh`: superficie sobre fondo mesh, más ligera.
 */
export function CTASection({
  title,
  body,
  primary,
  secondary,
  variant = 'primary',
  className,
}: CTASectionProps) {
  const isMesh = variant === 'mesh';
  return (
    <section
      className={cn(
        'rounded-3xl px-6 sm:px-12 py-12 sm:py-16 text-center',
        isMesh
          ? 'bg-background-secondary border border-line-light'
          : 'bg-gradient-to-br from-primary to-primary-dark text-white',
        className,
      )}
    >
      <h2
        className={cn(
          'text-3xl sm:text-4xl font-extrabold tracking-tight',
          isMesh ? 'text-ink' : 'text-white',
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'mt-4 text-base sm:text-lg max-w-2xl mx-auto',
          isMesh ? 'text-ink-secondary' : 'text-white/90',
        )}
      >
        {body}
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        {primary.external ? (
          <a
            href={primary.external}
            className={cn(
              'h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors shadow-sm',
              isMesh ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-primary hover:bg-white/90',
            )}
          >
            {primary.label}
            <ArrowRight size={16} aria-hidden />
          </a>
        ) : primary.href ? (
          <Link
            href={primary.href}
            className={cn(
              'h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors shadow-sm',
              isMesh ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-primary hover:bg-white/90',
            )}
          >
            {primary.label}
            <ArrowRight size={16} aria-hidden />
          </Link>
        ) : null}
        {secondary && (secondary.external ? (
          <a
            href={secondary.external}
            className={cn(
              'h-12 px-6 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-colors',
              isMesh
                ? 'bg-transparent border border-line text-ink hover:bg-surface'
                : 'bg-transparent border border-white/30 text-white hover:bg-white/10',
            )}
          >
            {secondary.label}
          </a>
        ) : secondary.href ? (
          <Link
            href={secondary.href}
            className={cn(
              'h-12 px-6 inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-colors',
              isMesh
                ? 'bg-transparent border border-line text-ink hover:bg-surface'
                : 'bg-transparent border border-white/30 text-white hover:bg-white/10',
            )}
          >
            {secondary.label}
          </Link>
        ) : null)}
      </div>
    </section>
  );
}
