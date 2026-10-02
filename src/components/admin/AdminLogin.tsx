import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { adminTranslations } from '../../data/adminTranslations';
import { Language } from '../../types';
import { Lock, Mail, ArrowRight, ShieldCheck, Home, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const { language, setLanguage, isRtl } = useLanguage();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tAdmin = adminTranslations[language] || adminTranslations.fr;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ar', label: 'عربي', flag: '🇩🇿' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await login(identifier, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message || (language === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'));
    }
  };

  return (
    <div
      className={`min-h-screen bg-[#07020b] text-[#fdf4f8] flex items-center justify-center p-4 relative overflow-hidden ${
        isRtl ? 'font-arabic' : 'font-sans'
      }`}
    >
      {/* Background glow effects */}
      <div className="fixed top-0 left-1/4 w-[32rem] h-[32rem] bg-rose-950/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[30rem] h-[30rem] bg-purple-950/30 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Bar with Back to Site & Language Switcher */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs sm:text-sm text-pink-200/80 hover:text-white bg-pink-950/30 border border-pink-800/40 hover:border-pink-600/60 px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-md"
        >
          <Home className="w-4 h-4" />
          <span>{tAdmin.login.backToSite}</span>
        </Link>

        {/* Language selector */}
        <div className="flex items-center gap-1 bg-[#12071d]/90 border border-pink-900/60 rounded-full p-1 backdrop-blur-md shadow-lg">
          <Globe className="w-3.5 h-3.5 text-pink-400 ml-2 hidden sm:inline-block" />
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setLanguage(l.code)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                language === l.code
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm scale-105'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{l.flag}</span>
              <span className="text-[11px] font-mono">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-md relative z-10 mt-12 sm:mt-0">
        {/* Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-600/20 border border-pink-500/30 mb-4 shadow-[0_0_30px_rgba(244,114,182,0.2)]">
            <ShieldCheck className="w-8 h-8 text-pink-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            {tAdmin.login.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {tAdmin.login.subtitle}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#12071d]/85 backdrop-blur-xl border border-pink-900/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-200 text-xs sm:text-sm flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {tAdmin.login.identifierLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder=""
                  autoComplete="username"
                  className="w-full bg-[#0a0312]/90 border border-pink-950/80 focus:border-pink-500 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {tAdmin.login.passwordLabel}
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder=""
                  autoComplete="current-password"
                  className="w-full bg-[#0a0312]/90 border border-pink-950/80 focus:border-pink-500 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-500 transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{tAdmin.login.checking}</span>
              ) : (
                <>
                  <span>{tAdmin.login.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
