'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/content/types';
import { LOCALES, LOCALE_LABELS, withLocale } from '@/lib/i18n';

const remember = (l: Locale) => { document.cookie = `locale=${l};path=/;max-age=31536000;samesite=lax`; };

/* 헤더 언어 선택 드롭다운 (KO · EN · 日本語 · 中文) */
export default function LangSwitcher({ locale, rest, light, label }: { locale: Locale; rest: string; light: boolean; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, []);
  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => setOpen(!open)} aria-haspopup="listbox" aria-expanded={open} aria-label={label}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold tracking-widest transition ${light ? 'border-white/40 text-white hover:bg-white/10' : 'border-ink/20 text-ink hover:bg-ink hover:text-white'}`}>
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" /></svg>
        {LOCALE_LABELS[locale].short}
        <span className={`text-[8px] transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[150px] overflow-hidden rounded-2xl border border-black/10 bg-ivory py-1.5 text-ink shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
          {LOCALES.map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <Link href={withLocale(l, rest)} lang={LOCALE_LABELS[l].html} onClick={() => { remember(l); setOpen(false); }}
                className={`flex items-center justify-between gap-4 px-4 py-2.5 text-sm transition hover:bg-gold/10 ${l === locale ? 'font-bold text-gold-dark' : 'text-ink/80'}`}>
                <span>{LOCALE_LABELS[l].name}</span>
                <span className="text-[10px] tracking-widest text-ink/40">{LOCALE_LABELS[l].short}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* 모바일 메뉴용 가로 언어 버튼 */
export function LangRow({ locale, rest }: { locale: Locale; rest: string }) {
  return (
    <div className="mt-5 grid grid-cols-4 gap-2">
      {LOCALES.map((l) => (
        <Link key={l} href={withLocale(l, rest)} lang={LOCALE_LABELS[l].html} onClick={() => remember(l)}
          className={`rounded-full border py-2 text-center text-xs font-semibold transition ${l === locale ? 'border-ink bg-ink text-white' : 'border-ink/15 text-ink/70'}`}>
          {LOCALE_LABELS[l].name}
        </Link>
      ))}
    </div>
  );
}
