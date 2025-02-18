import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

const config = {
  darkMode: ['class'],
  safelist: [
    'bg-primary-orange',
    'bg-primary-gray',
    'bg-light-gray',
    'bg-secondary-venetican-red',
    'bg-secondary-color',
    'bg-secondary-color-200',
    'bg-venetian-red',
    'bg-primary-color',
    'bg-primay-color-dark',
    'bg-tertiary-red',
    'bg-tertiary-green',
    'bg-primary-black',
    'bg-white-smoke',
    'text-primary-orange',
    'text-primary-gray',
    'text-secondary-venetican-red',
    'text-secondary-color',
    'text-venetian-red',
    'text-primary-color',
    'text-tertiary-red',
    'text-tertiary-green',
    'text-primary-black',
    'text-light-gray',
    'border-primary-gray',
    'border-secondary-venetican-red',
    'border-secondary-color',
    'border-venetian-red',
    'border-primary-color',
    'border-tertiary-red',
    'border-tertiary-green',
    'border-primary-black',
    'border-light-gray',
    'border-primary-orange',
    'stroke-primary-gray',
    'stroke-secondary-venetican-red',
    'stroke-secondary-color',
    'stroke-venetian-red',
    'stroke-primary-color',
    'stroke-tertiary-red',
    'stroke-tertiary-green',
    'stroke-primary-black',
    'stroke-primary-orange',
  ],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      xs: '420px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'parental-zone-cloud':
          "url('/homepage/ParentalZoneCarouselBackground.svg')",
      },
      colors: {
        'light-gray': '#e7e7e7',
        'secondary-color': '#3884C5',
        'secondary-color-200': '#2C73B1',
        'primary-color': '#FFC648',
        'primay-color-200': '#FFB81A',
        'primay-color-dark': '#E6A922',
        'primary-color-300': '#EFAC17',
        'tertiary-red': '#F47673',
        'tertiary-red-200': '#D66663',
        'tertiary-green': '#8AC48A',
        'primary-black': '#333333',
        'venetian-red': '#4D4D4D',
        'secondary-venetican-red': '#F2685C',
        'primary-gray': '#808080',
        'primary-gray-light': '#bdbdbd',
        'media-button-gray': '#676767',
        'gray-light-bg': '#f2f2f2',
        'gray-light-text': '#a2a2a2',
        'our-story-gradient-to': '#332863',
        'our-story-gradtien-from': '#3A588F',
        'primary-purple': '#8C5BA1',
        'pale-purple': '#CE9393',
        'light-skin-color': '#FEE3CC',
        'whatsapp-green': '#61C161',
        'white-smoke': '#EDEDED',
        'primary-orange': '#FFA573',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        heyComic: ['var(--font-heycomic)'],
        cheri: ['var(--font-cheri)'],
        helvetica: ['var(--font-helvetica)'],
        helveticaRoundedBold: ['var(--font-helvetica-rounded-bold)'],
        helveticaOblique: ['var(--font-helvetica-oblique)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        indeterminate: {
          '0%': { transform: 'translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        indeterminate: 'indeterminate 1s infinite linear',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    function ({ addUtilities }: PluginAPI) {
      const newUtilities: Record<string, Record<string, string>> = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };

      addUtilities(newUtilities);
    },
  ],
} satisfies Config;

export default config;
