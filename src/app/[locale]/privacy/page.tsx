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
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  return buildMetadata({
    path: '/privacy',
    locale,
    title: t('title'),
    description: t('intro'),
    index: true,
  });
}

export default async function PrivacyPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });

  return (
    <LegalLayout
      locale={locale}
      title={t('title')}
      lastUpdate={t('lastUpdate')}
      intro={t('intro')}
      breadcrumbLabel={t('title')}
    >
      {locale === 'es' ? <PrivacyES /> : <PrivacyEN />}
    </LegalLayout>
  );
}

function PrivacyES() {
  return (
    <>
      <h2>1. Responsable del tratamiento</h2>
      <p>
        Responsable: {siteConfig.legalName}. Email de contacto:{' '}
        <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a>.
      </p>
      <h2>2. Datos que tratamos</h2>
      <ul>
        <li>Identificativos: nombre, email, teléfono.</li>
        <li>De facturación: razón social, NIF/CIF, dirección postal.</li>
        <li>De uso: logs de acceso, IP, navegador (con base en interés legítimo).</li>
      </ul>
      <h2>3. Finalidades</h2>
      <ul>
        <li>Prestar el servicio de la plataforma Petwelly.</li>
        <li>Gestión comercial y soporte.</li>
        <li>Cumplimiento de obligaciones fiscales.</li>
        <li>Envío de comunicaciones (con tu consentimiento).</li>
      </ul>
      <h2>4. Conservación</h2>
      <p>
        Conservamos tus datos mientras mantengas la cuenta activa y, después,
        durante los plazos legales aplicables (6 años para datos contables).
      </p>
      <h2>5. Derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición,
        portabilidad y limitación escribiendo a{' '}
        <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a>.
        También puedes presentar reclamación ante la Agencia Española de Protección de Datos.
      </p>
      <h2>6. Encargados de tratamiento</h2>
      <p>
        Trabajamos con proveedores que cumplen el RGPD: alojamiento (UE), pasarela de pagos,
        envío de emails y herramientas de soporte. La lista actualizada está disponible bajo
        petición.
      </p>
      <h2>7. Cambios</h2>
      <p>
        Si modificamos esta política te avisaremos por email con al menos 15 días de antelación
        sobre cambios sustanciales.
      </p>
    </>
  );
}

function PrivacyEN() {
  return (
    <>
      <h2>1. Data controller</h2>
      <p>
        Controller: {siteConfig.legalName}. Contact:{' '}
        <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a>.
      </p>
      <h2>2. Data we process</h2>
      <ul>
        <li>Identification: name, email, phone.</li>
        <li>Billing: company name, VAT number, postal address.</li>
        <li>Usage: access logs, IP, browser (legitimate interest basis).</li>
      </ul>
      <h2>3. Purposes</h2>
      <ul>
        <li>Providing the Petwelly platform service.</li>
        <li>Commercial management and support.</li>
        <li>Compliance with tax obligations.</li>
        <li>Communications (with your consent).</li>
      </ul>
      <h2>4. Retention</h2>
      <p>
        We keep your data while your account is active and, afterwards, for the legal periods
        (6 years for accounting data).
      </p>
      <h2>5. Your rights</h2>
      <p>
        You can exercise access, rectification, deletion, objection, portability and limitation
        rights by writing to{' '}
        <a href={`mailto:${siteConfig.email.support}`}>{siteConfig.email.support}</a>. You may
        also lodge a complaint with the Spanish Data Protection Agency.
      </p>
      <h2>6. Processors</h2>
      <p>
        We work with GDPR-compliant providers: hosting (EU), payment gateway, email delivery and
        support tools. Updated list available upon request.
      </p>
      <h2>7. Changes</h2>
      <p>
        We notify substantial changes by email with at least 15 days advance notice.
      </p>
    </>
  );
}
