/** @type {import('next').NextConfig} */
const LOCALE_PAGES = ['solkern', 'origin', 'ermak', 'material-lab', 'b2b', 'news', 'contact', 'privacy'];
const nextConfig = {
  images: { formats: ['image/webp'] },
  // 언어 없이 들어온 주소(/ermak 등)는 한국어 페이지로 보냄 (미들웨어 대체)
  async redirects() {
    return LOCALE_PAGES.map((p) => ({ source: `/${p}`, destination: `/ko/${p}`, permanent: false }));
  },
};
export default nextConfig;
