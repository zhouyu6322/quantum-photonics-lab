'use client';

import { useLang } from '@/lib/lang-context';

/** 行内双语切换组件，可用于 server component 中 */
export function T({ en, zh }: { en: string; zh: string }) {
  const lang = useLang();
  return <>{lang === 'zh' ? zh : en}</>;
}
