'use client';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { PLACEHOLDERS, CUSTOM_READY } from '@/lib/placeholders';

/* ---------- Logo (official SOLKERN assets: public/images/logo) ---------- */
export function Logo({ light = false, className = '', tagline = false }: { light?: boolean; className?: string; tagline?: boolean }) {
  const src = `/images/logo/solkern-horizontal${light ? '-white' : ''}${tagline ? '' : '-compact'}.png`;
  return <img src={src} alt="SOLKERN — Quality Without Borders" className={`${tagline ? 'h-12' : 'h-8 sm:h-9'} w-auto ${className}`} />;
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children, delay = 0, y = 28, className = '', once = true }: { children: React.ReactNode; delay?: number; y?: number; className?: string; once?: boolean }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}>
      {children}
    </motion.div>
  );
}
export const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };
export function Item({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div variants={item} className={className}>{children}</motion.div>;
}

/* ---------- Split text (word-by-word) ---------- */
export function SplitWords({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <motion.span className={className} aria-label={text} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span className="inline-block" variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, delay: delay + i * 0.06, ease: [0.22, 1, 0.36, 1] } } }}>
            {w}{i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
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
  const spring = useSpring(mv, { duration: 1800, bounce: 0 });
  const useComma = value.includes(',');
  const rounded = useTransform(spring, (v) => (useComma ? Math.round(v).toLocaleString() : String(Math.round(v))));
  useEffect(() => { if (inView && !isNaN(num)) mv.set(num); }, [inView, num, mv]);
  if (isNaN(num)) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

/* ---------- Placeholder image ---------- */
export function Placeholder({ id, className = '', label, showTag = true, tagPos = 'top', children }: { id: string; className?: string; label?: string; showTag?: boolean; tagPos?: 'top' | 'bottom'; children?: React.ReactNode }) {
  const spec = PLACEHOLDERS[id];
  const ready = CUSTOM_READY.includes(id);
  return (
    <div className={`relative overflow-hidden grain ${className}`} style={ready ? undefined : { background: spec?.mood || 'linear-gradient(135deg,#222,#5b4636)' }}>
      {ready && <img src={`/images/custom/${id}.webp`} alt={label || spec?.label || id} className="absolute inset-0 h-full w-full object-cover" />}
      {!ready && (
        <>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,.35), transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,.35), transparent 45%)' }} />
          <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-[0.08]" />
        </>
      )}
      {showTag && !ready && (
        <div className={`absolute left-3 ${tagPos === 'top' ? 'top-3' : 'bottom-3'} z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white/90 backdrop-blur`}>
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> IMG · {id}
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------- Section heading ---------- */
export function SectionHead({ eyebrow, title, body, dark = false, align = 'left', className = '' }: { eyebrow: string; title: string; body?: string; dark?: boolean; align?: 'left' | 'center'; className?: string }) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Reveal><p className="eyebrow">{eyebrow}</p></Reveal>
      <h2 className={`h2 mt-4 ${dark ? 'text-white' : 'text-ink'}`}><SplitWords text={title} /></h2>
      {body && <Reveal delay={0.15}><p className={`lead mt-5 ${dark ? 'text-white/70' : ''}`}>{body}</p></Reveal>}
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className={`overflow-hidden border-y ${dark ? 'border-white/10' : 'border-black/10'} py-4`}>
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
        {list.map((t, i) => (
          <span key={i} className={`font-serif text-xl sm:text-2xl italic ${dark ? 'text-white/60' : 'text-ink/60'}`}>{t} <span className="mx-4 text-gold not-italic">✦</span></span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Parallax image ---------- */
export function ParallaxImg({ src, alt = '', className = '', speed = 0.15 }: { src: string; alt?: string; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const onScroll = () => { const r = el.getBoundingClientRect(); const c = (r.top + r.height / 2 - window.innerHeight / 2) * speed; y.set(c); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll);
  }, [speed, y]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img src={src} alt={alt} style={{ y, scale: 1.18 }} className="absolute inset-0 h-full w-full object-cover will-change-transform" />
    </div>
  );
}

/* ---------- Magnetic button wrapper ---------- */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 }); const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} className="inline-block"
      onMouseMove={(e) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.25); }}
      onMouseLeave={() => { x.set(0); y.set(0); }}>
      {children}
    </motion.div>
  );
}
