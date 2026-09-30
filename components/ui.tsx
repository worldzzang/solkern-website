'use client';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { PLACEHOLDERS, CUSTOM_READY } from '@/lib/placeholders';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Logo (official SOLKERN assets: public/images/logo) ---------- */
export function Logo({ light = false, className = '', tagline = false, stacked = false }: { light?: boolean; className?: string; tagline?: boolean; stacked?: boolean }) {
  const src = stacked
    ? `/images/logo/solkern-stacked-${light ? 'white' : 'black'}.png`
    : `/images/logo/solkern-horizontal${light ? '-white' : ''}${tagline ? '' : '-compact'}.png`;
  return <img src={src} alt="SOLKERN — Quality Without Borders" className={`${stacked ? 'w-28' : tagline ? 'h-12' : 'h-7 sm:h-8'} w-auto ${className}`} />;
}

/* ---------- Reveal on scroll (잔잔한 페이드업) ---------- */
export function Reveal({ children, delay = 0, y = 22, className = '', once = true }: { children: React.ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once, margin: '-60px' }} transition={{ duration: 1, delay, ease: EASE }}>
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
export const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } } };
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
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1600, bounce: 0 });
  const rounded = useTransform(spring, (v) => (value.includes(',') ? Math.round(v).toLocaleString() : String(Math.round(v))));
  useEffect(() => { if (inView && !isNaN(num)) mv.set(num); }, [inView, num, mv]);
  if (isNaN(num)) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

/* ---------- Placeholder image (IMG · ID 태그) ---------- */
export function Placeholder({ id, className = '', label, showTag = true, showLabel = true, tagPos = 'bottom', children, imgClass = '' }: { id: string; className?: string; label?: string; showTag?: boolean; showLabel?: boolean; tagPos?: 'top' | 'bottom'; children?: React.ReactNode; imgClass?: string }) {
  const spec = PLACEHOLDERS[id];
  const ready = CUSTOM_READY.includes(id);
  return (
    <div className={`overflow-hidden ${/\babsolute\b/.test(className) ? '' : 'relative'} ${ready ? '' : 'grain'} ${className}`} style={ready ? undefined : { background: spec?.mood || 'linear-gradient(135deg,#e9e3d6,#b49141)' }}>
      {ready && <img src={`/images/custom/${id}.webp`} alt={label || spec?.label || id} className={`absolute inset-0 h-full w-full object-cover ${imgClass}`} />}
      {!ready && (
        <>
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 25% 20%, rgba(255,255,255,.45), transparent 45%), radial-gradient(circle at 80% 85%, rgba(0,0,0,.28), transparent 50%)' }} />
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-[0.07]" />
          {showLabel && <div className="absolute inset-x-0 bottom-0 top-auto flex items-end justify-center p-4 text-center">
            <p className="max-w-[80%] text-[11px] leading-snug text-white/70">{label || spec?.label}</p>
          </div>}
        </>
      )}
      {showTag && !ready && (
        <div className={`absolute left-3 ${tagPos === 'top' ? 'top-3' : 'bottom-3'} z-10 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/90 backdrop-blur`}>
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> IMG · {id}
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------- Photo or placeholder ---------- */
export function Visual({ image, placeholder, alt = '', className = '', imgClass = '', tagPos }: { image?: string; placeholder?: string; alt?: string; className?: string; imgClass?: string; tagPos?: 'top' | 'bottom' }) {
  if (image) return <div className={`overflow-hidden ${/\babsolute\b/.test(className) ? '' : 'relative'} ${className}`}><img src={image} alt={alt} className={`absolute inset-0 h-full w-full object-cover ${imgClass}`} loading="lazy" /></div>;
  return <Placeholder id={placeholder || 'HERO-ORCHARD'} className={className} tagPos={tagPos} imgClass={imgClass} />;
}

/* ---------- Section heading (오설록: 중앙 정렬, 아이브로우 + 제목 + 한 줄) ---------- */
export function SectionHead({ eyebrow, title, body, dark = false, align = 'center', className = '', size = 'h2' }: { eyebrow?: string; title: string; body?: string; dark?: boolean; align?: 'left' | 'center'; className?: string; size?: 'h1' | 'h2' | 'h3' }) {
  const t = size === 'h1' ? 't-h1' : size === 'h3' ? 't-h3' : 't-h2';
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <Reveal><p className={dark ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</p></Reveal>}
      <Reveal delay={0.08}><h2 className={`${t} ${eyebrow ? 'mt-5' : ''} ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2></Reveal>
      {body && <Reveal delay={0.16}><p className={`t-lead mt-6 ${dark ? 'text-white/70' : ''} ${align === 'center' ? 'mx-auto max-w-2xl' : ''}`}>{body}</p></Reveal>}
      <Reveal delay={0.22}><span className={`mt-8 block h-px w-10 ${dark ? 'bg-gold-light' : 'bg-gold'} ${align === 'center' ? 'mx-auto' : ''}`} /></Reveal>
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
          <span key={i} className={`font-serif text-lg italic tracking-wide sm:text-xl ${dark ? 'text-white/60' : 'text-ink-3'}`}>{t} <span className="mx-5 text-gold not-italic">·</span></span>
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

/* ---------- Full-bleed image band (오설록식 큰 사진 + 짧은 문장) ---------- */
export function Band({ image, placeholder, eyebrow, title, body, cta, height = 'h-[62vh] min-h-[420px]' }: { image?: string; placeholder?: string; eyebrow?: string; title: string; body?: string; cta?: React.ReactNode; height?: string }) {
  return (
    <section className={`relative ${height} overflow-hidden text-white`}>
      {image ? <ParallaxImg src={image} className="absolute inset-0" /> : <Placeholder id={placeholder!} className="absolute inset-0" />}
      <div className="absolute inset-0 bg-black/35" />
      <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
        {eyebrow && <Reveal><p className="eyebrow-dark">{eyebrow}</p></Reveal>}
        <Reveal delay={0.1}><h2 className="t-h2 mt-5 max-w-3xl whitespace-pre-line">{title}</h2></Reveal>
        {body && <Reveal delay={0.2}><p className="t-lead mx-auto mt-6 max-w-2xl text-white/80">{body}</p></Reveal>}
        {cta && <Reveal delay={0.3}><div className="mt-9">{cta}</div></Reveal>}
      </div>
    </section>
  );
}

/* ---------- 숫자 팩트 (오설록 환경 요소 스타일) ---------- */
export function Fact({ value, label, dark = false }: { value: string; label: string; dark?: boolean }) {
  return (
    <div className="text-center">
      <p className={`font-serif text-[44px] leading-none sm:text-[56px] ${dark ? 'text-gold-light' : 'text-gold'}`}><Counter value={value} /></p>
      <p className={`mt-3 text-[12px] leading-snug sm:text-[13px] ${dark ? 'text-white/65' : 'text-ink-3'}`}>{label}</p>
    </div>
  );
}
