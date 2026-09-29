import type { Inquiry } from './store';
/** Resend API 키가 있으면 문의 접수 알림 메일 발송 (없으면 조용히 건너뜀) */
export async function notifyInquiry(q: Inquiry) {
  const key = process.env.RESEND_API_KEY; const to = process.env.NOTIFY_EMAIL || 'solkern@solkern.kr';
  if (!key) return;
  const from = process.env.NOTIFY_FROM || 'SOLKERN Web <onboarding@resend.dev>';
  const html = `<h2>[SOLKERN] 새 문의: ${q.type}</h2><table>${Object.entries({ 성함: q.name, 회사: q.company, 이메일: q.email, 연락처: q.phone, 국가: q.country, 유형: q.type, 품목: q.product, 수량: q.quantity }).map(([k, v]) => `<tr><td><b>${k}</b></td><td>${v || '-'}</td></tr>`).join('')}</table><p style="white-space:pre-wrap">${q.message}</p><p><a href="https://www.solkern.kr/admin">관리자 페이지에서 보기</a></p>`;
  await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from, to, subject: `[SOLKERN 문의] ${q.type} — ${q.company || q.name}`, html }) }).catch(() => {});
}
