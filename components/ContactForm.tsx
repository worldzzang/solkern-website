'use client';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Dict, Locale } from '@/content/types';

/* 문의 폼 — /api/inquiries 로 저장(관리자 모드에서 확인). 오설록식 밑줄 입력 */
export default function ContactForm({ locale, dict }: { locale: Locale; dict: Dict }) {
  const f = dict.contact.form;
  const sp = useSearchParams();
  const preset = sp.get('type') === 'catalog' ? f.typeOptions[3] : sp.get('type') === 'material' ? f.typeOptions[4] : f.typeOptions[0];
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [agree, setAgree] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!agree) return;
    setState('sending');
    const fd = new FormData(e.currentTarget); const body = Object.fromEntries(fd.entries());
    const r = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...body, locale }) }).catch(() => null);
    setState(r && r.ok ? 'done' : 'error');
  }

  return (
    <AnimatePresence mode="wait">
      {state === 'done' ? (
        <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-cream p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold font-serif text-2xl text-gold">✓</div>
          <h3 className="t-h3 mt-6">{f.success}</h3>
          <p className="t-body mt-3">{f.successBody}</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} className="space-y-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
          <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
            <div><label>{f.name} <span className="text-gold">*</span></label><input name="name" required maxLength={80} /></div>
            <div><label>{f.company}</label><input name="company" maxLength={120} /></div>
            <div><label>{f.email} <span className="text-gold">*</span></label><input name="email" type="email" required /></div>
            <div><label>{f.phone}</label><input name="phone" maxLength={40} /></div>
            <div><label>{f.country}</label><input name="country" maxLength={60} placeholder={dict.ui.countryPlaceholder} /></div>
            <div><label>{f.type} <span className="text-gold">*</span></label>
              <select name="type" defaultValue={preset}>{f.typeOptions.map((o) => <option key={o}>{o}</option>)}</select></div>
            <div><label>{f.product}</label><input name="product" maxLength={200} /></div>
            <div><label>{f.quantity}</label><input name="quantity" maxLength={120} /></div>
          </div>
          <div><label>{f.message} <span className="text-gold">*</span></label><textarea name="message" required rows={5} maxLength={4000} /></div>
          <label className="flex cursor-pointer items-start gap-3 !text-[13px] !font-normal !normal-case !tracking-normal !text-ink">
            <input type="checkbox" className="mt-1 !h-4 !w-4 !rounded-none !border !border-stone accent-gold" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>{f.agree}<br /><span className="t-small">{f.privacy}</span></span>
          </label>
          {state === 'error' && <p className="text-sm text-pome">{dict.common.error}</p>}
          <button type="submit" disabled={!agree || state === 'sending'} className="btn-dark w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:min-w-[220px]">
            {state === 'sending' ? dict.common.sending : f.submit}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
