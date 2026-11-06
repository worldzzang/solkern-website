'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/ui';

export default function AdminShell({ children, active, storage }: { children: React.ReactNode; active: 'inquiries' | 'news'; storage: string }) {
  const r = useRouter();
  const tabs = [{ id: 'inquiries', label: '문의사항 관리', href: '/admin' }, { id: 'news', label: '공지사항·소식 관리', href: '/admin/news' }];
  return (
    <div>
      <header className="border-b border-black/5 bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4"><Logo /><span className="whitespace-nowrap rounded bg-forest px-2 py-0.5 text-[10px] font-bold tracking-widest text-gold-light">ADMIN</span></div>
          <div className="flex shrink-0 items-center gap-2 text-xs sm:gap-3">
            <span className="hidden rounded-full bg-ivory-2 px-3 py-1 text-ink-3 sm:inline">storage: {storage}</span>
            <Link href="/ko" className="whitespace-nowrap rounded-full border border-black/10 px-3 py-1.5 hover:bg-ivory">사이트 보기</Link>
            <button onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); r.push('/admin/login'); }} className="whitespace-nowrap rounded-full bg-forest px-3 py-1.5 text-white">로그아웃</button>
          </div>
        </div>
        <div className="container-x flex gap-5 overflow-x-auto sm:gap-6">
          {tabs.map((t) => <Link key={t.id} href={t.href} className={`whitespace-nowrap border-b-2 py-3 text-sm font-semibold ${active === t.id ? 'border-gold text-ink' : 'border-transparent text-ink-3'}`}>{t.label}</Link>)}
        </div>
      </header>
      <main className="container-x space-y-8 py-8">{children}</main>
    </div>
  );
}
