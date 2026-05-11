import { useTranslations } from 'next-intl';
import { Sparkles } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { siteConfig } from '@/lib/site';
import { NewsletterForm } from './NewsletterForm';

const productLinks = [
  { key: 'features', href: '/features' as const },
  { key: 'pricing', href: '/pricing' as const },
  { key: 'caseStudies', href: '/case-studies' as const },
  { key: 'solutions', href: '/solutions' as const },
];
const resourceLinks = [
  { key: 'blog', href: '/blog' as const },
  { key: 'contact', href: '/contact' as const },
];
const companyLinks = [{ key: 'about', href: '/about' as const }];
const legalLinks = [
  { key: 'privacy' as const, href: '/privacy' as const, label: { es: 'Privacidad', en: 'Privacy' } },
  { key: 'terms' as const, href: '/terms' as const, label: { es: 'Términos', en: 'Terms' } },
  { key: 'cookies' as const, href: '/cookies' as const, label: { es: 'Cookies', en: 'Cookies' } },
];

export function Footer({ locale }: { locale: 'es' | 'en' }) {
  const tNav = useTranslations('nav');
  const tFooter = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background-secondary border-t border-line-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label="Petwelly">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Sparkles size={18} className="text-white" aria-hidden />
              </div>
              <span className="text-base font-extrabold text-ink">{siteConfig.name}</span>
            </Link>
            <p className="text-sm text-ink-secondary max-w-sm leading-relaxed">
              {locale === 'en' ? siteConfig.descriptionEn : siteConfig.description}
            </p>
            <div className="mt-6">
              <NewsletterForm />
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-ink mb-3">{tFooter('product')}</h3>
            <ul className="space-y-2">
              {productLinks.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-sm text-ink-secondary hover:text-primary">
                    {tNav(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-ink mb-3">{tFooter('resources')}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-sm text-ink-secondary hover:text-primary">
                    {tNav(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-ink mb-3">{tFooter('company')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-sm text-ink-secondary hover:text-primary">
                    {tNav(l.key)}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`${siteConfig.appUrl}/login`}
                  className="text-sm text-ink-secondary hover:text-primary"
                >
                  {tNav('login')}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-ink mb-3">{tFooter('legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((l) => (
                <li key={l.key}>
                  <Link href={l.href} className="text-sm text-ink-secondary hover:text-primary">
                    {l.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line-light flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            © {year} {siteConfig.legalName} · {tFooter('rights')}.
          </p>
          <p className="text-xs text-ink-muted">{tFooter('madeWith')} 🇪🇸</p>
        </div>
      </div>
    </footer>
  );
}
