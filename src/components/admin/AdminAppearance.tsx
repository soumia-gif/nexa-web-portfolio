import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { BackgroundTheme, SectionConfig } from '../../types';
import {
  Palette,
  Layers,
  FileDown,
  Check,
  AlertCircle,
  Upload,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Save,
  FileText,
  Sparkles,
  ExternalLink,
  Trash2,
} from 'lucide-react';

interface ThemePreset {
  id: BackgroundTheme;
  title: Record<string, string>;
  description: Record<string, string>;
  colors: string;
  badge: string;
}

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'midnight-orchid',
    title: { ar: 'الأوركيد الملكي (Midnight Orchid)', fr: 'Orchidée Sombre (Midnight)', en: 'Midnight Orchid (Default)' },
    description: {
      ar: 'أجواء ليلية مخملية عميقة مع هالات أرجوانية ووردية داكنة وجزيئات برمجية متفاعلة.',
      fr: 'Atmosphère velours sombre aux reflets rose magenta et orchidée avec particules interactives.',
      en: 'Deep midnight velvet backdrop with violet and rose ambient glows and interactive stardust tokens.',
    },
    colors: 'from-pink-900/60 via-purple-950/80 to-[#07020b]',
    badge: 'Luxury Orchid',
  },
  {
    id: 'cyber-matrix',
    title: { ar: 'ماتريكس نيون (Cyber Matrix)', fr: 'Cyber Matrix Émeraude', en: 'Cyber Matrix Neon' },
    description: {
      ar: 'طابع رقمي سايبربانك مستقبلي بلمسات الزمرد والنيون الأخضر وشبكة تدفق البيانات.',
      fr: 'Style cyberpunk futuriste teinté d\'émeraude et vert néon dynamique.',
      en: 'Futuristic cyberpunk tech vibes with glowing emerald neon and digital matrix streams.',
    },
    colors: 'from-emerald-950/70 via-teal-950/80 to-[#030d09]',
    badge: 'Neon Emerald',
  },
  {
    id: 'deep-cosmos',
    title: { ar: 'الفضاء الكوني (Deep Cosmos)', fr: 'Cosmos Profond (Deep Sky)', en: 'Deep Cosmos Starlight' },
    description: {
      ar: 'فضاء لامتناهي مع نجوم ساطعة وأطياف النجوم الزرقاء والبنفسجية المتلألئة.',
      fr: 'Espace infini avec étoiles scintillantes et nébuleuses indigo lumineuses.',
      en: 'Deep space cosmic scenery with twinkling constellations and indigo nebula clouds.',
    },
    colors: 'from-blue-950/60 via-indigo-950/80 to-[#030614]',
    badge: 'Cosmic Blue',
  },
  {
    id: 'sunset-aurora',
    title: { ar: 'شفق الغروب (Sunset Aurora)', fr: 'Aurore Dorée (Sunset)', en: 'Sunset Aurora Rose-Gold' },
    description: {
      ar: 'تدرجات دافئة من الشفق الوردي والذهب المرجاني مع نبضات ضوئية مهدئة.',
      fr: 'Dégradés chaleureux rose doré et ambre crépusculaire avec aurores rayonnantes.',
      en: 'Warm amber, coral, and glowing rose-gold radiating sunset waves.',
    },
    colors: 'from-amber-950/50 via-rose-950/70 to-[#0d0408]',
    badge: 'Sunset Glow',
  },
  {
    id: 'minimal-mesh',
    title: { ar: 'شبكة هندسية ناعمة (Minimal Mesh)', fr: 'Grille Moderne (Minimal)', en: 'Minimalist Dark Mesh' },
    description: {
      ar: 'مظهر هادئ، احترافي وأنيق يعتمد على شبكة خطوط رقمية رمادية داكنة فائقة البساطة.',
      fr: 'Design moderne épuré avec maillage géométrique subtil et fond ardoise pur.',
      en: 'Clean, subtle slate dark aesthetic with geometric developer grids and muted stars.',
    },
    colors: 'from-slate-900/60 via-zinc-950/80 to-[#08080a]',
    badge: 'Clean Minimal',
  },
];

