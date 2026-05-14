import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { HeartHandshake, MessagesSquare, Lock, Sparkles } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'about' });
  return buildMetadata({
    path: '/about',
    locale,
    title: t('title'),
    description: t('subtitle'),
  });
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'about' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const values = t.raw('values.items') as { title: string; body: string }[];

  const valueIcons = [HeartHandshake, MessagesSquare, Lock, Sparkles];

  return (
    <>
      <Section spacing="md">
        <Container size="narrow" className="text-center">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: tNav('about') },
            ]}
          />
          <Badge variant="info" className="mt-6 mb-5">{tNav('about')}</Badge>
          <h1 className="text-balance">{t('title')}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-5 max-w-2xl mx-auto text-pretty">
            {t('subtitle')}
          </p>
        </Container>
      </Section>

      {/* VALORES */}
      <Section background="secondary">
        <div className="text-center mb-10">
          <h2>{t('values.title')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {values.map((v, i) => {
            const Icon = valueIcons[i] ?? HeartHandshake;
            return (
              <Card key={v.title} className="h-full">
                <div className="w-11 h-11 rounded-2xl bg-primary-lighter text-primary flex items-center justify-center mb-4">
                  <Icon size={20} aria-hidden />
                </div>
                <h3 className="text-lg font-bold text-ink">{v.title}</h3>
                <p className="text-sm text-ink-secondary mt-2 leading-relaxed">{v.body}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section size="narrow" spacing="sm">
        <CTASection
          title={t('ctaFinal.title')}
          body={t('ctaFinal.body')}
          primary={{ label: t('ctaFinal.primary'), href: '/contact' }}
          secondary={{ label: t('ctaFinal.secondary'), href: '/pricing' }}
        />
      </Section>

      <span hidden>{siteConfig.name}</span>
    </>
  );
}
