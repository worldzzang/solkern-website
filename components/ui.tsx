'use client';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PLACEHOLDERS, CUSTOM_READY, REAL, REAL_POS } from '@/lib/placeholders';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Logo (공식 SOLKERN 로고: public/images/logo) ---------- */
export function Logo({ light = false, className = '', tagline = false, stacked = false }: { light?: boolean; className?: string; tagline?: boolean; stacked?: boolean }) {
  const src = stacked
    ? `/images/logo/solkern-stacked-${light ? 'white' : 'black'}.png`
    : `/images/logo/solkern-horizontal${light ? '-white' : ''}${tagline ? '' : '-compact'}.png`;
  return <img src={src} alt="SOLKERN — Quality Without Borders" className={`${stacked ? 'w-28' : tagline ? 'h-12' : 'h-7 sm:h-8'} w-auto ${className}`} />;
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children, delay = 0, y = 26, className = '', once = true }: { children: React.ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, margin: '-60px' }} transition={{ duration: 1.1, delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}
export function Stagger({ children, className = '', gap = 0.09 }: { children: React.ReactNode; className?: string; gap?: number }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-50px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}>
      {children}
    </motion.div>
  );
}
export const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } } };
export function Item({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={item} className={className}>{children}</motion.div>;
}

/* ---------- Line-by-line text reveal ---------- */
export function Lines({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}>
      {text.split('\n').map((l, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className="block" variants={{ hidden: { y: '100%', opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } } }}>{l}</motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/* ---------- Counter ---------- */
export function Counter({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const num = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9,]/g, '');
  const isYear = /^(19|20)\d{2}$/.test(value);
  const mv = useMotionValue(isYear ? num - 40 : 0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const rounded = useTransform(spring, (v) => (value.includes(',') ? Math.round(v).toLocaleString() : String(Math.round(v))));
  useEffect(() => { if (inView && !isNaN(num)) mv.set(num); }, [inView, num, mv]);
  if (isNaN(num)) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

/* ---------- 이미지 슬롯: 실사진(REAL) → 교체본(CUSTOM_READY) → 플레이스홀더(IMAGE · ID + 주석) ---------- */
export function Placeholder({ id, className = '', label, showTag = true, showLabel = true, children, imgClass = '', compact = false }: { id: string; className?: string; label?: string; showTag?: boolean; showLabel?: boolean; tagPos?: 'top' | 'bottom'; children?: React.ReactNode; imgClass?: string; compact?: boolean }) {
  const spec = PLACEHOLDERS[id];
  const src = CUSTOM_READY.includes(id) ? `/images/custom/${id}.webp` : REAL[id];
  const pos = /\babsolute\b/.test(className) ? '' : 'relative';
  if (src) {
    return (
      <div className={`overflow-hidden ${pos} ${className}`}>
        <img src={src} alt={label || spec?.label || id} loading="lazy" className={`absolute inset-0 h-full w-full object-cover ${imgClass}`} style={{ objectPosition: REAL_POS[id] }} />
        {children}
      </div>
    );
  }
  return (
    <div data-placeholder={id} className={`grain overflow-hidden ${pos} ${className}`} style={{ background: spec?.mood || 'linear-gradient(155deg,#e8e6dc,#8e9a6a,#1e2f26)' }}>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 22% 18%, rgba(255,255,255,.38), transparent 46%), radial-gradient(circle at 82% 88%, rgba(0,0,0,.30), transparent 52%)' }} />
      {showTag && (
        <div className={`absolute inset-3 flex flex-col items-center justify-center rounded-[10px] border border-dashed border-white/45 text-center text-white ${compact ? 'gap-1 p-2' : 'gap-2 p-4'}`}>
          <svg viewBox="0 0 24 24" className={`${compact ? 'h-4 w-4' : 'h-6 w-6'} opacity-80`} fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10.5" r="1.6" /><path d="M4 17l5-4.5 3.5 3L16 12l4 4.5" /></svg>
          <p className="rounded-full bg-black/35 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] backdrop-blur-sm">IMAGE · {id}{spec?.ratio ? ` · ${spec.ratio}` : ''}</p>
          {showLabel && !compact && <p className="max-w-[92%] text-[11px] leading-snug text-white/85 sm:text-[12px]">{label || spec?.label}</p>}
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------- Photo or placeholder ---------- */
export function Visual({ image, placeholder, alt = '', className = '', imgClass = '' }: { image?: string; placeholder?: string; alt?: string; className?: string; imgClass?: string; tagPos?: 'top' | 'bottom' }) {
  if (image) return <div className={`overflow-hidden ${/\babsolute\b/.test(className) ? '' : 'relative'} ${className}`}><img src={image} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${imgClass}`} loading="lazy" /></div>;
  return <Placeholder id={placeholder || 'HERO-ORCHARD'} className={className} imgClass={imgClass} />;
}

/* ---------- Section heading (오설록: 작은 영문 라벨 + 가는 큰 제목 + 한 단락) ---------- */
export function SectionHead({ eyebrow, title, body, dark = false, align = 'center', className = '', size = 'h2' }: { eyebrow?: string; title: string; body?: string; dark?: boolean; align?: 'left' | 'center'; className?: string; size?: 'h1' | 'h2' | 'h3' }) {
  const t = size === 'h1' ? 't-h1' : size === 'h3' ? 't-h3' : 't-h2';
  const c = align === 'center';
  return (
    <div className={`${c ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Reveal><p className={`${dark ? 'eyebrow-dark' : 'eyebrow'} inline-flex items-center gap-3`}><span className={`h-px w-6 ${dark ? 'bg-gold-light' : 'bg-gold'}`} />{eyebrow}{c && <span className={`h-px w-6 ${dark ? 'bg-gold-light' : 'bg-gold'}`} />}</p></Reveal>}
      <Reveal delay={0.08}><h2 className={`${t} ${eyebrow ? 'mt-6' : ''} ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2></Reveal>
      {body && <Reveal delay={0.16}><p className={`t-lead mt-6 ${dark ? '!text-white/70' : ''} ${c ? 'mx-auto max-w-2xl' : ''}`}>{body}</p></Reveal>}
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y ${dark ? 'border-white/10' : 'border-stone'} py-5`}>
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {list.map((t, i) => (
          <span key={i} className={`text-[13px] font-light uppercase tracking-[0.3em] ${dark ? 'text-white/50' : 'text-ink-3'}`}>{t} <span className="mx-5 text-gold">·</span></span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Parallax image ---------- */
export function ParallaxImg({ src, alt = '', className = '', speed = 0.12 }: { src: string; alt?: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => { const r = el.getBoundingClientRect(); y.set((r.top + r.height / 2 - window.innerHeight / 2) * speed); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll);
  }, [speed, y]);
  return (
    <div ref={ref} className={`overflow-hidden ${/\babsolute\b/.test(className) ? '' : 'relative'} ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.16 }} className="absolute inset-0 h-full w-full object-cover will-change-transform" />
    </div>
  );
}

/* ---------- Full-bleed image band ---------- */
export function Band({ image, placeholder, eyebrow, title, body, cta, height = 'h-[62vh] min-h-[420px]' }: { image?: string; placeholder?: string; eyebrow?: string; title: string; body?: string; cta?: React.ReactNode; height?: string }) {
  return (
    <section className={`relative ${height} overflow-hidden text-white`}>
      {image ? <ParallaxImg src={image} className="absolute inset-0" /> : <Placeholder id={placeholder!} className="absolute inset-0" showLabel={false} />}
      <div className="absolute inset-0 bg-forest-deep/45" />
      <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
        {eyebrow && <Reveal><p className="eyebrow-dark">{eyebrow}</p></Reveal>}
        <Reveal delay={0.1}><h2 className="t-h2 mt-5 max-w-3xl whitespace-pre-line">{title}</h2></Reveal>
        {body && <Reveal delay={0.2}><p className="t-lead mx-auto mt-6 max-w-2xl !text-white/80">{body}</p></Reveal>}
        {cta && <Reveal delay={0.3}><div className="mt-9">{cta}</div></Reveal>}
      </div>
    </section>
  );
}

/* ---------- 숫자 팩트 ---------- */
export function Fact({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <p className={`t-num text-[46px] sm:text-[64px] ${dark ? 'text-white' : 'text-forest'}`}><Counter value={value} /></p>
      <span className="mx-auto mt-4 block h-px w-6 bg-gold" />
      <p className={`mt-4 text-[12px] leading-snug sm:text-[13px] ${dark ? 'text-white/60' : 'text-ink-3'}`}>{label}</p>
    </div>
  );
}

/* ---------- 가로 슬라이더 (드래그·스와이프·화살표·진행바) — 오설록 Since/다다일상 스와이퍼 ---------- */
export function Scroller({ children, prevLabel = 'Previous', nextLabel = 'Next', dark = false, className = '' }: { children: React.ReactNode; prevLabel?: string; nextLabel?: string; dark?: boolean; className?: string }) {
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
  const onDown = (e: React.PointerEvent) => { if (e.pointerType !== 'mouse') return; const el = ref.current!; drag.current = { down: true, x: e.clientX, left: el.scrollLeft, moved: false }; el.style.scrollSnapType = 'none'; el.style.scrollBehavior = 'auto'; };
  const onMove = (e: React.PointerEvent) => { const d = drag.current; if (!d.down) return; const dx = e.clientX - d.x; if (Math.abs(dx) > 4) d.moved = true; ref.current!.scrollLeft = d.left - dx; };
  const onUp = () => { if (!drag.current.down) return; drag.current.down = false; const el = ref.current; if (el) { el.style.scrollSnapType = ''; el.style.scrollBehavior = ''; } };
  return (
    <div className={className}>
      <div ref={ref} onScroll={update} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
        className="scroller no-scrollbar flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 active:cursor-grabbing">
        {children}
        <div className="w-px shrink-0" />
      </div>
      <div className="container-x mt-8 flex items-center gap-4">
        <div className={`relative h-px flex-1 overflow-hidden ${dark ? 'bg-white/20' : 'bg-stone'}`}>
          <div className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-200" style={{ width: `${Math.max(10, progress * 100)}%` }} />
        </div>
        <button type="button" aria-label={prevLabel} onClick={() => step(-1)} disabled={!canPrev} className={`round-btn ${dark ? 'border-white/40 text-white hover:bg-white hover:text-forest' : 'border-stone text-ink hover:border-forest'}`}>←</button>
        <button type="button" aria-label={nextLabel} onClick={() => step(1)} disabled={!canNext} className={`round-btn ${dark ? 'border-white bg-white text-forest hover:bg-gold-light' : 'border-forest bg-forest text-white hover:bg-forest-soft'}`}>→</button>
      </div>
    </div>
  );
}
