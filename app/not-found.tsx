import Link from 'next/link';
export default function NotFound() {
  return <div className="flex min-h-screen flex-col items-center justify-center bg-ivory text-center"><p className="eyebrow">404</p><h1 className="h2 mt-4">Page not found</h1><Link href="/ko" className="btn-dark mt-8">SOLKERN Home</Link></div>;
}
