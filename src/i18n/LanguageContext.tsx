import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface TranslationObj {
  es: string;
  en: string;
  [key: string]: any;
}

interface LanguageContextType {
  lang: string;
  setLang: (lang: string) => void;
  toggleLanguage: () => void;
  t: (translations: TranslationObj | string) => string;
  tArr: (translations: any) => string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState('es');

  const toggleLanguage = useCallback(() => {
    setLang(prev => prev === 'es' ? 'en' : 'es');
  }, []);

  const t = useCallback((translations: any): string => {
    if (!translations) return '';
    if (typeof translations === 'string') return translations;
    return translations[lang] || translations.es || '';
  }, [lang]);

  const tArr = useCallback((translations: any): string[] => {
    if (!translations) return [];
    return translations[lang] || translations.es || [];
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
