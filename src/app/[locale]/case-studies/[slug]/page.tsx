import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Quote, MapPin, Users, Calendar } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { locales } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { caseStudies, getCaseStudy, localizedCaseStudy } from '@/lib/case-studies';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

interface Params { locale: Locale; slug: string }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: Params;
}): Promise<Metadata> {
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const c = localizedCaseStudy(slug, locale)!;
  return buildMetadata({
    path: '/case-studies/[slug]',
    params: { slug },
    locale,
    title: `${cs.name} — ${c.breed}`,
    description: c.short,
  });
}

export default async function CaseStudyPage({
  params: { locale, slug },
}: {
  params: Params;
}) {
  setRequestLocale(locale);
  const cs = getCaseStudy(slug);
  if (!cs) notFound();
  const c = localizedCaseStudy(slug, locale)!;
  const tCS = await getTranslations({ locale, namespace: 'caseStudies' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <Section spacing="md">
        <Container size="narrow">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: tNav('caseStudies'), href: '/case-studies' },
              { label: cs.name },
            ]}
          />
          <div className="mt-8 mb-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-primary-lighter text-3xl flex items-center justify-center">
              {cs.emoji}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">{c.breed}</Badge>
              <Badge variant="info">{c.location}</Badge>
              <Badge variant="purple">{c.size}</Badge>
            </div>
          </div>
          <h1 className="text-balance">{cs.name}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-4 max-w-3xl text-pretty">
            {c.short}
          </p>
          <div className="mt-7 flex flex-wrap gap-4 text-sm text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><Calendar size={14} aria-hidden /> {c.withPetwelly}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin size={14} aria-hidden /> {c.location}</span>
            <span className="inline-flex items-center gap-1.5"><Users size={14} aria-hidden /> {c.size}</span>
          </div>
        </Container>
      </Section>

      {/* MÉTRICAS */}
      <Container size="narrow">
        <div className="grid sm:grid-cols-3 gap-4">
          {c.metrics.map((m) => (
            <Card key={m.label} className="text-center" padding="md">
              <div className="text-3xl font-extrabold text-primary">{m.value}</div>
              <div className="text-xs uppercase tracking-wider text-ink-muted mt-2">{m.label}</div>
            </Card>
          ))}
        </div>
      </Container>

      {/* CHALLENGE / SOLUTION / OUTCOME */}
      <Section>
        <Container size="narrow" className="space-y-12">
          <Block
            title={locale === 'es' ? 'El reto' : 'The challenge'}
            tone="warning"
            items={c.challenge}
          />
          <Block
            title={locale === 'es' ? 'La solución' : 'The solution'}
            tone="primary"
            items={c.solution}
          />
          <Block
            title={locale === 'es' ? 'El resultado' : 'The outcome'}
            tone="success"
            items={c.outcome}
          />
        </Container>
      </Section>

      {/* QUOTE */}
      <Section size="narrow" background="secondary">
        <Card padding="lg" className="bg-surface">
          <Quote size={32} aria-hidden className="text-primary mb-4" />
          <p className="text-xl sm:text-2xl text-ink leading-relaxed font-medium text-balance">
            {c.quote.text}
          </p>
          <div className="mt-5 text-sm">
            <span className="font-extrabold text-ink">{c.quote.author}</span>
            <span className="text-ink-muted ml-2">· {c.quote.role}</span>
          </div>
        </Card>
      </Section>

      <Section size="narrow" spacing="sm">
        <CTASection
          title={tCS('ctaFinal.title')}
          body={tCS('ctaFinal.body')}
          primary={{ label: tCS('ctaFinal.primary'), external: `${siteConfig.appUrl}/register` }}
          secondary={{ label: tCS('ctaFinal.secondary'), href: '/contact' }}
        />
      </Section>
    </>
  );
}

function Block({
  title,
  tone,
  items,
}: {
  title: string;
  tone: 'warning' | 'primary' | 'success';
  items: string[];
}) {
  const dotMap = {
    warning: 'bg-warning',
    primary: 'bg-primary',
    success: 'bg-success',
  };
  return (
    <div>
      <h2 className="text-2xl mb-5">{title}</h2>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-3 text-base text-ink-secondary">
            <span aria-hidden className={`mt-2.5 w-2 h-2 rounded-full shrink-0 ${dotMap[tone]}`} />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
