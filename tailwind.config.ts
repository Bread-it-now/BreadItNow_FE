import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        gray900: '#1c1e20',
        gray700: '#4e5052',
        gray500: '#808284',
        gray400: '#999b9d',
        gray300: '#b2b4b6',
        gray200: '#d7d9db',
        gray100: '#e8eaec',
        gray50: '#f2f4f6',
        primary: '#ff7651',
        primaryLight: '#FFF0EC',
        secondary: '#26cf9f',
        secondaryLight1: '#6BFFD5',
        secondaryLight3: '#DFFAF3',
        white: '#ffffff',
        error: '#FF3B30',
      },

      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        'body-s': [
          '13px',
          {
            lineHeight: '20px',
            letterSpacing: '-0.01em',
            fontWeight: '500',
          },
        ],
        'body-m': [
          '15px',
          {
            lineHeight: '21px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-page': [
          '24px',
          {
            lineHeight: '34px',
            letterSpacing: '-0.01em',
            fontWeight: '700',
          },
        ],
        'title-detailpage': [
          '22px',
          {
            lineHeight: '32px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-content-xl': [
          '20px',
          {
            lineHeight: '28px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-content-l': [
          '18px',
          {
            lineHeight: '26px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-content-m': [
          '16px',
          {
            lineHeight: '22px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-subtitle': [
          '15px',
          {
            lineHeight: '21px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-content-s': [
          '14px',
          {
            lineHeight: '20px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-content-xs': [
          '13px',
          {
            lineHeight: '19px',
            letterSpacing: '-0.01em',
            fontWeight: '600',
          },
        ],
        'title-content-2xs': [
          '12px',
          {
            lineHeight: '17px',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],
      },
      animation: {
        slideUp: 'slideUp 0.3s ease-out forwards',
        slideDown: 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        slideUp: {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          '0%': {
            transform: 'translateY(0)',
          },
          '100%': {
            transform: 'translateY(100%)',
          },
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwind-scrollbar-hide')],
} satisfies Config;
