export const theme = {
  colors: {
    primary: '#C8860A',          // Honey Gold
    primaryLight: '#F4B942',
    primaryDark: '#8B5E07',
    secondary: '#2D6A4F',        // Forest Green (organic feel)
    secondaryLight: '#52B788',
    secondaryDark: '#1B4332',
    accent: '#D4A017',           // Warm Amber
    background: '#FFFBF2',       // Warm Cream
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textMuted: '#6B6B6B',
    border: '#E8DFD0',
    success: '#2D6A4F',
    warning: '#C8860A',
    error: '#C0392B',
    info: '#2980B9',
  },
  fonts: {
    display: 'var(--font-hind-siliguri)',   // Bengali support
    body: 'var(--font-inter)',
    mono: 'var(--font-mono)',
  },
  borderRadius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.10)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
    honey: '0 4px 20px rgba(200,134,10,0.20)',
  },
  spacing: {
    sectionY: 'py-12 md:py-20',
    containerX: 'px-4 md:px-8 lg:px-16',
    maxWidth: 'max-w-7xl mx-auto',
  },
} as const;