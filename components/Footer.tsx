import Link from 'next/link';
import { Logo } from './ui';
import type { Dict, Locale } from '@/content/types';
import { LOCALES, LOCALE_LABELS, withLocale } from '@/lib/i18n';

/* 오설록식 푸터: 고객센터 · 공지(NOTICE) · 메뉴 · 언어 → 법적 고지 · 회사 정보 */
export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.footer;
  const notices = dict.news.items.slice(0, 3);
  return (
    <footer className="border-t border-stone bg-cream text-ink">
      <div className="container-w grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tagline />
          <p className="t-serif-it mt-5 text-[22px] text-gold-dark">{f.tagline}</p>
          <p className="t-small mt-5 max-w-sm">{dict.meta.description}</p>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow !text-[11px]">Customer Center</p>
          <p className="mt-4 text-[22px] font-medium tracking-tight"><a href={`tel:${f.tel.replace(/[^0-9+]/g, '')}`} className="hover:text-gold">{f.tel}</a></p>
          <p className="mt-1 text-sm"><a href={`mailto:${f.email}`} className="hover:text-gold">{f.email}</a></p>
          <p className="t-small mt-3">Mon – Fri · 09:00 – 18:00 (KST)</p>
          <Link href={withLocale(locale, '/contact')} className="link-ul mt-5">{dict.common.contact}</Link>
        </div>
        <div className="lg:col-span-3">
          <p className="eyebrow !text-[11px]">Notice</p>
          <ul className="mt-4 space-y-3">
            {notices.map((n) => (
              <li key={n.id}>
                <Link href={withLocale(locale, '/news')} className="group block">
                  <span className="t-small block text-mute">{n.date} · {n.category}</span>
                  <span className="block text-sm leading-snug text-ink/85 group-hover:text-gold">{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-2">
          <p className="eyebrow !text-[11px]">Menu</p>
          <ul className="mt-4 space-y-2.5">
            {dict.nav.map((n) => <li key={n.href}><Link href={withLocale(locale, n.href)} className="text-[12px] tracking-[0.18em] text-ink/75 hover:text-gold">{n.label}</Link></li>)}
          </ul>
          <p className="eyebrow mt-8 !text-[11px]">Language</p>
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {LOCALES.map((l) => <li key={l}><Link href={withLocale(l, '/')} lang={LOCALE_LABELS[l].html} className={`text-xs ${l === locale ? 'font-semibold text-ink' : 'text-ink/60 hover:text-gold'}`}>{LOCALE_LABELS[l].name}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="border-t border-stone">
        <div className="container-w py-7 text-[12px] leading-relaxed text-ink-3">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {f.links.map((l) => <Link key={l.href} href={l.href.startsWith('/admin') ? l.href : withLocale(locale, l.href)} className="font-medium text-ink/80 hover:text-gold">{l.label}</Link>)}
          </div>
          <p className="mt-4"><span className="font-semibold text-ink/80">{f.company}</span> · {f.ceo} · {f.regNo}</p>
          <p>{f.address}</p>
          <p className="mt-1 text-mute">{dict.common.officialDistributor} · Import partner: CATKIN Co., Ltd.</p>
          <p className="mt-3 text-mute">{f.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
