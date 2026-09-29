import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.solkern.kr'),
  title: 'SOLKERN | From Origin to New Value',
  description: '우즈베키스탄·튀르키예 자연 식품 ERMÁK·ASIL 공식 아시아 총판 · 과일 원료·부산물 R&D · 한국 2차 가공',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
