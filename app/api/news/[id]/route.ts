import { NextRequest, NextResponse } from 'next/server';
import { news } from '@/lib/store';
import { isAdmin } from '@/lib/auth';
export const runtime = 'nodejs';
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  await news.remove(id); return NextResponse.json({ ok: true });
}
