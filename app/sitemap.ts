import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/solkern', '/origin', '/ermak', '/material-lab', '/b2b', '/news', '/contact'];
  return ['ko', 'en'].flatMap((l) => paths.map((p) => ({ url: `https://www.solkern.kr/${l}${p}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })));
}
