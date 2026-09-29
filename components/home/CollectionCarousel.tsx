'use client';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import ProductStage from '../ProductStage';

type Item = { id: string; name: string; image?: string; cat: string };

/* 가로 제품 쇼케이스 — 좌우 화살표 · 마우스 드래그 · 트랙패드/Shift+휠 · 터치 스와이프 · 진행 표시 */
export default function CollectionCarousel({ items, prevLabel, nextLabel }: { items: Item[]; prevLabel: string; nextLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });

  const update = useCallback(() => {
    const el = ref.current; if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setCanPrev(el.scrollLeft > 4); setCanNext(el.scrollLeft < max - 4);
  }, []);
  useEffect(() => { update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update); }, [update]);

  const step = (dir: 1 | -1) => {
    const el = ref.current; if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    const w = card ? card.offsetWidth + 20 : 280;
    el.scrollBy({ left: dir * w * Math.max(1, Math.floor(el.clientWidth / w) - 1), behavior: 'smooth' });
  };

  // 마우스 드래그 (터치는 기본 스와이프 사용)
  const onDown = (e: React.PointerEvent) => { if (e.pointerType !== 'mouse') return; const el = ref.current!; drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false }; el.style.scrollSnapType = 'none'; };
  const onMove = (e: React.PointerEvent) => { const d = drag.current; if (!d.down) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true; ref.current!.scrollLeft = d.left - dx; };
  const onUp = () => { if (!drag.current.down) return; drag.current.down = false; const el = ref.current; if (el) el.style.scrollSnapType = ''; };

  const btn = 'flex h-11 w-11 items-center justify-center rounded-full border text-lg transition disabled:cursor-not-allowed disabled:opacity-25';
  return (
    <div>
      <div ref={ref} onScroll={update} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
        className="no-scrollbar mt-14 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-6 active:cursor-grabbing sm:px-8 lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))]">
        {items.map((p, i) => (
          <motion.div key={p.id} data-card initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.08, duration: 0.7 }}
            className="group relative w-[220px] shrink-0 snap-start sm:w-[260px]">
            <ProductStage src={p.image!} alt={p.name}
              className="aspect-[3/4] rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_top,#2b2419,#141414_70%)] transition duration-500 group-hover:border-gold/60" />
            <p className="mt-3 text-[10px] tracking-[0.2em] text-gold">{p.cat}</p>
            <p className="text-sm font-semibold">{p.name}</p>
          </motion.div>
        ))}
        <div className="w-1 shrink-0" />
      </div>
      <div className="container-x flex items-center gap-4 pb-10">
        <div className="relative h-[2px] flex-1 overflow-hidden rounded bg-white/15">
          <div className="absolute inset-y-0 left-0 rounded bg-gold transition-[width] duration-200" style={{ width: `${Math.max(8, progress * 100)}%` }} />
        </div>
        <button type="button" aria-label={prevLabel} onClick={() => step(-1)} disabled={!canPrev} className={`${btn} border-white/25 text-white hover:border-gold hover:bg-gold`}>←</button>
        <button type="button" aria-label={nextLabel} onClick={() => step(1)} disabled={!canNext} className={`${btn} border-gold bg-gold text-white hover:bg-gold-dark`}>→</button>
      </div>
    </div>
  );
}
