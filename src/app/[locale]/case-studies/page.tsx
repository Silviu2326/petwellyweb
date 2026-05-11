import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Quote } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { caseStudies, localizedCaseStudy } from '@/lib/case-studies';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'caseStudies' });
  return buildMetadata({
    path: '/case-studies',
    locale,
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function CaseStudiesIndexPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'caseStudies' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <Section spacing="md">
        <Container size="narrow" className="text-center">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: tNav('caseStudies') },
            ]}
          />
          <Badge variant="success" className="mt-6 mb-5">{tNav('caseStudies')}</Badge>
          <h1 className="text-balance">{t('title')}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-5 max-w-2xl mx-auto text-pretty">
            {t('subtitle')}
          </p>
        </Container>
      </Section>

      <Section background="secondary" spacing="md">
        <div className="grid lg:grid-cols-3 gap-5">
          {caseStudies.map((cs) => {
            const c = localizedCaseStudy(cs.slug, locale)!;
            return (
              <Card key={cs.slug} padding="none" className="overflow-hidden hover:shadow-cardHover transition-all flex flex-col h-full">
                <div className="aspect-[16/9] bg-primary-lighter flex items-center justify-center text-6xl">
                  {cs.emoji}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-3 flex-wrap">
                    <Badge variant="primary">{c.breed}</Badge>
                    <span className="text-xs text-ink-muted">{c.location}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-ink">{cs.name}</h3>
                  <p className="text-sm text-ink-secondary mt-2 leading-relaxed line-clamp-2 flex-1">
                    {c.short}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-line-light text-center">
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <div className="text-base font-extrabold text-primary">{m.value}</div>
                        <div className="text-2xs uppercase tracking-wider text-ink-muted mt-0.5">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link
                    // @ts-expect-error pathnames typed
                    href={{ pathname: '/case-studies/[slug]', params: { slug: cs.slug } }}
                    className="mt-5 inline-flex items-center gap-1.5 text-primary font-semibold text-sm hover:gap-2 transition-all"
                  >
                    {t('readCase')} <ArrowRight size={14} aria-hidden />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* QUOTE FEATURED */}
      <Section size="narrow" background="default">
        <Card padding="lg" className="bg-surface">
          <Quote size={32} aria-hidden className="text-primary mb-4" />
          <p className="text-xl sm:text-2xl text-ink leading-relaxed font-medium text-balance">
            {localizedCaseStudy('estrella-polar', locale)!.quote.text}
          </p>
          <div className="mt-5 text-sm">
            <span className="font-extrabold text-ink">
              {localizedCaseStudy('estrella-polar', locale)!.quote.author}
            </span>
            <span className="text-ink-muted ml-2">
              · {localizedCaseStudy('estrella-polar', locale)!.quote.role}
            </span>
          </div>
        </Card>
      </Section>

      <Section size="narrow" spacing="sm">
        <CTASection
          title={t('ctaFinal.title')}
          body={t('ctaFinal.body')}
          primary={{ label: t('ctaFinal.primary'), external: `${siteConfig.appUrl}/register` }}
          secondary={{ label: t('ctaFinal.secondary'), href: '/contact' }}
        />
      </Section>
    </>
  );
}
