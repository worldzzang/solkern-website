import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ProductExplorer from '@/components/ProductExplorer';
import { Fact, Item, Reveal, SectionHead, Stagger, Visual } from '@/components/ui';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

/* ERMÁK — 브랜드 스토리(숫자) → 신제품 밴드 → 제품 탐색 → 한국 런칭 로드맵 → 카탈로그 CTA */
export default function ErmakPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.ermak;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} image="/images/bg/trio-dark.webp" />

      <section className="bg-paper">
        <div className="container-x py-24 sm:py-32">
          <SectionHead eyebrow="BRAND STORY" title={s.brandStory.title} body={s.brandStory.body} />
          <Stagger className="mt-16 grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:divide-x sm:divide-stone">
            {s.brandStory.facts.map((f) => <Item key={f.label} className="px-4"><Fact value={f.value} label={f.label} /></Item>)}
          </Stagger>
        </div>
      </section>

      {/* New products band */}
      <section className="relative overflow-hidden bg-ink text-white">
        <img src="/images/bg/snack-lineup.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-end pb-20 pt-40 text-center">
          <Reveal><span className="rounded-full border border-white/70 px-3 py-1 text-[11px] tracking-[0.25em] text-white">{s.newProducts.badge}</span></Reveal>
          <Reveal delay={0.1}><h2 className="t-h2 mt-6 max-w-3xl">{s.newProducts.title}</h2></Reveal>
          <Reveal delay={0.2}><p className="t-lead mx-auto mt-6 max-w-2xl text-white/85">{s.newProducts.body}</p></Reveal>
          <Reveal delay={0.3}><a href="#products" className="link-ul-light mt-9">{s.newProducts.cta}</a></Reveal>
        </div>
      </section>

      <section id="products" className="bg-paper">
        <div className="container-w py-24 sm:py-32">
          <SectionHead eyebrow="PRODUCTS" title={s.categoriesTitle} />
          <div className="mt-14"><ProductExplorer categories={s.categories} note={dict.ui.productNote} /></div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-5"><Visual image="/images/bg/seeds-orange.webp" className="aspect-[4/3] rounded-[4px] lg:aspect-[4/5]" /></Reveal>
          <div className="lg:col-span-7">
            <SectionHead eyebrow="KOREA" title={s.korea.title} body={s.korea.body} align="left" />
            <Stagger className="mt-10 divide-y divide-stone border-y border-stone">
              {s.korea.phases.map((p) => (
                <Item key={p.phase}>
                  <div className="grid gap-2 py-6 sm:grid-cols-[120px_1fr]">
                    <span className="font-serif text-[15px] tracking-[0.15em] text-gold">{p.phase}</span>
                    <div><p className="text-[16px] font-medium">{p.items}</p><p className="t-small mt-1">{p.channel}</p></div>
                  </div>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-24 text-center sm:py-28">
          <Reveal><h2 className="t-h2">{s.cta.title}</h2></Reveal>
          <Reveal delay={0.1}><p className="t-lead mx-auto mt-5 max-w-xl">{s.cta.body}</p></Reveal>
          <Reveal delay={0.2}><Link href={withLocale(locale, '/contact?type=catalog')} className="btn-dark mt-9">{s.cta.button}</Link></Reveal>
        </div>
      </section>
    </>
  );
}
