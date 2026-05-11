'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/cn';

type PlanKey = 'starter' | 'breeder' | 'kennel';
const PLAN_KEYS: PlanKey[] = ['starter', 'breeder', 'kennel'];

/**
 * Tabla de precios con toggle mensual/anual.
 * Lee los planes desde el namespace `pricing.plans.*` en messages/.
 * El plan «Breeder+» (popular) recibe énfasis visual.
 */
export function PricingTable() {
  const t = useTranslations('pricing');
  const [yearly, setYearly] = useState(true);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setYearly(false)}
          className={cn(
            'h-10 px-5 rounded-xl text-sm font-semibold transition-colors',
            !yearly ? 'bg-primary text-white shadow-sm' : 'bg-background-secondary text-ink-secondary',
          )}
          aria-pressed={!yearly}
        >
          {t('monthly')}
        </button>
        <button
          type="button"
          onClick={() => setYearly(true)}
          className={cn(
            'h-10 px-5 rounded-xl text-sm font-semibold transition-colors inline-flex items-center gap-2',
            yearly ? 'bg-primary text-white shadow-sm' : 'bg-background-secondary text-ink-secondary',
          )}
          aria-pressed={yearly}
        >
          {t('yearly')}
          <span className={cn('text-xs px-1.5 py-0.5 rounded-full', yearly ? 'bg-white/20' : 'bg-success-lighter text-success')}>
            {t('yearlyDiscount')}
          </span>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 lg:gap-7">
        {PLAN_KEYS.map((key) => (
          <PlanCard key={key} planKey={key} yearly={yearly} t={t} />
        ))}
      </div>
    </div>
  );
}

function PlanCard({
  planKey,
  yearly,
  t,
}: {
  planKey: PlanKey;
  yearly: boolean;
  t: ReturnType<typeof useTranslations>;
}) {
  const isPopular = planKey === 'breeder';
  const name = t(`plans.${planKey}.name`);
  const tagline = t(`plans.${planKey}.tagline`);
  const price = Number(t(`plans.${planKey}.${yearly ? 'yearly' : 'monthly'}`));

  // Las features son un array; iteramos sin saber el tamaño usando t.raw
  const features = (t.raw(`plans.${planKey}.features`) as string[]) ?? [];

  return (
    <div
      className={cn(
        'relative rounded-3xl border p-7 sm:p-9 bg-surface flex flex-col',
        isPopular
          ? 'border-primary shadow-cardHover ring-1 ring-primary/30 lg:-translate-y-2'
          : 'border-line-light shadow-card',
      )}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-sm">
          <Sparkles size={12} aria-hidden /> {t('popular')}
        </span>
      )}
      <h3 className="text-xl font-extrabold text-ink">{name}</h3>
      <p className="text-sm text-ink-secondary mt-1">{tagline}</p>

      <div className="mt-6 flex items-baseline gap-1.5">
        <span className="text-5xl font-extrabold text-ink">{price}€</span>
        <span className="text-base text-ink-muted font-semibold">{t('perMonth')}</span>
      </div>
      <p className="text-xs text-ink-muted mt-1">
        {yearly ? t('billedYearly') : t('billedMonthly')}
      </p>

      <a
        href={`${siteConfig.appUrl}/register?plan=${planKey}`}
        className={cn(
          'mt-7 h-12 inline-flex items-center justify-center px-5 rounded-xl text-sm font-semibold transition-colors',
          isPopular
            ? 'bg-primary text-white hover:bg-primary-dark shadow-sm'
            : 'bg-background-secondary text-ink hover:bg-primary-lighter hover:text-primary',
        )}
      >
        {t('ctaTrial')}
      </a>

      <ul className="mt-7 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-ink-secondary">
            <Check size={16} aria-hidden className="text-primary shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
