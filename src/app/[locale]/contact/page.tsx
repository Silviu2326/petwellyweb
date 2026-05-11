import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Mail, Phone, Clock, Headphones } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return buildMetadata({
    path: '/contact',
    locale,
    title: t('title'),
    description: t('subtitle'),
  });
}

const ICONS = [Mail, Headphones, Phone, Clock];

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'contact' });
  const tNav = await getTranslations({ locale, namespace: 'nav' });
  const channels = t.raw('channels.items') as { label: string; value: string }[];

  return (
    <Section spacing="md">
      <Container size="narrow">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
            { label: tNav('contact') },
          ]}
        />
        <div className="text-center my-10">
          <h1 className="text-balance">{t('title')}</h1>
          <p className="text-base sm:text-lg text-ink-secondary mt-4 max-w-xl mx-auto text-pretty">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid lg:grid-cols-5 gap-7">
          <Card padding="lg" className="lg:col-span-3">
            <ContactForm />
          </Card>
          <div className="lg:col-span-2 space-y-4">
            <Card padding="md">
              <h3 className="text-base font-extrabold text-ink mb-4">{t('channels.title')}</h3>
              <ul className="space-y-3">
                {channels.map((c, i) => {
                  const Icon = ICONS[i] ?? Mail;
                  return (
                    <li key={c.label} className="flex items-start gap-3">
                      <span className="w-9 h-9 rounded-xl bg-primary-lighter text-primary flex items-center justify-center shrink-0">
                        <Icon size={16} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                          {c.label}
                        </div>
                        <div className="text-sm text-ink mt-0.5 break-words">{c.value}</div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Card>
            <Card padding="md" className="bg-primary text-white border-0">
              <h3 className="text-base font-extrabold text-white">
                {locale === 'es' ? '¿Prefieres una llamada?' : 'Prefer a call?'}
              </h3>
              <p className="text-sm text-white/85 mt-2 mb-4">
                {locale === 'es'
                  ? 'Reserva 20 minutos con un humano que conoce el sector.'
                  : 'Book 20 minutes with a human who knows the industry.'}
              </p>
              <a
                href={`mailto:${siteConfig.email.sales}?subject=Demo`}
                className="inline-flex items-center justify-center h-10 px-4 rounded-xl bg-white text-primary text-sm font-semibold hover:bg-white/90"
              >
                {locale === 'es' ? 'Reservar 20 minutos' : 'Book 20 minutes'}
              </a>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
