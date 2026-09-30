import type { Config } from 'tailwindcss';
/* SOLKERN v3 — 오설록 브랜드스토리 벤치마크: 화이트 여백 · 딥 포레스트 그린 · 로고 골드 포인트 · Pretendard 단독 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: { DEFAULT: '#1E2F26', deep: '#15211B', soft: '#2F4A3B', mist: '#E7ECE6' },
        gold: { DEFAULT: '#B8954A', light: '#D9BC7A', dark: '#8F7032', pale: '#F3EBD8' },
        ink: { DEFAULT: '#1A1C1A', 2: '#41453F', 3: '#6F746D' },
        mute: '#979B94',
        paper: '#FFFFFF',
        cream: { DEFAULT: '#F6F5F0', 2: '#EDECE5' },
        sand: '#E8E6DC',
        stone: '#DDDCD3',
        ivory: { DEFAULT: '#F6F5F0', 2: '#EDECE5' },
        soil: '#5B4636',
        pome: { DEFAULT: '#8A2433', deep: '#4E1220' },
        apricot: '#E58A3C',
        leaf: '#5E7A4A',
      },
      fontFamily: {
        sans: ['Pretendard', 'Pretendard Variable', 'system-ui', 'sans-serif'],
        // v3: 세리프 미사용 — 기존 font-serif 클래스는 Pretendard로 통일
        serif: ['Pretendard', 'Pretendard Variable', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { widest2: '0.3em' },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        kenburns: { '0%': { transform: 'scale(1.12)' }, '100%': { transform: 'scale(1)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseDot: { '0%,100%': { opacity: '0.2' }, '50%': { opacity: '1' } },
        grow: { '0%': { transform: 'scaleX(0)' }, '100%': { transform: 'scaleX(1)' } },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        kenburns: 'kenburns 8s ease-out both',
        float: 'float 7s ease-in-out infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
