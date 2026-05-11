import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Sparkles } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { Link } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { breeds } from '@/lib/breeds';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'solutions' });
  return buildMetadata({
    path: '/solutions',
    locale,
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function SolutionsIndexPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'solutions' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      <Section spacing="md">
        <Container size="narrow" className="text-center">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: tNav('solutions') },
            ]}
          />
          <Badge variant="secondary" className="mt-6 mb-5">
            <Sparkles size={12} aria-hidden /> {tNav('solutions')}
          </Badge>
          <h1 className="text-balance">{t('title')}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-5 text-pretty max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-sm text-ink-muted mt-3">{t('intro')}</p>
        </Container>
      </Section>

      <Section background="secondary" spacing="md">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {breeds.map((b) => {
            const c = b.content[locale];
            return (
              <Link
                key={b.slug}
                href={{ pathname: '/solutions/[breed]', params: { breed: b.slug } }}
                className="group"
              >
                <Card className="h-full hover:shadow-cardHover transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-lighter text-2xl flex items-center justify-center">
                      {b.emoji}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-ink-muted">
                        {locale === 'es' ? 'Criadero de' : 'Kennel of'}
                      </div>
                      <div className="text-base font-extrabold text-ink">{c.name}</div>
                    </div>
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed line-clamp-3">{c.hero}</p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {locale === 'es' ? 'Ver para esta raza' : 'See for this breed'}
                    <ArrowRight size={14} aria-hidden />
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section size="narrow" spacing="sm">
        <CTASection
          title={t('ctaPrimary')}
          body={t('subtitle')}
          primary={{ label: t('ctaPrimary'), external: siteConfig.appUrl }}
          secondary={{ label: t('ctaSecondary'), href: '/pricing' }}
        />
      </Section>
    </>
  );
}
