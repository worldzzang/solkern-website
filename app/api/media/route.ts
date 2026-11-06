import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { isAdmin } from '@/lib/auth';
import { media } from '@/lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX = 4 * 1024 * 1024; // 4MB (브라우저에서 1600px·WebP로 압축 후 업로드)

// 파일 내용(매직 바이트)으로 실제 이미지 형식 판별 — 확장자·MIME 신뢰하지 않음
function sniff(b: Buffer): { ext: 'webp' | 'jpg' | 'png' | 'gif'; type: string } | null {
  if (b.length > 12 && b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') return { ext: 'webp', type: 'image/webp' };
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { ext: 'jpg', type: 'image/jpeg' };
  if (b.length > 8 && b.readUInt32BE(0) === 0x89504e47) return { ext: 'png', type: 'image/png' };
  if (b.toString('ascii', 0, 4) === 'GIF8') return { ext: 'gif', type: 'image/gif' };
  return null;
}

export async function POST(req: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ ok: false }, { status: 401 });
  const fd = await req.formData().catch(() => null);
  const file = fd?.get('file');
  if (!file || typeof file === 'string') return NextResponse.json({ ok: false, error: 'no_file' }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 });
  const buf = Buffer.from(await file.arrayBuffer());
  const kind = sniff(buf);
  if (!kind) return NextResponse.json({ ok: false, error: 'not_image' }, { status: 415 });
  const name = `${Date.now().toString(36)}${randomBytes(5).toString('hex')}.${kind.ext}`;
  await media.save(name, buf, kind.type);
  return NextResponse.json({ ok: true, url: `/api/media/${name}` });
}
