import PageHero from '@/components/PageHero';
import { Item, Placeholder, Stagger } from '@/components/ui';
import { usePage } from '@/lib/page';
import { news } from '@/lib/store';
import type { NewsItem } from '@/content/types';

export const dynamic = 'force-dynamic';

/* NEWS·공지 — 관리자에서 등록한 소식(Blob) + 기본 3건. 오설록 매거진 목록 톤 */
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
      <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} body={s.hero.body} tone="light" />
      <section className="bg-paper">
        <div className="container-w pb-24 sm:pb-32">
          {items.length === 0 && <p className="t-body">{s.empty}</p>}
          <Stagger className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((n) => (
              <Item key={n.id}>
                <article className="group h-full">
                  {n.image ? <div className="relative aspect-[16/10] overflow-hidden rounded-[4px]"><img src={n.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-[1.4s] group-hover:scale-105" /></div> : <Placeholder id={n.placeholder || 'NEWS-OFFICE'} className="aspect-[16/10] rounded-[4px]" imgClass="transition duration-[1.4s] group-hover:scale-105" />}
                  <div className="pt-5">
                    <p className="text-[11px] tracking-[0.25em] text-gold">{n.category} <span className="mx-2 text-stone">|</span> <span className="text-ink-3">{n.date}</span></p>
                    <h3 className="t-h4 mt-3 group-hover:text-gold-dark">{n.title}</h3>
                    <p className="t-body mt-2">{n.summary}</p>
                    {n.body && <details className="mt-3 text-sm"><summary className="link-ul cursor-pointer !text-[11px]">{dict.common.readMore}</summary><p className="t-body mt-3 whitespace-pre-wrap">{n.body}</p></details>}
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
