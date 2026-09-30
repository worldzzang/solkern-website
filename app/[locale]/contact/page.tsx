import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { Placeholder, Reveal } from '@/components/ui';
import { usePage } from '@/lib/page';

/* CONTACT — 크림 히어로(텍스트) + 밑줄형 폼 + 연락처·오피스 */
export default function ContactPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.contact;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} tone="light" />
      <section className="bg-paper">
        <div className="container-x grid gap-16 py-20 sm:py-28 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7"><Suspense><ContactForm locale={locale} dict={dict} /></Suspense></div>
          <div className="lg:col-span-5">
            <Reveal>
              <div className="divide-y divide-stone border-y border-stone">
                {s.info.map((i) => (
                  <div key={i.label} className="grid grid-cols-[72px_1fr] items-baseline gap-4 py-4"><span className="text-[10px] font-medium tracking-[0.25em] text-gold">{i.label}</span><a href={i.href} className="text-[16px] font-medium hover:text-gold">{i.value}</a></div>
                ))}
                <div className="grid grid-cols-[72px_1fr] gap-4 py-4"><span className="text-[10px] font-medium tracking-[0.25em] text-gold">{s.officeTitle}</span><p className="t-body">{s.address}</p></div>
              </div>
            </Reveal>
            <Reveal delay={0.15}><Placeholder id="CONTACT-OFFICE" className="mt-8 aspect-[4/3] rounded-2xl" /></Reveal>
            <Reveal delay={0.2}><p className="t-small mt-6">Mon – Fri · 09:00 – 18:00 (KST)</p></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
