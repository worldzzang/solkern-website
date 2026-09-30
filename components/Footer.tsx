import Link from 'next/link';
import { Logo } from './ui';
import NoticeList from './NoticeList';
import type { Dict, Locale } from '@/content/types';
import { LOCALES, LOCALE_LABELS, withLocale } from '@/lib/i18n';

/* v3 푸터 — 오설록 푸터 구조: 고객센터 · 공지사항 · 메뉴/언어 → 법적 고지 · 회사 정보 (딥 포레스트 배경 + 화이트 로고) */
export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.footer;
  const notices = dict.news.items.map((n) => ({ id: n.id, date: n.date, category: n.category, title: n.title }));
  return (
    <footer className="bg-forest-deep text-white">
      <div className="container-w grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Logo light tagline />
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.32em] text-gold-light">{f.tagline}</p>
          <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-white/55">{dict.meta.description}</p>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow-dark !text-[10px]">Customer Center</p>
          <p className="mt-5 text-[26px] font-light tracking-tight"><a href={`tel:${f.tel.replace(/[^0-9+]/g, '')}`} className="hover:text-gold-light">{f.tel}</a></p>
          <p className="mt-1.5 text-[14px] text-white/80"><a href={`mailto:${f.email}`} className="hover:text-gold-light">{f.email}</a></p>
          <p className="mt-3 text-[12px] text-white/45">Mon – Fri · 09:00 – 18:00 (KST)</p>
          <Link href={withLocale(locale, '/contact')} className="link-ul-light mt-6">{dict.common.contact}</Link>
        </div>
        <div className="lg:col-span-3">
          <div className="flex items-baseline justify-between"><p className="eyebrow-dark !text-[10px]">Notice</p><Link href={withLocale(locale, '/news')} className="text-[11px] tracking-[0.14em] text-white/50 hover:text-gold-light">{dict.common.more} +</Link></div>
          <div className="mt-3"><NoticeList locale={locale} fallback={notices} href={withLocale(locale, '/news')} dark /></div>
        </div>
        <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-1">
          <div>
            <p className="eyebrow-dark !text-[10px]">Menu</p>
            <ul className="mt-5 space-y-2.5">
              {dict.nav.map((n) => <li key={n.href}><Link href={withLocale(locale, n.href)} className="text-[12px] tracking-[0.16em] text-white/65 hover:text-gold-light">{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow-dark !text-[10px]">Language</p>
            <ul className="mt-5 space-y-2.5">
              {LOCALES.map((l) => <li key={l}><Link href={withLocale(l, '/')} lang={LOCALE_LABELS[l].html} className={`text-[12px] ${l === locale ? 'font-semibold text-white' : 'text-white/55 hover:text-gold-light'}`}>{LOCALE_LABELS[l].name}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-w py-8 text-[12px] leading-relaxed text-white/45">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {f.links.map((l) => <Link key={l.href} href={l.href.startsWith('/admin') ? l.href : withLocale(locale, l.href)} className="font-medium text-white/75 hover:text-gold-light">{l.label}</Link>)}
          </div>
          <p className="mt-4"><span className="font-semibold text-white/70">{f.company}</span> · {f.ceo} · {f.regNo}</p>
          <p>{f.address}</p>
          <p className="mt-1">{dict.common.officialDistributor} · Import partner: CATKIN Co., Ltd.</p>
          <p className="mt-4 text-white/35">{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
