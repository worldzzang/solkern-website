import type { Config } from 'tailwindcss';
/* SOLKERN v2 — 오설록 벤치마크: 화이트·크림 여백, 골드 포인트, 얇은 타이포 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#B49141', light: '#D4B46A', dark: '#8C6F2C', pale: '#F1E8D2' },
        ink: { DEFAULT: '#1A1A1A', 2: '#3D3B37', 3: '#6B6864' },
        mute: '#8F8B84',
        paper: '#FFFFFF',
        cream: { DEFAULT: '#F8F6F1', 2: '#F2EEE6' },
        sand: '#E9E3D6',
        stone: '#D9D3C7',
        ivory: { DEFAULT: '#F8F6F1', 2: '#F2EEE6' },
        soil: '#5B4636',
        pome: { DEFAULT: '#7A1E2E', deep: '#4E1220' },
        apricot: '#E58A3C',
        leaf: '#5E7A4A',
      },
      fontFamily: {
        sans: ['Pretendard', 'Pretendard Variable', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: { widest2: '0.3em' },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        kenburns: { '0%': { transform: 'scale(1.08)' }, '100%': { transform: 'scale(1)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseDot: { '0%,100%': { opacity: '0.2' }, '50%': { opacity: '1' } },
      },
      animation: {
        marquee: 'marquee 50s linear infinite',
        kenburns: 'kenburns 9s ease-out both',
        float: 'float 7s ease-in-out infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
