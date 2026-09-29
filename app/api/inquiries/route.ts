import { NextRequest, NextResponse } from 'next/server';
import { inquiries, type Inquiry } from '@/lib/store';
import { isAdmin } from '@/lib/auth';
import { notifyInquiry } from '@/lib/notify';

export const runtime = 'nodejs';
const rate = new Map<string, number[]>();

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const now = Date.now(); const hits = (rate.get(ip) || []).filter((t) => now - t < 60_000);
  if (hits.length >= 5) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  rate.set(ip, [...hits, now]);

  const b = await req.json().catch(() => null);
  if (!b || b.website) return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 }); // honeypot
  const s = (v: unknown, max = 500) => String(v ?? '').trim().slice(0, max);
  const q: Inquiry = {
    id: `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(), locale: s(b.locale, 5) || 'ko',
    name: s(b.name, 80), company: s(b.company, 120), email: s(b.email, 120), phone: s(b.phone, 40), country: s(b.country, 60),
    type: s(b.type, 60), product: s(b.product, 200), quantity: s(b.quantity, 120), message: s(b.message, 4000), status: 'new', ip,
  };
  if (!q.name || !q.email || !q.message || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(q.email)) return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  await inquiries.save(q);
  await notifyInquiry(q);
  return NextResponse.json({ ok: true, id: q.id });
}

export async function GET() {
  if (!isAdmin()) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, items: await inquiries.list() });
}
