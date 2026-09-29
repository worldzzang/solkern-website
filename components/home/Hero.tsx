'use client';
import Link from 'next/link';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';
import { Magnetic } from '../ui';

export default function Hero({ locale, dict }: { locale: Locale; dict: Dict }) {
  const h = dict.home.hero;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 }); const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const f1x = useTransform(sx, (v) => v * -30); const f1y = useTransform(sy, (v) => v * -30);
  const f2x = useTransform(sx, (v) => v * 20); const f2y = useTransform(sy, (v) => v * 20);
  const f3x = useTransform(sx, (v) => v * -12); const f3y = useTransform(sy, (v) => v * 16);

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden bg-ink text-white"
      onMouseMove={(e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); }}>
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110">
        <img src="/images/bg/cover.webp" alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,145,65,0.18),transparent_60%)]" />
      </motion.div>

      {/* floating fruits */}
      <motion.img src="/images/fruits/pomegranate.webp" alt="" style={{ x: f1x, y: f1y }}
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute right-[4%] top-[18%] w-[38vw] max-w-[420px] animate-float drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] sm:right-[8%] sm:top-[14%] sm:w-[30vw]" />
      <motion.img src="/images/fruits/cherry.webp" alt="" style={{ x: f2x, y: f2y }}
        initial={{ opacity: 0, scale: 0.5, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.9, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-[6%] left-[-8%] z-0 w-[44vw] max-w-[300px] animate-float [animation-delay:1.5s] drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] sm:left-[-2%] sm:w-[18vw]" />
      <motion.img src="/images/fruits/apple.webp" alt="" style={{ x: f3x, y: f3y }}
        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-[10%] right-[10%] hidden w-[16vw] max-w-[220px] animate-float [animation-delay:3s] drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] md:block" />

      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32">
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="eyebrow text-gold-light">{h.eyebrow}</motion.p>
        <h1 className="h-display mt-6 max-w-5xl">
          <span className="block overflow-hidden"><motion.span className="block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{h.title}</motion.span></span>
          <span className="block overflow-hidden"><motion.span className="block italic text-shimmer" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.55, duration: 1, ease: [0.22, 1, 0.36, 1] }}>{h.titleAccent}</motion.span></span>
        </h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9 }} className="lead mt-8 max-w-xl text-white/80">{h.body}</motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.9 }} className="mt-10 flex flex-wrap gap-3">
          <Magnetic><Link href={withLocale(locale, '/ermak')} className="btn-gold">{h.cta1} <span>→</span></Link></Magnetic>
          <Magnetic><Link href={withLocale(locale, '/material-lab')} className="btn-outline text-white">{h.cta2}</Link></Magnetic>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="text-[10px] tracking-[0.3em] text-white/60">{dict.common.scroll}</p>
        <div className="mx-auto mt-2 h-10 w-px overflow-hidden bg-white/20"><motion.div className="h-1/2 w-full bg-gold" animate={{ y: ['-100%', '200%'] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} /></div>
      </motion.div>
    </section>
  );
}
