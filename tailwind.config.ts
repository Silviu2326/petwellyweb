import type { Config } from 'tailwindcss';
import { colors } from './src/theme/colors';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx,js,jsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.primary,
          light: colors.primaryLight,
          lighter: colors.primaryLighter,
          dark: colors.primaryDark,
          muted: colors.primaryMuted,
        },
        secondary: {
          DEFAULT: colors.secondary,
          light: colors.secondaryLight,
          lighter: colors.secondaryLighter,
        },
        info: {
          DEFAULT: colors.info,
          light: colors.infoLight,
          lighter: colors.infoLighter,
        },
        success: {
          DEFAULT: colors.success,
          light: colors.successLight,
          lighter: colors.successLighter,
        },
        warning: {
          DEFAULT: colors.warning,
          light: colors.warningLight,
          lighter: colors.warningLighter,
        },
        danger: {
          DEFAULT: colors.danger,
          light: colors.dangerLight,
          lighter: colors.dangerLighter,
        },
        purple: {
          DEFAULT: colors.purple,
          light: colors.purpleLight,
          lighter: colors.purpleLighter,
        },
        blue: {
          DEFAULT: colors.blue,
          light: colors.blueLight,
          lighter: colors.blueLighter,
        },
        background: {
          DEFAULT: colors.background,
          secondary: colors.backgroundSecondary,
        },
        surface: colors.surface,
        ink: {
          DEFAULT: colors.textPrimary,
          secondary: colors.textSecondary,
          muted: colors.textMuted,
        },
        line: {
          DEFAULT: colors.border,
          light: colors.borderLight,
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(28,28,30,0.04), 0 4px 12px rgba(28,28,30,0.04)',
        cardHover: '0 4px 16px rgba(28,28,30,0.08), 0 12px 32px rgba(28,28,30,0.06)',
        glow: '0 0 0 6px rgba(45,106,79,0.12)',
      },
      backgroundImage: {
        'mesh-primary':
          'radial-gradient(at 0% 0%, rgba(184,224,200,0.6) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(255,212,163,0.5) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(168,221,208,0.4) 0px, transparent 50%)',
        'grid-pattern':
          'linear-gradient(to right, rgba(28,28,30,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(28,28,30,0.04) 1px, transparent 1px)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
