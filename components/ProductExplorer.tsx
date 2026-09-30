'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import type { Category } from '@/content/types';
import { Placeholder, Visual } from './ui';
import ProductStage from './ProductStage';

/* 제품 탐색 — 오설록 제품 목록 톤: 밑줄 탭 + 카테고리 커버 + 화이트 타일 그리드 */
export default function ProductExplorer({ categories, note }: { categories: Category[]; note: string }) {
  const [active, setActive] = useState(categories[0].id);
  const cat = categories.find((c) => c.id === active)!;
  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto border-b border-stone px-5 sm:mx-0 sm:flex-wrap sm:px-0">
        {categories.map((c) => (
          <button key={c.id} onClick={() => setActive(c.id)}
            className={`relative shrink-0 whitespace-nowrap pb-3 text-[13px] tracking-wide transition ${active === c.id ? 'font-semibold text-ink' : 'text-ink-3 hover:text-ink'}`}>
            {c.name}
            <span className={`absolute inset-x-0 -bottom-px h-[2px] bg-forest-deep transition-all ${active === c.id ? 'opacity-100' : 'opacity-0'}`} />
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="mt-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              {cat.cover ? <Visual image={cat.cover} className="aspect-[4/3] rounded-2xl" /> : <Placeholder id={cat.placeholder || 'HERO-ORCHARD'} className="aspect-[4/3] rounded-2xl" />}
            </div>
            <div className="lg:col-span-7 lg:pl-6">
              <p className="font-serif text-[12px] tracking-[0.3em] text-gold">{cat.brand} · {cat.en}</p>
              <h3 className="t-h2 mt-3">{cat.name}</h3>
              <p className="t-lead mt-5">{cat.desc}</p>
              <p className="t-small mt-4 text-gold-dark">{cat.point}</p>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {cat.products.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="group">
                {p.image
                  ? <ProductStage src={p.image} alt={p.name} dark={false} className="aspect-[4/5] rounded-2xl bg-cream transition duration-500 group-hover:bg-cream-2" />
                  : <Placeholder id={p.placeholder!} className="aspect-[4/5] rounded-2xl" />}
                <div className="pt-4">
                  <h4 className="text-[15px] font-medium">{p.name}</h4>
                  {p.sub && <p className="t-small mt-0.5">{p.sub}</p>}
                  {p.sizes && <p className="mt-2 text-[11px] tracking-wide text-gold-dark">{p.sizes}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
      <p className="t-small mt-10">{note}</p>
    </div>
  );
}
