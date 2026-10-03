import { ko } from '@/content/ko';
import { en } from '@/content/en';
import { ja } from '@/content/ja';
import { zh } from '@/content/zh';
import { uz } from '@/content/uz';
import { tr } from '@/content/tr';
import type { Dict, Locale } from '@/content/types';

export const LOCALES: Locale[] = ['ko', 'en', 'ja', 'zh', 'uz', 'tr'];
export const LOCALE_LABELS: Record<Locale, { short: string; name: string; og: string; html: string }> = {
  ko: { short: 'KO', name: '한국어', og: 'ko_KR', html: 'ko' },
  en: { short: 'EN', name: 'English', og: 'en_US', html: 'en' },
  ja: { short: 'JA', name: '日本語', og: 'ja_JP', html: 'ja' },
  zh: { short: 'ZH', name: '中文', og: 'zh_CN', html: 'zh-Hans' },
  uz: { short: 'UZ', name: 'O‘zbekcha', og: 'uz_UZ', html: 'uz' },
  tr: { short: 'TR', name: 'Türkçe', og: 'tr_TR', html: 'tr' },
};
const DICTS: Record<Locale, Dict> = { ko, en, ja, zh, uz, tr };
export function isLocale(x: string): x is Locale { return (LOCALES as string[]).includes(x); }
export function getDict(locale: Locale): Dict { return DICTS[locale] ?? ko; }
export function withLocale(locale: Locale, href: string) { return `/${locale}${href === '/' ? '' : href}`; }
