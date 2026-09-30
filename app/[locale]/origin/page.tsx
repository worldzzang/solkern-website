import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Item, Marquee, Placeholder, Reveal, SectionHead, Stagger } from '@/components/ui';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

const REGION_IMG = ['REGION-FERGANA', 'REGION-TASHKENT', 'REGION-SAMARKAND', 'REGION-TURKIYE'];

/* ORIGIN — 오설록 "제주의 자연환경" 4챕터(햇빛·토양과 물·과수 문화·제조) → 산지 4곳 → 두 번째 원산지 */
export default function OriginPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.origin;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} placeholder="HERO-VALLEY" />
      <Marquee items={dict.ui.originMarquee} />

      {/* Chapters — 사진·텍스트 교차 */}
      <section className="bg-paper">
        <div className="container-x space-y-28 py-24 sm:py-32">
          {s.chapters.map((c, i) => (
            <div key={c.num} className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal className="lg:col-span-7"><Placeholder id={c.placeholder} className="aspect-[4/3] rounded-2xl" label={c.note} /></Reveal>
              <div className="lg:col-span-5">
                <Reveal><p className="font-serif text-[64px] leading-none text-gold/70">{c.num}</p></Reveal>
                <Reveal delay={0.1}><h2 className="t-h2 mt-4">{c.title}</h2></Reveal>
                <Reveal delay={0.2}><p className="t-lead mt-6">{c.body}</p></Reveal>
                <Reveal delay={0.25}><span className="mt-8 block h-px w-10 bg-gold" /></Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="bg-cream">
        <div className="container-w py-24 sm:py-32">
          <SectionHead eyebrow="REGIONS" title={dict.ui.sections.originRegions} />
          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {s.regions.map((r, i) => (
              <Item key={r.name}>
                <Placeholder id={REGION_IMG[i]} className="aspect-[4/5] rounded-2xl" />
                <h3 className="t-h4 mt-5">{r.name}</h3>
                <p className="t-body mt-2">{r.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">{r.crops.map((x) => <span key={x} className="rounded-full border border-stone bg-paper px-2.5 py-0.5 text-[11px] text-ink-3">{x}</span>)}</div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Türkiye */}
      <section className="bg-paper">
        <div className="container-x grid items-center gap-10 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="SECOND ORIGIN" title={s.turkiye.title} body={s.turkiye.body} align="left" />
            <Reveal delay={0.2}><Link href={withLocale(locale, '/material-lab')} className="link-ul mt-8">{dict.common.viewMaterial}</Link></Reveal>
          </div>
          <Reveal className="lg:col-span-7"><Placeholder id={s.turkiye.placeholder} className="aspect-[16/10] rounded-2xl" /></Reveal>
        </div>
        <div className="container-x pb-12"><p className="t-small">{s.disclaimer}</p></div>
      </section>
    </>
  );
}
