'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site';
import { LocaleSwitcher } from './LocaleSwitcher';

const NAV_ITEMS = [
  { key: 'features', href: '/features' as const },
  { key: 'pricing', href: '/pricing' as const },
  { key: 'caseStudies', href: '/case-studies' as const },
  { key: 'solutions', href: '/solutions' as const },
  { key: 'about', href: '/about' as const },
  { key: 'blog', href: '/blog' as const },
];

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-line-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={siteConfig.name}>
          <img
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
          />
          <span className="text-base font-extrabold text-ink">{siteConfig.name}</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  'text-sm font-semibold transition-colors',
                  active ? 'text-primary' : 'text-ink-secondary hover:text-ink',
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LocaleSwitcher compact />
          <a
            href={siteConfig.appUrl}
            className="hidden sm:inline-flex items-center h-9 px-3 text-sm font-semibold text-ink-secondary hover:text-ink rounded-lg"
          >
            {t('login')}
          </a>
          <a
            href={siteConfig.appUrl}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 h-9 px-3.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary-dark shadow-sm transition-colors"
          >
            {t('ctaFree')}
            <ArrowRight size={14} aria-hidden />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-lg text-ink hover:bg-background-secondary"
            aria-label={t('openMenu')}
          >
            <Menu size={20} aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-surface shadow-cardHover overflow-y-auto p-5">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                <img
                  src="/logo.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0"
                />
                <span className="text-base font-extrabold text-ink">{siteConfig.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-9 w-9 inline-flex items-center justify-center rounded-lg text-ink hover:bg-background-secondary"
                aria-label={t('closeMenu')}
              >
                <X size={20} aria-hidden />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Primary mobile">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 rounded-xl text-base font-semibold text-ink hover:bg-background-secondary"
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-xl text-base font-semibold text-ink hover:bg-background-secondary"
              >
                {t('contact')}
              </Link>
            </nav>
            <div className="mt-6 pt-6 border-t border-line-light flex flex-col gap-3">
              <a
                href={siteConfig.appUrl}
                className="h-11 inline-flex items-center justify-center px-5 rounded-xl text-sm font-semibold text-ink border border-line"
              >
                {t('login')}
              </a>
              <a
                href={siteConfig.appUrl}
                className="h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl text-sm font-semibold bg-primary text-white shadow-sm hover:bg-primary-dark"
              >
                {t('ctaFree')}
                <ArrowRight size={14} />
              </a>
              <div className="pt-2">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
