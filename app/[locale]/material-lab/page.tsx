import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Item, Placeholder, Reveal, SectionHead, Stagger } from '@/components/ui';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

/* MATERIAL LAB — 오설록 "연구 기술" 챕터 톤: 테제 → 3트랙(사진·텍스트 교차) → 5단계 프로세스 → 원칙 → CTA */
export default function MaterialLabPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.materialLab;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} image="/images/photo/pomegranates.webp" imgPos="center 70%" />

      <section className="bg-paper">
        <div className="container-x py-24 text-center sm:py-32">
          <Reveal><p className="eyebrow">THESIS</p></Reveal>
          <Reveal delay={0.1}><h2 className="t-h2 mx-auto mt-6 max-w-3xl">{s.thesis.title}</h2></Reveal>
          <Reveal delay={0.2}><p className="t-lead mx-auto mt-6 max-w-2xl">{s.thesis.body}</p></Reveal>
          <Reveal delay={0.25}><span className="mx-auto mt-10 block h-px w-10 bg-gold" /></Reveal>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-x space-y-28 py-24 sm:py-32">
          <SectionHead eyebrow="TRACKS" title={dict.ui.sections.labTracks} />
          {s.tracks.map((t, i) => (
            <div key={t.id} className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal className="lg:col-span-6"><Placeholder id={t.placeholder} className="aspect-[4/3] rounded-2xl" /></Reveal>
              <div className="lg:col-span-6">
                <Reveal><p className="eyebrow">{t.en}</p></Reveal>
                <Reveal delay={0.1}><h3 className="t-h2 mt-4">{t.title}</h3></Reveal>
                <Reveal delay={0.2}><p className="t-lead mt-5">{t.body}</p></Reveal>
                <Reveal delay={0.3}>
                  <ul className="mt-6 flex flex-wrap gap-2">{t.materials.map((m) => <li key={m} className="rounded-full bg-paper px-3 py-1 text-[12px] text-ink-2">{m}</li>)}</ul>
                  <p className="mt-5 text-[12px] font-medium tracking-[0.12em] text-gold-dark">● {t.stage}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-24 sm:py-32">
          <SectionHead eyebrow="PROCESS" title={dict.ui.sections.labProcess} />
          <Stagger className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-stone">
            {s.process.map((p) => (
              <Item key={p.step} className="lg:px-6"><p className="font-serif text-[36px] leading-none text-gold">{p.step}</p><h3 className="t-h4 mt-4">{p.title}</h3><p className="t-body mt-2">{p.desc}</p></Item>
            ))}
          </Stagger>
          <Stagger className="mt-20 grid gap-8 border-t border-stone pt-12 md:grid-cols-3">
            {s.principles.map((p) => (
              <Item key={p.title}><div className="border-l border-gold pl-5"><h3 className="text-[16px] font-medium">{p.title}</h3><p className="t-body mt-1.5">{p.desc}</p></div></Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-forest text-white">
        <div className="container-x py-24 text-center sm:py-28">
          <Reveal><h2 className="t-h2">{s.cta.title}</h2></Reveal>
          <Reveal delay={0.1}><p className="t-lead mx-auto mt-5 max-w-xl text-white/75">{s.cta.body}</p></Reveal>
          <Reveal delay={0.2}><Link href={withLocale(locale, '/contact?type=material')} className="btn bg-white text-ink hover:bg-gold hover:text-white mt-9">{s.cta.button}</Link></Reveal>
        </div>
      </section>
    </>
  );
}
