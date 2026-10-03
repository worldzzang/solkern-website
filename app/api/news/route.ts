import { NextRequest, NextResponse } from 'next/server';
import { news, type NewsPost } from '@/lib/store';
import { isAdmin } from '@/lib/auth';
export const runtime = 'nodejs';
export async function GET() { const all = await news.list(); return NextResponse.json({ ok: true, items: isAdmin() ? all : all.filter((p) => p.published) }); }
export async function POST(req: NextRequest) {
  if (!isAdmin()) return NextResponse.json({ ok: false }, { status: 401 });
  const b = await req.json(); const s = (v: unknown, m = 300) => String(v ?? '').trim().slice(0, m);
  const p: NewsPost = { id: b.id || `p-${Date.now().toString(36)}`, createdAt: new Date().toISOString(), date: s(b.date, 10) || new Date().toISOString().slice(0, 10), category: s(b.category, 30) || 'NEWS', title: s(b.title, 200), summary: s(b.summary, 500), body: s(b.body, 20000), locale: ['ko', 'en', 'ja', 'zh', 'uz', 'tr', 'both'].includes(b.locale) ? b.locale : 'both', published: b.published !== false };
  if (!p.title) return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 });
  await news.save(p); return NextResponse.json({ ok: true, item: p });
}
