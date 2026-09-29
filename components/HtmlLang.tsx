'use client';
import { useEffect } from 'react';
/* 로케일별 <html lang> 동기화 — 폰트 폴백(:lang)·스크린리더·번역기 판단용 */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return null;
}
