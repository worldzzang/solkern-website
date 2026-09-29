import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';
import { LOCALES } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

// 루트(/) 접속 시 언어 자동 선택: 쿠키 → 브라우저 언어 → 기본 ko
export default function Root() {
  const saved = cookies().get('locale')?.value;
  if (saved && (LOCALES as string[]).includes(saved)) redirect(`/${saved}`);
  // 브라우저 선호 언어 목록 순서대로 첫 번째 지원 언어 선택
  const accept = (headers().get('accept-language') || '').toLowerCase().split(',').map((x) => x.trim().slice(0, 2));
  const hit = accept.find((l) => (LOCALES as string[]).includes(l));
  redirect(`/${hit || 'ko'}`);
}
