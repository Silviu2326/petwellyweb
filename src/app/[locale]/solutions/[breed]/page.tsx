import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check, AlertTriangle, FlaskConical, Calendar, ArrowRight } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { locales } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { softwareApplicationJsonLd } from '@/lib/jsonld';
import { breeds, getBreed } from '@/lib/breeds';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

interface Params { locale: Locale; breed: string }

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    breeds.map((b) => ({ locale, breed: b.slug })),
  );
}

export async function generateMetadata({
  params: { locale, breed },
}: {
  params: Params;
}): Promise<Metadata> {
  const data = getBreed(breed);
  if (!data) return {};
  const c = data.content[locale];
  return buildMetadata({
    path: '/solutions/[breed]',
    params: { breed },
    locale,
    title: `${c.name} · ${data.keyword[locale]}`,
    description: c.hero,
    keywords: [data.keyword[locale], c.name, 'criadero', 'kennel'],
  });
}

export default async function BreedSolutionPage({
  params: { locale, breed },
}: {
  params: Params;
}) {
  setRequestLocale(locale);
  const data = getBreed(breed);
  if (!data) notFound();
  const c = data.content[locale];
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const tSol = await getTranslations({ locale, namespace: 'solutions' });

  return (
    <>
      <Section spacing="md">
        <Container size="narrow">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: tNav('solutions'), href: '/solutions' },
              { label: c.name },
            ]}
          />
          <div className="mt-8 flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-3xl bg-primary-lighter text-3xl flex items-center justify-center">
              {data.emoji}
            </div>
            <Badge variant="primary">{data.keyword[locale]}</Badge>
          </div>
          <h1 className="text-balance">{c.name}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-5 max-w-3xl text-pretty">
            {c.hero}
          </p>
        </Container>
      </Section>

      <Section background="secondary">
        <Card padding="lg" className="bg-surface">
          <h2 className="text-2xl">
            {locale === 'es' ? '¿Por qué importa?' : 'Why it matters'}
          </h2>
          <p className="text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed text-pretty">
            {c.whyMatters}
          </p>
        </Card>
      </Section>

      {/* Datos clave */}
      <Section spacing="sm">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {c.litterFacts.map((f) => (
            <Card key={f.label} className="text-center">
              <Calendar size={20} aria-hidden className="text-primary mx-auto mb-3" />
              <div className="text-xl font-extrabold text-ink">{f.value}</div>
              <div className="text-xs uppercase tracking-wider text-ink-muted mt-1">{f.label}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Protocolos / genética / vigilancia */}
      <Section>
        <div className="grid lg:grid-cols-3 gap-5">
          <Card padding="lg" className="h-full">
            <Check size={24} aria-hidden className="text-success mb-3" />
            <h3 className="text-lg font-extrabold text-ink">
              {locale === 'es' ? 'Protocolos' : 'Protocols'}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {c.protocols.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card padding="lg" className="h-full">
            <FlaskConical size={24} aria-hidden className="text-info mb-3" />
            <h3 className="text-lg font-extrabold text-ink">
              {locale === 'es' ? 'Pruebas genéticas' : 'Genetic tests'}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.geneticTests.map((g) => (
                <Badge key={g} variant="info">{g}</Badge>
              ))}
            </ul>
          </Card>
          <Card padding="lg" className="h-full">
            <AlertTriangle size={24} aria-hidden className="text-warning mb-3" />
            <h3 className="text-lg font-extrabold text-ink">
              {locale === 'es' ? 'Qué vigilar' : 'Watch out for'}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {c.watchOut.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      <Section size="narrow" spacing="sm">
        <CTASection
          title={
            locale === 'es'
              ? `Petwelly ya viene preconfigurado para ${c.name}`
              : `Petwelly comes pre-configured for ${c.name}`
          }
          body={tSol('subtitle')}
          primary={{ label: tSol('ctaPrimary'), external: siteConfig.appUrl }}
          secondary={{ label: tSol('ctaSecondary'), href: '/pricing' }}
        />
      </Section>

      {/* Otros breeds (cross-link interno SEO) */}
      <Section background="secondary" spacing="sm">
        <div className="text-center mb-8">
          <h2 className="text-2xl">
            {locale === 'es' ? 'Otras razas' : 'Other breeds'}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {breeds
            .filter((b) => b.slug !== breed)
            .slice(0, 6)
            .map((b) => (
              <a
                key={b.slug}
                href={`/${locale}/${locale === 'es' ? 'soluciones' : 'solutions'}/${b.slug}`}
                className="group"
              >
                <Card className="h-full hover:shadow-cardHover transition-all flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-primary-lighter flex items-center justify-center text-xl">
                    {b.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-extrabold text-ink group-hover:text-primary transition-colors">
                      {b.content[locale].name}
                    </div>
                  </div>
                  <ArrowRight size={14} aria-hidden className="text-ink-muted group-hover:text-primary" />
                </Card>
              </a>
            ))}
        </div>
      </Section>

      <JsonLd data={softwareApplicationJsonLd(locale)} id="breed-software-jsonld" />
    </>
  );
}
