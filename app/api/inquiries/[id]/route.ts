import { NextRequest, NextResponse } from 'next/server';
import { inquiries } from '@/lib/store';
import { isAdmin } from '@/lib/auth';
export const runtime = 'nodejs';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const q = await inquiries.get(id); if (!q) return NextResponse.json({ ok: false }, { status: 404 });
  const b = await req.json();
  if (b.status && ['new', 'in_progress', 'done'].includes(b.status)) q.status = b.status;
  if (typeof b.memo === 'string') q.memo = b.memo.slice(0, 2000);
  await inquiries.save(q);
  return NextResponse.json({ ok: true, item: q });
}
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  await inquiries.remove(id);
  return NextResponse.json({ ok: true });
}
