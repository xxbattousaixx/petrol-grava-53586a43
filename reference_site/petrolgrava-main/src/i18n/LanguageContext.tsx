import React, { createContext, useContext, useState, useCallback } from "react";
import { Language } from "./translations";

type LanguageContextType = {
  lang: Language;
  toggleLanguage: () => void;
  t: (obj: { es: string; en: string }) => string;
  tArr: (obj: { es: readonly string[]; en: readonly string[] }) => string[];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>("es");

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "es" ? "en" : "es"));
  }, []);

  const t = useCallback((obj: { es: string; en: string }) => obj[lang], [lang]);
  const tArr = useCallback((obj: { es: readonly string[]; en: readonly string[] }) => [...obj[lang]], [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t, tArr }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
