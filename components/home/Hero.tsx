'use client';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';

/* 홈 히어로 — 오설록 "TEA FROM JEJU": 풀스크린 자연 영상 톤(실사진 슬로 줌 + 크로스페이드) 위에 가는 대문자 타이틀
   ※ 추후 산지 영상(mp4)이 확보되면 SLIDES 대신 <video autoPlay muted loop playsInline> 로 교체 (프롬프트북 VIDEO-HERO 참고) */
const SLIDES = [
  { src: '/images/photo/apricot-orchard.webp', pos: 'center' },
  { src: '/images/custom/HERO-SUNRISE.webp', pos: 'center' },
  { src: '/images/bg/apple-press.webp', pos: 'center 60%' },
];
const HOLD = 7000;

export default function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  const h = dict.home.hero;
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const ease = [0.22, 1, 0.36, 1] as const;
  const [eyebrowShort] = h.eyebrow.split(' · ');
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), HOLD); return () => clearInterval(t); }, []);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[600px] overflow-hidden bg-forest-deep text-white">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.8, ease: 'easeInOut' }} className="absolute inset-0">
            <img src={SLIDES[i].src} alt="" className="h-full w-full animate-kenburns object-cover" style={{ objectPosition: SLIDES[i].pos }} />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/55 via-forest-deep/20 to-forest-deep/70" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative z-10 flex h-full flex-col items-center justify-center pt-10 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }} className="text-[11px] font-medium uppercase tracking-[0.42em] text-white/85 sm:text-[12px]">{eyebrowShort}</motion.p>
        <h1 className="t-display mt-7">
          <span className="block overflow-hidden"><motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1.3, ease }}>{h.title}</motion.span></span>
          <span className="block overflow-hidden"><motion.span className="block font-normal" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ delay: 0.68, duration: 1.3, ease }}>{h.titleAccent}</motion.span></span>
        </h1>
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 0.9, ease }} className="mt-8 block h-px w-12 bg-gold-light" />
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1 }} className="mt-8 max-w-xl text-[15px] font-light leading-[1.9] text-white/90 sm:text-[17px]">{h.body}</motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 1 }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href={withLocale(locale, '/ermak')} className="btn bg-white text-forest hover:bg-gold-light">{h.cta1}</Link>
          <Link href={withLocale(locale, '/material-lab')} className="btn-line-light">{h.cta2}</Link>
        </motion.div>
      </motion.div>

      {/* 하단: 슬라이드 진행바 + 스크롤 안내 */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container-w flex items-end justify-between pb-7">
          <div className="flex items-center gap-2">
            {SLIDES.map((_, k) => (
              <button key={k} type="button" aria-label={`slide ${k + 1}`} onClick={() => setI(k)} className="relative h-6 w-10 sm:w-14">
                <span className="absolute inset-x-0 top-1/2 h-px bg-white/30" />
                {k === i && <motion.span key={`${k}-${i}`} className="absolute inset-x-0 top-1/2 h-px origin-left bg-white" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: HOLD / 1000, ease: 'linear' }} />}
              </button>
            ))}
            <span className="ml-2 text-[11px] tabular-nums tracking-[0.2em] text-white/70">0{i + 1} / 0{SLIDES.length}</span>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="flex items-center gap-3">
            <p className="text-[10px] tracking-[0.35em] text-white/60">{dict.common.scroll}</p>
            <div className="h-10 w-px overflow-hidden bg-white/20"><motion.div className="h-1/2 w-full bg-white/80" animate={{ y: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} /></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
