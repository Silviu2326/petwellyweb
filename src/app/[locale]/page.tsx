import type { Metadata } from 'next';
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

  const testimonials = t.raw('testimonials.items') as { name: string; role: string; text: string }[];
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
                  href={`${siteConfig.appUrl}/register`}
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

            <div className="relative">
              <Card className="shadow-cardHover" padding="md">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center">
                    <DogIcon size={22} aria-hidden />
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-ink">{t('hero.mockup.kennel')}</div>
                    <div className="text-xs text-ink-muted">{t('hero.mockup.dogs')}</div>
                  </div>
                  <Badge variant="success" className="ml-auto">{t('hero.mockup.salesUp')}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <KpiMini label={t('hero.mockup.today')} value="32" tone="primary" />
                  <KpiMini label={t('hero.mockup.month')} value="9.8k" tone="success" />
                  <KpiMini label={t('hero.mockup.vac')} value="92%" tone="info" />
                </div>
                <ul className="space-y-2.5">
                  <ListItem text={t('hero.mockup.list1')} tone="success" />
                  <ListItem text={t('hero.mockup.list2')} tone="warning" />
                  <ListItem text={t('hero.mockup.list3')} tone="primary" />
                </ul>
              </Card>
              <div className="absolute -top-5 -right-3 sm:-top-6 sm:-right-6 animate-float">
                <Card className="bg-primary text-white border-0 shadow-cardHover" padding="md">
                  <div className="flex items-center gap-3">
                    <Sparkles size={24} aria-hidden />
                    <div>
                      <div className="text-xs uppercase tracking-wider opacity-80">{t('hero.mockup.saveLabel')}</div>
                      <div className="text-xl font-extrabold">{t('hero.mockup.saveValue')}</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST LOGOS / STATS */}
      <Section spacing="sm" background="default">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-ink-muted font-bold mb-7">
          {t('logos.title')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {(['time', 'tools', 'rating', 'setup'] as const).map((k) => (
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

      {/* TESTIMONIALS */}
      <Section background="secondary">
        <div className="text-center mb-12">
          <Badge variant="warning" className="mb-3">
            <Star size={12} aria-hidden /> {t('testimonials.badge')}
          </Badge>
          <h2>{t('testimonials.title')}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((tt) => (
            <Card key={tt.name} className="h-full">
              <div className="flex gap-0.5 mb-3 text-warning" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className="fill-warning" />
                ))}
              </div>
              <p className="text-base text-ink leading-relaxed">&ldquo;{tt.text}&rdquo;</p>
              <div className="mt-5 pt-5 border-t border-line-light">
                <div className="text-sm font-extrabold text-ink">{tt.name}</div>
                <div className="text-xs text-ink-muted">{tt.role}</div>
              </div>
            </Card>
          ))}
        </div>
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
          primary={{ label: t('ctaFinal.primary'), external: `${siteConfig.appUrl}/register` }}
          secondary={{ label: t('ctaFinal.secondary'), href: '/pricing' }}
        />
      </Section>

      <JsonLd data={softwareApplicationJsonLd(locale)} id="home-software-jsonld" />
    </>
  );
}

function KpiMini({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'primary' | 'success' | 'info';
}) {
  const map = {
    primary: 'bg-primary-lighter text-primary',
    success: 'bg-success-lighter text-success',
    info: 'bg-info-lighter text-info',
  };
  return (
    <div className={`rounded-xl p-2.5 text-center ${map[tone]}`}>
      <div className="text-base font-extrabold leading-tight">{value}</div>
      <div className="text-2xs uppercase tracking-wider font-semibold opacity-80">{label}</div>
    </div>
  );
}

function ListItem({ text, tone }: { text: string; tone: 'success' | 'warning' | 'primary' }) {
  const map = { success: 'bg-success', warning: 'bg-warning', primary: 'bg-primary' };
  return (
    <li className="flex items-center gap-2.5 text-sm text-ink-secondary">
      <span aria-hidden className={`w-2 h-2 rounded-full ${map[tone]} shrink-0`} />
      {text}
    </li>
  );
}
