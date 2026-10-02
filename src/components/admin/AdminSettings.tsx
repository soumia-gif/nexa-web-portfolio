import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { adminTranslations } from '../../data/adminTranslations';
import { KeyRound, Lock, Check, AlertCircle, Shield, User, Mail, Save, Eye, EyeOff, Phone } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { user, updateUser, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const tAdmin = adminTranslations[language] || adminTranslations.fr;

  // Account State (Username & Email & Phone)
  const [username, setUsername] = useState(user?.username || 'admin');
  const [email, setEmail] = useState(user?.email || 'admin@portfolio.com');
  const [phone, setPhone] = useState('');
  const [phoneEnabled, setPhoneEnabled] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(false);
  const [successAccount, setSuccessAccount] = useState('');
  const [errorAccount, setErrorAccount] = useState('');

  // Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [successPassword, setSuccessPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
    const loadProfile = async () => {
      try {
        const res = await api.getProfile();
        if (res.success && res.data) {
          setPhone(res.data.phone || '');
          setPhoneEnabled(res.data.phoneEnabled ?? false);
        }
      } catch (e) {
        // ignore
      }
    };
    loadProfile();
  }, [user]);

  // Handle Account Info Update (Username / Email / Phone)
  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorAccount('');
    setSuccessAccount('');

    if (!username.trim()) {
      setErrorAccount(
        language === 'ar' ? 'يرجى إدخال اسم مستخدم صحيح' : 'Please provide a valid username'
      );
      return;
    }

    try {
      setLoadingAccount(true);
      const [res] = await Promise.all([
        api.updateAccount({ username, email }),
        api.updateProfile({ phone, phoneEnabled }),
      ]);
      if (res.success && res.data) {
        setSuccessAccount(
          language === 'ar'
            ? 'تم تحديث بيانات الحساب ورقم الهاتف بنجاح!'
            : 'Account details and phone settings updated successfully!'
        );
        updateUser({ username: res.data.username, email: res.data.email });
        setTimeout(() => setSuccessAccount(''), 4000);
      } else {
        setErrorAccount(res.message || 'Failed to update account');
      }
    } catch (err: any) {
      setErrorAccount(err.message || 'Error updating account');
    } finally {
      setLoadingAccount(false);
    }
  };

  // Handle Password Change with strict error localization and redirect
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorPassword('');
    setSuccessPassword('');
    const errors: { currentPassword?: string; newPassword?: string; confirmPassword?: string } = {};

    if (!currentPassword) {
      errors.currentPassword =
        language === 'ar'
          ? 'يرجى كتابة كلمة المرور الحالية'
          : 'Please enter your current password';
    }

    if (newPassword.length < 6) {
      errors.newPassword =
        language === 'ar'
          ? 'كلمة المرور الجديدة يجب ألا تقل عن 6 أحرف'
          : tAdmin.settings.errLength;
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword =
        language === 'ar'
          ? 'كلمتا المرور غير متطابقتين، يرجى التأكد'
          : tAdmin.settings.errMatch;
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorPassword(
        language === 'ar'
          ? 'يرجى تصحيح الأخطاء المحددة باللون الأحمر أدناه'
          : 'Please fix the highlighted errors below'
      );
      return;
    }

    setFieldErrors({});

    try {
      setLoadingPassword(true);
      const res = await api.changePassword(currentPassword, newPassword);
      if (res.success) {
        setSuccessPassword(
          language === 'ar'
            ? '✓ تم تغيير كلمة المرور بنجاح! سيتم تحويلك إلى الصفحة الرئيسية وتسجيل الخروج الآن...'
            : '✓ Password changed successfully! Logging out and redirecting to home page...'
        );
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        // Wait 1.5s for user to read confirmation, then log out and redirect to home
        setTimeout(() => {
          logout();
          navigate('/');
        }, 1500);
      } else {
        const msg = res.message || (language === 'ar' ? 'تعذر تغيير كلمة المرور' : 'Error changing password');
        setErrorPassword(msg);
        // Highlight specific field if related to current password
        if (msg.includes('الحالية') || msg.toLowerCase().includes('current') || msg.toLowerCase().includes('actuel')) {
          setFieldErrors({ currentPassword: msg });
        } else if (msg.includes('6 أحرف') || msg.toLowerCase().includes('6 characters')) {
          setFieldErrors({ newPassword: msg });
        }
      }
    } catch (err: any) {
      setErrorPassword(err.message || 'Server error');
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div className="pb-6 border-b border-pink-950/60">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {tAdmin.settings.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {language === 'ar'
            ? 'إدارة بيانات الحساب الشخصي وتعديل اسم المستخدم وكلمة المرور.'
            : tAdmin.settings.subtitle}
        </p>
      </div>

      {/* Card 1: Account Info (Username & Email) */}
      <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-pink-950/60">
          <div className="p-2.5 rounded-xl bg-purple-950/40 text-purple-400 border border-purple-900/40">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              {language === 'ar' ? 'بيانات الحساب واسم المستخدم' : 'Account Details & Username'}
            </h2>
            <p className="text-[11px] text-slate-400">
              {language === 'ar'
                ? 'تغيير اسم المستخدم (Username) والبريد الإلكتروني الخاص بتسجيل الدخول.'
                : 'Modify your login username and administrative contact email.'}
            </p>
          </div>
        </div>

        {successAccount && (
          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successAccount}</span>
          </div>
        )}

        {errorAccount && (
          <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorAccount}</span>
          </div>
        )}

        <form onSubmit={handleAccountSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              {language === 'ar' ? 'اسم المستخدم (Username)' : 'Admin Username'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 pl-10 text-white focus:outline-none font-mono"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              {language === 'ar' ? 'البريد الإلكتروني (Email)' : 'Admin Email'}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.com"
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 pl-10 text-white focus:outline-none font-mono"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* Phone Number & Active Toggle */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block font-semibold text-slate-300">
                {language === 'ar' ? 'رقم الهاتف (Phone Number)' : 'Contact Phone Number'}
              </label>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <span className={`text-[10px] font-bold ${phoneEnabled ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {phoneEnabled
                    ? (language === 'ar' ? 'مفعّل في الموقع' : 'Active on site')
                    : (language === 'ar' ? 'معطّل (مخفي)' : 'Disabled')}
                </span>
                <input
                  type="checkbox"
                  checked={phoneEnabled}
                  onChange={(e) => setPhoneEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 bg-[#0a0312] border-pink-950 focus:ring-emerald-500 cursor-pointer"
                />
              </label>
            </div>
            <div className="relative">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+213..."
                className="w-full bg-[#0a0312] border border-pink-950 focus:border-pink-500 rounded-xl px-3.5 py-2.5 pl-10 text-white focus:outline-none font-mono"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {language === 'ar'
                ? 'يمكنك تفعيل أو إلغاء تفعيل رقم الهاتف حسب الحاجة. عند التفعيل يظهر للزوار في قسم التواصل، وعند التعطيل يتم إخفاؤه تماماً.'
                : 'Toggle phone number visibility on/off for visitors in the public contact section.'}
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loadingAccount}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-pink-500/20 disabled:opacity-50 transition-all hover:scale-[1.01] cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{loadingAccount ? '...' : language === 'ar' ? 'تحديث بيانات الحساب' : 'Update Account'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Card 2: Security & Password Change */}
      <div className="bg-[#120620]/90 border border-pink-950/80 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-pink-950/60">
          <div className="p-2.5 rounded-xl bg-pink-950/40 text-pink-400 border border-pink-900/40">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">
              {language === 'ar' ? 'تغيير كلمة المرور والأمان' : tAdmin.settings.cardTitle}
            </h2>
            <p className="text-[11px] text-slate-400">
              {language === 'ar'
                ? 'يتطلب إدخال كلمة المرور الحالية وكلمة المرور الجديدة وتأكيدها.'
                : tAdmin.settings.cardDesc}
            </p>
          </div>
        </div>

        {successPassword && (
          <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successPassword}</span>
          </div>
        )}

        {errorPassword && (
          <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorPassword}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
          {/* Current Password */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>{language === 'ar' ? 'كلمة المرور الحالية (القديمة)' : tAdmin.settings.currentPassword}</span>
              {fieldErrors.currentPassword && (
                <span className="text-[11px] text-red-400 font-normal flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  {fieldErrors.currentPassword}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type={showCurrentPass ? 'text' : 'password'}
                required
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  if (fieldErrors.currentPassword) setFieldErrors({ ...fieldErrors, currentPassword: undefined });
                }}
                placeholder="••••••••"
                className={`w-full bg-[#0a0312] border rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-white focus:outline-none transition-colors ${
                  fieldErrors.currentPassword
                    ? 'border-red-500 focus:border-red-400 ring-1 ring-red-500/40 bg-red-950/10'
                    : 'border-pink-950 focus:border-pink-500'
                }`}
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                tabIndex={-1}
              >
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>{language === 'ar' ? 'كلمة المرور الجديدة (6 أحرف على الأقل)' : tAdmin.settings.newPassword}</span>
              {fieldErrors.newPassword && (
                <span className="text-[11px] text-red-400 font-normal flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  {fieldErrors.newPassword}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type={showNewPass ? 'text' : 'password'}
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (fieldErrors.newPassword) setFieldErrors({ ...fieldErrors, newPassword: undefined });
                }}
                placeholder="••••••••"
                className={`w-full bg-[#0a0312] border rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-white focus:outline-none transition-colors ${
                  fieldErrors.newPassword
                    ? 'border-red-500 focus:border-red-400 ring-1 ring-red-500/40 bg-red-950/10'
                    : 'border-pink-950 focus:border-pink-500'
                }`}
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                tabIndex={-1}
              >
                {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5 flex items-center justify-between">
              <span>{language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : tAdmin.settings.confirmPassword}</span>
              {fieldErrors.confirmPassword && (
                <span className="text-[11px] text-red-400 font-normal flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-400" />
                  {fieldErrors.confirmPassword}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? 'text' : 'password'}
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: undefined });
                }}
                placeholder="••••••••"
                className={`w-full bg-[#0a0312] border rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-white focus:outline-none transition-colors ${
                  fieldErrors.confirmPassword
                    ? 'border-red-500 focus:border-red-400 ring-1 ring-red-500/40 bg-red-950/10'
                    : 'border-pink-950 focus:border-pink-500'
                }`}
              />
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                tabIndex={-1}
              >
                {showConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loadingPassword}
              className="w-full py-3 px-6 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 shadow-md shadow-pink-500/20 disabled:opacity-50 transition-all hover:scale-[1.01] cursor-pointer"
            >
              {loadingPassword ? '...' : language === 'ar' ? 'تغيير كلمة المرور وتأكيدها' : tAdmin.settings.updateBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
