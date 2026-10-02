import React, { createContext, useContext, useEffect, useState } from 'react';
import { Language } from '../types';
import { translations, TranslationDictionary } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRtl: boolean;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'en';
    const saved = localStorage.getItem('portfolio-lang') as Language | null;
    if (saved === 'en' || saved === 'fr' || saved === 'ar') return saved;
    // Auto-detect browser language if available
    const browserLang = navigator.language?.toLowerCase() || '';
    if (browserLang.startsWith('ar')) return 'ar';
    if (browserLang.startsWith('fr')) return 'fr';
    return 'en';
  });

  const isRtl = language === 'ar';

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = isRtl ? 'rtl' : 'ltr';
    localStorage.setItem('portfolio-lang', language);
  }, [language, isRtl]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRtl, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
