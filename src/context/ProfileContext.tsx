import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from '../services/api';
import { useLanguage } from './LanguageContext';

export interface ProfileData {
  _id?: string;
  fullName: string;
  rolePrefix?: {
    en?: string;
    ar?: string;
    fr?: string;
  };
  roleHighlight?: {
    en?: string;
    ar?: string;
    fr?: string;
  };
  subheading?: {
    en?: string;
    ar?: string;
    fr?: string;
  };
  avatarUrl?: string;
  resumeUrl?: string;
  email?: string;
  phone?: string;
  phoneEnabled?: boolean;
  location?: string;
  socialLinks?: Record<string, string>;
  socialLinksList?: any[];
  [key: string]: any;
}

interface ProfileContextType {
  profile: ProfileData | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  updateProfileState: (updated: Partial<ProfileData>) => void;
  setCustomTitle: (title?: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [customTitle, setCustomTitleState] = useState<string | undefined>(undefined);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getProfile();
      if (res && res.success && res.data) {
        setProfile(res.data);
      }
    } catch (err) {
      console.error('Failed to load profile in ProfileContext:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();

    const handleProfileUpdated = (e: any) => {
      if (e?.detail) {
        setProfile((prev) => (prev ? { ...prev, ...e.detail } : e.detail));
      } else {
        fetchProfile();
      }
    };

    window.addEventListener('profile-updated', handleProfileUpdated);
    return () => window.removeEventListener('profile-updated', handleProfileUpdated);
  }, [fetchProfile]);

  // Dynamically update document.title and meta description whenever profile, language, or customTitle changes
  useEffect(() => {
    const fullName = (profile?.fullName || '').trim() || 'Nexa Web';
    
    // Resolve role prefix in current language with fallback to en or generic
    const rolePrefix =
      profile?.rolePrefix?.[language] ||
      profile?.rolePrefix?.en ||
      profile?.rolePrefix?.fr ||
      '';

    let finalTitle = '';

    if (customTitle && customTitle.trim()) {
      finalTitle = `${fullName} | ${customTitle.trim()}`;
    } else if (rolePrefix) {
      finalTitle = `${fullName} | ${rolePrefix}`;
    } else {
      finalTitle = `${fullName} | Web Development Studio`;
    }

    // Update Browser Tab Title
    document.title = finalTitle;

    // Dynamically update Meta Description tag
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      const subheading =
        profile?.subheading?.[language] ||
        profile?.subheading?.en ||
        'Nexa Web creates modern, responsive websites and web applications designed to transform ideas into digital experiences.';
      metaDesc.setAttribute('content', subheading);
    }
  }, [profile, language, customTitle]);

  const updateProfileState = (updated: Partial<ProfileData>) => {
    setProfile((prev) => (prev ? { ...prev, ...updated } : (updated as ProfileData)));
  };

  const setCustomTitle = (title?: string) => {
    setCustomTitleState(title);
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        refreshProfile: fetchProfile,
        updateProfileState,
        setCustomTitle,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
