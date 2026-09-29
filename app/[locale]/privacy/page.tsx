import { usePage } from '@/lib/page';
export default function Privacy({ params }: { params: { locale: string } }) {
  const { locale, dict } = usePage(params);
  const ko = locale === 'ko';
  return (
    <section className="bg-ivory"><div className="container-x prose max-w-3xl py-36 sm:py-44">
      <h1 className="h2">{ko ? '개인정보처리방침' : 'Privacy Policy'}</h1>
      <p className="mt-6 text-sm leading-relaxed text-ink-3">{ko ? '주식회사 솔컨(이하 "회사")은 홈페이지 문의 접수를 위해 아래와 같이 개인정보를 수집·이용합니다.' : 'SOLKERN Co., Ltd. (the "Company") collects and uses personal data for handling website inquiries as follows.'}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-3">
        <li>{ko ? '수집 항목: 성함, 회사명, 이메일, 연락처, 국가, 문의 내용' : 'Items: name, company, email, phone, country, message'}</li>
        <li>{ko ? '수집 목적: 문의 회신, 견적·샘플·자료 제공' : 'Purpose: replying to inquiries; providing quotes, samples and documents'}</li>
        <li>{ko ? '보관 기간: 접수일로부터 1년 (관계 법령에 따라 보관이 필요한 경우 해당 기간)' : 'Retention: 1 year from receipt, or as required by applicable law'}</li>
        <li>{ko ? '제3자 제공: 없음 (법령에 따른 경우 제외)' : 'Third-party disclosure: none, except as required by law'}</li>
        <li>{ko ? `문의: ${dict.footer.email}` : `Contact: ${dict.footer.email}`}</li>
      </ul>
    </div></section>
  );
}
