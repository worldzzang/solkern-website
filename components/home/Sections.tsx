'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';
import ProductStage from '../ProductStage';
import { Fact, Item, Marquee, Placeholder, Reveal, Scroller, SectionHead, Stagger, Visual } from '../ui';

const TerritoryMap = dynamic(() => import('../TerritoryMap'), { ssr: false, loading: () => <div className="aspect-[702/590] w-full animate-pulse rounded-2xl bg-cream-2" /> });
const EASE = [0.22, 1, 0.36, 1] as const;

/* ============================================================
   00 STATEMENT — 브랜드 선언 (오설록 히어로 아래 한 문단)
   ============================================================ */
export function Statement({ dict }: { dict: Dict }) {
  const j = dict.home.journey;
  return (
    <section className="bg-paper">
      <div className="container-n section-y text-center">
        <Reveal><img src="/images/logo/solkern-mark.png" alt="SOLKERN" className="mx-auto h-12 w-auto sm:h-14" /></Reveal>
        <Reveal delay={0.08}><p className="eyebrow mt-9">{j.eyebrow}</p></Reveal>
        <Reveal delay={0.16}><h2 className="t-h1 mt-7">{j.title}</h2></Reveal>
        <Reveal delay={0.24}><p className="t-lead mx-auto mt-8 max-w-2xl">{dict.solkern.hero.body}</p></Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   01 THE SOLKERN WAY — 오설록 "차의 특별함" 4개 확장 패널
   PC: 가로 4패널(호버/클릭 시 확장) · 모바일: 세로 아코디언
   ============================================================ */
const WAY = [
  { img: 'WAY-ORIGIN', href: '/origin' },
  { img: 'WAY-PRODUCT', href: '/ermak' },
  { img: 'WHY-SECONDLIFE', href: '/material-lab' },
  { img: 'WAY-MARKET', href: '/b2b' },
];
export function Way({ locale, dict }: { locale: Locale; dict: Dict }) {
  const steps = dict.home.journey.steps;
  const [on, setOn] = useState(0);
  return (
    <section className="bg-paper pb-20 sm:pb-28 lg:pb-36">
      <div className="container-w">
        <div className="flex flex-col gap-2 lg:h-[620px] lg:flex-row lg:gap-3">
          {steps.map((s, i) => {
            const active = on === i;
            const [num, ...rest] = s.label.split(' ');
            return (
              <div key={s.key} role="button" tabIndex={0} aria-expanded={active}
                onMouseEnter={() => { if (window.matchMedia('(hover:hover) and (min-width:1024px)').matches) setOn(i); }}
                onClick={() => setOn(i)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOn(i); } }}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl text-white transition-[flex-grow,height] duration-700 ease-[cubic-bezier(.22,1,.36,1)] lg:h-full lg:basis-0 ${active ? 'h-[400px] lg:grow-[3.4]' : 'h-[84px] lg:grow'}`}>
                <Placeholder id={WAY[i].img} className="absolute inset-0" showTag={active} imgClass={`transition duration-[1.6s] ${active ? 'scale-100' : 'scale-110'}`} />
                <div className={`absolute inset-0 transition-colors duration-700 ${active ? 'bg-gradient-to-t from-forest-deep/90 via-forest-deep/25 to-forest-deep/10' : 'bg-forest-deep/60'}`} />
                {/* 접힌 상태 라벨 */}
                <div className={`absolute inset-0 flex items-center justify-between px-6 transition-opacity duration-300 lg:flex-col lg:items-start lg:justify-between lg:p-7 ${active ? 'pointer-events-none opacity-0' : 'opacity-100'}`}>
                  <span className="t-num text-[28px] lg:text-[40px]">{num}</span>
                  <span className="text-[12px] font-semibold tracking-[0.28em] lg:[writing-mode:vertical-rl] lg:rotate-180">{rest.join(' ')}</span>
                </div>
                {/* 펼친 상태 내용 */}
                <AnimatePresence>
                  {active && (
                    <motion.div key="body" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, delay: 0.25, ease: EASE }} className="absolute inset-x-0 bottom-0 p-6 sm:p-9 lg:p-11">
                      <p className="flex items-center gap-3 text-[11px] font-semibold tracking-[0.3em] text-gold-light"><span className="t-num text-[30px] text-white">{num}</span>{rest.join(' ')}</p>
                      <h3 className="t-h3 mt-4 max-w-md">{s.title}</h3>
                      <p className="mt-3 max-w-md text-[14px] font-light leading-[1.85] text-white/85 sm:text-[15px]">{s.body}</p>
                      <Link href={withLocale(locale, WAY[i].href)} onClick={(e) => e.stopPropagation()} className="link-ul-light mt-6">{dict.common.readMore} →</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   02 THE LAND — 오설록 "제주 자연환경 5요소": 원형 이미지 + 탭 + 숫자 팩트
   ============================================================ */
export function Land({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.land;
  const ch = dict.origin.chapters;
  const [on, setOn] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => { if (!auto) return; const t = setInterval(() => setOn((v) => (v + 1) % ch.length), 6500); return () => clearInterval(t); }, [auto, ch.length]);
  const pick = (i: number) => { setAuto(false); setOn(i); };
  return (
    <section className="relative overflow-hidden bg-forest text-white">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full border border-white/5" />
      <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-white/5" />
      <div className="container-x section-y relative">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} dark />
        <div className="mt-14 grid items-center gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-20">
          {/* 원형 이미지 */}
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[460px]">
              <div className="absolute -inset-3 rounded-full border border-gold/40 sm:-inset-4" />
              <div className="absolute inset-0 overflow-hidden rounded-full bg-forest-deep">
                <AnimatePresence initial={false}>
                  <motion.div key={on} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.1, ease: EASE }} className="absolute inset-0">
                    <Placeholder id={ch[on].placeholder} label={ch[on].note} className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
              </div>
              <span className="t-num absolute -left-1 -top-1 text-[64px] text-gold-light sm:-left-6 sm:text-[96px]">{ch[on].num}</span>
            </div>
          </Reveal>
          {/* 탭 */}
          <div role="tablist" aria-label={s.title}>
            {ch.map((c, i) => {
              const active = on === i;
              return (
                <div key={c.num} className="border-b border-white/15 first:border-t">
                  <button type="button" role="tab" aria-selected={active} onClick={() => pick(i)} className="flex w-full items-center gap-5 py-5 text-left sm:py-6">
                    <span className={`text-[12px] tabular-nums tracking-[0.2em] transition-colors ${active ? 'text-gold-light' : 'text-white/40'}`}>{c.num}</span>
                    <span className={`flex-1 text-[19px] transition-colors sm:text-[24px] ${active ? 'font-normal text-white' : 'font-light text-white/55'}`}>{c.title}</span>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full border text-[13px] transition ${active ? 'rotate-45 border-gold-light text-gold-light' : 'border-white/25 text-white/50'}`}>+</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div key="p" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.55, ease: EASE }} className="overflow-hidden">
                        <p className="pb-6 pl-[42px] pr-10 text-[14px] font-light leading-[1.9] text-white/75 sm:text-[15px]">{c.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
        {/* 숫자 팩트 */}
        <Stagger className="mt-16 grid grid-cols-2 gap-x-4 gap-y-12 border-t border-white/15 pt-14 sm:mt-24 sm:grid-cols-4">
          {s.facts.map((f) => <Item key={f.label}><Fact value={f.value} label={f.label} dark /></Item>)}
        </Stagger>
        <Reveal className="mt-14 text-center"><Link href={withLocale(locale, '/origin')} className="link-ul-light">{s.cta} →</Link></Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   03 REGIONS — 오설록 "세 곳의 차밭" 탭: 산지 4곳
   ============================================================ */
const REGION_IMG = ['REGION-FERGANA', 'REGION-TASHKENT', 'REGION-SAMARKAND', 'REGION-TURKIYE'];
export function Regions({ locale, dict }: { locale: Locale; dict: Dict }) {
  const regions = dict.origin.regions;
  const [on, setOn] = useState(0);
  const r = regions[on];
  return (
    <section className="bg-paper">
      <div className="container-x section-y">
        <SectionHead eyebrow="REGIONS" title={dict.ui.sections.originRegions} />
        <Reveal delay={0.1}>
          <div role="tablist" className="no-scrollbar -mx-5 mt-12 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {regions.map((x, i) => (
              <button key={x.name} type="button" role="tab" aria-selected={on === i} onClick={() => setOn(i)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-[13px] transition ${on === i ? 'border-forest bg-forest text-white' : 'border-stone text-ink-2 hover:border-forest'}`}>{x.name}</button>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream sm:aspect-[16/10] lg:col-span-7">
            <AnimatePresence initial={false}>
              <motion.div key={on} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: EASE }} className="absolute inset-0">
                <Placeholder id={REGION_IMG[on] || 'HERO-ORCHARD'} className="h-full w-full" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div key={on} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5, ease: EASE }}>
                <p className="text-[12px] tabular-nums tracking-[0.24em] text-gold-dark">0{on + 1} <span className="text-mute">/ 0{regions.length}</span></p>
                <h3 className="t-h2 mt-4">{r.name}</h3>
                <p className="t-lead mt-5">{r.desc}</p>
                <div className="mt-7 flex flex-wrap gap-2">{r.crops.map((c) => <span key={c} className="chip">{c}</span>)}</div>
              </motion.div>
            </AnimatePresence>
            <Link href={withLocale(locale, '/origin')} className="link-ul mt-10">{dict.home.land.cta} →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   04 THE FRUIT — 하나의 원물, 두 갈래(완제품 · 소재)
   ============================================================ */
export function Fruit({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.fruit;
  return (
    <section className="bg-cream">
      <div className="container-x section-y">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <Stagger className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:mt-16 sm:gap-x-6 lg:grid-cols-3">
          {s.items.map((f) => (
            <Item key={f.name}>
              <div className="group">
                <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-paper">
                  {f.image
                    ? f.image.startsWith('/images/custom/') ? <img src={f.image} alt={f.name} loading="lazy" className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" /> : <img src={f.image} alt={f.name} loading="lazy" className="h-[62%] w-[62%] object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.16)] transition duration-[1.2s] group-hover:scale-110" />
                    : <Placeholder id={f.placeholder!} className="h-full w-full" imgClass="transition duration-[1.4s] group-hover:scale-105" />}
                </div>
                <h3 className="t-h4 mt-5">{f.name}</h3>
                <dl className="mt-3 space-y-1.5 text-[12px] leading-snug text-ink-2 sm:text-[13px]">
                  <div className="flex gap-2"><dt className="w-[62px] shrink-0 whitespace-nowrap pt-0.5 text-[9px] font-semibold tracking-[0.1em] sm:w-[78px] sm:tracking-[0.16em] text-forest-soft sm:text-[10px]">PRODUCT</dt><dd>{f.product}</dd></div>
                  <div className="flex gap-2"><dt className="w-[62px] shrink-0 whitespace-nowrap pt-0.5 text-[9px] font-semibold tracking-[0.1em] sm:w-[78px] sm:tracking-[0.16em] text-gold-dark sm:text-[10px]">MATERIAL</dt><dd>{f.material}</dd></div>
                </dl>
              </div>
            </Item>
          ))}
        </Stagger>
        <Reveal className="mt-14 text-center"><Link href={withLocale(locale, '/material-lab')} className="link-ul">{s.cta} →</Link></Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   05 ERMÁK COLLECTION — 제품 가로 슬라이더
   ============================================================ */
export function Collection({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.collection;
  const cats = dict.ermak.categories;
  const ordered = [...cats.filter((c) => c.id === 'snack'), ...cats.filter((c) => c.id !== 'snack')];
  const showcase = ordered.flatMap((c) => c.products.filter((p) => p.image).slice(0, c.id === 'snack' ? 3 : 2).map((p) => ({ ...p, cat: c.name })));
  return (
    <section className="bg-paper">
      <div className="pt-20 sm:pt-28 lg:pt-36">
        <div className="container-x"><SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} /></div>
        <Scroller className="mt-12 sm:mt-16" prevLabel={dict.ui.prev} nextLabel={dict.ui.next}>
          {showcase.map((p, i) => (
            <motion.div key={p.id} data-card initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.06, duration: 0.8 }} className="group w-[200px] shrink-0 snap-start sm:w-[260px]">
              <ProductStage src={p.image!} alt={p.name} className="aspect-[4/5] rounded-2xl bg-cream transition duration-500 group-hover:bg-cream-2" />
              <p className="mt-4 text-[10px] font-semibold tracking-[0.2em] text-forest-soft">{p.cat}</p>
              <p className="mt-1.5 text-[15px] font-medium">{p.name}</p>
              {p.sub && <p className="t-small mt-0.5">{p.sub}</p>}
            </motion.div>
          ))}
        </Scroller>
        <div className="container-x flex flex-wrap items-center justify-center gap-3 pb-16 pt-12"><Link href={withLocale(locale, '/ermak')} className="btn-dark">{dict.common.viewProducts}</Link><Link href={withLocale(locale, '/contact?type=catalog')} className="btn-line">{s.cta}</Link></div>
        <Marquee items={cats.map((c) => c.en)} />
      </div>
    </section>
  );
}

/* ============================================================
   06 FEATURED — 한국 런칭 우선순위
   ============================================================ */
export function Featured({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.featured;
  const phases = dict.ermak.korea.phases;
  return (
    <section className="bg-paper">
      <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6"><Visual image="/images/bg/trio-blue.webp" alt="ERMÁK products" className="aspect-square rounded-2xl" /></Reveal>
        <div className="lg:col-span-6">
          <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} align="left" />
          <Stagger className="mt-9 border-t border-stone">
            {phases.map((p) => (
              <Item key={p.phase}>
                <div className="grid grid-cols-[84px_1fr] gap-4 border-b border-stone py-5 sm:grid-cols-[110px_1fr]">
                  <span className="pt-0.5 text-[11px] font-semibold tracking-[0.2em] text-gold-dark">{p.phase}</span>
                  <div><p className="text-[15px] font-medium">{p.items}</p><p className="t-small mt-1">{p.channel}</p></div>
                </div>
              </Item>
            ))}
          </Stagger>
          <div className="mt-7 flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          <Reveal delay={0.2}><Link href={withLocale(locale, '/b2b')} className="link-ul mt-9">{s.cta} →</Link></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   07 SECOND LIFE + MATERIAL VALUE — 딥 포레스트 섹션: 4단계 흐름 + 3개 소재 카드
   ============================================================ */
export function SecondLife({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.secondLife;
  const m = dict.home.material;
  return (
    <section className="bg-forest-deep text-white">
      <div className="container-x section-y">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} dark />
        {/* 4단계 흐름 */}
        <Stagger className="relative mt-14 grid gap-y-8 sm:mt-20 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-0">
          <span aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-white/15 lg:block" />
          {s.flow.map((f, i) => (
            <Item key={f.label}>
              <div className="relative flex gap-5 lg:block lg:pr-8">
                <span className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold-light bg-forest-deep text-[13px] tabular-nums text-gold-light">0{i + 1}</span>
                <div className="lg:mt-6"><p className="text-[17px] font-medium">{f.label}</p><p className="mt-2 text-[14px] font-light leading-[1.8] text-white/65">{f.desc}</p></div>
              </div>
            </Item>
          ))}
        </Stagger>
        {/* 소재 3 트랙 */}
        <div className="mt-20 border-t border-white/15 pt-16 sm:mt-28 sm:pt-20">
          <SectionHead eyebrow={m.eyebrow} title={m.title} body={m.body} dark size="h3" />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {m.cards.map((c) => (
              <Item key={c.title}>
                <Link href={withLocale(locale, '/material-lab')} className="group relative block aspect-[4/5] overflow-hidden rounded-2xl">
                  <Placeholder id={c.placeholder} className="absolute inset-0" imgClass="transition duration-[1.6s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/95 via-forest-deep/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                    <p className="text-[11px] font-semibold tracking-[0.3em] text-gold-light">{c.title}</p>
                    <p className="mt-3 text-[16px] font-medium leading-snug">{c.from} <span className="mx-1 text-gold-light">→</span> {c.to}</p>
                    <p className="mt-2 text-[13px] font-light leading-relaxed text-white/70">{c.desc}</p>
                  </div>
                </Link>
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3"><Link href={withLocale(locale, '/material-lab')} className="btn bg-white text-forest hover:bg-gold-light">{s.cta}</Link><Link href={withLocale(locale, '/contact?type=material')} className="btn-line-light">{m.cta}</Link></Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   08 MARKET — 아시아·태평양 12개국 지도
   ============================================================ */
export function Market({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.market;
  return (
    <section className="bg-cream">
      <div className="container-x section-y">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <div className="mt-12 grid gap-10 sm:mt-16 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-7"><div className="rounded-2xl bg-paper p-3 sm:p-8"><TerritoryMap t={dict.territory} compact hideList /></div></Reveal>
          <div className="lg:col-span-5">
            <Stagger className="border-t border-stone">
              {s.nodes.map((n) => (
                <Item key={n.name}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-stone py-5">
                    <p className="text-[14px] font-medium tracking-[0.14em] sm:text-[15px]">{n.name}</p>
                    <p className="t-small text-right">{n.role}</p>
                  </div>
                </Item>
              ))}
            </Stagger>
            <Reveal delay={0.2}><Link href={withLocale(locale, '/b2b')} className="link-ul mt-9">{s.cta} →</Link></Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   09 TRUST — 데이터로 마무리하는 신뢰 (오설록 인증 배지 톤)
   ============================================================ */
export function Trust({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.trust;
  return (
    <section className="bg-paper">
      <div className="container-x section-y">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <Stagger className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((it, i) => (
            <Item key={it.title}>
              <div className="h-full rounded-2xl bg-cream p-7">
                <p className="t-num text-[34px] text-gold-dark">0{i + 1}</p>
                <p className="mt-6 text-[16px] font-semibold">{it.title}</p>
                <p className="t-body mt-2.5">{it.desc}</p>
              </div>
            </Item>
          ))}
        </Stagger>
        <Reveal className="mt-10 flex flex-wrap justify-center gap-2">{s.certs.map((c) => <span key={c} className="rounded-full border border-forest/25 px-4 py-1.5 text-[11px] font-medium tracking-wide text-forest">{c}</span>)}</Reveal>
        <p className="t-small mx-auto mt-6 max-w-3xl text-center">{s.note}</p>
        <Reveal className="mt-10 text-center"><Link href={withLocale(locale, '/contact?type=catalog')} className="link-ul">{s.cta} →</Link></Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   10 SINCE 1992 — 오설록 "Since 1979" 가로 연혁 슬라이더
   ============================================================ */
export function Timeline({ dict }: { dict: Dict }) {
  const s = dict.home.timeline;
  return (
    <section className="overflow-hidden bg-cream">
      <div className="section-y">
        <div className="container-x">
          <Reveal><p className="t-display !text-[44px] text-forest sm:!text-[84px] lg:!text-[120px]">{s.eyebrow}</p></Reveal>
          <Reveal delay={0.1}><h2 className="t-h3 mt-5 max-w-2xl sm:mt-7">{s.title}</h2></Reveal>
        </div>
        <Scroller className="mt-12 sm:mt-16" prevLabel={dict.ui.prev} nextLabel={dict.ui.next}>
          {s.items.map((t) => (
            <div key={t.year + t.title} data-card className="relative w-[250px] shrink-0 snap-start border-t border-forest/25 pt-7 sm:w-[340px]">
              <span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-gold" />
              <p className="t-num text-[40px] text-forest sm:text-[54px]">{t.year}</p>
              <p className="mt-5 text-[16px] font-semibold leading-snug sm:text-[17px]">{t.title}</p>
              <p className="t-body mt-2.5 pr-4">{t.desc}</p>
            </div>
          ))}
        </Scroller>
      </div>
    </section>
  );
}

/* ============================================================
   11 PEOPLE — 오설록 "사람, 차를 만나다": 생산 현장의 사람들 + 창립자 어록
   ============================================================ */
export function People({ dict }: { dict: Dict }) {
  const q = dict.solkern.founderQuote;
  return (
    <section className="bg-forest text-white">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[300px] overflow-hidden sm:min-h-[420px] lg:min-h-[640px]">
          <motion.img src="/images/photo/ermak-team.webp" alt="ERMÁK team" loading="lazy" initial={{ scale: 1.12 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 2.2, ease: EASE }} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: 'center 92%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-forest/30" />
        </div>
        <div className="flex items-center">
          <div className="px-5 py-16 sm:px-12 sm:py-24 lg:px-16 xl:px-24">
            <Reveal><p className="eyebrow-dark inline-flex items-center gap-3"><span className="h-px w-6 bg-gold-light" />PEOPLE</p></Reveal>
            <Reveal delay={0.1}><p className="t-num mt-8 text-[72px] text-gold-light">“</p></Reveal>
            <Reveal delay={0.15}><p className="-mt-6 max-w-xl text-[19px] font-light leading-[1.75] text-white/95 sm:text-[23px]">{q.quote}</p></Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10 flex items-center gap-4">
                <img src="/images/bg/founder.webp" alt={q.who} className="h-14 w-14 rounded-full object-cover object-top" />
                <p className="text-[13px] tracking-[0.06em] text-white/75">{q.who}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   12 DAILY — 오설록 "다다일상": 일상 장면 가로 갤러리
   ============================================================ */
export function Daily({ dict }: { dict: Dict }) {
  const s = dict.home.daily;
  return (
    <section className="overflow-hidden bg-paper">
      <div className="section-y">
        <div className="container-x"><SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} /></div>
        <Scroller className="mt-12 sm:mt-16" prevLabel={dict.ui.prev} nextLabel={dict.ui.next}>
          {s.captions.map((c, i) => {
            const [when, what] = c.split(' · ');
            return (
              <div key={c} data-card className="group w-[230px] shrink-0 snap-start sm:w-[320px]">
                <Placeholder id={`DAILY-${i + 1}`} className="aspect-[4/5] rounded-2xl bg-cream" imgClass="transition duration-[1.6s] group-hover:scale-105" />
                <p className="mt-5 text-[11px] font-semibold tracking-[0.22em] text-gold-dark">{when}</p>
                <p className="mt-1.5 text-[16px] font-medium">{what || c}</p>
              </div>
            );
          })}
        </Scroller>
      </div>
    </section>
  );
}

/* ============================================================
   13 MORE STORIES + CONTACT — 오설록 "더 많은 이야기" 3개 카드 + 문의 CTA
   ============================================================ */
export function ContactCta({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.contact;
  const links = [
    { href: '/ermak', label: dict.nav[2].label, sub: dict.home.collection.title },
    { href: '/material-lab', label: dict.nav[3].label, sub: dict.home.secondLife.title },
    { href: '/b2b', label: dict.nav[4].label, sub: dict.home.market.title },
  ];
  return (
    <section className="bg-cream">
      <div className="container-x section-y">
        <Stagger className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {links.map((l, i) => (
            <Item key={l.href}>
              <Link href={withLocale(locale, l.href)} className="group flex h-full items-end justify-between gap-4 rounded-2xl bg-paper p-7 transition duration-500 hover:bg-forest hover:text-white sm:min-h-[200px] sm:p-9">
                <div>
                  <p className="t-num text-[28px] text-gold-dark transition group-hover:text-gold-light">0{i + 1}</p>
                  <p className="mt-6 text-[19px] font-medium tracking-[0.08em] sm:mt-10">{l.label}</p>
                  <p className="mt-1.5 text-[13px] text-ink-3 transition group-hover:text-white/70">{l.sub}</p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-stone transition group-hover:translate-x-1 group-hover:border-white/50">→</span>
              </Link>
            </Item>
          ))}
        </Stagger>
        <div className="mt-20 text-center sm:mt-28">
          <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} size="h1" />
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link href={withLocale(locale, '/contact')} className="btn-dark">{s.cta1}</Link>
              <Link href={withLocale(locale, '/contact?type=catalog')} className="btn-line">{s.cta2}</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
