import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';

// 루트(/) 접속 시 언어 자동 선택: 쿠키 → 브라우저 언어 → 기본 ko
export default function Root() {
  const saved = cookies().get('locale')?.value;
  if (saved === 'ko' || saved === 'en') redirect(`/${saved}`);
  const accept = (headers().get('accept-language') || '').toLowerCase();
  redirect(accept.startsWith('en') ? '/en' : '/ko');
}
