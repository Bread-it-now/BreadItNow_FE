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
        gray500: "#808284",
        gray400: "#999b9d",
        gray300: "#b2b4b6",
        gray200: "#d7d9db",
        gray100: "#e8eaec",
        gray50: "#f2f4f6",
        primary: "#ff7651",
        secondary: "#26cf9f",
        white: "#ffffff",
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
      },
    },
  },
  plugins: [],
} satisfies Config;
