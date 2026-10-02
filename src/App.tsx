import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ProfileProvider } from './context/ProfileContext';
import { AuthProvider } from './context/AuthContext';

import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { FloatingLanguageSwitcher } from './components/layout/FloatingLanguageSwitcher';
import { InteractiveBackground } from './components/canvas/InteractiveBackground';

// Admin Components
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { SecretGateRoute } from './components/admin/SecretGateRoute';
import { SecretGateProvider } from './context/SecretGateContext';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminProjects } from './components/admin/AdminProjects';
import { AdminSkills } from './components/admin/AdminSkills';
import { AdminProfile } from './components/admin/AdminProfile';
import { AdminMessages } from './components/admin/AdminMessages';
import { AdminSettings } from './components/admin/AdminSettings';
import { AdminSocialLinks } from './components/admin/AdminSocialLinks';
import { AdminAppearance } from './components/admin/AdminAppearance';

import { CvDownloadSection } from './components/cv/CvDownloadSection';
import { api } from './services/api';
import { SectionConfig } from './types';

import { useTheme } from './context/ThemeContext';
import { getThemeStyles } from './utils/themeStyles';

const defaultSections: SectionConfig[] = [
  { id: 'hero', label: { en: 'Hero' }, enabled: true, order: 1 },
  { id: 'about', label: { en: 'About' }, enabled: true, order: 2 },
  { id: 'projects', label: { en: 'Projects' }, enabled: true, order: 3 },
  { id: 'skills', label: { en: 'Skills' }, enabled: true, order: 4 },
  { id: 'cv', label: { en: 'CV Download' }, enabled: true, order: 5 },
  { id: 'contact', label: { en: 'Contact' }, enabled: true, order: 6 },
];

const PublicPortfolio: React.FC = () => {
  const { isRtl } = useLanguage();
  const { bgTheme, setBgTheme } = useTheme();
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
  const themeStyles = getThemeStyles(bgTheme);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success && res.data) {
          if (res.data.backgroundTheme) {
            setBgTheme(res.data.backgroundTheme);
          }
          if (res.data.sections && res.data.sections.length > 0) {
            setSections(
              [...res.data.sections].sort((a: SectionConfig, b: SectionConfig) => (a.order || 0) - (b.order || 0))
            );
          }
        }
      } catch (e) {
        // Fallback to defaults
      }
    };
    loadSettings();
  }, [setBgTheme]);

  const renderSection = (id: string) => {
    switch (id) {
      case 'hero':
        return <HeroSection key="hero" />;
      case 'about':
        return <AboutSection key="about" />;
      case 'projects':
        return <ProjectsSection key="projects" />;
      case 'skills':
        return <SkillsSection key="skills" />;
      case 'cv':
        return <CvDownloadSection key="cv" />;
      case 'contact':
        return <ContactSection key="contact" />;
      default:
        return null;
    }
  };

  const getThemeAura = () => {
    switch (bgTheme) {
      case 'cyber-matrix':
        return (
          <>
            <div className="fixed top-0 left-1/4 w-[38rem] h-[38rem] bg-emerald-600/15 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed top-1/2 right-1/4 w-[36rem] h-[36rem] bg-teal-500/15 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-[150px] pointer-events-none -z-10" />
          </>
        );
      case 'deep-cosmos':
        return (
          <>
            <div className="fixed top-0 left-1/4 w-[38rem] h-[38rem] bg-blue-600/20 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed top-1/2 right-1/4 w-[36rem] h-[36rem] bg-indigo-600/20 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-cyan-600/15 rounded-full blur-[150px] pointer-events-none -z-10" />
          </>
        );
      case 'sunset-aurora':
        return (
          <>
            <div className="fixed top-0 left-1/4 w-[38rem] h-[38rem] bg-amber-600/20 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed top-1/2 right-1/4 w-[36rem] h-[36rem] bg-rose-600/20 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-orange-600/15 rounded-full blur-[150px] pointer-events-none -z-10" />
          </>
        );
      case 'minimal-mesh':
        return (
          <>
            <div className="fixed top-0 left-1/4 w-[38rem] h-[38rem] bg-slate-600/15 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed top-1/2 right-1/4 w-[36rem] h-[36rem] bg-cyan-900/15 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-zinc-700/10 rounded-full blur-[150px] pointer-events-none -z-10" />
          </>
        );
      case 'midnight-orchid':
      default:
        return (
          <>
            <div className="fixed top-0 left-1/4 w-[38rem] h-[38rem] bg-rose-600/15 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed top-1/2 right-1/4 w-[36rem] h-[36rem] bg-fuchsia-600/15 rounded-full blur-[170px] pointer-events-none -z-10" />
            <div className="fixed bottom-0 left-1/3 w-96 h-96 bg-pink-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />
          </>
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative transition-colors duration-700 ${themeStyles.pageBg} ${themeStyles.pageText} ${
        isRtl ? 'font-arabic' : 'font-sans'
      }`}
    >
      {/* Dynamic Interactive Canvas Background with selected theme */}
      <InteractiveBackground theme={bgTheme} />
      {/* Ambient Blurs tailored to current theme */}
      {getThemeAura()}

      {/* Navigation Bar */}
      <Navbar />

      {/* Dynamic Main Content Flow based on Dashboard Section Ordering */}
      <main className="flex-1 relative z-10">
        {sections.filter((s) => s.enabled).map((s) => renderSection(s.id))}
      </main>

      {/* Floating Quick Language Switcher */}
      <FloatingLanguageSwitcher />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <ProfileProvider>
            <SecretGateProvider>
              <AuthProvider>
                <Routes>
                  {/* Public Portfolio */}
                  <Route path="/" element={<PublicPortfolio />} />

                  {/* Admin Login - Hidden behind Secret Gate */}
                  <Route
                    path="/admin/login"
                    element={
                      <SecretGateRoute>
                        <AdminLogin />
                      </SecretGateRoute>
                    }
                  />

                  {/* Protected Admin CMS Dashboard - Hidden behind Secret Gate AND JWT */}
                  <Route
                    path="/admin"
                    element={
                      <SecretGateRoute>
                        <ProtectedRoute>
                          <AdminLayout />
                        </ProtectedRoute>
                      </SecretGateRoute>
                    }
                  >
                    <Route index element={<AdminOverview />} />
                    <Route path="projects" element={<AdminProjects />} />
                    <Route path="skills" element={<AdminSkills />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route path="social" element={<AdminSocialLinks />} />
                    <Route path="appearance" element={<AdminAppearance />} />
                    <Route path="messages" element={<AdminMessages />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>

                  {/* Fallback - Silently redirect everything else to Home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AuthProvider>
            </SecretGateProvider>
          </ProfileProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
