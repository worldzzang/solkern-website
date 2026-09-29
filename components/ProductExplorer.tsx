'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { Category } from '@/content/types';
import { Placeholder } from './ui';

export default function ProductExplorer({ categories, locale }: { categories: Category[]; locale: string }) {
  const [active, setActive] = useState(categories[0].id);
  const cat = categories.find((c) => c.id === active)!;
  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-wider transition ${active === c.id ? 'border-ink bg-ink text-white' : 'border-black/15 bg-white/60 text-ink/70 hover:border-ink'}`}>
            {c.name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }} className="mt-8">
          <div className="relative overflow-hidden rounded-3xl bg-ink text-white">
            {cat.cover ? <img src={cat.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" /> : <Placeholder id={cat.placeholder || 'HERO-ORCHARD'} className="absolute inset-0" showTag={false} />}
            <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-transparent" />
            <div className="relative p-8 sm:p-12">
              <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold tracking-widest text-white">{cat.brand}</span>
              <h3 className="display mt-4 text-4xl sm:text-5xl">{cat.name}</h3>
              <p className="mt-1 text-xs tracking-[0.2em] text-gold-light">{cat.en}</p>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{cat.desc}</p>
              <p className="mt-3 text-xs text-gold-light">✦ {cat.point}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {cat.products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileHover={{ y: -6 }}
                className="group card overflow-hidden">
                <div className="relative flex aspect-square items-center justify-center bg-gradient-to-b from-white to-ivory-2 p-6">
                  <div className="absolute inset-x-8 bottom-6 h-1/3 rounded-full bg-gold/15 blur-2xl transition group-hover:bg-gold/30" />
                  {p.image ? <img src={p.image} alt={p.name} className="relative max-h-full w-auto object-contain drop-shadow-xl transition duration-700 group-hover:scale-110" /> : <Placeholder id={p.placeholder!} className="h-full w-full rounded-2xl" />}
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold sm:text-base">{p.name}</h4>
                  {p.sub && <p className="mt-0.5 text-xs text-ink-3">{p.sub}</p>}
                  {p.sizes && <p className="mt-2 text-[11px] tracking-wide text-gold-dark">{p.sizes}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="mt-6 text-xs text-ink-3/70">{locale === 'ko' ? '※ 제품 규격·표시 사항은 수입 라벨 기준으로 확정되며, 카탈로그 요청 시 품목별 규격서를 제공합니다.' : '* Specifications and label claims are finalized per import label; item spec sheets are provided on catalog request.'}</p>
    </div>
  );
}
