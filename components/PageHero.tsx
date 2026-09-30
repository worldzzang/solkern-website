'use client';
import { motion } from 'framer-motion';
import { Placeholder } from './ui';

/* v3 서브페이지 히어로 — 오설록식: 풀블리드 사진 위 좌하단 정렬 타이틀(가는 큰 글씨) · tone=light 는 텍스트 전용(미스트 배경) */
export default function PageHero({ eyebrow, title, body, image, placeholder, tone = 'dark', imgPos = 'center' }: { eyebrow: string; title: string; body: string; image?: string; placeholder?: string; tone?: 'dark' | 'light'; imgPos?: string }) {
  const dark = tone === 'dark';
  const ease = [0.22, 1, 0.36, 1] as const;
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-forest-deep text-white' : 'bg-cream text-ink'}`}>
      {dark && image && (
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, ease }} className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" style={{ objectPosition: imgPos }} />
        </motion.div>
      )}
      {dark && !image && placeholder && (
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, ease }} className="absolute inset-0"><Placeholder id={placeholder} className="absolute inset-0" showLabel={false} /></motion.div>
      )}
      {dark && <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/85 via-forest-deep/30 to-forest-deep/45" />}
      <div className={`container-w relative flex flex-col ${dark ? 'min-h-[64vh] justify-end pb-14 pt-40 sm:min-h-[72vh] sm:pb-20' : 'pb-14 pt-32 sm:pb-20 sm:pt-44'}`}>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className={`${dark ? 'eyebrow-dark' : 'eyebrow'} inline-flex items-center gap-3`}><span className="h-px w-6 bg-gold" />{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1.1, ease }} className="t-h1 mt-6 max-w-4xl">{title}</motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9 }} className={`t-lead mt-6 max-w-2xl ${dark ? '!text-white/80' : ''}`}>{body}</motion.p>
      </div>
    </section>
  );
}
