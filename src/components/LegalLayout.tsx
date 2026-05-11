import type { ReactNode } from 'react';
import { Section } from './Section';
import { Container } from './Container';
import { Breadcrumbs } from './Breadcrumbs';
import { Card } from './Card';

interface LegalLayoutProps {
  locale: 'es' | 'en';
  title: string;
  lastUpdate: string;
  intro: string;
  breadcrumbLabel: string;
  children: ReactNode;
}

/**
 * Plantilla común para páginas legales (privacidad, términos, cookies).
 * Genera breadcrumb, título y un Card con el contenido en `prose-petwelly`.
 */
export function LegalLayout({
  locale,
  title,
  lastUpdate,
  intro,
  breadcrumbLabel,
  children,
}: LegalLayoutProps) {
  return (
    <Section spacing="md">
      <Container size="narrow">
        <Breadcrumbs
          locale={locale}
          items={[
            { label: locale === 'es' ? 'Inicio' : 'Home', href: '/' },
            { label: breadcrumbLabel },
          ]}
        />
        <div className="mt-8 mb-8">
          <h1 className="text-balance">{title}</h1>
          <p className="text-sm text-ink-muted mt-3">{lastUpdate}</p>
          <p className="text-base sm:text-lg text-ink-secondary mt-5 max-w-3xl text-pretty">
            {intro}
          </p>
        </div>
        <Card padding="lg" className="prose-petwelly">
          {children}
        </Card>
      </Container>
    </Section>
  );
}
