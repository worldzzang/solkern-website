import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.solkern.kr'),
  title: 'SOLKERN | From Origin to New Value',
  description: '우즈베키스탄·튀르키예 자연 식품 ERMÁK·ASIL 아시아 공동진출 공식파트너 · 과일 원료·부산물 R&D · 한국 2차 가공',
  icons: { icon: [{ url: '/icon-64.png', sizes: '64x64' }, { url: '/icon-192.png', sizes: '192x192' }], apple: '/icon-192.png' },
  openGraph: { images: ['/images/logo/solkern-horizontal.png'] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
