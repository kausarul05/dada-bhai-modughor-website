import type { Config } from 'tailwindcss';
import { theme } from './theme';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: theme.colors.primary,
        'primary-light': theme.colors.primaryLight,
        'primary-dark': theme.colors.primaryDark,
        secondary: theme.colors.secondary,
        accent: theme.colors.accent,
        background: theme.colors.background,
        surface: theme.colors.surface,
        border: theme.colors.border,
      },
      fontFamily: {
        display: ['"Hind Siliguri"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows,
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'honey-drip': 'honeyDrip 1s ease-in-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        honeyDrip: { '0%': { transform: 'scaleY(0)', transformOrigin: 'top' }, '100%': { transform: 'scaleY(1)' } },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};

export default config;