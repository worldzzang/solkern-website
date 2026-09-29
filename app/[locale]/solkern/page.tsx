import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { Item, Placeholder, Reveal, SectionHead, Stagger } from '@/components/ui';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

export default function SolkernPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.solkern;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} image="/images/bg/press-olma.webp" />

      <section className="bg-ivory">
        <div className="container-x py-20 sm:py-28">
          <Reveal><img src="/images/logo/solkern-stacked-gold.png" alt="SOLKERN" className="mx-auto mb-10 w-40 sm:w-52" /></Reveal>
          <Reveal><p className="display mx-auto max-w-4xl text-center text-2xl leading-snug sm:text-3xl lg:text-4xl">{s.statement}</p></Reveal>
          <Reveal delay={0.1}><p className="mt-6 text-center font-serif text-2xl italic text-gold">Quality Without Borders</p></Reveal>
          <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
            {s.identity.map((it, i) => (
              <Item key={it.title}>
                <div className="card h-full p-7">
                  <p className="font-serif text-5xl text-gold">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="mt-4 text-lg font-bold">{it.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-3">{it.body}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-ink text-white">
        <div className="container-x py-20 sm:py-28">
          <SectionHead eyebrow="BUSINESS" title={dict.ui.sections.solkernBusiness} dark />
          <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {s.business.map((b) => (
              <Item key={b.title}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-7 transition hover:border-gold/50">
                  <h3 className="display text-3xl">{b.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{b.desc}</p>
                  <ul className="mt-6 space-y-2">{b.items.map((x) => <li key={x} className="flex gap-2 text-sm text-white/85"><span className="text-gold">✦</span>{x}</li>)}</ul>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-ivory-2">
        <div className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="PARTNERS" title={dict.ui.sections.solkernPartners} />
            <Reveal delay={0.2}><Placeholder id="ABOUT-TEAM" className="mt-10 aspect-[4/3] rounded-3xl" /></Reveal>
          </div>
          <Stagger className="space-y-4 lg:col-span-7">
            {s.partners.map((p, i) => (
              <Item key={p.name}>
                <div className="card flex gap-5 p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-serif text-xl text-gold">{i + 1}</div>
                  <div>
                    <p className="eyebrow">{p.role}</p>
                    <h3 className="mt-1 text-lg font-bold">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-3">{p.desc}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-pome-deep text-white">
        {/* 창립자 사진 — 얼굴이 잘리지 않도록 상단 기준 정렬, 좌측·하단은 배경색으로 자연스럽게 페이드 */}
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-[38%] lg:block" style={{ WebkitMaskImage: 'linear-gradient(to bottom, #000 72%, transparent)', maskImage: 'linear-gradient(to bottom, #000 72%, transparent)' }}>
          <img src="/images/bg/founder.webp" alt="" className="h-full w-full object-cover object-[50%_4%] opacity-50" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, #000 35%)', maskImage: 'linear-gradient(to right, transparent, #000 35%)' }} />
        </div>
        <div className="container-x relative py-20 sm:py-28">
          <Reveal><p className="font-serif text-6xl text-gold">“</p></Reveal>
          <Reveal delay={0.1}><p className="display max-w-3xl text-2xl leading-snug sm:text-3xl">{s.founderQuote.quote}</p></Reveal>
          <Reveal delay={0.2}><p className="mt-6 text-sm tracking-wider text-gold-light">— {s.founderQuote.who}</p></Reveal>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHead eyebrow="COMPANY INFO" title={dict.ui.sections.companyInfo} /><Reveal delay={0.2}><Placeholder id="ABOUT-OFFICE" className="mt-8 aspect-video rounded-2xl" /></Reveal></div>
          <div className="lg:col-span-7">
            <Reveal>
              <dl className="divide-y divide-black/10 border-y border-black/10">
                {s.info.map((r) => (
                  <div key={r.label} className="grid grid-cols-3 gap-4 py-4 text-sm"><dt className="font-semibold text-ink-3">{r.label}</dt><dd className="col-span-2">{r.value}</dd></div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.2}><Link href={withLocale(locale, '/contact')} className="btn-dark mt-8">{dict.common.contact} →</Link></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
