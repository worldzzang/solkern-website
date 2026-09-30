'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Locale } from '@/content/types';

type N = { id: string; date: string; category: string; title: string };

/* 공지사항 목록 — 관리자 모드(/admin/news)에서 등록한 공지·소식을 실시간으로 불러와 기본 소식과 합쳐 최신 3건 표시 */
export default function NoticeList({ locale, fallback, href, dark = false, limit = 3 }: { locale: Locale; fallback: N[]; href: string; dark?: boolean; limit?: number }) {
  const [items, setItems] = useState<N[]>(fallback.slice(0, limit));
  useEffect(() => {
    let alive = true;
    fetch('/api/news').then((r) => (r.ok ? r.json() : null)).then((j) => {
      if (!alive || !j?.items) return;
      const posted: N[] = j.items.filter((p: { locale: string }) => p.locale === 'both' || p.locale === locale)
        .map((p: { id: string; date: string; category: string; title: string }) => ({ id: p.id, date: String(p.date).replace(/-/g, '.'), category: p.category, title: p.title }));
      setItems([...posted, ...fallback].slice(0, limit));
    }).catch(() => {});
    return () => { alive = false; };
  }, [locale, fallback, limit]);
  return (
    <ul className={`divide-y ${dark ? 'divide-white/10' : 'divide-stone'}`}>
      {items.map((n) => (
        <li key={n.id}>
          <Link href={href} className="group flex items-baseline gap-4 py-3">
            <span className={`shrink-0 text-[11px] tabular-nums tracking-wide ${dark ? 'text-white/45' : 'text-mute'}`}>{n.date}</span>
            <span className={`min-w-0 flex-1 truncate text-[13px] transition ${dark ? 'text-white/80 group-hover:text-gold-light' : 'text-ink/85 group-hover:text-gold-dark'}`}>{n.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
