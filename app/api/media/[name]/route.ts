import { media } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// 업로드 이미지 공개 제공 — 파일명이 고유·불변이므로 1년 캐시
export async function GET(_: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const f = await media.read(name);
  if (!f) return new Response('Not found', { status: 404, headers: { 'Cache-Control': 'no-store' } });
  return new Response(f.body as BodyInit, {
    headers: {
      'Content-Type': f.type,
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
      'Content-Security-Policy': "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
    },
  });
}
