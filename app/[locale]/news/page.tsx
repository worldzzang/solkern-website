import PageHero from '@/components/PageHero';
import { Item, Placeholder, Stagger } from '@/components/ui';
import { usePage } from '@/lib/page';
import { news } from '@/lib/store';
import type { NewsItem } from '@/content/types';

export const dynamic = 'force-dynamic';

export default async function NewsPage({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const s = dict.news;
  const dynamicPosts = (await news.list().catch(() => [])).filter((p) => p.published && (p.locale === 'both' || p.locale === locale));
  const items: NewsItem[] = [
    ...dynamicPosts.map((p) => ({ id: p.id, date: p.date.replace(/-/g, '.').slice(0, 7), category: p.category, title: p.title, summary: p.summary, body: p.body, placeholder: 'NEWS-OFFICE' })),
    ...s.items,
  ];
  return (
    <>
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} image="/images/bg/mixnuts.webp" />
      <section className="bg-ivory">
        <div className="container-x py-20 sm:py-28">
          {items.length === 0 && <p className="text-ink-3">{s.empty}</p>}
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <Item key={n.id}>
                <article className="card group h-full overflow-hidden">
                  {n.image ? <img src={n.image} alt="" className="aspect-[16/10] w-full object-cover" /> : <Placeholder id={n.placeholder || 'NEWS-OFFICE'} className="aspect-[16/10]" />}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] tracking-widest"><span className="rounded bg-ink px-2 py-0.5 text-gold-light">{n.category}</span><span className="text-ink-3">{n.date}</span></div>
                    <h3 className="mt-3 text-lg font-bold leading-snug group-hover:text-gold-dark">{n.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-3">{n.summary}</p>
                    {n.body && <details className="mt-3 text-sm"><summary className="cursor-pointer text-gold-dark">{dict.common.readMore}</summary><p className="mt-2 whitespace-pre-wrap text-ink-3">{n.body}</p></details>}
                  </div>
                </article>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
