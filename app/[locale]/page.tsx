import { getDict, isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import Hero from '@/components/home/Hero';
import Journey from '@/components/home/Journey';
import { Land, Fruit, Collection, Featured, SecondLife, MaterialValue, Market, Trust, ContactCta } from '@/components/home/Sections';

export default function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale; const dict = getDict(locale);
  return (
    <>
      <Hero locale={locale} dict={dict} />
      <Journey dict={dict} />
      <Land locale={locale} dict={dict} />
      <Fruit locale={locale} dict={dict} />
      <Collection locale={locale} dict={dict} />
      <Featured locale={locale} dict={dict} />
      <SecondLife locale={locale} dict={dict} />
      <MaterialValue locale={locale} dict={dict} />
      <Market locale={locale} dict={dict} />
      <Trust locale={locale} dict={dict} />
      <ContactCta locale={locale} dict={dict} />
    </>
  );
}