export const AdminAppearance: React.FC = () => {
  const { language } = useLanguage();
  const { bgTheme, setBgTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Background Theme
  const [selectedTheme, setSelectedTheme] = useState<BackgroundTheme>(bgTheme || 'midnight-orchid');

  // Sections Order & Visibility
  const [sections, setSections] = useState<SectionConfig[]>([]);

  // CV Settings & Resume URL
  const [resumeUrl, setResumeUrl] = useState('');
  const [cvSettings, setCvSettings] = useState({
    enabled: true,
    fileName: 'Soumia_Tighilt_CV.pdf',
    title: {
      en: 'Curriculum Vitae (CV)',
      fr: 'Curriculum Vitae (CV)',
      ar: 'السيرة الذاتية (CV)',
    },
    description: {
      en: 'Download my up-to-date resume in PDF format or view it online.',
      fr: 'Téléchargez mon CV actualisé au format PDF ou consultez-le en ligne.',
      ar: 'قم بتحميل نسختي المحدثة من السيرة الذاتية بصيغة PDF أو استعراضها مباشرة.',
    },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [settingsRes, profileRes] = await Promise.all([
        api.getSettings(),
        api.getProfile(),
      ]);

      if (settingsRes.success && settingsRes.data) {
        const themeToSet = settingsRes.data.backgroundTheme || bgTheme || 'midnight-orchid';
        setSelectedTheme(themeToSet);
        setBgTheme(themeToSet);
        if (settingsRes.data.sections && settingsRes.data.sections.length > 0) {
          setSections(settingsRes.data.sections.sort((a: any, b: any) => a.order - b.order));
        } else {
          setSections([
            { id: 'hero', label: { en: 'Hero Banner', fr: 'Bannière Principale', ar: 'الواجهة الرئيسية' }, enabled: true, order: 1 },
            { id: 'about', label: { en: 'About Me', fr: 'À Propos', ar: 'من أنا' }, enabled: true, order: 2 },
            { id: 'projects', label: { en: 'Projects', fr: 'Projets', ar: 'المشاريع' }, enabled: true, order: 3 },
            { id: 'skills', label: { en: 'Skills & Tech', fr: 'Compétences & Tech', ar: 'المهارات والتقنيات' }, enabled: true, order: 4 },
            { id: 'cv', label: { en: 'CV / Resume Download', fr: 'Télécharger CV', ar: 'تحميل السيرة الذاتية' }, enabled: true, order: 5 },
            { id: 'contact', label: { en: 'Contact Form', fr: 'Formulaire de Contact', ar: 'اتصل بي' }, enabled: true, order: 6 },
          ]);
        }
        if (settingsRes.data.cvSettings) {
          setCvSettings({
            enabled: settingsRes.data.cvSettings.enabled ?? true,
            fileName: settingsRes.data.cvSettings.fileName || 'Soumia_Tighilt_CV.pdf',
            title: settingsRes.data.cvSettings.title || {
              en: 'Curriculum Vitae (CV)',
              fr: 'Curriculum Vitae (CV)',
              ar: 'السيرة الذاتية (CV)',
            },
            description: settingsRes.data.cvSettings.description || {
              en: 'Download my up-to-date resume in PDF format or view it online.',
              fr: 'Téléchargez mon CV actualisé au format PDF ou consultez-le en ligne.',
              ar: 'قم بتحميل نسختي المحدثة من السيرة الذاتية بصيغة PDF أو استعراضها مباشرة.',
            },
          });
        }
      }

      if (profileRes.success && profileRes.data) {
        setResumeUrl(profileRes.data.resumeUrl || '');
      }
    } catch (err: any) {
      setErrorMsg('Failed to load appearance settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleSection = (index: number) => {
    const updated = [...sections];
    updated[index].enabled = !updated[index].enabled;
    setSections(updated);
  };

  const handleMoveSection = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === sections.length - 1) return;

    const target = direction === 'up' ? index - 1 : index + 1;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;

    updated.forEach((item, idx) => {
      item.order = idx + 1;
    });

    setSections(updated);
  };

  const handleCvFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCv(true);
      const res = await api.uploadFile(file);
      if (res.success && res.url) {
        setResumeUrl(res.url);
        // Also update profile directly with this URL
        await api.updateProfile({ resumeUrl: res.url });
        setSuccessMsg(
          language === 'ar'
            ? 'تم رفع ملف السيرة الذاتية (CV) بنجاح!'
            : 'CV file uploaded successfully!'
        );
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(res.message || 'Failed to upload CV');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error uploading file');
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      setErrorMsg('');
      setSuccessMsg('');

      const [settingsRes] = await Promise.all([
        api.updateSettings({
          backgroundTheme: selectedTheme,
          sections,
          cvSettings,
        }),
        api.updateProfile({
          resumeUrl,
        }),
      ]);

      if (settingsRes.success) {
        setBgTheme(selectedTheme);
        setSuccessMsg(
          language === 'ar'
            ? 'تم حفظ إعدادات المظهر والخلفيات وترتيب الأقسام بنجاح!'
            : 'Appearance & sections settings updated successfully!'
        );
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(settingsRes.message || 'Failed to save');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-sm">...</div>;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-pink-950/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Palette className="w-7 h-7 text-pink-400" />
            <span>
              {language === 'ar' ? 'تخصيص المظهر والخلفيات والأقسام' : 'Appearance & Website Customization'}
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'ar'
              ? 'اختر النمط البصري للخلفية، تحكم في إظهار أو إخفاء وترتيب أقسام الموقع، وقم بإدارة ملف السيرة الذاتية (CV).'
              : 'Customize background visuals, reorder or toggle website sections, and manage your CV / Resume downloads.'}
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 shadow-lg shadow-pink-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? '...' : language === 'ar' ? 'حفظ كافة الإعدادات' : 'Save All Settings'}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Part 1: Background Themes System */}
      <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-pink-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-950/40 text-pink-400 border border-pink-900/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {language === 'ar' ? 'نظام تخصيص الخلفيات البصرية (Backgrounds)' : 'Visual Background Preset'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {language === 'ar' ? 'اختر النمط والتأثير البصري المفضل ليعمل كخلفية حية للموقع' : 'Select a pre-designed live visual atmosphere for your website.'}
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-pink-300 px-2.5 py-1 rounded-full bg-pink-950/60 border border-pink-800/50">
            {selectedTheme}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {THEME_PRESETS.map((t) => {
            const isSelected = selectedTheme === t.id;
            return (
              <div
                key={t.id}
                onClick={() => {
                  setSelectedTheme(t.id);
                  setBgTheme(t.id);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'border-pink-500 bg-gradient-to-br from-pink-950/40 to-[#120620] shadow-lg shadow-pink-500/10 ring-1 ring-pink-500'
                    : 'border-pink-950/60 bg-[#0a0312]/80 hover:border-pink-800/60 hover:bg-[#0e0419]'
                }`}
              >
                {/* Visual miniature stripe */}
                <div className={`h-2.5 w-full rounded-full bg-gradient-to-r ${t.colors} border border-white/10`} />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-xs font-bold text-white">{t.title[language] || t.title.en}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {t.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {t.description[language] || t.description.en}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className={`text-[11px] font-semibold flex items-center gap-1.5 ${isSelected ? 'text-pink-400' : 'text-slate-500'}`}>
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-pink-400 animate-pulse' : 'bg-slate-600'}`} />
                    <span>{isSelected ? (language === 'ar' ? 'الخلفية النشطة' : 'Active Theme') : (language === 'ar' ? 'تحديد' : 'Select')}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Section Customization & Reordering */}
      <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2.5 pb-3 border-b border-pink-950/60">
          <div className="p-2 rounded-xl bg-purple-950/40 text-purple-400 border border-purple-900/40">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              {language === 'ar' ? 'تخصيص وترتيب أقسام وعناصر الموقع' : 'Section Order & Visibility Controls'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {language === 'ar'
                ? 'يمكنك إظهار أو إخفاء أي قسم من أقسام الموقع وتغيير ترتيب ظهوره للأعلى أو الأسفل.'
                : 'Toggle sections on/off or change their vertical order on the public site.'}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          {sections.map((sec, index) => (
            <div
              key={sec.id}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                sec.enabled
                  ? 'bg-[#0a0312] border-pink-950/80 shadow-sm'
                  : 'bg-[#06010c] border-pink-950/30 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-pink-950/60 border border-pink-900/50 flex items-center justify-center text-xs font-mono font-bold text-pink-300">
                  {index + 1}
                </span>

                <div>
                  <h4 className="text-xs font-bold text-white">
                    {sec.label[language] || sec.label.en || sec.id}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">#{sec.id}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Reorder Buttons */}
                <div className="flex items-center rounded-lg bg-[#120620] border border-pink-950/80 p-0.5">
                  <button
                    type="button"
                    onClick={() => handleMoveSection(index, 'up')}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveSection(index, 'down')}
                    disabled={index === sections.length - 1}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Visibility Toggle */}
                <button
                  type="button"
                  onClick={() => handleToggleSection(index)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    sec.enabled
                      ? 'bg-pink-950/40 text-pink-300 border-pink-800/40 hover:bg-pink-900/50'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {sec.enabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{sec.enabled ? (language === 'ar' ? 'مفعّل' : 'Active') : (language === 'ar' ? 'مخفي' : 'Hidden')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: CV / Resume Management */}
      <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-pink-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-950/40 text-rose-400 border border-rose-900/40">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {language === 'ar' ? 'إدارة السيرة الذاتية (CV / Resume Upload)' : 'Resume / CV Management'}
              </h2>
              <p className="text-[11px] text-slate-400">
                {language === 'ar'
                  ? 'قم برفع ملف الـ CV بصيغة PDF أو وضع رابط مباشر له لتمكين الزوار من تحميله بسهولة.'
                  : 'Upload your latest CV in PDF format or provide a direct link for visitors to download.'}
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={cvSettings.enabled}
              onChange={(e) => setCvSettings({ ...cvSettings, enabled: e.target.checked })}
              className="w-4 h-4 rounded text-pink-500 bg-[#0a0312] border-pink-950"
            />
            <span>{language === 'ar' ? 'تفعيل قسم الـ CV في الموقع' : 'Enable CV Section'}</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* File Upload Box */}
          <div className="p-5 rounded-xl bg-[#0a0312] border border-pink-950/80 flex flex-col justify-between space-y-4">
            <div>
              <span className="font-bold text-white block mb-1">
                {language === 'ar' ? 'رفع ملف PDF جديد' : 'Upload PDF File'}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'اختر ملف PDF من جهازك ليتم رفعه على الخادم وحفظه تلقائياً كملف سيرة ذاتية للزوار.'
                  : 'Select a PDF document from your computer to store on the server.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 shadow-md cursor-pointer transition-all">
                <Upload className="w-4 h-4" />
                <span>{uploadingCv ? '...' : language === 'ar' ? 'اختيار ملف PDF' : 'Select PDF'}</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleCvFileUpload}
                  disabled={uploadingCv}
                  className="hidden"
                />
              </label>

              {resumeUrl && (
                <a
                  href={resumeUrl.startsWith('/uploads') ? `http://localhost:5000${resumeUrl}` : resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-950/40 text-pink-300 border border-pink-900/50 hover:bg-pink-900/50"
                >
                  <FileText className="w-4 h-4" />
                  <span>{language === 'ar' ? 'معاينة الملف' : 'Preview'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Direct URL Input Box */}
          <div className="p-5 rounded-xl bg-[#0a0312] border border-pink-950/80 flex flex-col justify-between space-y-4">
            <div>
              <span className="font-bold text-white block mb-1">
                {language === 'ar' ? 'رابط ملف الـ CV الحالي' : 'Direct CV File URL'}
              </span>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {language === 'ar'
                  ? 'يمكنك لصق رابط مباشر خارجي (مثل Google Drive أو Dropbox) أو تعديل مسار الملف.'
                  : 'You can also paste an external link or edit the current resume URL.'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="/uploads/... or https://..."
                  className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none"
                />
                {resumeUrl && (
                  <button
                    type="button"
                    onClick={() => setResumeUrl('')}
                    className="p-2 rounded-xl bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/50"
                    title="Clear"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'اسم الملف عند التحميل (Download File Name)' : 'Download File Name'}
                </label>
                <input
                  type="text"
                  value={cvSettings.fileName}
                  onChange={(e) => setCvSettings({ ...cvSettings, fileName: e.target.value })}
                  placeholder="Soumia_Tighilt_CV.pdf"
                  className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-1.5 text-white font-mono text-[11px] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CV Title & Name Customization (Multilingual) */}
        <div className="p-5 rounded-xl bg-[#0a0312] border border-pink-950/80 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-white block text-xs">
                {language === 'ar' ? 'تعديل اسم وعنوان السيرة الذاتية (CV Name & Title)' : 'Customize CV Name & Display Title'}
              </span>
              <p className="text-[11px] text-slate-400">
                {language === 'ar'
                  ? 'يمكنك هنا تغيير اسم أو عنوان السيرة الذاتية الذي يظهر للزوار في واجهة الموقع لكل لغة.'
                  : 'Customize the headline and name displayed for the CV section across all supported languages.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1 font-semibold">
                {language === 'ar' ? 'الاسم بالعربية (AR)' : 'Arabic Title (AR)'}
              </label>
              <input
                type="text"
                value={cvSettings.title?.ar || ''}
                onChange={(e) =>
                  setCvSettings({
                    ...cvSettings,
                    title: { ...cvSettings.title, ar: e.target.value },
                  })
                }
                placeholder="السيرة الذاتية (CV)"
                className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white text-[11px] focus:outline-none font-arabic"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1 font-semibold">
                {language === 'ar' ? 'الاسم بالفرنسية (FR)' : 'French Title (FR)'}
              </label>
              <input
                type="text"
                value={cvSettings.title?.fr || ''}
                onChange={(e) =>
                  setCvSettings({
                    ...cvSettings,
                    title: { ...cvSettings.title, fr: e.target.value },
                  })
                }
                placeholder="Curriculum Vitae (CV)"
                className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white text-[11px] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 mb-1 font-semibold">
                {language === 'ar' ? 'الاسم بالإنجليزية (EN)' : 'English Title (EN)'}
              </label>
              <input
                type="text"
                value={cvSettings.title?.en || ''}
                onChange={(e) =>
                  setCvSettings({
                    ...cvSettings,
                    title: { ...cvSettings.title, en: e.target.value },
                  })
                }
                placeholder="Professional Resume (CV)"
                className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white text-[11px] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">
                {language === 'ar' ? 'الوصف بالعربية' : 'Arabic Description'}
              </label>
              <textarea
                rows={2}
                value={cvSettings.description?.ar || ''}
                onChange={(e) =>
                  setCvSettings({
                    ...cvSettings,
                    description: { ...cvSettings.description, ar: e.target.value },
                  })
                }
                className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white text-[11px] focus:outline-none font-arabic resize-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">
                {language === 'ar' ? 'الوصف بالفرنسية' : 'French Description'}
              </label>
              <textarea
                rows={2}
                value={cvSettings.description?.fr || ''}
                onChange={(e) =>
                  setCvSettings({
                    ...cvSettings,
                    description: { ...cvSettings.description, fr: e.target.value },
                  })
                }
                className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white text-[11px] focus:outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">
                {language === 'ar' ? 'الوصف بالإنجليزية' : 'English Description'}
              </label>
              <textarea
                rows={2}
                value={cvSettings.description?.en || ''}
                onChange={(e) =>
                  setCvSettings({
                    ...cvSettings,
                    description: { ...cvSettings.description, en: e.target.value },
                  })
                }
                className="w-full bg-[#120620] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white text-[11px] focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
