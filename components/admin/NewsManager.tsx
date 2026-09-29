'use client';
import { useState } from 'react';
import type { NewsPost } from '@/lib/store';

type Form = { id?: string; date: string; category: string; title: string; summary: string; body: string; locale: 'ko' | 'en' | 'ja' | 'zh' | 'both'; published: boolean };
const empty: Form = { date: new Date().toISOString().slice(0, 10), category: 'NEWS', title: '', summary: '', body: '', locale: 'both', published: true };

export default function NewsManager({ initial }: { initial: NewsPost[] }) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState<Form>(empty);
  const [busy, setBusy] = useState(false);
  const set = (k: string, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    const r = await fetch('/api/news', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setBusy(false);
    if (r.ok) { const { item } = await r.json(); setItems((xs) => [item, ...xs.filter((x) => x.id !== item.id)].sort((a, b) => b.date.localeCompare(a.date))); setForm(empty); }
  }
  async function remove(id: string) {
    if (!confirm('삭제할까요?')) return;
    const r = await fetch(`/api/news/${id}`, { method: 'DELETE' }); if (r.ok) setItems((xs) => xs.filter((x) => x.id !== id));
  }
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <form onSubmit={save} className="card space-y-4 bg-white p-6 lg:col-span-5">
        <h3 className="font-bold">{form.id ? '소식 수정' : '새 소식 작성'}</h3>
        <div className="grid grid-cols-2 gap-3">
          <div><label>날짜</label><input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} /></div>
          <div><label>카테고리</label><select value={form.category} onChange={(e) => set('category', e.target.value)}>{['NEWS', 'COMPANY', 'PRODUCT', 'R&D', 'CONTRACT', 'EXHIBITION', 'TRIP'].map((c) => <option key={c}>{c}</option>)}</select></div>
        </div>
        <div><label>제목</label><input value={form.title} onChange={(e) => set('title', e.target.value)} required /></div>
        <div><label>요약 (카드에 표시)</label><textarea rows={2} value={form.summary} onChange={(e) => set('summary', e.target.value)} /></div>
        <div><label>본문</label><textarea rows={6} value={form.body} onChange={(e) => set('body', e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label>노출 언어</label><select value={form.locale} onChange={(e) => set('locale', e.target.value)}><option value="both">전체 언어 (한·영·일·중)</option><option value="ko">한국어만</option><option value="en">영어만</option><option value="ja">일본어만</option><option value="zh">중국어만</option></select></div>
          <div><label>공개</label><select value={String(form.published)} onChange={(e) => set('published', e.target.value === 'true')}><option value="true">공개</option><option value="false">비공개(초안)</option></select></div>
        </div>
        <div className="flex gap-2"><button disabled={busy} className="btn-dark !px-5 !py-2 text-xs">{busy ? '저장 중…' : '저장'}</button>{form.id && <button type="button" onClick={() => setForm(empty)} className="btn-outline-dark !px-5 !py-2 text-xs">취소</button>}</div>
        <p className="text-xs text-ink-3">※ 코드에 내장된 기본 소식 3건은 content/ko.ts · en.ts · ja.ts · zh.ts 에서 수정합니다.</p>
      </form>
      <div className="card bg-white p-6 lg:col-span-7">
        <h3 className="font-bold">등록된 소식 ({items.length})</h3>
        <ul className="mt-4 divide-y divide-black/5">
          {items.map((p) => (
            <li key={p.id} className="flex items-start justify-between gap-4 py-3">
              <div><p className="text-xs text-ink-3">{p.date} · {p.category} · {p.locale} · {p.published ? '공개' : '비공개'}</p><p className="font-semibold">{p.title}</p><p className="text-xs text-ink-3">{p.summary}</p></div>
              <div className="flex shrink-0 gap-3 text-xs"><button onClick={() => setForm({ ...p })} className="text-gold-dark">수정</button><button onClick={() => remove(p.id)} className="text-pome">삭제</button></div>
            </li>
          ))}
          {items.length === 0 && <li className="py-8 text-center text-sm text-ink-3">등록된 소식이 없습니다.</li>}
        </ul>
      </div>
    </div>
  );
}
