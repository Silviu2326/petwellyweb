import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Card } from './Card';

interface FeatureItem {
  icon: ReactNode;
  title: string;
  body: string;
  /** Lista de bullets opcional para variantes informativas. */
  bullets?: string[];
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  variant?: 'compact' | 'detailed';
  className?: string;
}

/**
 * Grid de tarjetas de características reutilizable.
 *  - `compact`: icono, título y descripción.
 *  - `detailed`: añade bullets debajo (para la página /features).
 */
export function FeatureGrid({
  items,
  columns = 3,
  variant = 'compact',
  className,
}: FeatureGridProps) {
  const cols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  } as const;
  return (
    <div className={cn('grid gap-4 sm:gap-5', cols[columns], className)}>
      {items.map((item) => (
        <Card key={item.title} className="hover:shadow-cardHover transition-shadow h-full" padding={variant === 'detailed' ? 'lg' : 'md'}>
          <div className="w-12 h-12 rounded-2xl bg-primary-lighter text-primary flex items-center justify-center mb-4">
            {item.icon}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-ink">{item.title}</h3>
          <p className="text-sm sm:text-[15px] text-ink-secondary mt-2 leading-relaxed">{item.body}</p>
          {variant === 'detailed' && item.bullets && (
            <ul className="mt-5 space-y-2">
              {item.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      ))}
    </div>
  );
}
