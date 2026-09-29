import { Suspense } from 'react';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import { Placeholder, Reveal } from '@/components/ui';
import { usePage } from '@/lib/page';

export default function ContactPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.contact;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} placeholder="CONTACT-OFFICE" />
      <section className="bg-ivory">
        <div className="container-x grid gap-10 py-20 sm:py-28 lg:grid-cols-12">
          <div className="lg:col-span-7"><Suspense><ContactForm locale={locale} dict={dict} /></Suspense></div>
          <div className="space-y-8 lg:col-span-5">
            <Reveal>
              <div className="card p-7">
                {s.info.map((i) => (
                  <div key={i.label} className="flex items-baseline gap-4 border-b border-black/5 py-3 last:border-0"><span className="w-16 text-[10px] font-bold tracking-widest text-gold">{i.label}</span><a href={i.href} className="font-semibold hover:text-gold">{i.value}</a></div>
                ))}
                <div className="mt-4"><p className="text-[10px] font-bold tracking-widest text-gold">{s.officeTitle}</p><p className="mt-1 text-sm text-ink-3">{s.address}</p></div>
              </div>
            </Reveal>
            <Reveal delay={0.15}><Placeholder id="ABOUT-OFFICE" className="aspect-[4/3] rounded-2xl" /></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
