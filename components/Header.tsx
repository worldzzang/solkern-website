'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './ui';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';
import LangSwitcher, { LangRow } from './LangSwitcher';

export default function Header({ locale, dict, dark = false }: { locale: Locale; dict: Dict; dark?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  const rest = pathname.replace(/^\/(ko|en|ja|zh)(?=\/|$)/, '') || '/';
  const light = dark && !scrolled && !open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? 'bg-ivory/85 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'bg-transparent'}`}>
      <div className="container-x flex h-16 items-center justify-between sm:h-[72px]">
        <Link href={withLocale(locale, '/')} aria-label="SOLKERN home"><Logo light={light} /></Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {dict.nav.map((n) => {
            const active = rest.startsWith(n.href);
            return (
              <Link key={n.href} href={withLocale(locale, n.href)}
                className={`relative text-[12.5px] font-semibold tracking-[0.16em] transition-colors ${light ? 'text-white/85 hover:text-white' : 'text-ink/75 hover:text-ink'} ${active ? (light ? '!text-white' : '!text-ink') : ''}`}>
                {n.label}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-gold transition-all duration-300 ${active ? 'w-full' : 'w-0'}`} />
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <LangSwitcher locale={locale} rest={rest} light={light} label={dict.common.langLabel} />
          <Link href={withLocale(locale, '/contact')} className={`hidden sm:inline-flex btn whitespace-nowrap !px-5 !py-2 text-xs ${light ? 'bg-white text-ink hover:bg-gold hover:text-white' : 'bg-ink text-white hover:bg-gold'}`}>{dict.common.contact}</Link>
          <button onClick={() => setOpen(!open)} aria-label="menu" className={`lg:hidden relative h-10 w-10 ${light ? 'text-white' : 'text-ink'}`}>
            <span className={`absolute left-2.5 top-[15px] h-[2px] w-5 bg-current transition-all ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
            <span className={`absolute left-2.5 top-[23px] h-[2px] w-5 bg-current transition-all ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden border-t border-black/5 lg:hidden">
            <div className="container-x flex flex-col py-4">
              {dict.nav.map((n, i) => (
                <motion.div key={n.href} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.05 * i }}>
                  <Link href={withLocale(locale, n.href)} className="flex items-center justify-between border-b border-black/5 py-4 text-base font-semibold tracking-[0.12em]">
                    {n.label}<span className="text-gold">→</span>
                  </Link>
                </motion.div>
              ))}
              <LangRow locale={locale} rest={rest} />
              <Link href={withLocale(locale, '/contact')} className="btn-gold mt-5 justify-center">{dict.common.contact}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
