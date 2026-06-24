import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:     { DEFAULT: '#C8860A', light: '#F4B942', dark: '#8B5E07', foreground: '#FFFFFF' },
        secondary:   { DEFAULT: '#2D6A4F', light: '#52B788', dark: '#1B4332', foreground: '#FFFFFF' },
        accent:      { DEFAULT: '#D4A017' },
        background:  '#F2E8D5',
        surface:     '#FAF4E8',
        border:      '#D9CEBC',
        foreground:  '#1C1008',
        muted:       { DEFAULT: '#EAE0CB', foreground: '#7A6748' },
        card:        { DEFAULT: '#FAF4E8', foreground: '#1C1008' },
        popover:     { DEFAULT: '#FAF4E8', foreground: '#1C1008' },
        input:       '#D9CEBC',
        ring:        '#C8860A',
        destructive: { DEFAULT: '#C0392B', foreground: '#FFFFFF' },
      },
      fontFamily: {
        body:    ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-hind-siliguri)', '"Hind Siliguri"', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px', md: '10px', lg: '16px', xl: '22px', '2xl': '30px',
      },
      boxShadow: {
        honey:        '0 4px 20px rgba(200,134,10,0.25)',
        'honey-lg':   '0 8px 32px rgba(200,134,10,0.30)',
        card:         '0 2px 10px rgba(28,16,8,0.08)',
        'card-hover': '0 8px 28px rgba(200,134,10,0.18)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;  