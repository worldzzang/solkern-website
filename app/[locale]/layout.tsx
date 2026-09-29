import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getDict, isLocale, LOCALES } from '@/lib/i18n';

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const d = getDict(params.locale);
  return {
    title: d.meta.title, description: d.meta.description,
    alternates: { canonical: `/${params.locale}`, languages: { ko: '/ko', en: '/en' } },
    openGraph: { title: d.meta.title, description: d.meta.description, images: ['/images/bg/cover.webp'], locale: params.locale === 'ko' ? 'ko_KR' : 'en_US', siteName: 'SOLKERN' },
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDict(params.locale);
  return (
    <>
      <Header locale={params.locale} dict={dict} dark />
      <main>{children}</main>
      <Footer locale={params.locale} dict={dict} />
    </>
  );
}
