import Link from 'next/link';
import PageHero from '@/components/PageHero';
import ProductExplorer from '@/components/ProductExplorer';
import { Counter, Item, Reveal, SectionHead, Stagger } from '@/components/ui';
import { usePage } from '@/lib/page';
import { withLocale } from '@/lib/i18n';

export default function ErmakPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.ermak;
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} image="/images/bg/trio-dark.webp" />
      <section className="bg-ivory">
        <div className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <SectionHead eyebrow="BRAND STORY" title={s.brandStory.title} body={s.brandStory.body} />
          </div>
          <Stagger className="grid grid-cols-2 gap-6 lg:col-span-6">
            {s.brandStory.facts.map((f) => (
              <Item key={f.label}><div className="card p-6"><p className="display text-5xl text-gold"><Counter value={f.value} /></p><p className="mt-2 text-xs text-ink-3">{f.label}</p></div></Item>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="bg-ivory-2">
        <div className="container-x py-20 sm:py-28">
          <SectionHead eyebrow="PRODUCTS" title={s.categoriesTitle} />
          <div className="mt-10"><ProductExplorer categories={s.categories} locale={locale} /></div>
        </div>
      </section>
      <section className="bg-ink text-white">
        <div className="container-x py-20 sm:py-28">
          <SectionHead eyebrow="KOREA" title={s.korea.title} body={s.korea.body} dark />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {s.korea.phases.map((p) => (
              <Item key={p.phase}><div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6"><p className="eyebrow">{p.phase}</p><p className="mt-3 text-lg font-bold">{p.items}</p><p className="mt-2 text-sm text-white/60">{p.channel}</p></div></Item>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="bg-gold text-white">
        <div className="container-x flex flex-col items-start gap-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="h2">{s.cta.title}</h2><p className="mt-2 text-white/85">{s.cta.body}</p></div>
          <Link href={withLocale(locale, '/contact?type=catalog')} className="btn bg-ink text-white hover:bg-ink-3">{s.cta.button} →</Link>
        </div>
      </section>
    </>
  );
}
