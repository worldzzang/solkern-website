import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Item, Placeholder, Reveal, SectionHead, Stagger } from '@/components/ui';
import { People as Founder } from '@/components/home/Sections';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

/* SOLKERN — 오설록 "브랜드 스토리" 톤: 문장 중심, 여백, 3단 정체성 → 비즈니스 → 3사 협력 → 창립자 어록 → 회사 정보 */
export default function SolkernPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.solkern;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} image="/images/bg/press-olma.webp" imgPos="center 40%" />

      {/* Statement */}
      <section className="bg-paper">
        <div className="container-x py-24 text-center sm:py-32">
          <Reveal><img src="/images/logo/solkern-stacked-gold.png" alt="SOLKERN" className="mx-auto w-32 sm:w-40" /></Reveal>
          <Reveal delay={0.1}><p className="t-h3 mx-auto mt-12 max-w-3xl font-normal leading-[1.6]">{s.statement}</p></Reveal>
          <Reveal delay={0.2}><p className="t-serif-it mt-8 text-[22px] text-gold">Quality Without Borders</p></Reveal>
          <Stagger className="mt-20 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-stone">
            {s.identity.map((it, i) => (
              <Item key={it.title} className="md:px-10">
                <p className="font-serif text-[36px] leading-none text-gold">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="t-h4 mt-5">{it.title}</h3>
                <p className="t-body mt-3">{it.body}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Business */}
      <section className="bg-cream">
        <div className="container-x py-24 sm:py-32">
          <SectionHead eyebrow="BUSINESS" title={dict.ui.sections.solkernBusiness} />
          <Stagger className="mt-16 grid gap-6 lg:grid-cols-3">
            {s.business.map((b, i) => (
              <Item key={b.title}>
                <div className="h-full rounded-2xl bg-paper p-8 sm:p-10">
                  <p className="font-serif text-[13px] tracking-[0.3em] text-gold">0{i + 1}</p>
                  <h3 className="t-h3 mt-4">{b.title}</h3>
                  <p className="t-small mt-2">{b.desc}</p>
                  <ul className="mt-6 divide-y divide-stone border-t border-stone">{b.items.map((x) => <li key={x} className="py-2.5 text-[14px] text-ink-2">{x}</li>)}</ul>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Partners */}
      <section className="bg-paper">
        <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="PARTNERS" title={dict.ui.sections.solkernPartners} align="left" />
            <Reveal delay={0.2}><Placeholder id="ABOUT-TEAM" className="mt-10 aspect-[4/3] rounded-2xl" /></Reveal>
          </div>
          <Stagger className="divide-y divide-stone border-y border-stone lg:col-span-7">
            {s.partners.map((p, i) => (
              <Item key={p.name}>
                <div className="grid gap-3 py-7 sm:grid-cols-[64px_1fr]">
                  <span className="font-serif text-[28px] leading-none text-gold">0{i + 1}</span>
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.25em] text-ink-3">{p.role}</p>
                    <h3 className="t-h4 mt-1.5">{p.name}</h3>
                    <p className="t-body mt-2">{p.desc}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Founder dict={dict} />

      {/* Company info */}
      <section className="bg-cream">
        <div className="container-x grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="COMPANY INFO" title={dict.ui.sections.companyInfo} align="left" />
            <Reveal delay={0.2}><Placeholder id="PEOPLE-CEO" className="mt-10 aspect-[3/4] max-w-sm rounded-2xl" /></Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <dl className="divide-y divide-stone border-y border-stone">
                {s.info.map((r) => (
                  <div key={r.label} className="grid grid-cols-3 gap-4 py-4 text-[15px]"><dt className="text-[11px] font-medium tracking-[0.2em] text-ink-3 pt-1">{r.label}</dt><dd className="col-span-2">{r.value}</dd></div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.15}><Placeholder id="ABOUT-OFFICE" className="mt-10 aspect-[16/9] rounded-2xl" /></Reveal>
            <Reveal delay={0.2}><Link href={withLocale(locale, '/contact')} className="link-ul mt-10">{dict.common.contact}</Link></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
