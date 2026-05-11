import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { siteConfig } from '@/lib/site';

/**
 * 404 dentro de un locale. Next.js renderiza este componente para
 * cualquier ruta `[locale]/...` no encontrada.
 *
 * Importante: no es async (RSC) porque next-intl necesita el provider
 * para `useTranslations`. El layout padre proporciona el contexto.
 */
export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <Section spacing="lg">
      <Container size="narrow" className="text-center">
        <div className="text-8xl sm:text-9xl font-extrabold text-primary-lighter mb-2">404</div>
        <h1 className="text-balance">{t('title')}</h1>
        <p className="text-base sm:text-lg text-ink-secondary mt-5 max-w-xl mx-auto text-pretty">
          {t('subtitle')}
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="h-12 px-6 inline-flex items-center justify-center rounded-xl bg-primary text-white text-sm font-semibold shadow-sm hover:bg-primary-dark"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href="/features"
            className="h-12 px-6 inline-flex items-center justify-center rounded-xl bg-surface border border-line text-ink text-sm font-semibold hover:bg-background-secondary"
          >
            {t('ctaSecondary')}
          </Link>
        </div>
        <p className="mt-10 text-xs text-ink-muted">
          {siteConfig.name} · {siteConfig.url}
        </p>
      </Container>
    </Section>
  );
}
