import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (usernameOrEmail: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('portfolio_admin_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const savedToken = localStorage.getItem('portfolio_admin_token');
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.getMe();
        if (res.success && res.data) {
          setUser(res.data);
          setToken(savedToken);
        } else {
          localStorage.removeItem('portfolio_admin_token');
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        localStorage.removeItem('portfolio_admin_token');
        setUser(null);
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (usernameOrEmail: string, password: string) => {
    try {
      const res = await api.login(usernameOrEmail, password);
      if (res.success && res.data?.token) {
        localStorage.setItem('portfolio_admin_token', res.data.token);
        setToken(res.data.token);
        setUser({
          _id: res.data._id,
          username: res.data.username,
          email: res.data.email,
          role: res.data.role,
        });
        return { success: true };
      }
      return { success: false, message: res.message || 'فشل تسجيل الدخول' };
    } catch (err: any) {
      return { success: false, message: err.message || 'حدث خطأ في الاتصال بالخادم' };
    }
  };

  const updateUser = (updatedUser: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  };

  const logout = () => {
    localStorage.removeItem('portfolio_admin_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
