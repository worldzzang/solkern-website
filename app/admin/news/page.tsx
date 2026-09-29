import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { news, storageMode } from '@/lib/store';
import AdminShell from '@/components/admin/AdminShell';
import NewsManager from '@/components/admin/NewsManager';
export const dynamic = 'force-dynamic';

export default async function AdminNews() {
  if (!isAdmin()) redirect('/admin/login');
  const items = await news.list().catch(() => []);
  return (
    <AdminShell active="news" storage={storageMode()}>
      <NewsManager initial={items} />
    </AdminShell>
  );
}
