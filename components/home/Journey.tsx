'use client';
import type { Dict } from '@/content/types';
import { Item, Reveal, Stagger } from '../ui';

/* 01 THE SOLKERN WAY — 오설록 브랜드 철학 문장 + "환경 5요소"식 가로 4단 (Origin → Product → Second Life → Market) */
export default function Journey({ dict }: { dict: Dict }) {
  const j = dict.home.journey;
  return (
    <section className="bg-paper">
      <div className="container-x py-24 text-center sm:py-32 lg:py-40">
        <Reveal><img src="/images/logo/solkern-mark.png" alt="" className="mx-auto h-10 w-auto opacity-90" /></Reveal>
        <Reveal delay={0.08}><p className="eyebrow mt-8">{j.eyebrow}</p></Reveal>
        <Reveal delay={0.16}><h2 className="t-h2 mx-auto mt-6 max-w-3xl">{j.title}</h2></Reveal>
        <Reveal delay={0.24}><span className="mx-auto mt-10 block h-px w-10 bg-gold" /></Reveal>

        <Stagger className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-stone">
          {j.steps.map((s, i) => (
            <Item key={s.key} className="lg:px-8">
              <p className="font-serif text-[40px] leading-none text-gold">{String(i + 1).padStart(2, '0')}</p>
              <p className="mt-3 text-[11px] font-medium tracking-[0.3em] text-ink-3">{s.label.replace(/^\d+\s/, '')}</p>
              <h3 className="t-h4 mt-4">{s.title}</h3>
              <p className="t-body mt-3">{s.body}</p>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
