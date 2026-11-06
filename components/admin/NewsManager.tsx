'use client';
import { useState } from 'react';
import type { NewsPost } from '@/lib/store';

type Form = { id?: string; date: string; category: string; title: string; summary: string; body: string; locale: 'ko' | 'en' | 'ja' | 'zh' | 'uz' | 'tr' | 'both'; published: boolean; image?: string };

// 브라우저에서 긴 변 1600px로 줄이고 WebP(미지원 시 JPEG)로 압축 → 휴대폰 원본 사진도 업로드 가능
async function compress(file: File): Promise<Blob> {
  if (file.type === 'image/gif') return file; // 움직이는 GIF는 그대로
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas'); c.width = Math.round(bmp.width * scale); c.height = Math.round(bmp.height * scale);
  c.getContext('2d')!.drawImage(bmp, 0, 0, c.width, c.height);
  const to = (t: string) => new Promise<Blob | null>((r) => c.toBlob(r, t, 0.85));
  const webp = await to('image/webp');
  return webp && webp.type === 'image/webp' ? webp : ((await to('image/jpeg')) as Blob);
}
const empty: Form = { date: new Date().toISOString().slice(0, 10), category: 'NOTICE', title: '', summary: '', body: '', locale: 'both', published: true };

export default function NewsManager({ initial }: { initial: NewsPost[] }) {
  const [items, setItems] = useState(initial);
  const [form, setForm] = useState<Form>(empty);
  const [busy, setBusy] = useState(false);
  const [upl, setUpl] = useState<'' | 'busy' | string>('');
  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; e.target.value = '';
    if (!f) return;
    if (!/^image\/(jpeg|png|webp|gif|heic|heif)$/.test(f.type) && !/\.(jpe?g|png|webp|gif|heic)$/i.test(f.name)) { setUpl('이미지 파일(JPG·PNG·WebP·GIF)만 올릴 수 있습니다.'); return; }
    setUpl('busy');
    try {
      const blob = await compress(f);
      const fd = new FormData(); fd.append('file', blob, 'upload');
      const r = await fetch('/api/media', { method: 'POST', body: fd });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.url) throw new Error(j.error === 'too_large' ? '파일이 너무 큽니다(압축 후 4MB 초과).' : j.error === 'not_image' ? '이미지 파일이 아닙니다.' : r.status === 401 ? '로그인이 만료되었습니다. 다시 로그인해 주세요.' : '업로드에 실패했습니다.');
      set('image', j.url); setUpl('');
    } catch (err) { setUpl(err instanceof Error ? err.message : '업로드에 실패했습니다. 이 형식은 브라우저에서 변환할 수 없습니다(JPG·PNG로 저장 후 다시 시도).'); }
  }
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
        <h3 className="font-bold">{form.id ? '공지·소식 수정' : '새 공지·소식 작성'}</h3>
        <div className="grid grid-cols-2 gap-3">
          <div><label>날짜</label><input type="date" value={form.date} onChange={(e) => set('date', e.target.value)} /></div>
          <div><label>카테고리</label><select value={form.category} onChange={(e) => set('category', e.target.value)}>{['NOTICE', 'NEWS', 'COMPANY', 'PRODUCT', 'R&D', 'CONTRACT', 'EXHIBITION', 'TRIP'].map((c) => <option key={c}>{c}</option>)}</select></div>
        </div>
        <div><label>제목</label><input value={form.title} onChange={(e) => set('title', e.target.value)} required /></div>
        <div>
          <label>대표 이미지 (NEWS 카드에 표시 · 가로형 16:10 권장)</label>
          {form.image ? (
            <div className="relative mt-1 overflow-hidden rounded-xl border border-black/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.image} alt="" className="aspect-[16/10] w-full object-cover" />
              <div className="absolute right-2 top-2 flex gap-2">
                <label className="!mb-0 cursor-pointer rounded-full bg-white/90 px-3 py-1 !text-[11px] !tracking-normal !normal-case text-ink shadow">교체<input type="file" accept="image/*" className="hidden" onChange={pick} /></label>
                <button type="button" onClick={() => set('image', undefined)} className="rounded-full bg-white/90 px-3 py-1 text-[11px] text-pome shadow">이미지 빼기</button>
              </div>
            </div>
          ) : (
            <label className="!mb-0 mt-1 flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-black/15 bg-ivory/50 !text-xs !tracking-normal !normal-case text-ink-3 hover:border-gold">
              <span className="text-2xl leading-none">＋</span>
              <span>{upl === 'busy' ? '업로드 중…' : '클릭해서 이미지 선택 (JPG·PNG·WebP·GIF)'}</span>
              <span className="text-[11px] text-ink-3/80">휴대폰 사진도 자동으로 줄여서 올라갑니다 · 이미지 없으면 SOLKERN 기본 이미지 표시</span>
              <input type="file" accept="image/*" className="hidden" onChange={pick} disabled={upl === 'busy'} />
            </label>
          )}
          {upl && upl !== 'busy' && <p className="mt-1 text-xs text-pome">{upl}</p>}
        </div>
        <div><label>요약 (카드에 표시)</label><textarea rows={2} value={form.summary} onChange={(e) => set('summary', e.target.value)} /></div>
        <div><label>본문</label><textarea rows={6} value={form.body} onChange={(e) => set('body', e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label>노출 언어</label><select value={form.locale} onChange={(e) => set('locale', e.target.value)}><option value="both">전체 언어 (한·영·일·중·우즈벡·튀르키예)</option><option value="ko">한국어만</option><option value="en">영어만</option><option value="ja">일본어만</option><option value="zh">중국어만</option><option value="uz">우즈베크어만</option><option value="tr">튀르키예어만</option></select></div>
          <div><label>공개</label><select value={String(form.published)} onChange={(e) => set('published', e.target.value === 'true')}><option value="true">공개</option><option value="false">비공개(초안)</option></select></div>
        </div>
        <div className="flex gap-2"><button disabled={busy || upl === 'busy'} className="btn-dark !px-5 !py-2 text-xs">{busy ? '저장 중…' : '저장'}</button>{form.id && <button type="button" onClick={() => { setForm(empty); setUpl(''); }} className="btn-outline-dark !px-5 !py-2 text-xs">취소</button>}</div>
        <p className="text-xs text-ink-3">※ 저장 즉시 NEWS 페이지와 모든 페이지 하단(푸터) 공지사항에 반영됩니다. 코드에 내장된 기본 소식 3건은 content/ko.ts · en.ts · ja.ts · zh.ts 에서 수정합니다.</p>
      </form>
      <div className="card bg-white p-6 lg:col-span-7">
        <h3 className="font-bold">등록된 공지·소식 ({items.length})</h3>
        <ul className="mt-4 divide-y divide-black/5">
          {items.map((p) => (
            <li key={p.id} className="flex items-start justify-between gap-4 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.image ? <img src={p.image} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" /> : <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-forest text-[9px] tracking-widest text-white/60">NO IMG</div>}
              <div className="min-w-0 flex-1"><p className="text-xs text-ink-3">{p.date} · {p.category} · {p.locale} · {p.published ? '공개' : '비공개'}</p><p className="font-semibold">{p.title}</p><p className="text-xs text-ink-3">{p.summary}</p></div>
              <div className="flex shrink-0 gap-3 text-xs"><button onClick={() => { setForm({ ...p }); setUpl(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gold-dark">수정</button><button onClick={() => remove(p.id)} className="text-pome">삭제</button></div>
            </li>
          ))}
          {items.length === 0 && <li className="py-8 text-center text-sm text-ink-3">등록된 공지·소식이 없습니다.</li>}
        </ul>
      </div>
    </div>
  );
}
