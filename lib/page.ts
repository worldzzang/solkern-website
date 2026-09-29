import { notFound } from 'next/navigation';
import { getDict, isLocale } from './i18n';
import type { Locale } from '@/content/types';
export function usePage(params: { locale: string }) {
  if (!isLocale(params.locale)) notFound();
  const locale = params.locale as Locale;
  return { locale, dict: getDict(locale) };
}
