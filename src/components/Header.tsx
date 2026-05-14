'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Eye, Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/cn';
import { siteConfig } from '@/lib/site';
import { LocaleSwitcher } from './LocaleSwitcher';

const NAV_ITEMS = [
  { key: 'features', href: '/features' as const },
  { key: 'pricing', href: '/pricing' as const },
  { key: 'solutions', href: '/solutions' as const },
  { key: 'about', href: '/about' as const },
  { key: 'blog', href: '/blog' as const },
];

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = original; };
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-line-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={siteConfig.name}>
            <Image
              src="/logo.png"
              alt={`${siteConfig.name} logo`}
              width={36}
              height={36}
              priority
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
              href={siteConfig.demoUrl}
              className="hidden md:inline-flex items-center justify-center gap-1.5 h-9 px-3 rounded-xl text-sm font-semibold text-primary border border-primary/30 hover:bg-primary-lighter transition-colors"
            >
              <Eye size={14} aria-hidden />
              {t('viewDemo')}
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
      </header>

      {open && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-surface shadow-cardHover overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
                <Image
                  src="/logo.png"
                  alt={`${siteConfig.name} logo`}
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
                href={siteConfig.demoUrl}
                className="h-11 inline-flex items-center justify-center gap-2 px-5 rounded-xl text-sm font-semibold text-primary border border-primary/40 bg-primary-lighter/40"
              >
                <Eye size={14} />
                {t('viewDemo')}
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
    </>
  );
}
