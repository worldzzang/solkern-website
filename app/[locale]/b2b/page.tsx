import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Item, Reveal, SectionHead, Stagger } from '@/components/ui';
import TerritoryMapLazy from '@/components/TerritoryMapLazy';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

export default function B2BPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.b2b;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} image="/images/bg/seeds-orange.webp" />
      <section className="bg-ivory">
        <div className="container-x py-20 sm:py-28">
          <SectionHead eyebrow="SERVICES" title={locale === 'ko' ? '협력 방식' : 'How we work together'} />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2">
            {s.services.map((sv, i) => (
              <Item key={sv.id}>
                <div className="card h-full p-7">
                  <p className="font-serif text-4xl text-gold">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-3 text-xl font-bold">{sv.title}</h3>
                  <p className="mt-1 text-sm text-ink-3">{sv.desc}</p>
                  <ul className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2">{sv.bullets.map((b) => <li key={b} className="flex gap-2 text-sm"><span className="text-gold">✦</span>{b}</li>)}</ul>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
      <section id="territory" className="bg-ivory-2">
        <div className="container-x py-20 sm:py-28">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHead eyebrow={dict.territory.eyebrow} title={dict.territory.title} body={dict.territory.body} />
              <Reveal delay={0.2}>
                <div className="mt-8 overflow-hidden rounded-2xl border border-black/10 bg-white/70">
                  <table className="w-full text-sm">
                    <thead><tr className="bg-ink text-left text-[11px] tracking-wider text-gold-light"><th className="px-4 py-2.5">{locale === 'ko' ? '권역' : 'Region'}</th><th className="px-4 py-2.5">{locale === 'ko' ? '국가' : 'Country'}</th><th className="px-4 py-2.5">{locale === 'ko' ? '주요 도시' : 'Key city'}</th></tr></thead>
                    <tbody>
                      {dict.territory.regions.flatMap((r) => r.countries.map((c, i) => (
                        <tr key={c.code} className="border-t border-black/5">
                          {i === 0 && <td rowSpan={r.countries.length} className="bg-ivory px-4 py-2 align-top text-xs font-bold text-gold-dark">{r.name}</td>}
                          <td className="px-4 py-2 font-semibold">{c.name}</td>
                          <td className="px-4 py-2 text-xs text-ink-3">{c.city}</td>
                        </tr>
                      )))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-8"><TerritoryMapLazy t={dict.territory} hideList /></Reveal>
          </div>
          <p className="mt-8 text-xs leading-relaxed text-ink-3/80">{dict.territory.note}</p>
        </div>
      </section>
      <section className="bg-ink text-white">
        <div className="container-x py-20 sm:py-28">
          <SectionHead eyebrow="PROCESS" title={locale === 'ko' ? '문의부터 공급까지' : 'From inquiry to supply'} dark />
          <div className="relative mt-12 grid gap-6 md:grid-cols-4">
            {s.steps.map((st, i) => (
              <Reveal key={st.step} delay={i * 0.15}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold font-serif text-lg text-white">{st.step}</div>
                <h3 className="mt-4 font-bold">{st.title}</h3>
                <p className="mt-2 text-sm text-white/60">{st.desc}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="eyebrow">DOCUMENTS</p>
              <div className="mt-3 flex flex-wrap gap-2">{s.docs.map((d) => <span key={d} className="rounded-full border border-white/20 px-3 py-1 text-xs">{d}</span>)}</div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-ivory-2">
        <div className="container-x py-20 sm:py-28">
          <SectionHead eyebrow="FAQ" title={locale === 'ko' ? '자주 묻는 질문' : 'Frequently asked questions'} />
          <div className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {s.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer items-center justify-between font-semibold"><span>{f.q}</span><span className="text-gold transition group-open:rotate-45">+</span></summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-3">{f.a}</p>
              </details>
            ))}
          </div>
          <Reveal><div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"><h2 className="h2">{s.cta.title}</h2><Link href={withLocale(locale, '/contact')} className="btn-gold">{s.cta.button} →</Link></div></Reveal>
        </div>
      </section>
    </>
  );
}
