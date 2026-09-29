'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logo } from '@/components/ui';

export default function AdminLogin() {
  const r = useRouter(); const [pw, setPw] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setErr('');
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) });
    setBusy(false);
    if (res.ok) r.push('/admin'); else setErr(res.status === 429 ? '시도 횟수를 초과했습니다. 15분 후 다시 시도하세요.' : '비밀번호가 올바르지 않습니다.');
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form onSubmit={submit} className="card w-full max-w-sm bg-white p-8">
        <Logo /><p className="mt-1 text-xs tracking-widest text-ink-3">ADMIN CONSOLE</p>
        <label className="mt-8">비밀번호</label>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus />
        {err && <p className="mt-2 text-xs text-pome">{err}</p>}
        <button disabled={busy} className="btn-dark mt-5 w-full justify-center">{busy ? '확인 중…' : '로그인'}</button>
      </form>
    </div>
  );
}
