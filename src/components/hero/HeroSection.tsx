import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { getThemeStyles } from '../../utils/themeStyles';
import { api } from '../../services/api';
import { FileDown, Sparkles } from 'lucide-react';
import { SocialLinksBar } from '../layout/SocialLinksBar';

export const HeroSection: React.FC = () => {
  const { language, t } = useLanguage();
  const { bgTheme } = useTheme();
  const styles = getThemeStyles(bgTheme);
  const [profile, setProfile] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [profileRes, settingsRes] = await Promise.all([
          api.getProfile(),
          api.getSettings(),
        ]);
        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }
        if (settingsRes.success && settingsRes.data) {
          setSettings(settingsRes.data);
        }
      } catch (e) {
        // Fallback
      }
    };
    loadProfile();
  }, []);

  const rolePrefix =
    profile?.rolePrefix?.[language] || profile?.rolePrefix?.en || t.hero.rolePrefix;
  const roleHighlight =
    profile?.roleHighlight?.[language] || profile?.roleHighlight?.en || t.hero.roleHighlight;
  const subheading =
    profile?.subheading?.[language] || profile?.subheading?.en || t.hero.subheading;
  const resumeUrl = profile?.resumeUrl
    ? profile.resumeUrl.startsWith('/uploads')
      ? `http://localhost:5000${profile.resumeUrl}`
      : profile.resumeUrl
    : '';

  const cvFileName = settings?.cvSettings?.fileName || 'Nexa_Web_Presentation.pdf';
  const cvTitle =
    settings?.cvSettings?.title?.[language] ||
    (language === 'ar'
      ? 'الملف التعريفي (PDF)'
      : language === 'fr'
      ? 'Présentation Studio'
      : 'Studio Presentation');

  const getRibbonGradients = () => {
    switch (bgTheme) {
      case 'cyber-matrix':
        return (
          <>
            <div className="absolute top-1/4 right-0 w-[45rem] h-[25rem] bg-gradient-to-l from-emerald-900/35 via-teal-900/20 to-transparent blur-3xl rounded-full transform rotate-12" />
            <div className="absolute top-1/3 left-0 w-[40rem] h-[20rem] bg-gradient-to-r from-green-950/35 via-emerald-950/25 to-transparent blur-3xl rounded-full transform -rotate-12" />
            <div className="absolute top-24 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-90 shadow-[0_0_12px_#34d399]" />
            <div className="absolute top-40 right-1/4 w-2 h-2 rounded-full bg-teal-300 opacity-85 shadow-[0_0_14px_#2dd4bf]" />
          </>
        );
      case 'deep-cosmos':
        return (
          <>
            <div className="absolute top-1/4 right-0 w-[45rem] h-[25rem] bg-gradient-to-l from-blue-900/35 via-indigo-900/25 to-transparent blur-3xl rounded-full transform rotate-12" />
            <div className="absolute top-1/3 left-0 w-[40rem] h-[20rem] bg-gradient-to-r from-purple-950/35 via-blue-950/25 to-transparent blur-3xl rounded-full transform -rotate-12" />
            <div className="absolute top-24 left-1/4 w-1.5 h-1.5 rounded-full bg-blue-300 opacity-90 shadow-[0_0_12px_#60a5fa]" />
            <div className="absolute top-40 right-1/4 w-2 h-2 rounded-full bg-cyan-300 opacity-85 shadow-[0_0_14px_#38bdf8]" />
          </>
        );
      case 'sunset-aurora':
        return (
          <>
            <div className="absolute top-1/4 right-0 w-[45rem] h-[25rem] bg-gradient-to-l from-amber-900/35 via-rose-900/25 to-transparent blur-3xl rounded-full transform rotate-12" />
            <div className="absolute top-1/3 left-0 w-[40rem] h-[20rem] bg-gradient-to-r from-orange-950/35 via-rose-950/25 to-transparent blur-3xl rounded-full transform -rotate-12" />
            <div className="absolute top-24 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-300 opacity-90 shadow-[0_0_12px_#f59e0b]" />
            <div className="absolute top-40 right-1/4 w-2 h-2 rounded-full bg-rose-400 opacity-85 shadow-[0_0_14px_#f43f5e]" />
          </>
        );
      case 'minimal-mesh':
        return (
          <>
            <div className="absolute top-1/4 right-0 w-[45rem] h-[25rem] bg-gradient-to-l from-slate-800/30 via-zinc-800/20 to-transparent blur-3xl rounded-full transform rotate-12" />
            <div className="absolute top-1/3 left-0 w-[40rem] h-[20rem] bg-gradient-to-r from-cyan-950/25 via-slate-900/25 to-transparent blur-3xl rounded-full transform -rotate-12" />
            <div className="absolute top-24 left-1/4 w-1.5 h-1.5 rounded-full bg-slate-300 opacity-90 shadow-[0_0_12px_#94a3b8]" />
            <div className="absolute top-40 right-1/4 w-2 h-2 rounded-full bg-cyan-200 opacity-85 shadow-[0_0_14px_#a5f3fc]" />
          </>
        );
      case 'midnight-orchid':
      default:
        return (
          <>
            <div className="absolute top-1/4 right-0 w-[45rem] h-[25rem] bg-gradient-to-l from-fuchsia-900/30 via-pink-900/20 to-transparent blur-3xl rounded-full transform rotate-12" />
            <div className="absolute top-1/3 left-0 w-[40rem] h-[20rem] bg-gradient-to-r from-rose-950/35 via-purple-950/25 to-transparent blur-3xl rounded-full transform -rotate-12" />
            <div className="absolute top-24 left-1/4 w-1.5 h-1.5 rounded-full bg-pink-300 opacity-80 shadow-[0_0_12px_#f472b6]" />
            <div className="absolute top-40 right-1/4 w-2 h-2 rounded-full bg-rose-300 opacity-85 shadow-[0_0_14px_#fb7185]" />
          </>
        );
    }
  };

  return (
    <section id="home" className="relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Dynamic Themed Ambient Ribbons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {getRibbonGradients()}
        <div className="absolute top-64 right-1/3 w-1.5 h-1.5 rounded-full bg-white opacity-60 shadow-[0_0_10px_#ffffff]" />
        <div className="absolute top-52 left-1/3 w-1.5 h-1.5 rounded-full bg-white opacity-80 shadow-[0_0_12px_#ffffff]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Name pill / Badge */}
        {profile?.fullName && (
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold mb-5 transition-all duration-500 ${styles.badge}`}>
            <Sparkles className={`w-3.5 h-3.5 ${styles.badgeDot}`} />
            <span>{profile.fullName}</span>
          </div>
        )}

        {/* Main Hero Heading with Dynamic Theme Gradient */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.18] mb-6">
          <span className="block text-white font-bold drop-shadow-sm">
            {rolePrefix}
          </span>
          <span className={`block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r ${styles.heroGradient} tracking-tight font-black transition-all duration-700`}>
            {roleHighlight}
          </span>
        </h1>

        {/* Subtitle Paragraph */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-10 font-normal">
          {subheading}
        </p>

        {/* CTA Buttons dynamically styled for current visual theme */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {/* Primary View Projects Button */}
          <a
            href="#projects"
            className={`px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${styles.primaryButton}`}
          >
            {t.hero.viewProjects}
          </a>

          {/* Secondary Contact Me Button */}
          <a
            href="#contact"
            className={`px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${styles.secondaryButton}`}
          >
            {t.hero.contactMe}
          </a>

          {/* Download Resume / CV button */}
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={cvFileName}
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 bg-white/5 text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2 shadow-sm"
            >
              <FileDown className="w-4 h-4 text-pink-400" />
              <span>{language === 'ar' ? `تحميل ${cvTitle}` : language === 'fr' ? `Télécharger ${cvTitle}` : `Download ${cvTitle}`}</span>
            </a>
          ) : (
            <a
              href="#cv"
              className="px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 border border-white/10 bg-white/5 text-slate-200 hover:text-white hover:bg-white/10 flex items-center gap-2 shadow-sm"
            >
              <FileDown className="w-4 h-4 text-pink-400" />
              <span>{cvTitle}</span>
            </a>
          )}
        </div>

        {/* Dynamic Social Links Bar */}
        <div className="mt-10">
          <SocialLinksBar className="justify-center" />
        </div>
      </div>
    </section>
  );
};
