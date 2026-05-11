import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina y resuelve conflictos de clases Tailwind.
 *  cn('p-2', condition && 'p-4') → 'p-4' (la última gana)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
