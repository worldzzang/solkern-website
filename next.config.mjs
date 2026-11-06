/** @type {import('next').NextConfig} */
const LOCALE_PAGES = ['solkern', 'origin', 'ermak', 'material-lab', 'b2b', 'news', 'contact', 'privacy'];
const nextConfig = {
  images: { formats: ['image/webp'] },
  // 언어 없이 들어온 주소(/ermak 등)는 한국어 페이지로 보냄 (미들웨어 대체)
  // 관리자에서 바꾸는 데이터(공지·문의)가 지나가는 경로는 브라우저·Vercel CDN 어디에도 캐시하지 않음
  async headers() {
    const noStore = [
      { key: 'Cache-Control', value: 'private, no-cache, no-store, max-age=0, must-revalidate' },
      { key: 'CDN-Cache-Control', value: 'no-store' },
      { key: 'Vercel-CDN-Cache-Control', value: 'no-store' },
    ];
    return [
      { source: '/api/:path((?!media/).*)', headers: noStore },
      { source: '/admin/:path*', headers: noStore },
      { source: '/:locale(ko|en|ja|zh|uz|tr)/news', headers: noStore },
    ];
  },
  async redirects() {
    return LOCALE_PAGES.map((p) => ({ source: `/${p}`, destination: `/ko/${p}`, permanent: false }));
  },
};
export default nextConfig;
