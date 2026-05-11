/**
 * PETWELLY · COLOR SYSTEM (web pública)
 * ────────────────────────────────────────────────────────────
 * Mismos colores que el ERP en `petwelly/src/theme/colors.ts`.
 * Cualquier cambio en el ERP debe replicarse aquí para mantener
 * consistencia de marca entre la web pública y la aplicación.
 *
 * El archivo `tailwind.config.ts` importa estos valores y genera
 * las utilidades (`text-primary`, `bg-success-lighter`, ...).
 */

export const colors = {
  primary: '#2D6A4F',
  primaryLight: '#B8E0C8',
  primaryLighter: '#E8F5EC',
  primaryDark: '#1B4332',
  primaryMuted: '#40916C',

  secondary: '#E88B4A',
  secondaryLight: '#FFD4A3',
  secondaryLighter: '#FFF0DB',

  info: '#52B69A',
  infoLight: '#A8DDD0',
  infoLighter: '#E0F4F0',

  success: '#2D9C5F',
  successLight: '#A8D5BA',
  successLighter: '#E4F5EA',

  warning: '#E88B4A',
  warningLight: '#FFD4A3',
  warningLighter: '#FFF0DB',

  danger: '#E63946',
  dangerLight: '#FFB8B8',
  dangerLighter: '#FFE0E0',

  purple: '#8B6FCC',
  purpleLight: '#D4C4F0',
  purpleLighter: '#F0EAFA',

  blue: '#4A90D9',
  blueLight: '#B8D8F8',
  blueLighter: '#E8F2FD',

  background: '#FFFBF5',
  backgroundSecondary: '#F5F0EB',
  surface: '#FFFFFF',

  textPrimary: '#1C1C1E',
  textSecondary: '#6B6B78',
  textMuted: '#9E9EA8',

  border: '#E5E5EA',
  borderLight: '#F0F0F0',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
