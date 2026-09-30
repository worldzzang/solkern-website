'use client';
import { motion } from 'framer-motion';
import { Placeholder } from './ui';

/* 서브페이지 히어로 — 오설록식: 풀블리드 사진 + 중앙 정렬 얇은 타이틀 (tone=light 는 크림 배경 텍스트 전용) */
export default function PageHero({ eyebrow, title, body, image, placeholder, tone = 'dark', imgPos = 'center' }: { eyebrow: string; title: string; body: string; image?: string; placeholder?: string; tone?: 'dark' | 'light'; imgPos?: string }) {
  const dark = tone === 'dark';
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-ink text-white' : 'bg-cream text-ink'}`}>
      {dark && image && (
        <motion.div initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.8, ease }} className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" style={{ objectPosition: imgPos }} />
        </motion.div>
      )}
      {dark && !image && placeholder && <Placeholder id={placeholder} className="absolute inset-0" tagPos="bottom" showLabel={false} />}
      {dark && <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />}
      <div className={`container-x relative flex flex-col items-center text-center ${dark ? 'min-h-[62vh] justify-end pb-16 pt-40 sm:min-h-[68vh] sm:pb-24' : 'pb-14 pt-36 sm:pb-20 sm:pt-44'}`}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className={dark ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease }} className="t-h1 mt-5 max-w-4xl">{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9 }} className={`t-lead mt-6 max-w-2xl ${dark ? 'text-white/80' : ''}`}>{body}</motion.p>
        <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1, duration: 0.8 }} className={`mt-9 block h-px w-10 ${dark ? 'bg-gold-light' : 'bg-gold'}`} />
      </div>
    </section>
  );
}
