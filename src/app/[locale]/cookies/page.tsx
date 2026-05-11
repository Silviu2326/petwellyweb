import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { LegalLayout } from '@/components/LegalLayout';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.cookies' });
  return buildMetadata({
    path: '/cookies',
    locale,
    title: t('title'),
    description: t('intro'),
  });
}

export default async function CookiesPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal.cookies' });

  return (
    <LegalLayout
      locale={locale}
      title={t('title')}
      lastUpdate={t('lastUpdate')}
      intro={t('intro')}
      breadcrumbLabel={t('title')}
    >
      {locale === 'es' ? <CookiesES /> : <CookiesEN />}
    </LegalLayout>
  );
}

function CookiesES() {
  return (
    <>
      <h2>¿Qué cookies usamos?</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Finalidad</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NEXT_LOCALE</td>
            <td>Necesaria</td>
            <td>Recordar el idioma elegido.</td>
            <td>1 año</td>
          </tr>
          <tr>
            <td>plausible_*</td>
            <td>Analítica</td>
            <td>Estadísticas anónimas de visitas (sin perfilado).</td>
            <td>Sesión</td>
          </tr>
        </tbody>
      </table>
      <h2>¿Cómo gestionarlas?</h2>
      <p>
        Puedes deshabilitar las cookies en la configuración de tu navegador. Las cookies
        analíticas son anónimas y agregadas — no recogemos datos personales con ellas.
      </p>
    </>
  );
}

function CookiesEN() {
  return (
    <>
      <h2>What cookies do we use?</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NEXT_LOCALE</td>
            <td>Necessary</td>
            <td>Remember the chosen language.</td>
            <td>1 year</td>
          </tr>
          <tr>
            <td>plausible_*</td>
            <td>Analytics</td>
            <td>Anonymous visit statistics (no profiling).</td>
            <td>Session</td>
          </tr>
        </tbody>
      </table>
      <h2>How to manage them</h2>
      <p>
        You can disable cookies in your browser settings. Analytics cookies are anonymous and
        aggregated — we don&apos;t collect personal data with them.
      </p>
    </>
  );
}
