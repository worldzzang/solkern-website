import { getDict, isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import Hero from '@/components/home/Hero';
import Journey from '@/components/home/Journey';
import { Land, Regions, Fruit, Collection, Featured, SecondLife, MaterialValue, Market, Trust, Timeline, Founder, Daily, ContactCta, PhotoBand } from '@/components/home/Sections';

/* 홈 — 오설록 브랜드스토리 흐름: 산지 → 원물 → 제품 → Second Life → 시장 → 신뢰 → 연혁 → 사람 → 일상 → CTA */
export default function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale; const dict = getDict(locale);
  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Journey dict={dict} />
      <Land locale={locale} dict={dict} />
      <Regions locale={locale} dict={dict} />
      <Fruit locale={locale} dict={dict} />
      <Collection locale={locale} dict={dict} />
      <PhotoBand src="/images/bg/apple-press.webp" quote={dict.solkern.statement} />
      <Featured locale={locale} dict={dict} />
      <SecondLife locale={locale} dict={dict} />
      <MaterialValue locale={locale} dict={dict} />
      <Market locale={locale} dict={dict} />
      <Trust locale={locale} dict={dict} />
      <Timeline dict={dict} />
      <Founder dict={dict} />
      <Daily dict={dict} />
      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
