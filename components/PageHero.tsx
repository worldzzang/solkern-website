'use client';
import { motion } from 'framer-motion';
import { Placeholder, SplitWords } from './ui';

export default function PageHero({ eyebrow, title, body, image, placeholder, tone = 'dark' }: { eyebrow: string; title: string; body: string; image?: string; placeholder?: string; tone?: 'dark' | 'light' }) {
  const dark = tone === 'dark';
  return (
    <section className={`relative overflow-hidden ${dark ? 'bg-ink text-white' : 'bg-ivory text-ink'}`}>
      {image && (
        <motion.div initial={{ scale: 1.15, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0">
          <img src={image} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-ink" />
        </motion.div>
      )}
      {!image && placeholder && (
        <div className="absolute inset-0"><Placeholder id={placeholder} className="h-full w-full" showTag tagPos="bottom" /><div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-ink" /></div>
      )}
      <div className="container-x relative pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-32">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="eyebrow">{eyebrow}</motion.p>
        <h1 className="h1 mt-5 max-w-4xl"><SplitWords text={title} delay={0.3} /></h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className={`lead mt-6 max-w-2xl ${dark ? 'text-white/75' : ''}`}>{body}</motion.p>
      </div>
    </section>
  );
}
