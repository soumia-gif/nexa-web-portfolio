import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ENV_PASSCODE = ((import.meta as any).env?.VITE_ADMIN_GATE_PASSCODE || '').trim();
export const SECRET_PASSCODE = ENV_PASSCODE;
export const SECRET_STORAGE_KEY = 'portfolio_secret_gate_token';

interface SecretGateContextType {
  isGateUnlocked: boolean;
  unlockGate: () => void;
  lockGate: () => void;
  secretPasscode: string;
}

const SecretGateContext = createContext<SecretGateContextType | undefined>(undefined);

export const SecretGateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isGateUnlocked, setIsGateUnlocked] = useState<boolean>(() => {
    const stored = localStorage.getItem(SECRET_STORAGE_KEY);
    if (!stored) return false;
    return !ENV_PASSCODE || stored === ENV_PASSCODE;
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Detect ?secret=... in query parameters
    const params = new URLSearchParams(window.location.search);
    const secret = params.get('secret');

    if (secret && (!ENV_PASSCODE || secret.trim() === ENV_PASSCODE)) {
      localStorage.setItem(SECRET_STORAGE_KEY, ENV_PASSCODE || 'gate_unlocked_session');
      setIsGateUnlocked(true);

      // Clean the secret parameter from the address bar without page reload
      params.delete('secret');
      const remainingQuery = params.toString() ? `?${params.toString()}` : '';
      const cleanUrl = window.location.pathname + remainingQuery + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);

      // Smoothly navigate directly to the admin area
      navigate('/admin', { replace: true });
    }

    // 2. Secret keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A on Mac)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        localStorage.setItem(SECRET_STORAGE_KEY, ENV_PASSCODE || 'gate_unlocked_session');
        setIsGateUnlocked(true);
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [location, navigate]);

  const unlockGate = () => {
    localStorage.setItem(SECRET_STORAGE_KEY, ENV_PASSCODE || 'gate_unlocked_session');
    setIsGateUnlocked(true);
  };

  const lockGate = () => {
    localStorage.removeItem(SECRET_STORAGE_KEY);
    setIsGateUnlocked(false);
  };

  return (
    <SecretGateContext.Provider
      value={{
        isGateUnlocked,
        unlockGate,
        lockGate,
        secretPasscode: SECRET_PASSCODE,
      }}
    >
      {children}
    </SecretGateContext.Provider>
  );
};

export const useSecretGate = () => {
  const context = useContext(SecretGateContext);
  if (!context) {
    throw new Error('useSecretGate must be used within a SecretGateProvider');
  }
  return context;
};
