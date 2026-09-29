import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE = 'solkern_admin';
const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret';
const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('hex');

export function makeToken() { const exp = Date.now() + 1000 * 60 * 60 * 12; const p = String(exp); return `${p}.${sign(p)}`; }
export function verifyToken(t?: string) {
  if (!t) return false; const [p, sig] = t.split('.'); if (!p || !sig) return false;
  const expect = sign(p); if (expect.length !== sig.length) return false;
  if (!timingSafeEqual(Buffer.from(expect), Buffer.from(sig))) return false;
  return Number(p) > Date.now();
}
export function isAdmin() { return verifyToken(cookies().get(COOKIE)?.value); }
export function checkPassword(pw: string) { const real = process.env.ADMIN_PASSWORD; return !!real && pw === real; }
export const ADMIN_COOKIE = COOKIE;
