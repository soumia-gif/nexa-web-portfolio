import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { api } from '../../services/api';
import { FileText, Download, ExternalLink, CheckCircle2, ShieldCheck, Award } from 'lucide-react';

export const CvDownloadSection: React.FC = () => {
  const { language } = useLanguage();
  const [profile, setProfile] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profileRes, settingsRes] = await Promise.all([
          api.getProfile(),
          api.getSettings(),
        ]);
        if (profileRes.success && profileRes.data) setProfile(profileRes.data);
        if (settingsRes.success && settingsRes.data) setSettings(settingsRes.data);
      } catch (err) {
        // Fallback
      }
    };
    loadData();
  }, []);

  const resumeUrl = profile?.resumeUrl
    ? profile.resumeUrl.startsWith('/uploads')
      ? `http://localhost:5000${profile.resumeUrl}`
      : profile.resumeUrl
    : '';

  const fileName = settings?.cvSettings?.fileName || 'Nexa_Web_Studio_Presentation.pdf';
  const cvTitle =
    settings?.cvSettings?.title?.[language] ||
    (language === 'ar'
      ? 'الملف التعريفي لاستوديو نيكسا ويب (PDF)'
      : language === 'fr'
      ? 'Présentation Officielle Nexa Web (PDF)'
      : 'Official Studio Presentation (PDF)');

  const cvDesc =
    settings?.cvSettings?.description?.[language] ||
    (language === 'ar'
      ? 'قم بتحميل الملف التعريفي الكامل لاستوديو نيكسا ويب بصيغة PDF للاطلاع على خدماتنا البرمجية، مجالات خبرتنا وأبرز مشاريعنا.'
      : language === 'fr'
      ? 'Téléchargez la présentation officielle de Nexa Web au format PDF pour découvrir nos services de développement web, nos compétences techniques et nos réalisations.'
      : 'Download our official studio presentation in PDF format to discover our web development services, technical proficiencies, and past projects.');

  return (
    <section id="cv" className="py-20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-rose-950/20 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 border backdrop-blur-xl bg-[#12071a]/90 border-pink-900/50 shadow-2xl shadow-black/60 overflow-hidden">
          {/* Decorative Corner Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-pink-500/15 via-purple-600/10 to-transparent rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-start space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-pink-300 bg-pink-950/60 border border-pink-800/50">
                <Award className="w-3.5 h-3.5 text-pink-400" />
                <span>{language === 'ar' ? 'وثيقة رسمية • PDF' : 'Official Document • PDF'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {cvTitle}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 dark:text-pink-100/80 leading-relaxed max-w-xl">
                {cvDesc}
              </p>

              {/* Highlights pills */}
              <div className="flex items-center justify-center md:justify-start gap-4 pt-2 text-xs text-pink-200/90 font-medium flex-wrap">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                  <span>{language === 'ar' ? 'جاهز للطباعة والتحميل' : 'Print & Download Ready'}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  <span>{language === 'ar' ? 'بيانات معتمدة ومحدثة' : 'Verified & Updated'}</span>
                </span>
              </div>
            </div>

            {/* Right Action Card */}
            <div className="shrink-0 flex flex-col items-center gap-3 w-full sm:w-auto">
              {resumeUrl ? (
                <>
                  <a
                    href={resumeUrl}
                    download={fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:via-rose-400 hover:to-purple-500 shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    <Download className="w-5 h-5" />
                    <span>{language === 'ar' ? `تحميل ${cvTitle} (PDF)` : language === 'fr' ? `Télécharger ${cvTitle} (PDF)` : `Download ${cvTitle} (PDF)`}</span>
                  </a>

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-pink-300 hover:text-white transition-colors underline-offset-4 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'معاينة مباشرة في المتصفح' : 'Preview Online in Browser'}</span>
                  </a>
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-900/40 text-center text-xs text-pink-300/80">
                  <FileText className="w-6 h-6 mx-auto mb-2 text-pink-400 opacity-60" />
                  <span>{language === 'ar' ? 'الملف متاح قريباً' : 'Resume file available soon'}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
