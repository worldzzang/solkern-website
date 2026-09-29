'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Dict } from '@/content/types';
import { Placeholder, Reveal } from '../ui';

const VISUAL: Record<string, { image?: string; placeholder?: string }> = {
  origin: { placeholder: 'HERO-ORCHARD' },
  product: { image: '/images/bg/trio-blue.webp' },
  second: { placeholder: 'SECOND-BYPRODUCT' },
  market: { placeholder: 'MARKET-MAP' },
};

export default function Journey({ dict }: { dict: Dict }) {
  const j = dict.home.journey;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="bg-ivory">
      <div className="container-x pt-24 pb-10 sm:pt-32">
        <Reveal><p className="eyebrow">{j.eyebrow}</p></Reveal>
        <Reveal delay={0.1}><h2 className="h2 mt-4 max-w-4xl">{j.title}</h2></Reveal>
      </div>

      {/* Desktop: horizontal scroll story */}
      <div ref={ref} className="relative hidden h-[400vh] lg:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div style={{ x }} className="flex w-[400vw] gap-0 pl-[calc((100vw-1280px)/2+48px)]">
            {j.steps.map((s, i) => (
              <div key={s.key} className="flex w-[100vw] shrink-0 items-center gap-12 pr-24">
                <div className="relative h-[62vh] w-[46vw] shrink-0 overflow-hidden rounded-3xl">
                  {VISUAL[s.key].image ? <img src={VISUAL[s.key].image} alt="" className="h-full w-full object-cover" /> : <Placeholder id={VISUAL[s.key].placeholder!} className="h-full w-full" />}
                  <div className="absolute bottom-6 left-6 font-serif text-[120px] leading-none text-white/25">{String(i + 1).padStart(2, '0')}</div>
                </div>
                <div className="max-w-md">
                  <p className="eyebrow">{s.label}</p>
                  <h3 className="display mt-4 text-5xl">{s.title}</h3>
                  <p className="lead mt-6">{s.body}</p>
                </div>
              </div>
            ))}
          </motion.div>
          <div className="absolute bottom-10 left-1/2 h-px w-64 -translate-x-1/2 bg-black/10"><motion.div style={{ width: bar }} className="h-full bg-gold" /></div>
        </div>
      </div>

      {/* Mobile / tablet: vertical */}
      <div className="container-x space-y-14 pb-20 lg:hidden">
        {j.steps.map((s, i) => (
          <Reveal key={s.key}>
            <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80">
              {VISUAL[s.key].image ? <img src={VISUAL[s.key].image} alt="" className="h-full w-full object-cover" /> : <Placeholder id={VISUAL[s.key].placeholder!} className="h-full w-full" />}
              <div className="absolute bottom-3 left-4 font-serif text-7xl leading-none text-white/30">{String(i + 1).padStart(2, '0')}</div>
            </div>
            <p className="eyebrow mt-6">{s.label}</p>
            <h3 className="display mt-2 text-3xl">{s.title}</h3>
            <p className="lead mt-3">{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
