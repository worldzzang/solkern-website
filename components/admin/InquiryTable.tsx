'use client';
import { useMemo, useState } from 'react';
import type { Inquiry } from '@/lib/store';

// 한국 시간(KST) 표시
const kst = (iso: string) => new Date(iso).toLocaleString('sv-SE', { timeZone: 'Asia/Seoul', hour12: false }).slice(0, 16);

const STATUS: Record<Inquiry['status'], { label: string; cls: string }> = {
  new: { label: '신규', cls: 'bg-gold/15 text-gold-dark' },
  in_progress: { label: '진행 중', cls: 'bg-blue-100 text-blue-700' },
  done: { label: '완료', cls: 'bg-green-100 text-green-700' },
};

export default function InquiryTable({ initial }: { initial: Inquiry[] }) {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<'all' | Inquiry['status']>('all');
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<Inquiry | null>(null);
  const [memo, setMemo] = useState('');

  const shown = useMemo(() => items.filter((i) => (filter === 'all' || i.status === filter) && (!q || [i.name, i.company, i.email, i.type, i.product, i.message].join(' ').toLowerCase().includes(q.toLowerCase()))), [items, filter, q]);

  async function update(id: string, patch: Partial<Inquiry>) {
    const r = await fetch(`/api/inquiries/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(patch) });
    if (r.ok) { const { item } = await r.json(); setItems((xs) => xs.map((x) => (x.id === id ? item : x))); if (open?.id === id) setOpen(item); }
  }
  async function remove(id: string) {
    if (!confirm('이 문의를 삭제할까요? 되돌릴 수 없습니다.')) return;
    const r = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' });
    if (r.ok) { setItems((xs) => xs.filter((x) => x.id !== id)); setOpen(null); }
  }
  function exportCsv() {
    const cols: (keyof Inquiry)[] = ['id', 'createdAt', 'status', 'type', 'name', 'company', 'email', 'phone', 'country', 'product', 'quantity', 'message', 'memo'];
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = '﻿' + [cols.join(','), ...shown.map((i) => cols.map((c) => esc(c === 'createdAt' ? kst(i.createdAt) : i[c])).join(','))].join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `solkern-inquiries-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
  }

  return (
    <div className="card bg-white p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex shrink-0 gap-1 rounded-full bg-ivory-2 p-1">
          {(['all', 'new', 'in_progress', 'done'] as const).map((f) => <button key={f} onClick={() => setFilter(f)} className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${filter === f ? 'bg-forest text-white' : 'text-ink-3'}`}>{f === 'all' ? '전체' : STATUS[f].label}</button>)}
        </div>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="검색 (이름·회사·이메일·품목·내용)" className="order-last w-full sm:order-none sm:!w-64" />
        <button onClick={exportCsv} className="btn-outline-dark !px-4 !py-2 text-xs">CSV 다운로드</button>
        <span className="ml-auto text-xs text-ink-3">{shown.length}건</span>
      </div>
      {/* 모바일(<768px): 카드형 목록 */}
      <ul className="mt-4 space-y-3 md:hidden">
        {shown.map((i) => (
          <li key={i.id}>
            <button onClick={() => { setOpen(i); setMemo(i.memo || ''); }} className="block w-full rounded-xl border border-black/10 bg-white p-4 text-left active:bg-ivory/60">
              <div className="flex items-center justify-between gap-2">
                <span className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS[i.status].cls}`}>{STATUS[i.status].label}</span>
                <span className="text-xs tabular-nums text-ink-3">{kst(i.createdAt)}</span>
              </div>
              <p className="mt-2 break-words text-[15px] font-bold">{i.name}{i.company && <span className="ml-1.5 text-[13px] font-normal text-ink-3">· {i.company}</span>}</p>
              <p className="mt-1 text-xs text-ink-3">{i.type}{i.product && <> · <span className="text-ink/80">{i.product}</span></>}</p>
              <p className="mt-2 break-all text-xs text-gold-dark">{i.email}</p>
              {i.phone && <p className="text-xs text-ink-3">{i.phone}</p>}
              <p className="mt-2 text-right text-xs font-semibold text-gold-dark">상세 보기 ›</p>
            </button>
          </li>
        ))}
        {shown.length === 0 && <li className="py-10 text-center text-sm text-ink-3">문의가 없습니다.</li>}
      </ul>

      {/* 태블릿·PC(≥768px): 표 */}
      <div className="mt-4 hidden overflow-x-auto md:block">
        <table className="w-full min-w-[760px] text-sm">
          <thead><tr className="border-b border-black/10 text-left text-xs text-ink-3"><th className="py-2 pr-3">접수일</th><th className="py-2 pr-3 whitespace-nowrap">상태</th><th className="py-2 pr-3">유형</th><th className="py-2 pr-3 whitespace-nowrap">담당자 / 회사</th><th className="py-2 pr-3">연락처</th><th className="py-2 pr-3">품목</th><th className="py-2"></th></tr></thead>
          <tbody>
            {shown.map((i) => (
              <tr key={i.id} className="border-b border-black/5 hover:bg-ivory/60">
                <td className="py-3 pr-3 whitespace-nowrap text-xs">{kst(i.createdAt)}</td>
                <td className="py-3 pr-3 whitespace-nowrap"><span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS[i.status].cls}`}>{STATUS[i.status].label}</span></td>
                <td className="py-3 pr-3 whitespace-nowrap">{i.type}</td>
                <td className="py-3 pr-3"><b>{i.name}</b><br /><span className="text-xs text-ink-3">{i.company}</span></td>
                <td className="py-3 pr-3 whitespace-nowrap text-xs"><a className="text-gold-dark" href={`mailto:${i.email}`}>{i.email}</a><br />{i.phone}</td>
                <td className="py-3 pr-3 max-w-[200px] truncate text-xs">{i.product}</td>
                <td className="py-3 text-right whitespace-nowrap"><button onClick={() => { setOpen(i); setMemo(i.memo || ''); }} className="text-xs font-semibold text-gold-dark hover:underline">상세</button></td>
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan={7} className="py-10 text-center text-sm text-ink-3">문의가 없습니다.</td></tr>}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center" onClick={() => setOpen(null)}>
          <div className="card max-h-[88vh] w-full max-w-2xl overflow-y-auto bg-white p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div><p className="break-all text-xs text-ink-3">{open.id} · {kst(open.createdAt)} KST · {open.locale.toUpperCase()}</p><h3 className="mt-1 break-words text-lg font-bold sm:text-xl">{open.type} — {open.company || open.name}</h3></div>
              <button onClick={() => setOpen(null)} className="text-2xl leading-none">×</button>
            </div>
            <dl className="mt-5 grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-2 text-sm sm:grid-cols-3">
              {[['담당자', open.name], ['회사', open.company], ['이메일', open.email], ['연락처', open.phone], ['국가', open.country], ['품목', open.product], ['수량/MOQ', open.quantity]].map(([k, v]) => <><dt key={k + 'k'} className="text-ink-3">{k}</dt><dd key={k + 'v'} className="break-all sm:col-span-2">{v || '-'}</dd></>)}
            </dl>
            <p className="mt-4 whitespace-pre-wrap rounded-xl bg-ivory p-4 text-sm">{open.message}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-xs text-ink-3">상태 변경:</span>
              {(Object.keys(STATUS) as Inquiry['status'][]).map((s) => <button key={s} onClick={() => update(open.id, { status: s })} className={`rounded-full px-3 py-1 text-xs font-bold ${open.status === s ? 'bg-forest text-white' : 'bg-ivory-2'}`}>{STATUS[s].label}</button>)}
            </div>
            <label className="mt-5">내부 메모</label>
            <textarea rows={3} value={memo} onChange={(e) => setMemo(e.target.value)} />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <button onClick={() => remove(open.id)} className="text-xs text-pome hover:underline">삭제</button>
              <div className="flex gap-2"><a href={`mailto:${open.email}?subject=${encodeURIComponent('[SOLKERN] 문의 회신: ' + open.type)}`} className="btn-outline-dark !px-4 !py-2 text-xs">이메일 회신</a><button onClick={() => update(open.id, { memo })} className="btn-dark !px-4 !py-2 text-xs">메모 저장</button></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
