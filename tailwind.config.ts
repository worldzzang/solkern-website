import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#B49141', light: '#D4B46A', dark: '#8C6F2C', pale: '#F3EAD3' },
        ink: { DEFAULT: '#111111', 2: '#222222', 3: '#3A3A3A' },
        ivory: { DEFAULT: '#F7F2E8', 2: '#EFE7D8' },
        soil: '#5B4636',
        pome: { DEFAULT: '#7A1E2E', deep: '#4E1220' },
        apricot: '#E58A3C',
        leaf: '#5E7A4A',
      },
      fontFamily: {
        sans: ['Pretendard', 'Pretendard Variable', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
