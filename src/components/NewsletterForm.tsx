'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/lib/site';

/**
 * Formulario de newsletter del footer.
 *
 * Si `NEXT_PUBLIC_CONTACT_ENDPOINT` está definido hace POST JSON con
 * `{ kind: 'newsletter', email }`. Si no, usa `mailto:` como fallback
 * (no rompe la UX en desarrollo).
 */
export function NewsletterForm() {
  const t = useTranslations('footer.newsletter');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setState('sending');
    try {
      if (siteConfig.contactEndpoint) {
        const res = await fetch(siteConfig.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kind: 'newsletter', email }),
        });
        if (!res.ok) throw new Error('error');
      } else {
        window.location.href = `mailto:${siteConfig.email.sales}?subject=Newsletter&body=${encodeURIComponent(email)}`;
      }
      setState('sent');
      setEmail('');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-xl bg-primary-lighter border border-primary-light p-4 text-sm text-primary-dark flex items-start gap-2.5">
        <CheckCircle2 size={18} aria-hidden className="shrink-0 mt-0.5" />
        <span>¡Hecho! Te llegará el primer email muy pronto.</span>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <p className="text-sm font-bold text-ink">{t('title')}</p>
      <p className="text-xs text-ink-secondary">{t('subtitle')}</p>
      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('placeholder')}
          aria-label="Email"
          className="flex-1 h-10 px-3.5 rounded-xl bg-surface border border-line text-sm placeholder:text-ink-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
        />
        <button
          type="submit"
          disabled={state === 'sending'}
          className="h-10 px-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark disabled:opacity-50"
        >
          {t('submit')}
          <ArrowRight size={14} aria-hidden />
        </button>
      </div>
      <p className="text-[11px] text-ink-muted">{t('privacy')}</p>
      {state === 'error' && (
        <p className="text-xs text-danger">No se pudo enviar. Vuelve a intentarlo.</p>
      )}
    </form>
  );
}
