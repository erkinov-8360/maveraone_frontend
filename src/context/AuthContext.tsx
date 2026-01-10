'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '@/types/auth';
import { authService } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { ROUTES } from '@/config/routes';
import { useAuthStore } from '@/store/authStore';
import { getLocalizedPath, getLocaleFromPathname } from '@/lib/i18n/localizedRoutes';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Subscribe to Zustand store for real-time updates
  const storeUser = useAuthStore((state) => state.user);
  const storeIsAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Sync with Zustand store whenever it changes
  useEffect(() => {
    setUser(storeUser);
  }, [storeUser]);

  // Load user on mount
  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Failed to load user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(credentials: LoginCredentials) {
    const { user } = await authService.login(credentials);
    setUser(user);
    const locale = getLocaleFromPathname(pathname || '');
    router.push(getLocalizedPath(ROUTES.HOME, locale));
  }

  async function register(credentials: RegisterCredentials) {
    const { user } = await authService.register(credentials);
    setUser(user);
    const locale = getLocaleFromPathname(pathname || '');
    router.push(getLocalizedPath(ROUTES.HOME, locale));
  }

  async function logout() {
    await authService.logout();
    setUser(null);
    const locale = getLocaleFromPathname(pathname || '');
    router.push(getLocalizedPath(ROUTES.HOME, locale));
  }

  async function refreshUser() {
    await loadUser();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
