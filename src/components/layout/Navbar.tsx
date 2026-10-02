import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSecretGate } from '../../context/SecretGateContext';
import { Language } from '../../types';
import { Sun, Moon, Menu, X, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { unlockGate } = useSecretGate();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState('NEXA WEB');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'projects' | 'skills' | 'contact'>('home');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.getProfile();
        if (res.success && res.data?.fullName) {
          setProfileName(res.data.fullName);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadProfile();
  }, []);

  const clickCountRef = React.useRef(0);
  const clickTimerRef = React.useRef<any>(null);

  const handleSecretBrandClick = (e: React.MouseEvent) => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      e.preventDefault();
      unlockGate();
      clickCountRef.current = 0;
      navigate('/admin');
      return;
    }

    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section as any);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', href: '#home', label: t.nav.home },
    { id: 'about', href: '#about', label: t.nav.about },
    { id: 'projects', href: '#projects', label: t.nav.projects },
    { id: 'skills', href: '#skills', label: t.nav.skills },
    { id: 'contact', href: '#contact', label: t.nav.contact },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'ar', label: 'عربي', flag: '🇩🇿' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09040e]/95 backdrop-blur-md py-3.5 border-b border-pink-950/80 shadow-lg shadow-black/50'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo: ▲ NEXA WEB */}
          <a
            href="#home"
            onClick={handleSecretBrandClick}
            className="flex items-center gap-2 group focus:outline-none shrink-0 cursor-pointer"
            aria-label="Nexa Web Portfolio"
          >
            <span className="text-pink-400 font-black text-xl transition-transform group-hover:scale-110 drop-shadow-[0_0_12px_rgba(244,114,182,0.6)]">
              ▲
            </span>
            <span className="font-extrabold text-sm sm:text-base tracking-wider text-white uppercase font-sans">
              {profileName}
            </span>
          </a>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-xs xl:text-sm font-medium transition-colors relative py-1 ${
                    isActive
                      ? 'text-pink-300 font-semibold'
                      : 'text-slate-300 hover:text-pink-300'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full shadow-[0_0_8px_#f472b6]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Controls: Prominent Language Switcher & Theme & Admin Link */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher: Visible on BOTH desktop and mobile */}
            <div className="flex items-center rounded-full bg-[#160822] p-1 border border-pink-900/60 shadow-md">
              <span className="hidden sm:inline-flex items-center pl-2 pr-1 text-pink-400 text-xs">
                <Globe className="w-3.5 h-3.5" />
              </span>
              <div className="flex items-center gap-0.5">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    title={l.label}
                    className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      language === l.code
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md shadow-pink-500/30 scale-105'
                        : 'text-slate-400 hover:text-white hover:bg-pink-950/40'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span className="font-mono">{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium text-slate-200 hover:bg-pink-950/60 transition-colors border border-pink-900/60 bg-[#160822]/90 shadow-sm flex items-center gap-1.5"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 fill-amber-300/20" />
              ) : (
                <Moon className="w-4 h-4 text-pink-400 fill-pink-400/20" />
              )}
              <span className="hidden md:inline text-[11px]">
                {theme === 'dark' ? t.nav.lightMode : t.nav.darkMode}
              </span>
            </button>


            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-200 hover:bg-pink-950/60 border border-pink-900/50 bg-[#160822]/90"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-[#0f0718]/98 backdrop-blur-xl border border-pink-900/50 shadow-2xl space-y-3">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-slate-200 hover:bg-pink-500/10 hover:text-pink-300 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

          </div>
        )}
      </div>
    </header>
  );
};
