import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Language } from '../../types';
import { Globe, Check } from 'lucide-react';

export const FloatingLanguageSwitcher: React.FC = () => {
  const { language, setLanguage, isRtl } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string; nativeName: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'EN' },
    { code: 'fr', label: 'Français', flag: '🇫🇷', nativeName: 'FR' },
    { code: 'ar', label: 'العربية', flag: '🇩🇿', nativeName: 'عربي' },
  ];

  return (
    <div
      className={`fixed bottom-6 ${
        isRtl ? 'left-6' : 'right-6'
      } z-40 flex flex-col items-end gap-2 font-sans`}
    >
      {/* Expanded Menu */}
      {isOpen && (
        <div className="p-2 rounded-2xl bg-[#140822]/95 backdrop-blur-xl border border-pink-700/50 shadow-2xl shadow-black/80 space-y-1 w-40 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-pink-400 font-bold border-b border-pink-950/80 mb-1">
            {isRtl ? 'اختر لغة الموقع' : 'Choose Language'}
          </div>
          {languages.map((l) => {
            const isActive = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setIsOpen(false);
                }}
                className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-pink-950/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{l.flag}</span>
                  <span>{l.label}</span>
                </div>
                {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#180927]/90 hover:bg-[#200c34] text-white border border-pink-600/60 shadow-xl shadow-pink-950/40 backdrop-blur-xl hover:scale-105 active:scale-95 transition-all duration-200 group cursor-pointer"
        title="تغيير اللغة / Change Language / Changer de langue"
      >
        <Globe className="w-4 h-4 text-pink-400 group-hover:rotate-45 transition-transform duration-300" />
        <span className="text-xs font-bold uppercase font-mono tracking-wider text-pink-200">
          {language === 'ar' ? '🇩🇿 عربي' : language === 'fr' ? '🇫🇷 FR' : '🇬🇧 EN'}
        </span>
      </button>
    </div>
  );
};
