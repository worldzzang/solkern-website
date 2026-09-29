import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE, checkPassword, makeToken } from '@/lib/auth';
export const runtime = 'nodejs';
const fails = new Map<string, number[]>();
export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown';
  const now = Date.now(); const f = (fails.get(ip) || []).filter((t) => now - t < 15 * 60_000);
  if (f.length >= 10) return NextResponse.json({ ok: false, error: 'locked' }, { status: 429 });
  const { password } = await req.json().catch(() => ({ password: '' }));
  if (!checkPassword(password)) { fails.set(ip, [...f, now]); return NextResponse.json({ ok: false, error: 'invalid' }, { status: 401 }); }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 12 });
  return res;
}
