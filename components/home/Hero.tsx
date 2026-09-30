'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';
import { Placeholder } from '../ui';

/* 홈 히어로 — 오설록 "TEA FROM JEJU": 풀블리드 산지 풍경 + 중앙 세리프 타이틀 + 스크롤 인디케이터 */
export default function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  const h = dict.home.hero;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const ease = [0.22, 1, 0.36, 1] as const;
  const [eyebrowShort] = h.eyebrow.split(' · ');

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-white">
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <div className="absolute inset-0 animate-kenburns">
          <Placeholder id="HERO-VALLEY" className="h-full w-full" tagPos="bottom" showLabel={false} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/55" />
      </motion.div>

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative z-10 flex h-full flex-col items-center justify-center pt-16 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }} className="eyebrow-dark">{eyebrowShort}</motion.p>
        <h1 className="mt-6 font-serif font-medium leading-[1.02] tracking-[-0.01em] text-[52px] sm:text-[80px] lg:text-[108px]">
          <span className="block overflow-hidden"><motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1.2, ease }}>{h.title}</motion.span></span>
          <span className="block overflow-hidden"><motion.span className="block italic text-gold-light" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ delay: 0.65, duration: 1.2, ease }}>{h.titleAccent}</motion.span></span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }} className="t-lead mt-8 max-w-xl text-white/85">{h.body}</motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 1 }} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href={withLocale(locale, '/ermak')} className="btn bg-white text-ink hover:bg-gold hover:text-white">{h.cta1}</Link>
          <Link href={withLocale(locale, '/material-lab')} className="btn-line-light">{h.cta2}</Link>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-[10px] tracking-[0.35em] text-white/60">{dict.common.scroll}</p>
        <div className="mx-auto mt-2 h-12 w-px overflow-hidden bg-white/20"><motion.div className="h-1/2 w-full bg-white/80" animate={{ y: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }} /></div>
      </motion.div>
    </section>
  );
}
