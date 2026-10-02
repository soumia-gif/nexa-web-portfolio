import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SocialLinksBar } from './SocialLinksBar';
import { api } from '../../services/api';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [studioName, setStudioName] = useState('NEXA WEB');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.getProfile();
        if (res.success && res.data?.fullName) {
          setStudioName(res.data.fullName);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadProfile();
  }, []);

  const footerLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#projects', label: t.nav.projects },
    { href: '#skills', label: t.nav.skills },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  return (
    <footer className="py-10 border-t border-pink-950/80 text-pink-200/70 text-xs relative z-10 bg-[#090310]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Brand & Studio Subtitle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-pink-950/60">
          <div className="text-center sm:text-start">
            <h3 className="text-sm font-extrabold tracking-wider text-white uppercase font-sans flex items-center justify-center sm:justify-start gap-2">
              <span className="text-pink-400 font-black">▲</span>
              <span>{studioName}</span>
            </h3>
            <p className="text-[11px] text-pink-300/70 mt-0.5 font-medium">
              Web Development Studio
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex items-center gap-4 text-xs font-medium flex-wrap justify-center">
            {footerLinks.map((link, idx) => (
              <React.Fragment key={link.href}>
                <a
                  href={link.href}
                  className="text-slate-300 hover:text-pink-300 transition-colors"
                >
                  {link.label}
                </a>
                {idx < footerLinks.length - 1 && (
                  <span className="text-pink-900/80 select-none">•</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Copyright & Social Icons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-pink-200/60">
          <p>© 2026 {studioName}. {t.footer.rights}</p>
          
          {/* Dynamic Social Links */}
          <SocialLinksBar iconClassName="w-3.5 h-3.5" />
        </div>

      </div>
    </footer>
  );
};
