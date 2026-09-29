'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';
import dynamic from 'next/dynamic';
import CollectionCarousel from './CollectionCarousel';
import { Counter, Item, Marquee, ParallaxImg, Placeholder, Reveal, SectionHead, Stagger } from '../ui';

// 지도 데이터(약 35KB gz)는 별도 청크로 분리해 첫 화면 로딩에 영향 없도록
const TerritoryMap = dynamic(() => import('../TerritoryMap'), { ssr: false, loading: () => <div className="aspect-[702/590] w-full animate-pulse rounded-2xl bg-white/5" /> });

/* 02 THE LAND */
export function Land({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.land;
  return (
    <section className="relative overflow-hidden bg-ivory-2">
      <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
          <Stagger className="mt-10 grid grid-cols-2 gap-6">
            {s.facts.map((f) => (
              <Item key={f.label}>
                <p className="display text-5xl text-gold"><Counter value={f.value} /></p>
                <p className="mt-1 text-xs leading-snug text-ink-3">{f.label}</p>
              </Item>
            ))}
          </Stagger>
          <Reveal delay={0.2}><Link href={withLocale(locale, '/origin')} className="btn-outline-dark mt-10">{s.cta} <span>→</span></Link></Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative">
              <Placeholder id="HERO-ORCHARD" className="aspect-[4/3] w-full rounded-3xl lg:aspect-[16/11]" />
              <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.8 }}
                className="absolute -bottom-6 -left-4 w-40 overflow-hidden rounded-2xl shadow-2xl sm:-left-8 sm:w-56">
                <img src="/images/bg/apple-press.webp" alt="" className="aspect-square w-full object-cover" />
              </motion.div>
              <motion.img src="/images/fruits/pom-half.webp" alt="" initial={{ opacity: 0, rotate: 20, x: 40 }} whileInView={{ opacity: 1, rotate: 0, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 1 }}
                className="absolute -right-6 -top-10 w-32 animate-float drop-shadow-2xl sm:w-44" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 03 THE FRUIT */
export function Fruit({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.fruit;
  return (
    <section className="bg-ivory">
      <div className="container-x py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} align="center" />
        <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {s.items.map((f) => (
            <Item key={f.name}>
              <motion.div whileHover={{ y: -6 }} className="group card relative overflow-hidden p-5 sm:p-7">
                <div className="relative mx-auto aspect-square w-3/4">
                  {f.image ? <img src={f.image} alt={f.name} className="h-full w-full object-contain transition duration-700 group-hover:scale-110 group-hover:rotate-3" /> : <Placeholder id={f.placeholder!} className="h-full w-full rounded-full" showTag={false} />}
                </div>
                <h3 className="display mt-4 text-2xl sm:text-3xl">{f.name}</h3>
                <div className="mt-3 space-y-1.5 text-xs sm:text-sm">
                  <p><span className="mr-2 rounded bg-gold/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-gold-dark">PRODUCT</span>{f.product}</p>
                  <p><span className="mr-2 rounded bg-pome/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-pome">MATERIAL</span>{f.material}</p>
                </div>
              </motion.div>
            </Item>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center"><Link href={withLocale(locale, '/material-lab')} className="btn-dark">{s.cta} <span>→</span></Link></Reveal>
      </div>
    </section>
  );
}

/* 04 ERMAK COLLECTION */
export function Collection({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.collection;
  const cats = dict.ermak.categories;
  const ordered = [...cats.filter((c) => c.id === 'snack'), ...cats.filter((c) => c.id !== 'snack')];
  const showcase = ordered.flatMap((c) => c.products.filter((p) => p.image).slice(0, c.id === 'snack' ? 3 : 2).map((p) => ({ ...p, cat: c.name })));
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <ParallaxImg src="/images/bg/splash-pom.webp" className="absolute inset-0 opacity-40" speed={0.1} />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
      <div className="relative">
        <div className="container-x pt-24 sm:pt-32">
          <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} dark />
        </div>
        <CollectionCarousel items={showcase} prevLabel={dict.ui.prev} nextLabel={dict.ui.next} />
        <div className="container-x pb-8"><Reveal><Link href={withLocale(locale, '/contact')} className="btn-gold">{s.cta} <span>→</span></Link></Reveal></div>
        <Marquee dark items={cats.map((c) => c.en)} />
        <div className="h-16" />
      </div>
    </section>
  );
}

/* 05 FEATURED */
export function Featured({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.featured;
  const phases = dict.ermak.korea.phases;
  return (
    <section className="bg-ivory">
      <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <Reveal><div className="relative overflow-hidden rounded-3xl"><img src="/images/bg/trio-blue.webp" alt="ERMÁK products" className="aspect-[4/3] w-full object-cover transition duration-[2s] hover:scale-105" /></div></Reveal>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-5">
          <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
          <Stagger className="mt-8 space-y-3">
            {phases.map((p) => (
              <Item key={p.phase}>
                <div className="card flex gap-4 p-4">
                  <span className="shrink-0 rounded-full bg-ink px-3 py-1 text-[10px] font-bold tracking-widest text-gold-light">{p.phase}</span>
                  <div><p className="text-sm font-semibold">{p.items}</p><p className="mt-0.5 text-xs text-ink-3">{p.channel}</p></div>
                </div>
              </Item>
            ))}
          </Stagger>
          <div className="mt-6 flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold-dark">{t}</span>)}</div>
          <Reveal delay={0.2}><Link href={withLocale(locale, '/b2b')} className="btn-dark mt-8">{s.cta} <span>→</span></Link></Reveal>
        </div>
      </div>
    </section>
  );
}

/* 06 SECOND LIFE */
export function SecondLife({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.secondLife;
  return (
    <section className="relative overflow-hidden bg-pome-deep text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(229,138,60,0.25),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(180,145,65,0.25),transparent_50%)]" />
      <motion.img src="/images/fruits/pom-big.webp" alt="" className="pointer-events-none absolute -right-20 top-10 w-[420px] opacity-30 blur-[1px] sm:w-[560px]"
        initial={{ rotate: -10, opacity: 0 }} whileInView={{ rotate: 0, opacity: 0.3 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
      <div className="container-x relative py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} dark />
        <div className="relative mt-16 grid gap-6 md:grid-cols-4">
          <motion.div className="absolute left-0 top-7 hidden h-px w-full origin-left bg-gold/60 md:block" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: 'easeInOut' }} />
          {s.flow.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.2}>
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-pome-deep font-serif text-xl text-gold">{i + 1}</div>
                <h3 className="mt-5 text-lg font-bold">{f.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}><Link href={withLocale(locale, '/material-lab')} className="btn-gold mt-14">{s.cta} <span>→</span></Link></Reveal>
      </div>
    </section>
  );
}

/* 07 MATERIAL VALUE */
export function MaterialValue({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.material;
  return (
    <section className="bg-ivory-2">
      <div className="container-x py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {s.cards.map((c) => (
            <Item key={c.title}>
              <motion.div whileHover={{ y: -8 }} className="group card overflow-hidden">
                <Placeholder id={c.placeholder} className="aspect-[4/3]" />
                <div className="p-6">
                  <p className="eyebrow">{c.title}</p>
                  <div className="mt-4 flex items-center gap-3 text-sm">
                    <span className="rounded-lg bg-ink/5 px-2.5 py-1">{c.from}</span>
                    <motion.span className="text-gold" animate={{ x: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>→</motion.span>
                    <span className="rounded-lg bg-gold/15 px-2.5 py-1 font-semibold text-gold-dark">{c.to}</span>
                  </div>
                  <p className="mt-4 text-sm text-ink-3">{c.desc}</p>
                </div>
              </motion.div>
            </Item>
          ))}
        </Stagger>
        <Reveal delay={0.2}><Link href={withLocale(locale, '/contact')} className="btn-outline-dark mt-12">{s.cta} <span>→</span></Link></Reveal>
      </div>
    </section>
  );
}

/* 08 MARKET — 판권 12개국 지도 */
export function Market({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.market;
  const t = dict.territory;
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-[0.04]" />
      <div className="container-x relative py-24 sm:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7"><SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} dark /></div>
          <Stagger className="grid grid-cols-3 gap-4 lg:col-span-5">
            <Item><p className="display text-6xl text-gold sm:text-7xl"><Counter value="12" /></p><p className="mt-1 text-xs text-white/60">{t.countLabel}</p></Item>
            <Item><p className="display text-6xl text-gold sm:text-7xl"><Counter value="3" /></p><p className="mt-1 text-xs text-white/60">{dict.ui.regionsLabel}</p></Item>
            <Item><p className="display text-6xl text-gold sm:text-7xl"><Counter value="2" /></p><p className="mt-1 text-xs text-white/60">{dict.ui.originsLabel}</p></Item>
          </Stagger>
        </div>
        <Reveal className="mt-12"><TerritoryMap t={t} dark /></Reveal>
        <Stagger className="mt-12 grid grid-cols-2 gap-5 border-t border-white/10 pt-8 md:grid-cols-4">
          {s.nodes.map((n, i) => (
            <Item key={n.name}>
              <div className="border-l-2 border-gold/50 pl-4">
                <p className="text-xs tracking-[0.2em] text-gold">{String(i + 1).padStart(2, '0')} · {n.name}</p>
                <p className="mt-1 text-sm text-white/75">{n.role}</p>
              </div>
            </Item>
          ))}
        </Stagger>
        <Reveal delay={0.2}><Link href={withLocale(locale, '/b2b')} className="btn-gold mt-10">{s.cta} <span>→</span></Link></Reveal>
      </div>
    </section>
  );
}

/* 09 TRUST */
export function Trust({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.trust;
  return (
    <section className="bg-ivory">
      <div className="container-x py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
            <div className="mt-8 flex flex-wrap gap-2">{s.certs.map((c) => <span key={c} className="rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold tracking-wider text-gold-light">{c}</span>)}</div>
            <p className="mt-4 text-xs text-ink-3/80">{s.note}</p>
            <Reveal delay={0.2}><Link href={withLocale(locale, '/contact')} className="btn-dark mt-8">{s.cta} <span>→</span></Link></Reveal>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {s.items.map((it, i) => (
              <Item key={it.title}>
                <div className="card h-full p-6">
                  <p className="font-serif text-4xl text-gold">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 font-bold">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-3">{it.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* 10 CONTACT CTA */
export function ContactCta({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.contact;
  return (
    <section className="relative overflow-hidden bg-gold text-white">
      <ParallaxImg src="/images/bg/backcover.webp" className="absolute inset-0 opacity-25 mix-blend-multiply" speed={0.08} />
      <div className="container-x relative py-24 text-center sm:py-32">
        <Reveal><p className="eyebrow !text-white/80">{s.eyebrow}</p></Reveal>
        <Reveal delay={0.1}><h2 className="h1 mt-4">{s.title}</h2></Reveal>
        <Reveal delay={0.2}><p className="lead mx-auto mt-5 max-w-2xl text-white/85">{s.body}</p></Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href={withLocale(locale, '/contact')} className="btn bg-ink text-white hover:bg-ink-3">{s.cta1} →</Link>
            <Link href={withLocale(locale, '/contact?type=catalog')} className="btn-outline text-white">{s.cta2}</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
