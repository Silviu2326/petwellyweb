'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/cn';

type Subject = 'demo' | 'sales' | 'support' | 'other';
type State = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Formulario de contacto con validación HTML5 nativa + envío asíncrono.
 *
 * Si `NEXT_PUBLIC_CONTACT_ENDPOINT` está definido, hace POST con el payload
 * (kind=contact). Si no, abre `mailto:` como fallback.
 */
export function ContactForm() {
  const t = useTranslations('contact.form');
  const [state, setState] = useState<State>('idle');
  const [subject, setSubject] = useState<Subject>('demo');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      if (siteConfig.contactEndpoint) {
        const res = await fetch(siteConfig.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ kind: 'contact', ...data }),
        });
        if (!res.ok) throw new Error('error');
      } else if (siteConfig.email.sales) {
        const body = `${data.message}\n\n— ${data.name} (${data.email}) — ${data.kennel || ''}`;
        window.location.href = `mailto:${siteConfig.email.sales}?subject=${encodeURIComponent(`[${subject}] Web — ${data.name}`)}&body=${encodeURIComponent(body)}`;
      } else {
        throw new Error('no-channel');
      }
      setState('sent');
      form.reset();
      setSubject('demo');
    } catch {
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div className="rounded-2xl bg-primary-lighter border border-primary-light p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={24} aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-primary-dark">{t('successTitle')}</h3>
        <p className="text-sm text-primary-dark/80 mt-2">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="name" label={t('name')} placeholder={t('namePlaceholder')} required />
        <Field name="email" label={t('email')} type="email" placeholder={t('emailPlaceholder')} required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="kennel" label={t('kennel')} placeholder={t('kennelPlaceholder')} />
        <Field name="phone" label={t('phone')} type="tel" placeholder={t('phonePlaceholder')} />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-2">
          {t('subject')}
        </label>
        <input type="hidden" name="subject" value={subject} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(['demo', 'sales', 'support', 'other'] as const).map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSubject(s)}
              className={cn(
                'h-10 px-3 rounded-xl text-sm font-semibold border transition-colors',
                subject === s
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface text-ink-secondary border-line hover:bg-background-secondary',
              )}
            >
              {t(`subjects.${s}`)}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t('messagePlaceholder')}
          className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-sm placeholder:text-ink-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
        />
      </div>

      <label className="flex items-start gap-2 text-xs text-ink-secondary">
        <input type="checkbox" required className="mt-0.5 accent-primary" />
        <span>{t('consent')}</span>
      </label>

      <button
        type="submit"
        disabled={state === 'sending'}
        className="w-full sm:w-auto h-12 px-6 inline-flex items-center justify-center rounded-xl bg-primary text-white text-sm font-semibold shadow-sm hover:bg-primary-dark disabled:opacity-50"
      >
        {state === 'sending' ? t('submitting') : t('submit')}
      </button>

      {state === 'error' && (
        <div className="rounded-xl bg-danger-lighter border border-danger-light p-4 text-sm text-danger flex items-start gap-2.5">
          <AlertCircle size={18} aria-hidden className="shrink-0 mt-0.5" />
          <div>
            <strong>{t('errorTitle')}</strong> {t('errorBody')}
          </div>
        </div>
      )}
    </form>
  );
}

interface FieldProps {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}
function Field({ name, label, placeholder, type = 'text', required }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-2">
        {label}
        {required && <span className="text-danger ml-0.5" aria-hidden>*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full h-11 px-4 rounded-xl bg-surface border border-line text-sm placeholder:text-ink-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
      />
    </div>
  );
}
