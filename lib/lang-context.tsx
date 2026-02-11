'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Lang = 'en' | 'zh';

interface LangCtxType {
  lang: Lang;
  toggle: () => void;
}

const LangCtx = createContext<LangCtxType>({ lang: 'en', toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null;
    if (stored === 'zh') setLang('zh');
  }, []);

  const toggle = () => {
    setLang(prev => {
      const next = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  return <LangCtx.Provider value={{ lang, toggle }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx).lang;
export const useLangContext = () => useContext(LangCtx);
