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
  const team = t.raw('team.members') as { name: string; role: string; bio: string }[];

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

      {/* HISTORIA */}
      <Section size="narrow" background="secondary">
        <Card padding="lg" className="bg-surface">
          <h2 className="text-balance">{t('story.title')}</h2>
          <p className="text-base sm:text-lg text-ink-secondary mt-5 leading-relaxed text-pretty">
            {t('story.body')}
          </p>
        </Card>
      </Section>

      {/* VALORES */}
      <Section>
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

      {/* EQUIPO */}
      <Section background="secondary">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2>{t('team.title')}</h2>
          <p className="text-ink-secondary mt-3">{t('team.subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((m) => (
            <Card key={m.name} className="text-center" padding="md">
              <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-extrabold flex items-center justify-center mx-auto">
                {m.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}
              </div>
              <div className="text-base font-extrabold text-ink mt-3">{m.name}</div>
              <div className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">{m.role}</div>
              <p className="text-xs text-ink-secondary mt-3">{m.bio}</p>
            </Card>
          ))}
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
