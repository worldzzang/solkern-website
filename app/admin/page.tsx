import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/auth';
import { inquiries, storageMode } from '@/lib/store';
import AdminShell from '@/components/admin/AdminShell';
import InquiryTable from '@/components/admin/InquiryTable';
export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  if (!isAdmin()) redirect('/admin/login');
  const items = await inquiries.list().catch(() => []);
  const stats = { total: items.length, new: items.filter((i) => i.status === 'new').length, prog: items.filter((i) => i.status === 'in_progress').length, done: items.filter((i) => i.status === 'done').length };
  return (
    <AdminShell active="inquiries" storage={storageMode()}>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[['전체 문의', stats.total, 'bg-forest text-white'], ['신규', stats.new, 'bg-gold text-white'], ['진행 중', stats.prog, 'bg-white'], ['완료', stats.done, 'bg-white']].map(([l, v, c]) => (
          <div key={l as string} className={`card p-5 ${c}`}><p className="text-xs opacity-70">{l}</p><p className="display mt-1 text-4xl">{v as number}</p></div>
        ))}
      </div>
      <InquiryTable initial={items} />
    </AdminShell>
  );
}
