import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HtmlLang from '@/components/HtmlLang';
import { getDict, isLocale, LOCALES, LOCALE_LABELS } from '@/lib/i18n';
import type { Locale } from '@/content/types';

export function generateStaticParams() { return LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const d = getDict(params.locale);
  return {
    title: d.meta.title, description: d.meta.description,
    alternates: { canonical: `/${params.locale}`, languages: { ko: '/ko', en: '/en', ja: '/ja', 'zh-Hans': '/zh', uz: '/uz', tr: '/tr' } },
    openGraph: { title: d.meta.title, description: d.meta.description, images: [{ url: '/images/og-solkern-v3.jpg', width: 1200, height: 630, alt: 'SOLKERN — From Origin to New Value' }], locale: LOCALE_LABELS[params.locale as Locale]?.og ?? 'ko_KR', siteName: 'SOLKERN' },
    twitter: { card: 'summary_large_image', title: d.meta.title, description: d.meta.description, images: ['/images/og-solkern-v3.jpg'] },
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const dict = getDict(params.locale);
  return (
    <div lang={LOCALE_LABELS[params.locale].html}>
      <HtmlLang lang={LOCALE_LABELS[params.locale].html} />
      <Header locale={params.locale} dict={dict} dark />
      <main>{children}</main>
      <Footer locale={params.locale} dict={dict} />
    </div>
  );
}
