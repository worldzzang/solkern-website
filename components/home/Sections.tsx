'use client';
import Link from 'next/link';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';
import dynamic from 'next/dynamic';
import CollectionCarousel from './CollectionCarousel';
import { Fact, Item, Marquee, ParallaxImg, Placeholder, Reveal, SectionHead, Stagger, Visual } from '../ui';

const TerritoryMap = dynamic(() => import('../TerritoryMap'), { ssr: false, loading: () => <div className="aspect-[702/590] w-full animate-pulse rounded-[4px] bg-cream-2" /> });

/* 02 THE LAND — 오설록 "제주의 자연환경": 큰 풍경 사진 + 숫자 팩트 4개 */
export function Land({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.land;
  return (
    <section className="bg-cream">
      <div className="container-x pt-24 sm:pt-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
      </div>
      <div className="container-w mt-14">
        <Reveal><Placeholder id="HERO-ORCHARD" className="aspect-[16/9] w-full rounded-[4px] sm:aspect-[21/9]" tagPos="bottom" /></Reveal>
      </div>
      <div className="container-x pb-24 sm:pb-32">
        <Stagger className="mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-stone">
          {s.facts.map((f) => <Item key={f.label} className="px-4"><Fact value={f.value} label={f.label} /></Item>)}
        </Stagger>
        <Reveal className="mt-14 text-center"><Link href={withLocale(locale, '/origin')} className="link-ul">{s.cta}</Link></Reveal>
      </div>
    </section>
  );
}

/* 02-B REGIONS — 오설록 "세 개의 다원": 산지 카드 4개 */
const REGION_IMG = ['REGION-FERGANA', 'REGION-TASHKENT', 'REGION-SAMARKAND', 'REGION-TURKIYE'];
export function Regions({ locale, dict }: { locale: Locale; dict: Dict }) {
  const regions = dict.origin.regions;
  return (
    <section className="bg-paper">
      <div className="container-w py-24 sm:py-32">
        <SectionHead eyebrow="REGIONS" title={dict.ui.sections.originRegions} />
        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((r, i) => (
            <Item key={r.name}>
              <Link href={withLocale(locale, '/origin')} className="group block">
                <Placeholder id={REGION_IMG[i] || 'HERO-ORCHARD'} className="aspect-[4/5] rounded-[4px]" imgClass="transition duration-[1.4s] group-hover:scale-105" />
                <h3 className="t-h4 mt-5">{r.name}</h3>
                <p className="t-body mt-2">{r.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{r.crops.map((x) => <span key={x} className="rounded-full border border-stone px-2.5 py-0.5 text-[11px] text-ink-3">{x}</span>)}</div>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* 03 THE FRUIT — 원물 6종: 화이트 원형 무대 */
export function Fruit({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.fruit;
  return (
    <section className="bg-cream">
      <div className="container-x py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <Stagger className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {s.items.map((f) => (
            <Item key={f.name}>
              <div className="group text-center">
                <div className="relative mx-auto flex aspect-square w-[72%] items-center justify-center overflow-hidden rounded-full bg-paper shadow-[0_1px_0_rgba(0,0,0,0.04)] transition duration-700 group-hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]">
                  {f.image ? <img src={f.image} alt={f.name} className="h-[68%] w-[68%] object-contain transition duration-[1.2s] group-hover:scale-110" /> : <Placeholder id={f.placeholder!} className="h-full w-full" showTag={false} />}
                </div>
                <h3 className="t-h3 mt-6">{f.name}</h3>
                <div className="mt-3 space-y-1.5 text-[13px] text-ink-2">
                  <p><span className="mr-2 text-[10px] font-semibold tracking-[0.2em] text-gold">PRODUCT</span>{f.product}</p>
                  <p><span className="mr-2 text-[10px] font-semibold tracking-[0.2em] text-pome">MATERIAL</span>{f.material}</p>
                </div>
              </div>
            </Item>
          ))}
        </Stagger>
        <Reveal className="mt-16 text-center"><Link href={withLocale(locale, '/material-lab')} className="link-ul">{s.cta}</Link></Reveal>
      </div>
    </section>
  );
}

/* 04 ERMÁK COLLECTION — 오설록 BEST&NEW: 화이트 타일 가로 스크롤 */
export function Collection({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.collection;
  const cats = dict.ermak.categories;
  const ordered = [...cats.filter((c) => c.id === 'snack'), ...cats.filter((c) => c.id !== 'snack')];
  const showcase = ordered.flatMap((c) => c.products.filter((p) => p.image).slice(0, c.id === 'snack' ? 3 : 2).map((p) => ({ ...p, cat: c.name })));
  return (
    <section className="bg-paper">
      <div className="pt-24 sm:pt-32">
        <div className="container-x"><SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} /></div>
        <CollectionCarousel items={showcase} prevLabel={dict.ui.prev} nextLabel={dict.ui.next} />
        <div className="container-x pb-16 pt-10 text-center"><Reveal><Link href={withLocale(locale, '/ermak')} className="btn-line mr-3">{dict.common.viewProducts}</Link><Link href={withLocale(locale, '/contact?type=catalog')} className="link-ul mt-4 sm:mt-0">{s.cta}</Link></Reveal></div>
        <Marquee items={cats.map((c) => c.en)} />
      </div>
    </section>
  );
}

/* 05 FEATURED — 한국 런칭 우선순위 */
export function Featured({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.featured;
  const phases = dict.ermak.korea.phases;
  return (
    <section className="bg-paper">
      <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-6"><Visual image="/images/bg/trio-blue.webp" alt="ERMÁK products" className="aspect-[4/5] rounded-[4px] sm:aspect-square" /></Reveal>
        <div className="lg:col-span-6">
          <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} align="left" />
          <Stagger className="mt-10 divide-y divide-stone border-y border-stone">
            {phases.map((p) => (
              <Item key={p.phase}>
                <div className="grid grid-cols-[88px_1fr] gap-4 py-5 sm:grid-cols-[110px_1fr]">
                  <span className="font-serif text-[15px] tracking-[0.12em] text-gold">{p.phase}</span>
                  <div><p className="text-[15px] font-medium">{p.items}</p><p className="t-small mt-1">{p.channel}</p></div>
                </div>
              </Item>
            ))}
          </Stagger>
          <div className="mt-8 flex flex-wrap gap-2">{s.tags.map((t) => <span key={t} className="rounded-full bg-cream px-3 py-1 text-[12px] text-ink-2">{t}</span>)}</div>
          <Reveal delay={0.2}><Link href={withLocale(locale, '/b2b')} className="link-ul mt-10">{s.cta}</Link></Reveal>
        </div>
      </div>
    </section>
  );
}

/* 06 SECOND LIFE — 오설록 "왜 특별한가": 사진 + 4단계 흐름 */
export function SecondLife({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.secondLife;
  return (
    <section className="bg-cream">
      <div className="container-x py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-6"><Placeholder id="WHY-SECONDLIFE" className="aspect-[4/3] rounded-[4px]" /></Reveal>
          <Stagger className="lg:col-span-6">
            {s.flow.map((f, i) => (
              <Item key={f.label}>
                <div className="relative flex gap-6 pb-8 last:pb-0">
                  {i < s.flow.length - 1 && <span className="absolute left-[19px] top-10 h-[calc(100%-24px)] w-px bg-stone" />}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold bg-paper font-serif text-[15px] text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <div className="pt-1.5"><p className="text-[16px] font-medium">{f.label}</p><p className="t-body mt-1.5">{f.desc}</p></div>
                </div>
              </Item>
            ))}
            <Reveal delay={0.2}><Link href={withLocale(locale, '/material-lab')} className="link-ul mt-8">{s.cta}</Link></Reveal>
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* 07 MATERIAL VALUE — 3 트랙 카드 */
export function MaterialValue({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.material;
  return (
    <section className="bg-paper">
      <div className="container-w py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {s.cards.map((c) => (
            <Item key={c.title}>
              <Link href={withLocale(locale, '/material-lab')} className="group block">
                <Placeholder id={c.placeholder} className="aspect-[4/5] rounded-[4px]" imgClass="transition duration-[1.4s] group-hover:scale-105" />
                <p className="mt-6 font-serif text-[13px] tracking-[0.3em] text-gold">{c.title}</p>
                <p className="mt-2 text-[16px] font-medium">{c.from} <span className="mx-1 text-gold">→</span> {c.to}</p>
                <p className="t-body mt-2">{c.desc}</p>
              </Link>
            </Item>
          ))}
        </Stagger>
        <Reveal className="mt-14 text-center"><Link href={withLocale(locale, '/contact?type=material')} className="link-ul">{s.cta}</Link></Reveal>
      </div>
    </section>
  );
}

/* 08 MARKET — 아시아·태평양 12개국 지도 */
export function Market({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.market;
  return (
    <section className="bg-cream">
      <div className="container-x py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7"><div className="rounded-[4px] bg-paper p-4 sm:p-8"><TerritoryMap t={dict.territory} compact hideList /></div></Reveal>
          <Stagger className="divide-y divide-stone border-y border-stone lg:col-span-5">
            {s.nodes.map((n) => (
              <Item key={n.name}>
                <div className="flex items-baseline justify-between gap-4 py-5">
                  <p className="font-serif text-[18px] tracking-[0.1em]">{n.name}</p>
                  <p className="t-small text-right">{n.role}</p>
                </div>
              </Item>
            ))}
            <Reveal delay={0.2}><Link href={withLocale(locale, '/b2b')} className="link-ul mt-8">{s.cta}</Link></Reveal>
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* 09 TRUST — 데이터로 마무리하는 신뢰 */
export function Trust({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.trust;
  return (
    <section className="bg-paper">
      <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} align="left" />
          <Reveal delay={0.2}><Placeholder id="WHY-DATA" className="mt-10 aspect-[4/3] rounded-[4px]" /></Reveal>
        </div>
        <div className="lg:col-span-7 lg:pt-2">
          <Stagger className="divide-y divide-stone border-y border-stone">
            {s.items.map((it, i) => (
              <Item key={it.title}>
                <div className="grid gap-2 py-6 sm:grid-cols-[56px_1fr]">
                  <span className="font-serif text-[15px] text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <div><p className="text-[16px] font-medium">{it.title}</p><p className="t-body mt-1.5">{it.desc}</p></div>
                </div>
              </Item>
            ))}
          </Stagger>
          <div className="mt-8 flex flex-wrap gap-2">{s.certs.map((c) => <span key={c} className="rounded-full border border-gold/50 px-3 py-1 text-[11px] tracking-wide text-gold-dark">{c}</span>)}</div>
          <p className="t-small mt-5">{s.note}</p>
          <Reveal delay={0.2}><Link href={withLocale(locale, '/contact?type=catalog')} className="link-ul mt-10">{s.cta}</Link></Reveal>
        </div>
      </div>
    </section>
  );
}

/* 10 TIMELINE — 오설록 "SINCE 1979" 연혁 */
const TL_IMG = ['TL-1992', 'TL-2008', 'TL-2026'];
export function Timeline({ dict }: { dict: Dict }) {
  const s = dict.home.timeline;
  return (
    <section className="bg-cream">
      <div className="container-x py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} />
        <Stagger className="mt-16 grid grid-cols-3 gap-3 sm:gap-6">
          {TL_IMG.map((id) => <Item key={id}><Placeholder id={id} className="aspect-[4/3] rounded-[4px]" /></Item>)}
        </Stagger>
        <Stagger className="mx-auto mt-16 max-w-3xl divide-y divide-stone border-y border-stone">
          {s.items.map((t) => (
            <Item key={t.year + t.title}>
              <div className="grid gap-2 py-6 sm:grid-cols-[140px_1fr] sm:gap-6">
                <p className="font-serif text-[26px] leading-none text-gold sm:text-[30px]">{t.year}</p>
                <div><p className="text-[16px] font-medium">{t.title}</p><p className="t-body mt-1.5">{t.desc}</p></div>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* 11 PEOPLE — 오설록 "차를 만난 사람들": 창립자 어록 */
export function Founder({ dict }: { dict: Dict }) {
  const q = dict.solkern.founderQuote;
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
        <img src="/images/bg/founder.webp" alt="" className="h-full w-full object-cover object-top opacity-60" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, #000 35%)', maskImage: 'linear-gradient(to right, transparent, #000 35%)' }} />
      </div>
      <div className="container-x relative py-24 sm:py-32">
        <Reveal><p className="eyebrow-dark">PEOPLE</p></Reveal>
        <Reveal delay={0.1}><p className="mt-8 font-serif text-[64px] leading-none text-gold-light">“</p></Reveal>
        <Reveal delay={0.15}><p className="t-h3 max-w-2xl font-normal leading-[1.6] text-white/90">{q.quote}</p></Reveal>
        <Reveal delay={0.25}><p className="mt-8 text-[13px] tracking-[0.15em] text-gold-light">— {q.who}</p></Reveal>
        <div className="mt-10 lg:hidden"><img src="/images/bg/founder.webp" alt={q.who} className="h-56 w-auto rounded-[4px] opacity-90" /></div>
      </div>
    </section>
  );
}

/* 12 DAILY — 오설록 "다다일상": 일상 장면 그리드 */
export function Daily({ dict }: { dict: Dict }) {
  const s = dict.home.daily;
  return (
    <section className="bg-paper">
      <div className="container-w py-24 sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <Stagger className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {s.captions.map((c, i) => (
            <Item key={c}>
              <div className="group">
                <Placeholder id={`DAILY-${i + 1}`} className="aspect-square rounded-[4px]" imgClass="transition duration-[1.4s] group-hover:scale-105" />
                <p className="mt-3 text-[13px] text-ink-2">{c}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* 13 CONTACT CTA — 오설록 "더 많은 이야기": 3개 링크 + 문의 */
export function ContactCta({ locale, dict }: { locale: Locale; dict: Dict }) {
  const s = dict.home.contact;
  const links = [
    { href: '/ermak', label: dict.nav[2].label, sub: dict.ermak.hero.eyebrow, img: '/images/bg/pb-toast.webp' },
    { href: '/material-lab', label: dict.nav[3].label, sub: dict.materialLab.hero.eyebrow, placeholder: 'LAB-BEAUTY' },
    { href: '/b2b', label: dict.nav[4].label, sub: dict.b2b.hero.eyebrow, img: '/images/bg/apple-press.webp' },
  ];
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-x py-24 text-center sm:py-32">
        <SectionHead eyebrow={s.eyebrow} title={s.title} body={s.body} />
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href={withLocale(locale, '/contact')} className="btn-dark">{s.cta1}</Link>
            <Link href={withLocale(locale, '/contact?type=catalog')} className="btn-line">{s.cta2}</Link>
          </div>
        </Reveal>
        <Stagger className="mt-20 grid gap-6 sm:grid-cols-3">
          {links.map((l) => (
            <Item key={l.href}>
              <Link href={withLocale(locale, l.href)} className="group block text-left">
                <Visual image={l.img} placeholder={l.placeholder} className="aspect-[16/10] rounded-[4px]" imgClass="transition duration-[1.4s] group-hover:scale-105" />
                <p className="mt-4 text-[11px] tracking-[0.25em] text-gold">{l.sub}</p>
                <p className="mt-1 text-[17px] font-medium tracking-wide group-hover:text-gold">{l.label} <span className="font-serif">→</span></p>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* 유틸: 풀블리드 패럴랙스 사진 밴드 (페이지 구분용) */
export function PhotoBand({ src, quote, who }: { src: string; quote: string; who?: string }) {
  return (
    <section className="relative h-[52vh] min-h-[360px] overflow-hidden text-white">
      <ParallaxImg src={src} className="absolute inset-0" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="container-x relative flex h-full flex-col items-center justify-center text-center">
        <Reveal><p className="t-h3 max-w-3xl font-normal leading-[1.5]">{quote}</p></Reveal>
        {who && <Reveal delay={0.15}><p className="mt-6 text-[12px] tracking-[0.2em] text-white/70">{who}</p></Reveal>}
      </div>
    </section>
  );
}
