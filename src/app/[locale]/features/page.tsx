import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  Dog as DogIcon,
  Heart,
  Stethoscope,
  Users,
  ClipboardList,
  Coins,
  Truck,
  UserCircle2,
  Globe2,
  Sparkles,
} from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { CTASection } from '@/components/CTASection';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { softwareApplicationJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const GROUPS = [
  { key: 'dogs', icon: DogIcon, anchor: 'perros' },
  { key: 'litters', icon: Heart, anchor: 'camadas' },
  { key: 'health', icon: Stethoscope, anchor: 'salud' },
  { key: 'clients', icon: Users, anchor: 'clientes' },
  { key: 'reservations', icon: ClipboardList, anchor: 'reservas' },
  { key: 'finance', icon: Coins, anchor: 'finanzas' },
  { key: 'shipping', icon: Truck, anchor: 'envios' },
  { key: 'portal', icon: UserCircle2, anchor: 'portal' },
  { key: 'site', icon: Globe2, anchor: 'microsite' },
] as const;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'features' });
  return buildMetadata({
    path: '/features',
    locale,
    title: t('title'),
    description: t('subtitle'),
    keywords: [
      'ERP criadero', 'gestión criadero perros', 'software centro canino',
      'kennel software', 'breeder ERP', 'whelping log',
    ],
  });
}

export default async function FeaturesPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'features' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  return (
    <>
      {/* HERO */}
      <Section spacing="md" background="default">
        <Container size="narrow" className="text-center">
          <Breadcrumbs
            locale={locale}
            items={[
              { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
              { label: tNav('features') },
            ]}
          />
          <Badge variant="primary" className="mt-6 mb-5">
            <Sparkles size={12} aria-hidden /> {t('title')}
          </Badge>
          <h1 className="text-balance">{t('title')}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-5 max-w-2xl mx-auto text-pretty">
            {t('subtitle')}
          </p>
          <p className="text-sm text-ink-muted mt-4 max-w-2xl mx-auto">
            {t('intro')}
          </p>
        </Container>
      </Section>

      {/* TABLE OF CONTENTS (anclas para SEO) */}
      <Container size="narrow" className="-mt-8 mb-12">
        <nav
          aria-label={locale === 'es' ? 'Índice de contenidos' : 'Table of contents'}
          className="flex flex-wrap justify-center gap-2"
        >
          {GROUPS.map((g) => (
            <a
              key={g.key}
              href={`#${g.anchor}`}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-background-secondary text-ink-secondary hover:bg-primary-lighter hover:text-primary transition-colors"
            >
              {t(`groups.${g.key}.title`)}
            </a>
          ))}
        </nav>
      </Container>

      {/* GROUPS */}
      {GROUPS.map((g, idx) => {
        const Icon = g.icon;
        const items = (t.raw(`groups.${g.key}.items`) as string[]) ?? [];
        return (
          <Section
            key={g.key}
            id={g.anchor}
            background={idx % 2 === 0 ? 'secondary' : 'default'}
            spacing="md"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-5">
                  <Icon size={26} strokeWidth={2.2} aria-hidden />
                </div>
                <h2 className="text-balance">{t(`groups.${g.key}.title`)}</h2>
                <p className="text-base sm:text-lg text-ink-secondary mt-4 text-pretty">
                  {t(`groups.${g.key}.description`)}
                </p>
              </div>
              <div className="lg:col-span-7">
                <Card padding="lg" className="bg-surface">
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-ink-secondary">
                        <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </Section>
        );
      })}

      {/* CTA FINAL */}
      <Section size="narrow" spacing="sm">
        <CTASection
          title={t('ctaFinal.title')}
          body={t('ctaFinal.body')}
          primary={{ label: t('ctaFinal.primary'), external: siteConfig.appUrl }}
          secondary={{ label: t('ctaFinal.secondary'), href: '/pricing' }}
        />
      </Section>

      <JsonLd data={softwareApplicationJsonLd(locale)} id="features-software-jsonld" />
    </>
  );
}
