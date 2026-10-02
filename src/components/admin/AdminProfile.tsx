import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { useProfile } from '../../context/ProfileContext';
import { adminTranslations } from '../../data/adminTranslations';
import { Link } from 'react-router-dom';
import {
  User,
  Upload,
  FileText,
  Save,
  Check,
  Globe,
  Github,
  Linkedin,
  Twitter,
  AlertCircle,
  BarChart3,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  ListChecks,
} from 'lucide-react';

export const AdminProfile: React.FC = () => {
  const { language } = useLanguage();
  const { updateProfileState } = useProfile();
  const tAdmin = adminTranslations[language] || adminTranslations.fr;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [form, setForm] = useState({
    // Basic Info
    fullName: '',
    email: '',
    phone: '',
    phoneEnabled: false,
    location: '',

    // Hero Role Prefix
    rolePrefixAr: '',
    rolePrefixEn: '',
    rolePrefixFr: '',

    // Hero Highlight Slogan
    roleHighlightAr: '',
    roleHighlightEn: '',
    roleHighlightFr: '',

    // Hero Subheading Bio
    subheadingAr: '',
    subheadingEn: '',
    subheadingFr: '',

    // Media
    avatarUrl: '',
    resumeUrl: '',
    cvFileName: 'Soumia_Tighilt_CV.pdf',
    cvTitleAr: 'السيرة الذاتية (CV)',
    cvTitleEn: 'Curriculum Vitae (CV)',
    cvTitleFr: 'Curriculum Vitae (CV)',

    // Stats
    statsYears: '2+',
    statsYearsLabelAr: 'سنوات خبرة',
    statsYearsLabelFr: "Années d'Expérience",
    statsYearsLabelEn: "Years of Experience",

    statsProjects: '10+',
    statsProjectsLabelAr: 'مشاريع منجزة',
    statsProjectsLabelFr: 'Projets Réalisés',
    statsProjectsLabelEn: 'Projects Built',

    statsCommits: '500+',
    statsCommitsLabelAr: 'تخصص ستاك MERN',
    statsCommitsLabelFr: 'Stack MERN Spécialisée',
    statsCommitsLabelEn: 'Specialized MERN Stack',

    // About Section Bio Paragraphs
    bioP1Ar: '',
    bioP1En: '',
    bioP1Fr: '',
    bioP2Ar: '',
    bioP2En: '',
    bioP2Fr: '',

    // Education & Cursus
    eduTitleAr: 'التكوين والشهادات',
    eduTitleEn: 'Education & Degrees',
    eduTitleFr: 'Formation & Diplômes',

    eduSchoolAr: 'المسار الجامعي',
    eduSchoolEn: 'University Track',
    eduSchoolFr: 'Cursus Universitaire',

    eduDegreeAr: 'إعلام آلي وهندسة البرمجيات',
    eduDegreeEn: 'Computer Science & Software Engineering',
    eduDegreeFr: 'Informatique & Ingénierie Logicielle',

    eduStatusAr: 'قيد الدراسة',
    eduStatusEn: 'Ongoing',
    eduStatusFr: 'En cours',

    eduDescAr: '',
    eduDescEn: '',
    eduDescFr: '',

    eduHighlights: [] as { ar: string; fr: string; en: string }[],

    // Social Links Quick
    github: '',
    linkedin: '',
    twitter: '',
  });

  const handleAddHighlight = () => {
    setForm((prev) => ({
      ...prev,
      eduHighlights: [...prev.eduHighlights, { ar: '', fr: '', en: '' }],
    }));
  };

  const handleRemoveHighlight = (index: number) => {
    setForm((prev) => ({
      ...prev,
      eduHighlights: prev.eduHighlights.filter((_, i) => i !== index),
    }));
  };

  const handleHighlightChange = (index: number, lang: 'ar' | 'fr' | 'en', value: string) => {
    setForm((prev) => {
      const updated = [...prev.eduHighlights];
      updated[index] = { ...updated[index], [lang]: value };
      return { ...prev, eduHighlights: updated };
    });
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const [res, settingsRes] = await Promise.all([
        api.getProfile(),
        api.getSettings(),
      ]);
      if (res.success && res.data) {
        const d = res.data;
        const cv = settingsRes?.data?.cvSettings || {};

        const defaultHighlights = [
          {
            ar: 'البرمجة كائنية التوجه والخوارزميات المتقدمة',
            en: 'Object-Oriented Programming & Data Structures',
            fr: 'Programmation Orientée Objet & Structures de Données',
          },
          {
            ar: 'تصميم قواعد البيانات العلاقية و NoSQL',
            en: 'Relational & NoSQL Database Modeling',
            fr: 'Modélisation de Bases de Données Relationnelles & NoSQL',
          },
          {
            ar: 'تطوير واجهات برمجة التطبيقات RESTful APIs',
            en: 'RESTful API Engineering & Authentication',
            fr: 'Ingénierie d’APIs RESTful & Authentification',
          },
          {
            ar: 'تصميم واجهات المستخدم الحديثة والمتجاوبة',
            en: 'Modern UI/UX & Responsive Web Layouts',
            fr: 'UI/UX Moderne & Mises en page Web Réactives',
          },
        ];

        setForm({
          fullName: d.fullName || '',
          email: d.email || '',
          phone: d.phone || '',
          phoneEnabled: d.phoneEnabled ?? false,
          location: d.location || '',

          rolePrefixAr: d.rolePrefix?.ar || '',
          rolePrefixEn: d.rolePrefix?.en || '',
          rolePrefixFr: d.rolePrefix?.fr || '',

          roleHighlightAr: d.roleHighlight?.ar || '',
          roleHighlightEn: d.roleHighlight?.en || '',
          roleHighlightFr: d.roleHighlight?.fr || '',

          subheadingAr: d.subheading?.ar || '',
          subheadingEn: d.subheading?.en || '',
          subheadingFr: d.subheading?.fr || '',

          avatarUrl: d.avatarUrl || '',
          resumeUrl: d.resumeUrl || '',
          cvFileName: cv.fileName || 'Soumia_Tighilt_CV.pdf',
          cvTitleAr: cv.title?.ar || 'السيرة الذاتية (CV)',
          cvTitleEn: cv.title?.en || 'Curriculum Vitae (CV)',
          cvTitleFr: cv.title?.fr || 'Curriculum Vitae (CV)',

          statsYears: d.stats?.yearsExperience || '2+',
          statsYearsLabelAr: d.stats?.yearsExperienceLabel?.ar || 'سنوات خبرة',
          statsYearsLabelFr: d.stats?.yearsExperienceLabel?.fr || "Années d'Expérience",
          statsYearsLabelEn: d.stats?.yearsExperienceLabel?.en || "Years of Experience",

          statsProjects: d.stats?.completedProjects || '10+',
          statsProjectsLabelAr: d.stats?.completedProjectsLabel?.ar || 'مشاريع منجزة',
          statsProjectsLabelFr: d.stats?.completedProjectsLabel?.fr || 'Projets Réalisés',
          statsProjectsLabelEn: d.stats?.completedProjectsLabel?.en || 'Projects Built',

          statsCommits: d.stats?.codeCommits || '500+',
          statsCommitsLabelAr: d.stats?.codeCommitsLabel?.ar || 'تخصص ستاك MERN',
          statsCommitsLabelFr: d.stats?.codeCommitsLabel?.fr || 'Stack MERN Spécialisée',
          statsCommitsLabelEn: d.stats?.codeCommitsLabel?.en || 'Specialized MERN Stack',

          bioP1Ar: d.aboutBio?.paragraph1?.ar || '',
          bioP1En: d.aboutBio?.paragraph1?.en || '',
          bioP1Fr: d.aboutBio?.paragraph1?.fr || '',
          bioP2Ar: d.aboutBio?.paragraph2?.ar || '',
          bioP2En: d.aboutBio?.paragraph2?.en || '',
          bioP2Fr: d.aboutBio?.paragraph2?.fr || '',

          eduTitleAr: d.education?.title?.ar || 'التكوين والشهادات',
          eduTitleEn: d.education?.title?.en || 'Education & Degrees',
          eduTitleFr: d.education?.title?.fr || 'Formation & Diplômes',

          eduSchoolAr: d.education?.school?.ar || 'المسار الجامعي',
          eduSchoolEn: d.education?.school?.en || 'University Track',
          eduSchoolFr: d.education?.school?.fr || 'Cursus Universitaire',

          eduDegreeAr: d.education?.degree?.ar || '',
          eduDegreeEn: d.education?.degree?.en || '',
          eduDegreeFr: d.education?.degree?.fr || '',

          eduStatusAr: d.education?.status?.ar || 'قيد الدراسة',
          eduStatusEn: d.education?.status?.en || 'Ongoing',
          eduStatusFr: d.education?.status?.fr || 'En cours',

          eduDescAr: d.education?.description?.ar || '',
          eduDescEn: d.education?.description?.en || '',
          eduDescFr: d.education?.description?.fr || '',

          eduHighlights: (d.education?.highlights && d.education.highlights.length > 0)
            ? d.education.highlights
            : defaultHighlights,

          github: d.socialLinks?.github || '',
          linkedin: d.socialLinks?.linkedin || '',
          twitter: d.socialLinks?.twitter || '',
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const res = await api.uploadFile(file);
      if (res.success && res.url) {
        setForm((prev) => ({ ...prev, avatarUrl: res.url }));
        setSuccessMsg(tAdmin.profile.successSave);
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(res.message || 'Upload failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error uploading file');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCv(true);
      const res = await api.uploadFile(file);
      if (res.success && res.url) {
        setForm((prev) => ({ ...prev, resumeUrl: res.url }));
        setSuccessMsg(tAdmin.profile.successSave);
        setTimeout(() => setSuccessMsg(''), 3000);
      } else {
        setErrorMsg(res.message || 'Upload failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error uploading file');
    } finally {
      setUploadingCv(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      phoneEnabled: form.phoneEnabled,
      location: form.location,
      rolePrefix: {
        ar: form.rolePrefixAr,
        en: form.rolePrefixEn,
        fr: form.rolePrefixFr,
      },
      roleHighlight: {
        ar: form.roleHighlightAr,
        en: form.roleHighlightEn,
        fr: form.roleHighlightFr,
      },
      subheading: {
        ar: form.subheadingAr,
        en: form.subheadingEn,
        fr: form.subheadingFr,
      },
      avatarUrl: form.avatarUrl,
      resumeUrl: form.resumeUrl,
      stats: {
        yearsExperience: form.statsYears,
        yearsExperienceLabel: {
          ar: form.statsYearsLabelAr,
          fr: form.statsYearsLabelFr,
          en: form.statsYearsLabelEn,
        },
        completedProjects: form.statsProjects,
        completedProjectsLabel: {
          ar: form.statsProjectsLabelAr,
          fr: form.statsProjectsLabelFr,
          en: form.statsProjectsLabelEn,
        },
        codeCommits: form.statsCommits,
        codeCommitsLabel: {
          ar: form.statsCommitsLabelAr,
          fr: form.statsCommitsLabelFr,
          en: form.statsCommitsLabelEn,
        },
      },
      aboutBio: {
        paragraph1: {
          ar: form.bioP1Ar,
          en: form.bioP1En,
          fr: form.bioP1Fr,
        },
        paragraph2: {
          ar: form.bioP2Ar,
          en: form.bioP2En,
          fr: form.bioP2Fr,
        },
      },
      education: {
        title: {
          ar: form.eduTitleAr,
          en: form.eduTitleEn,
          fr: form.eduTitleFr,
        },
        school: {
          ar: form.eduSchoolAr,
          en: form.eduSchoolEn,
          fr: form.eduSchoolFr,
        },
        degree: {
          ar: form.eduDegreeAr,
          en: form.eduDegreeEn,
          fr: form.eduDegreeFr,
        },
        status: {
          ar: form.eduStatusAr,
          en: form.eduStatusEn,
          fr: form.eduStatusFr,
        },
        description: {
          ar: form.eduDescAr,
          en: form.eduDescEn,
          fr: form.eduDescFr,
        },
        highlights: form.eduHighlights,
      },
      socialLinks: {
        github: form.github,
        linkedin: form.linkedin,
        twitter: form.twitter,
      },
    };

    try {
      const [res] = await Promise.all([
        api.updateProfile(payload),
        api.updateSettings({
          cvSettings: {
            fileName: form.cvFileName,
            title: {
              ar: form.cvTitleAr,
              en: form.cvTitleEn,
              fr: form.cvTitleFr,
            },
          },
        }),
      ]);
      if (res.success) {
        updateProfileState({
          fullName: form.fullName,
          rolePrefix: {
            ar: form.rolePrefixAr,
            en: form.rolePrefixEn,
            fr: form.rolePrefixFr,
          },
          subheading: {
            ar: form.subheadingAr,
            en: form.subheadingEn,
            fr: form.subheadingFr,
          },
        });
        window.dispatchEvent(new CustomEvent('profile-updated', { detail: payload }));
        setSuccessMsg(language === 'ar' ? 'تم حفظ كافة بيانات الملف الشخصي وإعدادات الـ CV بنجاح!' : tAdmin.profile.successSave);
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(res.message || 'Update failed');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to server');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 text-sm">...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl pb-16">
      {/* Header */}
      <div className="pb-6 border-b border-pink-950/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {tAdmin.profile.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'ar'
              ? 'تعديل كافة بياناتك الشخصية، النصوص متعددة اللغات، النبذة، الإحصائيات، والسيرة الذاتية.'
              : tAdmin.profile.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="self-start sm:self-center flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-lg shadow-pink-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? (language === 'ar' ? 'جاري الحفظ...' : tAdmin.profile.saving) : (language === 'ar' ? 'حفظ كافة التعديلات' : tAdmin.profile.saveChanges)}</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2 shadow-lg">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2 shadow-lg">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Quick Section Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-2xl bg-[#120620]/90 border border-pink-950/80 backdrop-blur-md">
        <a
          href="#section-about-all"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-pink-950/40"
        >
          <Sparkles className="w-3.5 h-3.5 text-pink-200" />
          <span>{language === 'ar' ? '⭐ انتقال مباشر لقسم من أنا (À Propos)' : '⭐ Aller à la Section À Propos'}</span>
        </a>
        <a
          href="#section-stats"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0a0312] hover:bg-pink-950/40 border border-pink-950 text-slate-300 text-xs transition-colors"
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>{language === 'ar' ? 'الإحصائيات والأرقام' : 'Statistiques'}</span>
        </a>
        <a
          href="#section-bio"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0a0312] hover:bg-pink-950/40 border border-pink-950 text-slate-300 text-xs transition-colors"
        >
          <User className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'ar' ? 'قصة وفقرات النبذة' : 'Textes Bio'}</span>
        </a>
        <a
          href="#section-education"
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0a0312] hover:bg-pink-950/40 border border-pink-950 text-slate-300 text-xs transition-colors"
        >
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
          <span>{language === 'ar' ? 'التكوين، الشهادات وقائمة المكتسبات' : 'Formation & Cursus'}</span>
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* 1. Basic Personal Info */}
        <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-pink-400" />
            <span>{tAdmin.profile.basicInfo}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">{tAdmin.profile.fullName} *</label>
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">{tAdmin.profile.email}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block font-semibold text-slate-300">
                  {tAdmin.profile.phone} <span className="text-[10px] text-slate-400 font-normal">({language === 'ar' ? 'اختياري' : language === 'fr' ? 'optionnel' : 'optional'})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className={`text-[10px] font-bold ${form.phoneEnabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {form.phoneEnabled
                      ? (language === 'ar' ? 'مفعّل في الموقع' : 'Active')
                      : (language === 'ar' ? 'معطّل' : 'Disabled')}
                  </span>
                  <input
                    type="checkbox"
                    checked={form.phoneEnabled}
                    onChange={(e) => setForm({ ...form, phoneEnabled: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 bg-[#0a0312] border-pink-950 focus:ring-emerald-500 cursor-pointer"
                  />
                </label>
              </div>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+213..."
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                {language === 'ar'
                  ? 'يمكنك تفعيل أو إخفاء رقم الهاتف عن زوار الموقع حسب رغبتك.'
                  : 'Enable or hide your contact phone from site visitors.'}
              </p>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">{tAdmin.profile.location}</label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Algiers, Algeria"
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Media: Avatar & CV Upload */}
        <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Upload className="w-4 h-4 text-purple-400" />
            <span>{tAdmin.profile.mediaSection}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Avatar */}
            <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 flex flex-col justify-between space-y-3">
              <div>
                <span className="font-semibold text-white block mb-1">{tAdmin.profile.avatarTitle}</span>
                <p className="text-[11px] text-slate-400">{tAdmin.profile.avatarDesc}</p>
              </div>

              <div className="flex items-center gap-4">
                {form.avatarUrl ? (
                  <img
                    src={form.avatarUrl.startsWith('/uploads') ? `http://localhost:5000${form.avatarUrl}` : form.avatarUrl}
                    alt="Avatar"
                    className="w-14 h-14 rounded-full object-cover border-2 border-pink-500"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-pink-950/40 border border-pink-800/40 flex items-center justify-center text-pink-300 font-bold text-lg">
                    {form.fullName?.charAt(0) || 'S'}
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-950/50 hover:bg-pink-900/60 border border-pink-800/50 text-pink-300 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingAvatar ? '...' : tAdmin.profile.uploadAvatar}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      disabled={uploadingAvatar}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="URL أو رابط الصورة..."
                    value={form.avatarUrl}
                    onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                    className="w-full bg-[#150720] border border-pink-950/80 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* CV / Resume */}
            <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-white block">{tAdmin.profile.cvTitle}</span>
                  <Link
                    to="/admin/appearance"
                    className="text-[11px] text-pink-400 hover:text-pink-300 hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'ar' ? 'إعدادات متقدمة للـ CV' : 'Advanced CV Settings'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <p className="text-[11px] text-slate-400">{tAdmin.profile.cvDesc}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {form.resumeUrl ? (
                    <a
                      href={form.resumeUrl.startsWith('/uploads') ? `http://localhost:5000${form.resumeUrl}` : form.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-pink-400 hover:underline flex items-center gap-1.5 text-xs font-mono"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{tAdmin.profile.previewCv}</span>
                    </a>
                  ) : (
                    <span className="text-[11px] text-slate-500">{tAdmin.profile.noCv}</span>
                  )}

                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-950/50 hover:bg-pink-900/60 border border-pink-800/50 text-pink-300 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingCv ? '...' : tAdmin.profile.uploadCv}</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleCvUpload}
                      className="hidden"
                      disabled={uploadingCv}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="URL أو رابط ملف PDF..."
                  value={form.resumeUrl}
                  onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
                  className="w-full bg-[#150720] border border-pink-950/80 rounded-lg px-2.5 py-1.5 text-[11px] text-slate-300 font-mono"
                />

                {/* CV Name & File Name Customization */}
                <div className="pt-2 border-t border-pink-950/60 space-y-2 text-[11px]">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      {language === 'ar' ? 'اسم وعنوان السيرة الذاتية (CV Display Title)' : 'CV Title'}
                    </label>
                    <input
                      type="text"
                      value={form.cvTitleAr}
                      onChange={(e) => setForm({ ...form, cvTitleAr: e.target.value })}
                      placeholder="السيرة الذاتية (CV)"
                      className="w-full bg-[#150720] border border-pink-950/80 focus:border-pink-500 rounded-lg px-2.5 py-1.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-400 mb-1 text-[10px]">
                        {language === 'ar' ? 'الاسم بالفرنسية (FR)' : 'French Title'}
                      </label>
                      <input
                        type="text"
                        value={form.cvTitleFr}
                        onChange={(e) => setForm({ ...form, cvTitleFr: e.target.value })}
                        placeholder="Curriculum Vitae"
                        className="w-full bg-[#150720] border border-pink-950/80 rounded-lg px-2 py-1 text-white text-[11px]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-400 mb-1 text-[10px]">
                        {language === 'ar' ? 'الاسم بالإنجليزية (EN)' : 'English Title'}
                      </label>
                      <input
                        type="text"
                        value={form.cvTitleEn}
                        onChange={(e) => setForm({ ...form, cvTitleEn: e.target.value })}
                        placeholder="Curriculum Vitae"
                        className="w-full bg-[#150720] border border-pink-950/80 rounded-lg px-2 py-1 text-white text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">
                      {language === 'ar' ? 'اسم ملف التحميل عند الحفظ (Download File Name)' : 'Download File Name'}
                    </label>
                    <input
                      type="text"
                      value={form.cvFileName}
                      onChange={(e) => setForm({ ...form, cvFileName: e.target.value })}
                      placeholder="Soumia_Tighilt_CV.pdf"
                      className="w-full bg-[#150720] border border-pink-950/80 focus:border-pink-500 rounded-lg px-2.5 py-1.5 text-pink-300 font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Multilingual Hero Job Titles (Role Prefix) */}
        <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-pink-400" />
            <span>{language === 'ar' ? 'المسمى الوظيفي الرئيسي (أعلى واجهة الموقع)' : tAdmin.profile.rolesSection}</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            {language === 'ar'
              ? 'يظهر كعنوان أول في بداية الصفحة الرئيسية، يدعم 3 لغات (عربي، إنجليزي، فرنسي).'
              : 'Appears as the primary title in the hero section across 3 languages.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">{tAdmin.profile.roleAr}</label>
              <input
                type="text"
                value={form.rolePrefixAr}
                onChange={(e) => setForm({ ...form, rolePrefixAr: e.target.value })}
                placeholder="مطورة ويب متكاملة (Full-Stack)"
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">{tAdmin.profile.roleEn}</label>
              <input
                type="text"
                value={form.rolePrefixEn}
                onChange={(e) => setForm({ ...form, rolePrefixEn: e.target.value })}
                placeholder="Full-Stack Web Developer"
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">{tAdmin.profile.roleFr}</label>
              <input
                type="text"
                value={form.rolePrefixFr}
                onChange={(e) => setForm({ ...form, rolePrefixFr: e.target.value })}
                placeholder="Développeuse Web Full-Stack"
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4. Multilingual Hero Catchphrase / Slogan Highlight */}
        <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-fuchsia-400" />
            <span>{language === 'ar' ? 'العنوان البارز والملفت (Slogan / Catchphrase)' : 'Hero Headline / Slogan Highlight'}</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            {language === 'ar'
              ? 'النص الملون اللامع الكبير في وسط الواجهة الرئيسية.'
              : 'The gradient highlighted headline in the center of the hero.'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                {language === 'ar' ? 'العنوان البارز (عربي)' : 'Highlight (Arabic)'}
              </label>
              <input
                type="text"
                value={form.roleHighlightAr}
                onChange={(e) => setForm({ ...form, roleHighlightAr: e.target.value })}
                placeholder="بناء تطبيقات ويب عصرية وعالية الأداء."
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                {language === 'ar' ? 'العنوان البارز (إنجليزي)' : 'Highlight (English)'}
              </label>
              <input
                type="text"
                value={form.roleHighlightEn}
                onChange={(e) => setForm({ ...form, roleHighlightEn: e.target.value })}
                placeholder="BUILDING MODERN & FUNCTIONAL WEB APPLICATIONS."
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                {language === 'ar' ? 'العنوان البارز (فرنسي)' : 'Highlight (French)'}
              </label>
              <input
                type="text"
                value={form.roleHighlightFr}
                onChange={(e) => setForm({ ...form, roleHighlightFr: e.target.value })}
                placeholder="CONCEPTION D'APPLICATIONS WEB MODERNES ET FONCTIONNELLES."
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 5. Multilingual Hero Subheading / Bio Description */}
        <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-rose-400" />
            <span>{language === 'ar' ? 'النبذة التمهيدية بالواجهة الرئيسية' : 'Hero Subtitle & Bio Description'}</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">{tAdmin.profile.bioAr}</label>
              <textarea
                rows={2}
                value={form.subheadingAr}
                onChange={(e) => setForm({ ...form, subheadingAr: e.target.value })}
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">{tAdmin.profile.bioEn}</label>
              <textarea
                rows={2}
                value={form.subheadingEn}
                onChange={(e) => setForm({ ...form, subheadingEn: e.target.value })}
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">
                {language === 'ar' ? 'النبذة التمهيدية (فرنسي)' : 'Hero Bio (French)'}
              </label>
              <textarea
                rows={2}
                value={form.subheadingFr}
                onChange={(e) => setForm({ ...form, subheadingFr: e.target.value })}
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* === SECTION À PROPOS (ABOUT ME) MASTER BLOCK === */}
        <div id="section-about-all" className="pt-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-950/60 via-purple-950/60 to-rose-950/60 border border-pink-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-black text-white">
                  {language === 'ar' ? 'قسم من أنا (Section À Propos) - النبذة، الإحصائيات، والشهادات' : 'Section À Propos - Bio, Stats & Formation'}
                </h2>
                <p className="text-xs text-pink-200/80 mt-0.5">
                  {language === 'ar'
                    ? 'هنا يمكنك تغيير كافة محتويات الصندوقين (الأرقام، النبذة، التكوين، وقائمة المكتسبات) دون أي كود وبكل اللغات.'
                    : 'Customize everything in the About section (metrics, bio paragraphs, degree card & checklist) with zero code.'}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 font-bold shrink-0">
              CMS Dashboard
            </span>
          </div>
        </div>

        {/* 6. Stats & Metrics Counters (With Customizable Multilingual Labels) */}
        <div id="section-stats" className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'إحصائيات الإنجاز والأرقام والتسميات (قسم من أنا)' : 'Key Achievement Statistics & Labels'}</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
              Section À Propos
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {language === 'ar'
              ? 'تعديل الأرقام والتسميات باللغات الثلاث (عربي، فرنسي، إنجليزي) للصناديق الثلاثية داخل قسم "عني / من أنا".'
              : 'Customize the metric values and their multilingual labels in the About Me section.'}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Stat 1: Projects */}
            <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-pink-950/60">
                <span className="font-bold text-xs text-pink-300">
                  {language === 'ar' ? 'الإحصائية 1 (المشاريع)' : 'Metric 1 (Projects)'}
                </span>
                <span className="text-xs font-black text-pink-400 font-mono">{form.statsProjects || '10+'}</span>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  {language === 'ar' ? 'الرقم أو القيمة (مثل 10+)' : 'Number / Value (e.g. 10+)'}
                </label>
                <input
                  type="text"
                  value={form.statsProjects}
                  onChange={(e) => setForm({ ...form, statsProjects: e.target.value })}
                  placeholder="10+"
                  className="w-full bg-[#140620] border border-pink-950/80 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div className="space-y-1.5 pt-1">
                <label className="block text-[10px] font-semibold text-slate-400">
                  {language === 'ar' ? 'التسمية أسفل الرقم (3 لغات)' : 'Label (3 Languages)'}
                </label>
                <input
                  type="text"
                  value={form.statsProjectsLabelAr}
                  onChange={(e) => setForm({ ...form, statsProjectsLabelAr: e.target.value })}
                  placeholder="عربي: مشاريع منجزة"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
                <input
                  type="text"
                  value={form.statsProjectsLabelFr}
                  onChange={(e) => setForm({ ...form, statsProjectsLabelFr: e.target.value })}
                  placeholder="Français: Projets Réalisés"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
                <input
                  type="text"
                  value={form.statsProjectsLabelEn}
                  onChange={(e) => setForm({ ...form, statsProjectsLabelEn: e.target.value })}
                  placeholder="English: Projects Built"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
              </div>
            </div>

            {/* Stat 2: Experience */}
            <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-pink-950/60">
                <span className="font-bold text-xs text-purple-300">
                  {language === 'ar' ? 'الإحصائية 2 (الخبرة)' : 'Metric 2 (Experience)'}
                </span>
                <span className="text-xs font-black text-purple-400 font-mono">{form.statsYears || '2+'}</span>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  {language === 'ar' ? 'الرقم أو القيمة (مثل 2+)' : 'Number / Value (e.g. 2+)'}
                </label>
                <input
                  type="text"
                  value={form.statsYears}
                  onChange={(e) => setForm({ ...form, statsYears: e.target.value })}
                  placeholder="2+"
                  className="w-full bg-[#140620] border border-pink-950/80 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div className="space-y-1.5 pt-1">
                <label className="block text-[10px] font-semibold text-slate-400">
                  {language === 'ar' ? 'التسمية أسفل الرقم (3 لغات)' : 'Label (3 Languages)'}
                </label>
                <input
                  type="text"
                  value={form.statsYearsLabelAr}
                  onChange={(e) => setForm({ ...form, statsYearsLabelAr: e.target.value })}
                  placeholder="عربي: سنوات خبرة"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
                <input
                  type="text"
                  value={form.statsYearsLabelFr}
                  onChange={(e) => setForm({ ...form, statsYearsLabelFr: e.target.value })}
                  placeholder="Français: Années d'Expérience"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
                <input
                  type="text"
                  value={form.statsYearsLabelEn}
                  onChange={(e) => setForm({ ...form, statsYearsLabelEn: e.target.value })}
                  placeholder="English: Years Experience"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
              </div>
            </div>

            {/* Stat 3: Tech Commits / Specialization */}
            <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-pink-950/60">
                <span className="font-bold text-xs text-rose-300">
                  {language === 'ar' ? 'الإحصائية 3 (التخصص والالتزام)' : 'Metric 3 (Specialty)'}
                </span>
                <span className="text-xs font-black text-rose-400 font-mono">{form.statsCommits || '500+'}</span>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  {language === 'ar' ? 'الرقم أو القيمة (مثل 500+)' : 'Number / Value (e.g. 500+)'}
                </label>
                <input
                  type="text"
                  value={form.statsCommits}
                  onChange={(e) => setForm({ ...form, statsCommits: e.target.value })}
                  placeholder="500+"
                  className="w-full bg-[#140620] border border-pink-950/80 rounded-lg px-2.5 py-1.5 text-white font-mono text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div className="space-y-1.5 pt-1">
                <label className="block text-[10px] font-semibold text-slate-400">
                  {language === 'ar' ? 'التسمية أسفل الرقم (3 لغات)' : 'Label (3 Languages)'}
                </label>
                <input
                  type="text"
                  value={form.statsCommitsLabelAr}
                  onChange={(e) => setForm({ ...form, statsCommitsLabelAr: e.target.value })}
                  placeholder="عربي: تخصص ستاك MERN"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
                <input
                  type="text"
                  value={form.statsCommitsLabelFr}
                  onChange={(e) => setForm({ ...form, statsCommitsLabelFr: e.target.value })}
                  placeholder="Français: Stack MERN Spécialisée"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
                <input
                  type="text"
                  value={form.statsCommitsLabelEn}
                  onChange={(e) => setForm({ ...form, statsCommitsLabelEn: e.target.value })}
                  placeholder="English: Dedicated MERN Stack"
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2 py-1 text-white text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7. About Section Detailed Paragraphs (Bio Story) */}
        <div id="section-bio" className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'قصة وفقرات قسم "عني / À Propos"' : 'About Section Bio Paragraphs'}</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/40">
              Textes Bio
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {language === 'ar'
              ? 'تخصيص الفقرتين التوضيحيتين لقصة شغفك وأسلوب عملك باللغات الثلاث. إذا تركت لغة فارغة سيتم استخدام النص الافتراضي.'
              : 'Customize the two bio storytelling paragraphs in the About section.'}
          </p>

          <div className="space-y-4">
            {/* Paragraph 1 */}
            <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-2">
              <span className="font-bold text-xs text-pink-300 block">
                {language === 'ar' ? 'الفقرة الأولى (Paragraph 1) - التعريف والشغف' : 'Paragraph 1 - Introduction & Philosophy'}
              </span>
              <div className="space-y-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">عربي (AR)</label>
                  <textarea
                    rows={2}
                    placeholder="مرحباً! أنا مطور مواقع ومحب للتصميم الحديث وهندسة البرمجيات..."
                    value={form.bioP1Ar}
                    onChange={(e) => setForm({ ...form, bioP1Ar: e.target.value })}
                    className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Français (FR)</label>
                  <textarea
                    rows={2}
                    placeholder="Bonjour ! Je suis étudiant en informatique et développeur web..."
                    value={form.bioP1Fr}
                    onChange={(e) => setForm({ ...form, bioP1Fr: e.target.value })}
                    className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">English (EN)</label>
                  <textarea
                    rows={2}
                    placeholder="Hello! I am a computer science student and full-stack web developer..."
                    value={form.bioP1En}
                    onChange={(e) => setForm({ ...form, bioP1En: e.target.value })}
                    className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Paragraph 2 */}
            <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-2">
              <span className="font-bold text-xs text-purple-300 block">
                {language === 'ar' ? 'الفقرة الثانية (Paragraph 2) - التقنيات والستاك المفضل' : 'Paragraph 2 - Tech Stack & Focus'}
              </span>
              <div className="space-y-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">عربي (AR)</label>
                  <textarea
                    rows={2}
                    placeholder="بيئتي المفضلة هي ستاك MERN (MongoDB, Express, React, Node.js) مع Tailwind CSS..."
                    value={form.bioP2Ar}
                    onChange={(e) => setForm({ ...form, bioP2Ar: e.target.value })}
                    className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Français (FR)</label>
                  <textarea
                    rows={2}
                    placeholder="Mon écosystème de prédilection est la stack MERN (MongoDB, Express, React, Node.js)..."
                    value={form.bioP2Fr}
                    onChange={(e) => setForm({ ...form, bioP2Fr: e.target.value })}
                    className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">English (EN)</label>
                  <textarea
                    rows={2}
                    placeholder="My core ecosystem is the MERN stack (MongoDB, Express, React, Node.js)..."
                    value={form.bioP2En}
                    onChange={(e) => setForm({ ...form, bioP2En: e.target.value })}
                    className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Education & Credentials Card (Full Customization + Highlights Checklist) */}
        <div id="section-education" className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>{language === 'ar' ? 'بطاقة التكوين، الشهادات والمسار الأكاديمي' : 'Education, Degrees & Academic Track'}</span>
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
              Formation & Diplômes
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            {language === 'ar'
              ? 'تخصيص البطاقة اليمنى بالكامل: عنوان القسم، التخصص، الكلية أو المسار، حالة الدراسة (Ongoing)، الوصف، وقائمة نقاط المكتسبات.'
              : 'Fully customize the right Education card including title, degree, badge status, description, and key points.'}
          </p>

          {/* 1. Header Title & Subtitle */}
          <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-3">
            <span className="font-bold text-xs text-cyan-300 block">
              {language === 'ar' ? '1. العنوان الرئيسي والفرعي للبطاقة' : '1. Card Title & Track Subtitle'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'عنوان البطاقة (عربي)' : 'Card Title (Arabic)'}
                </label>
                <input
                  type="text"
                  placeholder="التكوين والشهادات"
                  value={form.eduTitleAr}
                  onChange={(e) => setForm({ ...form, eduTitleAr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'عنوان البطاقة (فرنسي)' : 'Card Title (French)'}
                </label>
                <input
                  type="text"
                  placeholder="Formation & Diplômes"
                  value={form.eduTitleFr}
                  onChange={(e) => setForm({ ...form, eduTitleFr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'عنوان البطاقة (إنجليزي)' : 'Card Title (English)'}
                </label>
                <input
                  type="text"
                  placeholder="Education & Degrees"
                  value={form.eduTitleEn}
                  onChange={(e) => setForm({ ...form, eduTitleEn: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-pink-950/60">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'المسار أو الكلية (عربي)' : 'Track / School (Arabic)'}
                </label>
                <input
                  type="text"
                  placeholder="المسار الجامعي"
                  value={form.eduSchoolAr}
                  onChange={(e) => setForm({ ...form, eduSchoolAr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'المسار أو الكلية (فرنسي)' : 'Track / School (French)'}
                </label>
                <input
                  type="text"
                  placeholder="Cursus Universitaire"
                  value={form.eduSchoolFr}
                  onChange={(e) => setForm({ ...form, eduSchoolFr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'المسار أو الكلية (إنجليزي)' : 'Track / School (English)'}
                </label>
                <input
                  type="text"
                  placeholder="University Track"
                  value={form.eduSchoolEn}
                  onChange={(e) => setForm({ ...form, eduSchoolEn: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Degree Name & Status Badge */}
          <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-3">
            <span className="font-bold text-xs text-pink-300 block">
              {language === 'ar' ? '2. المسمى والتخصص وحالة الشهادة (Ongoing)' : '2. Degree Title & Status Badge'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'اسم التخصص (عربي)' : 'Degree Name (Arabic)'}
                </label>
                <input
                  type="text"
                  placeholder="إعلام آلي وهندسة البرمجيات"
                  value={form.eduDegreeAr}
                  onChange={(e) => setForm({ ...form, eduDegreeAr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'اسم التخصص (فرنسي)' : 'Degree Name (French)'}
                </label>
                <input
                  type="text"
                  placeholder="Informatique & Ingénierie Logicielle"
                  value={form.eduDegreeFr}
                  onChange={(e) => setForm({ ...form, eduDegreeFr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'اسم التخصص (إنجليزي)' : 'Degree Name (English)'}
                </label>
                <input
                  type="text"
                  placeholder="Computer Science & Software Engineering"
                  value={form.eduDegreeEn}
                  onChange={(e) => setForm({ ...form, eduDegreeEn: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>

            {/* Status Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-pink-950/60">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'شارة الحالة (عربي)' : 'Badge Status (Arabic)'}
                </label>
                <input
                  type="text"
                  placeholder="قيد الدراسة"
                  value={form.eduStatusAr}
                  onChange={(e) => setForm({ ...form, eduStatusAr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-pink-300 font-mono text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'شارة الحالة (فرنسي)' : 'Badge Status (French)'}
                </label>
                <input
                  type="text"
                  placeholder="Ongoing / En cours"
                  value={form.eduStatusFr}
                  onChange={(e) => setForm({ ...form, eduStatusFr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-pink-300 font-mono text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">
                  {language === 'ar' ? 'شارة الحالة (إنجليزي)' : 'Badge Status (English)'}
                </label>
                <input
                  type="text"
                  placeholder="Ongoing"
                  value={form.eduStatusEn}
                  onChange={(e) => setForm({ ...form, eduStatusEn: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg px-2.5 py-1.5 text-pink-300 font-mono text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          {/* 3. Description paragraph */}
          <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-2">
            <span className="font-bold text-xs text-purple-300 block">
              {language === 'ar' ? '3. نبذة وشرح الشهادة والمسار الأكاديمي' : '3. Degree Description'}
            </span>
            <div className="space-y-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">عربي (AR)</label>
                <textarea
                  rows={2}
                  placeholder="قواعد صلبة في الخوارزميات، هياكل البيانات، تصميم قواعد البيانات وبناء واجهات برمجة التطبيقات..."
                  value={form.eduDescAr}
                  onChange={(e) => setForm({ ...form, eduDescAr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Français (FR)</label>
                <textarea
                  rows={2}
                  placeholder="Bases solides en algorithmique, structures de données, conception de bases de données relationnelles et NoSQL..."
                  value={form.eduDescFr}
                  onChange={(e) => setForm({ ...form, eduDescFr: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">English (EN)</label>
                <textarea
                  rows={2}
                  placeholder="Solid foundations in algorithms, data structures, database modeling and RESTful architectures..."
                  value={form.eduDescEn}
                  onChange={(e) => setForm({ ...form, eduDescEn: e.target.value })}
                  className="w-full bg-[#140620] border border-pink-950/70 rounded-lg p-2 text-white text-xs focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>

          {/* 4. Highlights / Checklist Points */}
          <div className="p-4 rounded-xl bg-[#0a0312] border border-pink-950 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-xs text-rose-300 block flex items-center gap-1.5">
                  <ListChecks className="w-4 h-4 text-pink-400" />
                  <span>{language === 'ar' ? '4. قائمة النقاط والمميزات المكتسبة (Checklist)' : '4. Key Competencies Checklist'}</span>
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {language === 'ar'
                    ? 'الأسطر ذات علامة الصح في بطاقة التكوين. يمكنك إضافة نقاط جديدة أو حذف أو تعديل أي سطر.'
                    : 'The checkmark bullet points on the right card. Add, remove, or modify items.'}
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddHighlight}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-950/80 hover:bg-pink-900/80 border border-pink-800/60 text-pink-300 text-xs font-bold transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'إضافة نقطة' : 'Ajouter un point'}</span>
              </button>
            </div>

            <div className="space-y-2.5 pt-1">
              {form.eduHighlights.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#140620] border border-pink-950/80 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-pink-400 w-5 shrink-0">#{idx + 1}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 w-full">
                    <input
                      type="text"
                      placeholder="عربي..."
                      value={item.ar || ''}
                      onChange={(e) => handleHighlightChange(idx, 'ar', e.target.value)}
                      className="bg-[#0a0312] border border-pink-950/60 rounded px-2 py-1 text-white text-[11px]"
                    />
                    <input
                      type="text"
                      placeholder="Français..."
                      value={item.fr || ''}
                      onChange={(e) => handleHighlightChange(idx, 'fr', e.target.value)}
                      className="bg-[#0a0312] border border-pink-950/60 rounded px-2 py-1 text-white text-[11px]"
                    />
                    <input
                      type="text"
                      placeholder="English..."
                      value={item.en || ''}
                      onChange={(e) => handleHighlightChange(idx, 'en', e.target.value)}
                      className="bg-[#0a0312] border border-pink-950/60 rounded px-2 py-1 text-white text-[11px]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    title="حذف"
                    className="p-1.5 rounded hover:bg-red-950/80 text-slate-500 hover:text-red-400 transition-colors self-end sm:self-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {form.eduHighlights.length === 0 && (
                <div className="py-4 text-center text-xs text-slate-500">
                  {language === 'ar' ? 'لا توجد نقاط مضافة. اضغط "إضافة نقطة" لإضافة أسطر جديدة.' : 'No highlights added yet.'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 9. Social Links & Quick Shortcuts */}
        <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>{tAdmin.profile.socialSection}</span>
            </h2>
            <Link
              to="/admin/social"
              className="text-xs text-pink-400 hover:text-pink-300 flex items-center gap-1 font-semibold"
            >
              <span>{language === 'ar' ? 'إدارة متقدمة لشبكات التواصل' : 'Advanced Social Manager'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5" />
                <span>GitHub URL</span>
              </label>
              <input
                type="url"
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn URL</span>
              </label>
              <input
                type="url"
                value={form.linkedin}
                onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Twitter className="w-3.5 h-3.5" />
                <span>Twitter / X URL</span>
              </label>
              <input
                type="url"
                value={form.twitter}
                onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3 py-2 text-white focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-lg shadow-pink-500/25 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? (language === 'ar' ? 'جاري الحفظ...' : tAdmin.profile.saving) : (language === 'ar' ? 'حفظ كافة التعديلات' : tAdmin.profile.saveChanges)}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
