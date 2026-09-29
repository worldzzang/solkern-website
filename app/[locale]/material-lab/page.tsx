import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Item, Placeholder, Reveal, SectionHead, Stagger } from '@/components/ui';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

export default function MaterialLabPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.materialLab;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} placeholder="SECOND-BYPRODUCT" />
      <section className="bg-ivory">
        <div className="container-x py-20 sm:py-28">
          <Reveal><p className="eyebrow">THESIS</p></Reveal>
          <Reveal delay={0.1}><h2 className="h2 mt-4 max-w-4xl">{s.thesis.title}</h2></Reveal>
          <Reveal delay={0.2}><p className="lead mt-6 max-w-3xl">{s.thesis.body}</p></Reveal>
        </div>
      </section>
      <section className="bg-ivory-2">
        <div className="container-x space-y-10 py-20 sm:py-28">
          <SectionHead eyebrow="TRACKS" title={dict.ui.sections.labTracks} />
          {s.tracks.map((t, i) => (
            <div key={t.id} className={`grid items-center gap-8 lg:grid-cols-12 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Reveal className="lg:col-span-6"><Placeholder id={t.placeholder} className="aspect-[4/3] rounded-3xl" /></Reveal>
              <div className="lg:col-span-6">
                <Reveal><p className="eyebrow">{t.en}</p></Reveal>
                <Reveal delay={0.1}><h3 className="display mt-2 text-4xl">{t.title}</h3></Reveal>
                <Reveal delay={0.2}><p className="lead mt-4">{t.body}</p></Reveal>
                <Reveal delay={0.3}>
                  <ul className="mt-5 flex flex-wrap gap-2">{t.materials.map((m) => <li key={m} className="rounded-full bg-white px-3 py-1 text-xs">{m}</li>)}</ul>
                  <p className="mt-4 text-xs font-semibold tracking-wider text-gold-dark">● {t.stage}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-ink text-white">
        <div className="container-x py-20 sm:py-28">
          <SectionHead eyebrow="PROCESS" title={dict.ui.sections.labProcess} dark />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {s.process.map((p) => (
              <Item key={p.step}><div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5"><p className="font-serif text-4xl text-gold">{p.step}</p><h3 className="mt-3 font-bold">{p.title}</h3><p className="mt-2 text-xs leading-relaxed text-white/60">{p.desc}</p></div></Item>
            ))}
          </Stagger>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-3">
            {s.principles.map((p) => (
              <Item key={p.title}><div className="border-l-2 border-gold pl-4"><h3 className="font-bold">{p.title}</h3><p className="mt-1 text-sm text-white/65">{p.desc}</p></div></Item>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="bg-pome-deep text-white">
        <div className="container-x flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="h2">{s.cta.title}</h2><p className="mt-2 text-white/80">{s.cta.body}</p></div>
          <Link href={withLocale(locale, '/contact?type=material')} className="btn-gold">{s.cta.button} →</Link>
        </div>
      </section>
    </>
  );
}
