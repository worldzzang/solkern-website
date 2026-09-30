'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Logo } from './ui';
import type { Dict, Locale } from '@/content/types';
import { withLocale } from '@/lib/i18n';
import LangSwitcher, { LangRow } from './LangSwitcher';

/* 오설록식 헤더: 히어로 위 투명(흰 글자) → 스크롤 시 화이트 바, 가는 대문자 메뉴, 모바일은 전체 화면 메뉴 */
export default function Header({ locale, dict, dark = false }: { locale: Locale; dict: Dict; dark?: boolean }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 24); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  const rest = pathname.replace(/^\/(ko|en|ja|zh)(?=\/|$)/, '') || '/';
  // 크림 배경 히어로 페이지(뉴스·문의·개인정보)는 처음부터 어두운 글자
  const lightHero = ['/news', '/contact', '/privacy'].some((p) => rest.startsWith(p));
  const light = dark && !lightHero && !scrolled && !open;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/92 backdrop-blur-md border-b border-stone/70' : 'bg-transparent'}`}>
        <div className="container-w flex h-[64px] items-center justify-between sm:h-[76px]">
          <Link href={withLocale(locale, '/')} aria-label="SOLKERN home" className="relative z-[60]"><Logo light={light} /></Link>
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
            {dict.nav.map((n) => {
              const active = rest.startsWith(n.href);
              return (
                <Link key={n.href} href={withLocale(locale, n.href)}
                  className={`group relative py-2 text-[12px] font-medium tracking-[0.2em] transition-colors ${light ? 'text-white/85 hover:text-white' : 'text-ink/70 hover:text-ink'} ${active ? (light ? '!text-white' : '!text-ink') : ''}`}>
                  {n.label}
                  <span className={`absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </nav>
          <div className="relative z-[60] flex items-center gap-3">
            <LangSwitcher locale={locale} rest={rest} light={light} label={dict.common.langLabel} />
            <Link href={withLocale(locale, '/contact')} className={`hidden whitespace-nowrap rounded-full border px-4 py-1.5 text-[11px] font-medium tracking-[0.16em] transition sm:inline-flex ${light ? 'border-white/60 text-white hover:bg-white hover:text-ink' : 'border-ink/60 text-ink hover:bg-ink hover:text-white'}`}>{dict.common.contact}</Link>
            <button onClick={() => setOpen(!open)} aria-label="menu" aria-expanded={open} className={`relative h-10 w-10 lg:hidden ${light ? 'text-white' : 'text-ink'}`}>
              <span className={`absolute left-2.5 top-[15px] h-px w-5 bg-current transition-all duration-300 ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
              <span className={`absolute left-2.5 top-[23px] h-px w-5 bg-current transition-all duration-300 ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 전체 화면 메뉴 */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 flex flex-col bg-cream pt-[64px] lg:hidden">
            <div className="container-x flex flex-1 flex-col overflow-y-auto py-8">
              {dict.nav.map((n, i) => (
                <motion.div key={n.href} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 * i + 0.1 }}>
                  <Link href={withLocale(locale, n.href)} className="flex items-center justify-between border-b border-stone py-5 text-[22px] font-medium tracking-[0.06em]">
                    {n.label}<span className="font-serif text-gold">→</span>
                  </Link>
                </motion.div>
              ))}
              <LangRow locale={locale} rest={rest} />
              <Link href={withLocale(locale, '/contact')} className="btn-dark mt-8">{dict.common.contact}</Link>
              <p className="mt-10 font-serif italic text-ink-3">Quality Without Borders</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
