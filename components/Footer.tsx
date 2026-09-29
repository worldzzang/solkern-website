import Link from 'next/link';
import { Logo } from './ui';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';

export default function Footer({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.footer;
  return (
    <footer className="relative bg-ink text-white">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo light />
          <p className="mt-5 font-serif text-2xl italic text-gold-light">{f.tagline}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">{dict.meta.description}</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">MENU</p>
          <ul className="space-y-2.5">
            {dict.nav.map((n) => <li key={n.href}><Link href={withLocale(locale, n.href)} className="text-sm tracking-wider text-white/75 hover:text-gold">{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="md:col-span-4 text-sm text-white/70">
          <p className="eyebrow mb-4">COMPANY</p>
          <p className="font-semibold text-white">{f.company}</p>
          <p className="mt-1">{f.ceo} · {f.regNo}</p>
          <p className="mt-1">{f.address}</p>
          <p className="mt-3"><a href={`mailto:${f.email}`} className="hover:text-gold">{f.email}</a> · <a href={`tel:${f.tel.replace(/[^0-9+]/g, '')}`} className="hover:text-gold">{f.tel}</a></p>
          <p className="mt-3 text-xs text-white/40">{dict.common.officialDistributor} · Import partner: CATKIN Co., Ltd.</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{f.copyright}</p>
          <div className="flex gap-5">{f.links.map((l) => <Link key={l.href} href={l.href.startsWith('/admin') ? l.href : withLocale(locale, l.href)} className="hover:text-white">{l.label}</Link>)}</div>
        </div>
      </div>
    </footer>
  );
}
