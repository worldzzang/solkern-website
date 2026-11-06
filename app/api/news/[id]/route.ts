import { NextRequest, NextResponse } from 'next/server';
import { news, media } from '@/lib/store';
import { isAdmin } from '@/lib/auth';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const prev = await news.get(id);
  await news.remove(id); await media.removeByUrl(prev?.image); return NextResponse.json({ ok: true });
}
