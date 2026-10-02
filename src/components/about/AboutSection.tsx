import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import {
  Layers,
  Sparkles,
  Code2,
  Terminal,
  CheckCircle2,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language, t, isRtl } = useLanguage();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.getProfile();
        if (res.success && res.data) {
          setProfile(res.data);
        }
      } catch (e) {
        // Fallback
      }
    };
    fetchProfile();
  }, []);

  const bioP1 = profile?.aboutBio?.paragraph1?.[language] || profile?.aboutBio?.paragraph1?.fr || profile?.aboutBio?.paragraph1?.en || t.about.bioParagraph1;
  const bioP2 = profile?.aboutBio?.paragraph2?.[language] || profile?.aboutBio?.paragraph2?.fr || profile?.aboutBio?.paragraph2?.en || t.about.bioParagraph2;
  
  const statsProjects = profile?.stats?.completedProjects || t.about.statsProjects;
  const statsProjectsLabel = profile?.stats?.completedProjectsLabel?.[language] || profile?.stats?.completedProjectsLabel?.fr || profile?.stats?.completedProjectsLabel?.en || t.about.statsProjectsSub;

  const statsExp = profile?.stats?.yearsExperience || t.about.statsExp;
  const statsExpLabel = profile?.stats?.yearsExperienceLabel?.[language] || profile?.stats?.yearsExperienceLabel?.fr || profile?.stats?.yearsExperienceLabel?.en || t.about.statsExpSub;

  const statsFocus = profile?.stats?.codeCommits || t.about.statsFocus;
  const statsFocusLabel = profile?.stats?.codeCommitsLabel?.[language] || profile?.stats?.codeCommitsLabel?.fr || profile?.stats?.codeCommitsLabel?.en || t.about.statsFocusSub;

  const eduSectionTitle = profile?.education?.title?.[language] || profile?.education?.title?.fr || profile?.education?.title?.en || t.about.educationTitle;
  const eduDegree = profile?.education?.degree?.[language] || profile?.education?.degree?.fr || profile?.education?.degree?.en || t.about.educationDegree;
  const eduSchool = profile?.education?.school?.[language] || profile?.education?.school?.fr || profile?.education?.school?.en || t.about.educationSchool;
  const eduStatus = profile?.education?.status?.[language] || profile?.education?.status?.fr || profile?.education?.status?.en || (isRtl ? 'خدمات معتمدة' : language === 'fr' ? 'Studio Actif' : 'Active Studio');
  const eduDesc = profile?.education?.description?.[language] || profile?.education?.description?.fr || profile?.education?.description?.en || t.about.educationDesc;

  const defaultHighlights = [
    {
      en: 'Modern Web Development',
      fr: 'Développement Web Moderne',
      ar: 'تطوير مواقع الويب الحديثة',
    },
    {
      en: 'Responsive Design',
      fr: 'Design Réactif & Multi-Écrans',
      ar: 'تصميم متجاوب لكافة الشاشات',
    },
    {
      en: 'Web Applications',
      fr: 'Applications Web Interactives',
      ar: 'تطبيقات الويب المتكاملة',
    },
    {
      en: 'E-commerce Solutions',
      fr: 'Solutions E-commerce',
      ar: 'حلول المتاجر والتجارة الإلكترونية',
    },
    {
      en: 'Frontend Development',
      fr: 'Développement Frontend (React)',
      ar: 'تطوير الواجهات الأمامية (React)',
    },
    {
      en: 'Backend Development',
      fr: 'Développement Backend (Node / Express)',
      ar: 'تطوير الخوادم البرمجية (Node / Express)',
    },
    {
      en: 'API Integration',
      fr: 'Intégration d’APIs & Services',
      ar: 'ربط واجهات برمجة التطبيقات (APIs)',
    },
  ];

  const highlights = (profile?.education?.highlights && profile.education.highlights.length > 0)
    ? profile.education.highlights
    : defaultHighlights;

  return (
    <section id="about" className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-medium text-pink-300 bg-pink-950/60 border border-pink-800/40 mb-3 shadow-md shadow-pink-950/30">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>{t.nav.about}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm mb-3">
            {t.about.title}
          </h2>
          <p className="text-sm sm:text-base text-pink-200/70 max-w-xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Bio & Core Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#12071d]/85 border border-pink-900/40 shadow-2xl backdrop-blur-xl relative overflow-hidden">
              <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                <p>{bioP1}</p>
                <p>{bioP2}</p>
              </div>

              {/* Stat counters */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 mt-6 border-t border-pink-950/80">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0a0312] border border-pink-950 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">
                    {statsProjects}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                    {statsProjectsLabel}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0a0312] border border-pink-950 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-300">
                    {statsExp}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                    {statsExpLabel}
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0a0312] border border-pink-950 text-center">
                  <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">
                    {statsFocus}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                    {statsFocusLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Technical Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#12071d]/70 border border-pink-950 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-pink-950/50 border border-pink-800/40 text-pink-400 shrink-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">
                    {isRtl ? 'بناء تطبيقات متكاملة' : 'Full-Stack Architecture'}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isRtl
                      ? 'ربط واجهات React التفاعلية بخوادم Express وقواعد بيانات MongoDB.'
                      : 'End-to-end web apps integrating responsive React frontends with Express and MongoDB.'}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#12071d]/70 border border-pink-950 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-purple-950/50 border border-purple-800/40 text-purple-400 shrink-0">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white mb-1">
                    {isRtl ? 'كود نظيف وأداء عالي' : 'Clean Code & Performance'}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isRtl
                      ? 'هيكلة معيارية قابلة للصيانة، دعم اللغات المتعددة، وسرعة الاستجابة.'
                      : 'Maintainable modular structure, multilingual support, and fast load times.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Capabilities (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#12071d]/85 border border-pink-900/40 shadow-2xl backdrop-blur-xl relative space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-pink-950/80">
                <div className="p-3 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-600/20 border border-pink-500/30 text-pink-300">
                  <Layers className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">{eduSectionTitle}</h3>
                  <span className="text-xs text-pink-400 font-mono">{eduSchool}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#0a0312] border border-pink-950">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">
                      {eduDegree}
                    </span>
                    <span className="text-[10px] font-mono bg-pink-950/80 text-pink-300 px-2 py-0.5 rounded border border-pink-800/40">
                      {eduStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">
                    {eduDesc}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  {highlights.map((item: any, idx: number) => {
                    const text = typeof item === 'string'
                      ? item
                      : (item?.[language] || item?.fr || item?.en || item?.ar || '');
                    if (!text) return null;
                    return (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                        <span>{text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
