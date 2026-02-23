import { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es');

  const toggleLanguage = useCallback(() => {
    setLang(prev => prev === 'es' ? 'en' : 'es');
  }, []);

  const t = useCallback((translations) => {
    if (!translations) return '';
    if (typeof translations === 'string') return translations;
    return translations[lang] || translations.es || '';
  }, [lang]);

  const tArr = useCallback((translations) => {
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
