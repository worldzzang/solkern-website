import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Item, Reveal, SectionHead, Stagger } from '@/components/ui';
import TerritoryMapLazy from '@/components/TerritoryMapLazy';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

/* B2B — 오설록 "기업 구매" 톤: 서비스 4 → 판권 지도·표 → 4단계 프로세스 → 서류 → FAQ → CTA */
export default function B2BPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.b2b;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} image="/images/bg/seeds-orange.webp" />

      <section className="bg-paper">
        <div className="container-x py-24 sm:py-32">
          <SectionHead eyebrow="SERVICES" title={dict.ui.sections.b2bServices} />
          <Stagger className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2">
            {s.services.map((sv, i) => (
              <Item key={sv.id}>
                <div className="border-t border-ink pt-6">
                  <p className="font-serif text-[13px] tracking-[0.3em] text-gold">0{i + 1}</p>
                  <h3 className="t-h3 mt-3">{sv.title}</h3>
                  <p className="t-small mt-2">{sv.desc}</p>
                  <ul className="mt-5 grid gap-1.5 sm:grid-cols-2">{sv.bullets.map((b) => <li key={b} className="flex gap-2 text-[14px] text-ink-2"><span className="text-gold">·</span>{b}</li>)}</ul>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="territory" className="bg-cream">
        <div className="container-x py-24 sm:py-32">
          <SectionHead eyebrow={dict.territory.eyebrow} title={dict.territory.title} body={dict.territory.body} />
          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-8"><div className="rounded-[4px] bg-paper p-4 sm:p-8"><TerritoryMapLazy t={dict.territory} hideList /></div></Reveal>
            <Reveal delay={0.15} className="lg:col-span-4">
              <div className="overflow-hidden rounded-[4px] border border-stone bg-paper">
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-stone text-left text-[10px] tracking-[0.2em] text-ink-3"><th className="px-4 py-3 font-medium">{dict.ui.table.region}</th><th className="px-4 py-3 font-medium">{dict.ui.table.country}</th><th className="px-4 py-3 font-medium">{dict.ui.table.city}</th></tr></thead>
                  <tbody>
                    {dict.territory.regions.flatMap((r) => r.countries.map((c, i) => (
                      <tr key={c.code} className="border-t border-stone/60">
                        {i === 0 && <td rowSpan={r.countries.length} className="bg-cream px-4 py-2 align-top text-[11px] font-medium text-gold-dark">{r.name}</td>}
                        <td className="px-4 py-2 font-medium">{c.name}</td>
                        <td className="px-4 py-2 text-[12px] text-ink-3">{c.city}</td>
                      </tr>
                    )))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
          <p className="t-small mt-8">{dict.territory.note}</p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-24 sm:py-32">
          <SectionHead eyebrow="PROCESS" title={dict.ui.sections.b2bProcess} />
          <Stagger className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-stone">
            {s.steps.map((st) => (
              <Item key={st.step} className="lg:px-8"><p className="font-serif text-[36px] leading-none text-gold">{st.step}</p><h3 className="t-h4 mt-4">{st.title}</h3><p className="t-body mt-2">{st.desc}</p></Item>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <div className="mt-20 border-t border-stone pt-8">
              <p className="eyebrow">DOCUMENTS</p>
              <div className="mt-4 flex flex-wrap gap-2">{s.docs.map((d) => <span key={d} className="rounded-full border border-stone px-3 py-1 text-[12px] text-ink-2">{d}</span>)}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream">
        <div className="container-n py-24 sm:py-32">
          <SectionHead eyebrow="FAQ" title={dict.ui.sections.b2bFaq} />
          <div className="mt-12 divide-y divide-stone border-y border-stone">
            {s.faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-medium"><span>{f.q}</span><span className="font-serif text-xl text-gold transition group-open:rotate-45">+</span></summary>
                <p className="t-body mt-3">{f.a}</p>
              </details>
            ))}
          </div>
          <Reveal><div className="mt-16 text-center"><h2 className="t-h3">{s.cta.title}</h2><Link href={withLocale(locale, '/contact')} className="btn-dark mt-7">{s.cta.button}</Link></div></Reveal>
        </div>
      </section>
    </>
  );
}
