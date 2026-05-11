import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from './routing';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    messages,
    timeZone: 'Europe/Madrid',
    now: new Date(),
    formats: {
      dateTime: {
        short: { day: 'numeric', month: 'short', year: 'numeric' },
        long: { day: 'numeric', month: 'long', year: 'numeric' },
      },
      number: {
        eur: { style: 'currency', currency: 'EUR' },
      },
    },
  };
});
