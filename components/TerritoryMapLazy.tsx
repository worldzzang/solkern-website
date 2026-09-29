'use client';
import dynamic from 'next/dynamic';
import type { Territory } from '@/content/types';

const TerritoryMap = dynamic(() => import('./TerritoryMap'), {
  ssr: false,
  loading: () => <div className="aspect-[702/590] w-full animate-pulse rounded-2xl bg-black/5" />,
});

export default function TerritoryMapLazy(props: { t: Territory; dark?: boolean; compact?: boolean; hideList?: boolean }) {
  return <TerritoryMap {...props} />;
}
