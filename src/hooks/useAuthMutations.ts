'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/config/routes';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';
import { getLocalizedPath, getLocaleFromPathname } from '@/lib/i18n/localizedRoutes';

export function useExchangeCode() {
  const router = useRouter();
  const pathname = usePathname();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (code: string) => authApi.exchangeCode(code),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Successfully signed in!');
      const locale = getLocaleFromPathname(pathname || '');
      router.push(getLocalizedPath(ROUTES.DASHBOARD, locale));
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Authentication failed');
      const locale = getLocaleFromPathname(pathname || '');
      router.push(getLocalizedPath(ROUTES.LOGIN, locale));
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const pathname = usePathname();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Successfully signed in!');
      const locale = getLocaleFromPathname(pathname || '');
      router.push(getLocalizedPath(ROUTES.HOME, locale));
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const pathname = usePathname();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Account created successfully!');
      const locale = getLocaleFromPathname(pathname || '');
      router.push(getLocalizedPath(ROUTES.HOME, locale));
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const pathname = usePathname();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: async () => {
      clearAuth();
    },
    onSuccess: () => {
      toast.success('Logged out successfully');
      const locale = getLocaleFromPathname(pathname || '');
      router.push(getLocalizedPath(ROUTES.HOME, locale));
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (email: string) => authApi.resetPassword(email),
    onSuccess: () => {
      toast.success('Password reset link sent to your email!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send reset link');
    },
  });
}
