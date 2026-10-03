import { del, get, list, put } from '@vercel/blob';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * 저장소 추상화 — Vercel Blob(BLOB_READ_WRITE_TOKEN 존재 시) / 로컬 파일(.data/, 개발용)
 * 컬렉션: inquiries (문의), news (관리자 작성 소식)
 */
// Vercel Blob: 신규 연결은 OIDC + BLOB_STORE_ID, 구형은 BLOB_READ_WRITE_TOKEN
const useBlob = () => !!(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL);
const LOCAL = path.join(process.cwd(), '.data');

export type Inquiry = {
  id: string; createdAt: string; locale: string; name: string; company: string; email: string; phone: string; country: string;
  type: string; product: string; quantity: string; message: string; status: 'new' | 'in_progress' | 'done'; memo?: string; ip?: string;
};
export type NewsPost = { id: string; createdAt: string; date: string; category: string; title: string; summary: string; body: string; locale: 'ko' | 'en' | 'ja' | 'zh' | 'uz' | 'tr' | 'both'; published: boolean };

async function readAll<T>(prefix: string): Promise<T[]> {
  if (useBlob()) {
    const out: T[] = []; let cursor: string | undefined;
    do {
      const r = await list({ prefix: `${prefix}/`, cursor, limit: 500 });
      const items = await Promise.all(r.blobs.map(async (b) => {
        const g = await get(b.pathname, { access: 'private', useCache: false });
        if (!g || g.statusCode !== 200) return null;
        return JSON.parse(await new Response(g.stream).text()) as T;
      }));
      out.push(...(items.filter(Boolean) as T[])); cursor = r.hasMore ? r.cursor : undefined;
    } while (cursor);
    return out;
  }
  try {
    const dir = path.join(LOCAL, prefix); await fs.mkdir(dir, { recursive: true });
    const files = await fs.readdir(dir);
    return Promise.all(files.filter((f) => f.endsWith('.json')).map(async (f) => JSON.parse(await fs.readFile(path.join(dir, f), 'utf8')) as T));
  } catch { return []; }
}
async function readOne<T>(prefix: string, id: string): Promise<T | null> {
  if (useBlob()) {
    const g = await get(`${prefix}/${id}.json`, { access: 'private', useCache: false }).catch(() => null);
    if (!g || g.statusCode !== 200) return null;
    return JSON.parse(await new Response(g.stream).text()) as T;
  }
  try { return JSON.parse(await fs.readFile(path.join(LOCAL, prefix, `${id}.json`), 'utf8')) as T; } catch { return null; }
}
async function writeOne<T>(prefix: string, id: string, data: T) {
  if (useBlob()) {
    await put(`${prefix}/${id}.json`, JSON.stringify(data), { access: 'private', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json' });
    return;
  }
  const dir = path.join(LOCAL, prefix); await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, `${id}.json`), JSON.stringify(data, null, 2));
}
async function removeOne(prefix: string, id: string) {
  if (useBlob()) { await del(`${prefix}/${id}.json`); return; }
  await fs.unlink(path.join(LOCAL, prefix, `${id}.json`)).catch(() => {});
}

export const inquiries = {
  list: async () => (await readAll<Inquiry>('inquiries')).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  get: (id: string) => readOne<Inquiry>('inquiries', id),
  save: (q: Inquiry) => writeOne('inquiries', q.id, q),
  remove: (id: string) => removeOne('inquiries', id),
};
export const news = {
  list: async () => (await readAll<NewsPost>('news')).sort((a, b) => b.date.localeCompare(a.date)),
  get: (id: string) => readOne<NewsPost>('news', id),
  save: (p: NewsPost) => writeOne('news', p.id, p),
  remove: (id: string) => removeOne('news', id),
};
export const storageMode = () => (useBlob() ? 'vercel-blob' : 'local-file');
