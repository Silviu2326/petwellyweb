import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Sparkles } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Badge } from '@/components/Badge';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PricingTable } from '@/components/PricingTable';
import { JsonLd } from '@/components/JsonLd';
import { productPlansJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pricing' });
  return buildMetadata({
    path: '/pricing',
    locale,
    title: t('title'),
    description: t('subtitle'),
    keywords: [
      'precio software criadero', 'kennel software pricing',
      'plan criadero perros', 'breeder ERP price',
    ],
  });
}

export default async function PricingPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];

  // JSON-LD: planes como Product/Offer
  const planKeys = ['starter', 'breeder', 'kennel'] as const;
  const planOffers = planKeys.map((k) => ({
    name: t(`plans.${k}.name`),
    description: t(`plans.${k}.tagline`),
    monthly: Number(t(`plans.${k}.monthly`)),
    yearly: Number(t(`plans.${k}.yearly`)),
  }));

  return (
    <>
      <Section spacing="md">
        <Container size="narrow" className="text-center">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: tNav('pricing') },
            ]}
          />
          <Badge variant="primary" className="mt-6 mb-5">
            <Sparkles size={12} aria-hidden /> {tNav('pricing')}
          </Badge>
          <h1 className="text-balance">{t('title')}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-5 max-w-2xl mx-auto text-pretty">
            {t('subtitle')}
          </p>
        </Container>
      </Section>

      <Section spacing="sm">
        <PricingTable />
      </Section>

      {/* FAQ */}
      <Section size="narrow">
        <div className="text-center mb-10">
          <h2>{t('faq.title')}</h2>
        </div>
        <FAQ items={faqItems} />
      </Section>

      {/* CTA */}
      <Section size="narrow" spacing="sm">
        <CTASection
          title={t('ctaFinal.title')}
          body={t('ctaFinal.body')}
          primary={{ label: t('ctaFinal.primary'), href: '/contact' }}
          secondary={{ label: t('ctaFinal.secondary'), href: '/features' }}
        />
      </Section>

      <JsonLd data={productPlansJsonLd(planOffers, locale)} id="pricing-plans-jsonld" />
      <span hidden>{siteConfig.name}</span>
    </>
  );
}
