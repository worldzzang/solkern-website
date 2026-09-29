import { ko } from '@/content/ko';
import { en } from '@/content/en';
import type { Dict, Locale } from '@/content/types';

export const LOCALES: Locale[] = ['ko', 'en'];
export function isLocale(x: string): x is Locale { return (LOCALES as string[]).includes(x); }
export function getDict(locale: Locale): Dict { return locale === 'en' ? en : ko; }
export function withLocale(locale: Locale, href: string) { return `/${locale}${href === '/' ? '' : href}`; }
