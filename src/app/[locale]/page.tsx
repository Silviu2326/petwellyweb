import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  ArrowRight,
  CalendarHeart,
  CheckCircle2,
  Coins,
  Dog as DogIcon,
  Heart,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
  ShieldCheck,
  ChartLine,
} from 'lucide-react';

import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { Badge } from '@/components/Badge';
import { Card } from '@/components/Card';
import { FeatureGrid } from '@/components/FeatureGrid';
import { FAQ } from '@/components/FAQ';
import { CTASection } from '@/components/CTASection';
import { JsonLd } from '@/components/JsonLd';
import { softwareApplicationJsonLd } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home.hero' });
  const tSite = await getTranslations({ locale, namespace: 'site' });
  return buildMetadata({
    path: '/',
    locale,
    title: `${tSite('name')} · ${tSite('tagline')}`,
    description: t('subtitle'),
  });
}

const FEATURE_ICONS = {
  dog: DogIcon,
  litter: Heart,
  client: Users,
  calendar: CalendarHeart,
  finance: Coins,
  pipeline: TrendingUp,
} as const;
type FeatureKey = keyof typeof FEATURE_ICONS;

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });

  const featuresItems = (Object.keys(FEATURE_ICONS) as FeatureKey[]).map((k) => {
    const Icon = FEATURE_ICONS[k];
    return {
      icon: <Icon size={22} strokeWidth={2.4} aria-hidden />,
      title: t(`features.items.${k}.title`),
      body: t(`features.items.${k}.body`),
    };
  });

  const testimonialsBadge = t('testimonials.badge');
  const testimonialsTitle = t('testimonials.title');
  const testimonialsBody = t('testimonials.body');
  const faqItems = t.raw('faq.items') as { q: string; a: string }[];
  const stepKeys = ['import', 'configure', 'operate', 'grow'] as const;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-lighter via-background to-secondary-lighter -z-10" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-30 -z-10 mask-fade-bottom" />
        <Container className="py-16 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="primary" className="mb-5">
                <Sparkles size={12} aria-hidden /> {t('hero.badge')}
              </Badge>
              <h1 className="text-balance">
                {t('hero.titleStart')}{' '}
                <span className="text-primary">{t('hero.titleHighlight')}</span>
                {t('hero.titleEnd')}
              </h1>
              <p className="text-base sm:text-lg text-ink-secondary mt-6 max-w-xl text-pretty">
                {t('hero.subtitle')}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href={siteConfig.appUrl}
                  className="h-12 px-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-white text-sm font-semibold shadow-sm hover:bg-primary-dark transition-colors"
                >
                  {t('hero.ctaPrimary')} <ArrowRight size={16} aria-hidden />
                </a>
                <Link
                  href="/features"
                  className="h-12 px-6 inline-flex items-center justify-center rounded-xl border border-line bg-surface text-ink text-sm font-semibold hover:bg-background-secondary transition-colors"
                >
                  {t('hero.ctaSecondary')}
                </Link>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-xs text-ink-muted">
                <CheckCircle2 size={14} aria-hidden className="text-success" />
                {t('hero.trust')}
              </p>
            </div>

            <div className="relative lg:-mr-12 xl:-mr-20">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary/15 via-primary/5 to-transparent blur-3xl"
              />
              <Image
                src="/hero.png"
                alt={t('hero.imageAlt')}
                width={567}
                height={440}
                priority
                sizes="(min-width: 1280px) 720px, (min-width: 1024px) 56vw, 100vw"
                className="w-full h-auto select-none drop-shadow-[0_30px_60px_rgba(15,55,40,0.18)]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* STATS */}
      <Section spacing="sm" background="default">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-ink-muted font-bold mb-7">
          {t('stats.title')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {(['tools', 'data', 'lockin'] as const).map((k) => (
            <Card key={k} className="text-center" padding="md">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">
                {t(`stats.items.${k}.value`)}
              </div>
              <div className="text-xs sm:text-sm text-ink-secondary mt-2">
                {t(`stats.items.${k}.label`)}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* FEATURES */}
      <Section background="secondary">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <Badge variant="info" className="mb-3">
            <Zap size={12} aria-hidden /> {t('features.badge')}
          </Badge>
          <h2 className="text-balance">{t('features.title')}</h2>
          <p className="text-ink-secondary mt-3 text-pretty">{t('features.subtitle')}</p>
        </div>
        <FeatureGrid items={featuresItems} columns={3} />
        <div className="text-center mt-10">
          <Link
            href="/features"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            {tNav('features')} <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </Section>

      {/* WORKFLOW */}
      <Section>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <Badge variant="purple" className="mb-3">
            <ChartLine size={12} aria-hidden /> {t('workflow.badge')}
          </Badge>
          <h2 className="text-balance">{t('workflow.title')}</h2>
          <p className="text-ink-secondary mt-3">{t('workflow.subtitle')}</p>
        </div>
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stepKeys.map((k) => (
            <li key={k}>
              <Card className="h-full" padding="md">
                <h3 className="text-base font-extrabold text-ink">{t(`workflow.steps.${k}.title`)}</h3>
                <p className="text-sm text-ink-secondary mt-2 leading-relaxed">
                  {t(`workflow.steps.${k}.body`)}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      {/* TESTIMONIALS (placeholder honesto: aún sin clientes publicables) */}
      <Section background="secondary" size="narrow">
        <Card padding="lg" className="bg-surface text-center">
          <Badge variant="warning" className="mb-3">
            <Star size={12} aria-hidden /> {testimonialsBadge}
          </Badge>
          <h2 className="text-balance">{testimonialsTitle}</h2>
          <p className="text-base text-ink-secondary mt-4 leading-relaxed max-w-2xl mx-auto text-pretty">
            {testimonialsBody}
          </p>
        </Card>
      </Section>

      {/* FAQ */}
      <Section size="narrow">
        <div className="text-center mb-10">
          <Badge variant="blue" className="mb-3">
            <ShieldCheck size={12} aria-hidden /> {t('faq.badge')}
          </Badge>
          <h2>{t('faq.title')}</h2>
        </div>
        <FAQ items={faqItems} />
      </Section>

      {/* CTA FINAL */}
      <Section size="narrow" spacing="sm">
        <CTASection
          title={t('ctaFinal.title')}
          body={t('ctaFinal.body')}
          primary={{ label: t('ctaFinal.primary'), external: siteConfig.appUrl }}
          secondary={{ label: t('ctaFinal.secondary'), href: '/pricing' }}
        />
      </Section>

      <JsonLd data={softwareApplicationJsonLd(locale)} id="home-software-jsonld" />
    </>
  );
}
