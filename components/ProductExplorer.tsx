'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { Category } from '@/content/types';
import { Placeholder } from './ui';
import ProductStage from './ProductStage';

export default function ProductExplorer({ categories, note }: { categories: Category[]; note: string }) {
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
                {p.image
                  ? <ProductStage src={p.image} alt={p.name} dark={false} className="aspect-square bg-gradient-to-b from-[#f3ead3] via-ivory to-ivory-2" />
                  : <div className="aspect-square p-6"><Placeholder id={p.placeholder!} className="h-full w-full rounded-2xl" /></div>}
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
      <p className="mt-6 text-xs text-ink-3/70">{note}</p>
    </div>
  );
}
