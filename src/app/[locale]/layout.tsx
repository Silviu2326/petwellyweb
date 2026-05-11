import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';

import { locales, type Locale } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { organizationJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { siteConfig } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import '@/styles/globals.css';

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});
const display = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
  weight: ['600', '700', '800'],
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFBF5' },
    { media: '(prefers-color-scheme: dark)', color: '#1B4332' },
  ],
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  if (!locales.includes(locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'site' });
  const base = buildMetadata({
    path: '/',
    locale,
    title: `${t('name')} · ${t('tagline')}`,
    description: t('description'),
  });
  return {
    ...base,
    title: {
      default: `${t('name')} · ${t('tagline')}`,
      template: `%s · ${t('name')}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: Locale };
}) {
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const tNav = await getTranslations({ locale, namespace: 'common' });

  return (
    <html lang={locale} dir="ltr" className={`${sans.variable} ${display.variable}`}>
      <head>
        {siteConfig.plausibleDomain && (
          <script
            defer
            data-domain={siteConfig.plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
        <link rel="alternate" type="application/rss+xml" title="Petwelly Blog (ES)" href="/feed.xml?locale=es" />
        <link rel="alternate" type="application/rss+xml" title="Petwelly Blog (EN)" href="/feed.xml?locale=en" />
      </head>
      <body className="min-h-screen bg-background text-ink antialiased flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-50 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold"
        >
          {tNav('skip')}
        </a>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
          <WhatsAppFloat
            defaultMessage={
              locale === 'en'
                ? 'Hi! I\'d like to know more about Petwelly.'
                : '¡Hola! Me gustaría saber más sobre Petwelly.'
            }
          />
        </NextIntlClientProvider>
        <JsonLd
          data={[organizationJsonLd(locale), websiteJsonLd(locale)]}
          id="root-jsonld"
        />
      </body>
    </html>
  );
}
