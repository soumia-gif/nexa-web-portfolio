import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, BackgroundTheme } from '../types';
import { api } from '../services/api';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  bgTheme: BackgroundTheme;
  setBgTheme: (bgTheme: BackgroundTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = localStorage.getItem('portfolio-theme') as Theme | null;
    if (saved === 'dark') return 'dark';
    localStorage.setItem('portfolio-theme', 'dark');
    return 'dark';
  });

  const [bgTheme, setBgThemeState] = useState<BackgroundTheme>(() => {
    if (typeof window === 'undefined') return 'midnight-orchid';
    const saved = localStorage.getItem('portfolio-bg-theme') as BackgroundTheme | null;
    return saved || 'midnight-orchid';
  });

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.setAttribute('content', newTheme === 'dark' ? 'dark' : 'light');
    }
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const applyBgTheme = (newBgTheme: BackgroundTheme) => {
    const root = document.documentElement;
    root.setAttribute('data-bg-theme', newBgTheme);
    localStorage.setItem('portfolio-bg-theme', newBgTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyBgTheme(bgTheme);
  }, [bgTheme]);

  // Load active background theme from backend settings on startup
  useEffect(() => {
    const loadServerSettings = async () => {
      try {
        const res = await api.getSettings();
        if (res.success && res.data?.backgroundTheme) {
          setBgThemeState(res.data.backgroundTheme);
          applyBgTheme(res.data.backgroundTheme);
        }
      } catch (e) {
        // Fallback to local
      }
    };
    loadServerSettings();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const saved = localStorage.getItem('portfolio-theme');
      if (!saved) {
        const nextTheme = e.matches ? 'dark' : 'light';
        setThemeState(nextTheme);
        applyTheme(nextTheme);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return next;
    });
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  const setBgTheme = (newBgTheme: BackgroundTheme) => {
    setBgThemeState(newBgTheme);
    applyBgTheme(newBgTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, bgTheme, setBgTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
