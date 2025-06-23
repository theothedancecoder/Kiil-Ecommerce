'use client';

import { useLanguage } from "@/lib/languageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'no' : 'en')}
      className="flex items-center justify-center px-3 py-1 text-sm rounded-md hover:bg-accent/10"
      style={{
        fontFamily: "'Montserrat', Verdana, Helvetica, sans-serif",
        fontSize: "14px",
        color: "#333333"
      }}
    >
      {language === 'en' ? 'NO' : 'EN'}
    </button>
  );
}
