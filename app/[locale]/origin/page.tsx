import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Item, Marquee, ParallaxImg, Placeholder, Reveal, SectionHead, Stagger } from '@/components/ui';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

export default function OriginPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.origin;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} placeholder="ORIGIN-SUN" />
      <Marquee items={locale === 'ko' ? ['햇빛', '토양', '기후', '과수 문화', '우즈베키스탄', '튀르키예', '석류', '살구', '체리', '견과'] : ['Sun', 'Soil', 'Climate', 'Orchard culture', 'Uzbekistan', 'Türkiye', 'Pomegranate', 'Apricot', 'Cherry', 'Nuts']} />

      {/* Chapters */}
      <section className="bg-ivory">
        <div className="container-x space-y-24 py-20 sm:py-28">
          {s.chapters.map((c, i) => (
            <div key={c.num} className={`grid items-center gap-10 lg:grid-cols-12 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal className="lg:col-span-7"><Placeholder id={c.placeholder} className="aspect-[4/3] rounded-3xl" label={c.note} /></Reveal>
              <div className="lg:col-span-5">
                <Reveal><p className="font-serif text-7xl text-gold/60">{c.num}</p></Reveal>
                <Reveal delay={0.1}><h2 className="h2 mt-2">{c.title}</h2></Reveal>
                <Reveal delay={0.2}><p className="lead mt-5">{c.body}</p></Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Regions */}
      <section className="relative overflow-hidden bg-ink text-white">
        <ParallaxImg src="/images/bg/apple-press.webp" className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        <div className="container-x relative py-20 sm:py-28">
          <SectionHead eyebrow="REGIONS" title={locale === 'ko' ? '원물이 자라는 곳' : 'Where the ingredients grow'} dark />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {s.regions.map((r) => (
              <Item key={r.name}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-gold/60">
                  <h3 className="display text-2xl">{r.name}</h3>
                  <p className="mt-3 text-sm text-white/65">{r.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">{r.crops.map((x) => <span key={x} className="rounded-full bg-gold/20 px-2.5 py-0.5 text-[11px] text-gold-light">{x}</span>)}</div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Türkiye */}
      <section className="bg-ivory-2">
        <div className="container-x grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHead eyebrow="SECOND ORIGIN" title={s.turkiye.title} body={s.turkiye.body} /><Reveal delay={0.2}><Link href={withLocale(locale, '/material-lab')} className="btn-outline-dark mt-8">{dict.common.viewMaterial} →</Link></Reveal></div>
          <Reveal className="lg:col-span-7"><Placeholder id={s.turkiye.placeholder} className="aspect-[16/10] rounded-3xl" /></Reveal>
        </div>
        <div className="container-x pb-10"><p className="text-xs text-ink-3/70">{s.disclaimer}</p></div>
      </section>
    </>
  );
}
