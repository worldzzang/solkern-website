import { getDict, isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import Hero from '@/components/home/Hero';
import { Statement, Way, Land, Regions, Fruit, Collection, Featured, SecondLife, Market, Trust, Timeline, People, Daily, ContactCta } from '@/components/home/Sections';

/* 홈(v3) — 오설록 브랜드스토리 흐름을 SOLKERN 서사로 번역
   TEA FROM JEJU(히어로) → 특별함 4패널(THE SOLKERN WAY) → 자연환경 요소 탭(THE LAND) → 차밭 탭(REGIONS)
   → 원물·제품 → Second Life·소재 → 시장·신뢰 → Since 슬라이더 → 사람 → 다다일상(DAILY) → 더 많은 이야기·문의 */
export default function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale; const dict = getDict(locale);
  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Statement dict={dict} />
      <Way locale={locale} dict={dict} />
      <Land locale={locale} dict={dict} />
      <Regions locale={locale} dict={dict} />
      <Fruit locale={locale} dict={dict} />
      <Collection locale={locale} dict={dict} />
      <Featured locale={locale} dict={dict} />
      <SecondLife locale={locale} dict={dict} />
      <Market locale={locale} dict={dict} />
      <Trust locale={locale} dict={dict} />
      <Timeline dict={dict} />
      <People dict={dict} />
      <Daily dict={dict} />
      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
