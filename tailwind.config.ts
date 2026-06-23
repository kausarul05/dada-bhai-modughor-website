import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C8860A',
          light: '#F4B942',
          dark: '#8B5E07',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2D6A4F',
          light: '#52B788',
          dark: '#1B4332',
          foreground: '#FFFFFF',
        },
        accent: { DEFAULT: '#D4A017' },
        background: '#FFFBF2',
        surface: '#FFFFFF',
        border: '#E8DFD0',
        muted: {
          DEFAULT: '#F5EFE0',
          foreground: '#6B6B6B',
        },
        foreground: '#1A1A1A',
        // Shadcn compat
        card: { DEFAULT: '#FFFFFF', foreground: '#1A1A1A' },
        popover: { DEFAULT: '#FFFFFF', foreground: '#1A1A1A' },
        input: '#E8DFD0',
        ring: '#C8860A',
        destructive: { DEFAULT: '#C0392B', foreground: '#FFFFFF' },
      },
      fontFamily: {
        body: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-hind-siliguri)', '"Hind Siliguri"', 'sans-serif'],
        mono: ['monospace'],
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
        xl: '24px',
        '2xl': '32px',
      },
      boxShadow: {
        honey: '0 4px 20px rgba(200, 134, 10, 0.20)',
        card: '0 2px 8px rgba(0,0,0,0.08)',
        lg: '0 8px 24px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(16px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
