'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';
import { ROUTES } from '@/config/routes';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

export function useExchangeCode() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (code: string) => authApi.exchangeCode(code),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Successfully signed in!');
      router.push(ROUTES.DASHBOARD);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Authentication failed');
      router.push(ROUTES.LOGIN);
    },
  });
}

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authApi.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Successfully signed in!');
      router.push(ROUTES.HOME);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => authApi.register(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      toast.success('Account created successfully!');
      router.push(ROUTES.HOME);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Registration failed');
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: async () => {
      clearAuth();
    },
    onSuccess: () => {
      toast.success('Logged out successfully');
      router.push(ROUTES.HOME);
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
