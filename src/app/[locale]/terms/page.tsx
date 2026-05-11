import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { LegalLayout } from '@/components/LegalLayout';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'legal.terms' });
  return buildMetadata({
    path: '/terms',
    locale,
    title: t('title'),
    description: t('intro'),
  });
}

export default async function TermsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal.terms' });

  return (
    <LegalLayout
      locale={locale}
      title={t('title')}
      lastUpdate={t('lastUpdate')}
      intro={t('intro')}
      breadcrumbLabel={t('title')}
    >
      {locale === 'es' ? <TermsES /> : <TermsEN />}
    </LegalLayout>
  );
}

function TermsES() {
  return (
    <>
      <h2>1. Objeto</h2>
      <p>
        Estos términos regulan el acceso y uso de la plataforma Petwellly por parte de los
        usuarios registrados. Al crear una cuenta aceptas estos términos.
      </p>
      <h2>2. Cuenta</h2>
      <p>
        Eres responsable de mantener la confidencialidad de tus credenciales y de toda la
        actividad realizada bajo tu cuenta. Notifícanos cualquier acceso no autorizado en{' '}
        <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a>.
      </p>
      <h2>3. Suscripción y facturación</h2>
      <p>
        El uso de Petwellly requiere una suscripción de pago tras los 14 días de prueba. Los
        precios se publican en{' '}
        <a href={`${siteConfig.url}/precios`}>petwelly.com/precios</a> y pueden incluir IVA según tu
        país. La cancelación detiene la próxima renovación; no devolvemos importes prorrateados
        salvo obligación legal.
      </p>
      <h2>4. Uso aceptable</h2>
      <ul>
        <li>No utilizar el servicio para actividades ilegales.</li>
        <li>No intentar acceder a datos de otros criaderos.</li>
        <li>No revender el acceso sin autorización.</li>
      </ul>
      <h2>5. Propiedad intelectual</h2>
      <p>
        El software, marcas y diseños son propiedad de {siteConfig.legalName}. Los datos que
        introduzcas son tuyos y los puedes exportar en cualquier momento.
      </p>
      <h2>6. Limitación de responsabilidad</h2>
      <p>
        En la medida permitida por la ley aplicable, la responsabilidad por daños indirectos
        está limitada al importe pagado en los últimos 12 meses.
      </p>
      <h2>7. Ley y jurisdicción</h2>
      <p>
        Estos términos se rigen por la ley española. Para cualquier controversia las partes se
        someten a los juzgados de Madrid (capital).
      </p>
    </>
  );
}

function TermsEN() {
  return (
    <>
      <h2>1. Purpose</h2>
      <p>
        These terms govern access and use of the Petwellly platform by registered users. By
        creating an account you accept them.
      </p>
      <h2>2. Account</h2>
      <p>
        You are responsible for keeping your credentials confidential and for all activity under
        your account. Notify any unauthorized access at{' '}
        <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a>.
      </p>
      <h2>3. Subscription and billing</h2>
      <p>
        Use of Petwellly requires a paid subscription after the 14-day trial. Prices are published
        at <a href={`${siteConfig.url}/en/pricing`}>petwelly.com/en/pricing</a> and may include VAT
        depending on your country. Cancellation stops the next renewal; we do not refund prorated
        amounts unless legally required.
      </p>
      <h2>4. Acceptable use</h2>
      <ul>
        <li>Do not use the service for unlawful activities.</li>
        <li>Do not attempt to access other kennels&apos; data.</li>
        <li>Do not resell access without authorization.</li>
      </ul>
      <h2>5. Intellectual property</h2>
      <p>
        Software, trademarks and designs are owned by {siteConfig.legalName}. The data you enter
        is yours and exportable at any time.
      </p>
      <h2>6. Limitation of liability</h2>
      <p>
        To the extent permitted by applicable law, liability for indirect damages is limited to
        the amount paid in the last 12 months.
      </p>
      <h2>7. Law and jurisdiction</h2>
      <p>
        These terms are governed by Spanish law. For any dispute, the parties submit to the
        courts of Madrid (capital).
      </p>
    </>
  );
}
