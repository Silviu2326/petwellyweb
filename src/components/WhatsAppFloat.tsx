'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site';

const ICON = (
  <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden>
    <path
      fill="currentColor"
      d="M16 .5C7.4.5.5 7.4.5 15.9c0 2.8.7 5.5 2.1 7.9L0 32l8.5-2.6c2.3 1.2 4.9 1.9 7.5 1.9C24.6 31.3 31.5 24.4 31.5 15.9 31.5 7.4 24.6.5 16 .5Zm0 28a12.4 12.4 0 0 1-6.4-1.7l-.5-.3-5 1.5 1.5-4.9-.3-.5a12.5 12.5 0 1 1 23.4-6.7C28.7 21.4 23 28.5 16 28.5Zm7.1-9c-.4-.2-2.3-1.1-2.7-1.2-.4-.1-.6-.2-.9.2s-1 1.2-1.2 1.4c-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3.1-1.9-1.1-1-1.9-2.2-2.1-2.6-.2-.4 0-.6.2-.8.2-.2.4-.4.6-.7.2-.2.3-.4.4-.6.1-.2 0-.5-.1-.7-.1-.2-.9-2.1-1.2-2.9-.3-.8-.6-.6-.9-.6h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9 0 1.7 1.2 3.4 1.4 3.6.2.2 2.4 3.7 5.9 5.2.8.4 1.5.6 2 .8.8.3 1.6.2 2.2.1.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.4-.3-.7-.5Z"
    />
  </svg>
);

/**
 * Botón flotante de WhatsApp. Aparece tras 1.5s para no estorbar
 * la primera impresión y se oculta cuando el usuario hace scroll
 * casi al final (muestra ya el CTA del propio footer).
 */
export function WhatsAppFloat({ defaultMessage }: { defaultMessage: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (!visible || !siteConfig.whatsapp) return null;

  const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(defaultMessage)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-30 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-cardHover flex items-center justify-center hover:scale-105 transition-transform animate-fade-in"
    >
      {ICON}
    </a>
  );
}
