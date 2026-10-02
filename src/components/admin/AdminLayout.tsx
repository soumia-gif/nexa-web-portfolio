import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSecretGate } from '../../context/SecretGateContext';
import { adminTranslations } from '../../data/adminTranslations';
import { Language } from '../../types';
import { api } from '../../services/api';
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  UserCheck,
  Mail,
  KeyRound,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Shield,
  Layers,
  Globe,
  Lock,
  Share2,
  Palette,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

import { useProfile } from '../../context/ProfileContext';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, setLanguage, isRtl } = useLanguage();
  const { setCustomTitle } = useProfile();
  const { lockGate } = useSecretGate();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [adminName, setAdminName] = useState<string>('Portfolio Admin');

  const tAdmin = adminTranslations[language] || adminTranslations.fr;

  const fetchDashboardData = async () => {
    try {
      const [statsRes, profileRes] = await Promise.all([
        api.getStats().catch(() => null),
        api.getProfile().catch(() => null),
      ]);
      if (statsRes?.success && statsRes.data) {
        setUnreadCount(statsRes.data.unreadMessages || 0);
      }
      if (profileRes?.success && profileRes.data?.fullName) {
        setAdminName(profileRes.data.fullName);
      }
    } catch (e) {
      // ignore
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const dashboardTitle = language === 'ar' ? 'لوحة التحكم' : language === 'fr' ? 'Tableau de bord' : 'Dashboard';
    setCustomTitle(dashboardTitle);
    return () => setCustomTitle(undefined);
  }, [language, setCustomTitle]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleLockGateAndExit = () => {
    logout();
    lockGate();
    navigate('/', { replace: true });
  };

  const navLinks = [
    { to: '/admin', label: tAdmin.sidebar.overview, icon: LayoutDashboard, end: true },
    { to: '/admin/projects', label: tAdmin.sidebar.projects, icon: FolderGit2 },
    { to: '/admin/skills', label: tAdmin.sidebar.skills, icon: Cpu },
    { to: '/admin/profile', label: tAdmin.sidebar.profile, icon: UserCheck },
    {
      to: '/admin/social',
      label: language === 'ar' ? 'شبكات التواصل' : language === 'fr' ? 'Réseaux Sociaux' : 'Social Media',
      icon: Share2,
    },
    {
      to: '/admin/appearance',
      label: language === 'ar' ? 'المظهر والأقسام والـ CV' : language === 'fr' ? 'Apparence & Sections' : 'Appearance & CV',
      icon: Palette,
    },
    {
      to: '/admin/messages',
      label: tAdmin.sidebar.messages,
      icon: Mail,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { to: '/admin/settings', label: tAdmin.sidebar.settings, icon: KeyRound },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ar', label: 'عربي', flag: '🇩🇿' },
  ];

  return (
    <div
      className={`min-h-screen bg-[#07020b] text-[#fdf4f8] flex flex-col md:flex-row antialiased ${
        isRtl ? 'font-arabic' : 'font-sans'
      }`}
    >
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0d0416] border-b border-pink-950/80 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
            ST
          </div>
          <span className="font-bold text-sm text-white">Admin CMS</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center rounded-full bg-[#160822] p-0.5 border border-pink-900/60">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                  language === l.code
                    ? 'bg-pink-500 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.flag} {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-pink-950/40 text-pink-300 border border-pink-900/50"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar for Desktop & Mobile Drawer */}
      <aside
        className={`fixed md:sticky top-0 ${
          isRtl ? 'right-0 border-l' : 'left-0 border-r'
        } h-screen w-72 bg-[#0c0414] border-pink-950/80 p-5 flex flex-col justify-between z-50 transition-transform duration-300 ${
          mobileSidebarOpen
            ? 'translate-x-0'
            : isRtl
            ? 'translate-x-full md:translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 pb-5 border-b border-pink-950/60 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 flex items-center justify-center font-black text-white text-sm shadow-md shadow-pink-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-sm text-white tracking-wide uppercase truncate max-w-[170px]" title={adminName}>
                {adminName}
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-pink-400 font-mono">
                <Shield className="w-3 h-3" />
                <span>{tAdmin.sidebar.brandSubtitle}</span>
              </div>
            </div>
          </div>

          {/* Desktop Language Switcher Inside Sidebar */}
          <div className="mb-5 p-2 rounded-xl bg-[#140722] border border-pink-950 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-pink-400 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase tracking-wider">Langue:</span>
            </div>
            <div className="flex items-center gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLanguage(l.code)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    language === l.code
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-pink-950/40'
                  }`}
                  title={l.label}
                >
                  <span className="text-xs">{l.flag}</span>
                  <span className="text-[10px] font-mono">{l.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-transparent text-white border-l-4 border-pink-500 shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-pink-950/30'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-pink-400 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="bg-pink-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-pink-950/60 space-y-2">
          {/* Quick link to live public site */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-pink-300 hover:text-white bg-pink-950/30 hover:bg-pink-900/40 border border-pink-900/40 transition-all"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{tAdmin.sidebar.viewSite}</span>
            </span>
            <span className="text-[10px] text-pink-400">Live</span>
          </a>

          {/* Stealth Lock Gate Button */}
          <button
            type="button"
            onClick={handleLockGateAndExit}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/30 hover:bg-rose-900/50 border border-rose-900/40 transition-all cursor-pointer"
            title="قفل المسار السري وإخفاء لوحة التحكم تماماً"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>
                {language === 'ar'
                  ? 'قفل البوابة السرية والخروج'
                  : language === 'fr'
                  ? 'Verrouiller & Masquer'
                  : 'Lock & Hide Admin Gate'}
              </span>
            </span>
            <span className="text-[10px] bg-rose-900/60 px-1.5 py-0.5 rounded text-rose-200">Stealth</span>
          </button>

          {/* User info & Logout */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#140622] border border-pink-950">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-300 flex items-center justify-center text-xs font-bold shrink-0">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">{user?.username}</p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title={tAdmin.sidebar.logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};
