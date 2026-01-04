'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleOAuthProvider } from '@/lib/auth/oauth/GoogleOAuthProvider';
import { FacebookOAuthProvider } from '@/lib/auth/oauth/FacebookOAuthProvider';
import { authApi } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';
import { useAuthStore } from '@/store/authStore';
import { useTranslations } from '@/context/TranslationsContext';
import toast from 'react-hot-toast';

interface SocialAuthButtonsProps {
  variant?: 'row' | 'column';
}

export function SocialAuthButtons({ variant = 'row' }: SocialAuthButtonsProps) {
  const { t } = useTranslations();
  const router = useRouter();
  const { refreshUser } = useAuth();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [isLoading, setIsLoading] = useState(false);
  const googleProvider = new GoogleOAuthProvider();
  const facebookProvider = new FacebookOAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const code = await googleProvider.authorize();
      const authResponse = await authApi.exchangeCode(code);

      // Store in Zustand store (which persists to localStorage automatically)
      setAuth(authResponse.user, authResponse.token);

      // Refresh the auth context to update UI
      await refreshUser();

      toast.success(t('auth.successfullySignedIn'));

      // Redirect to main page
      router.push('/');
    } catch (error) {
      // Silently handle user cancellation (popup closed)
      if (error instanceof Error && error.message === 'Popup closed by user') {
        console.log('User cancelled Google OAuth');
        return;
      }
      // Log other errors but don't show to user
      console.error('Google OAuth error:', error);
      toast.error(t('auth.failedToSignIn'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true);
      const code = await facebookProvider.authorize();
      const authResponse = await authApi.exchangeCode(code);

      // Store in Zustand store (which persists to localStorage automatically)
      setAuth(authResponse.user, authResponse.token);

      // Refresh the auth context to update UI
      await refreshUser();

      toast.success(t('auth.successfullySignedIn'));

      // Redirect to main page
      router.push('/');
    } catch (error) {
      // Silently handle user cancellation (popup closed)
      if (error instanceof Error && error.message === 'Popup closed by user') {
        console.log('User cancelled Facebook OAuth');
        return;
      }
      // Log other errors but don't show to user
      console.error('Facebook OAuth error:', error);
      toast.error(t('auth.failedToSignIn'));
    } finally {
      setIsLoading(false);
    }
  };

  const isColumnLayout = variant === 'column';
  const containerClass = isColumnLayout
    ? 'flex flex-col gap-3'
    : 'flex flex-col gap-3 sm:flex-row';

  return (
    <div className={containerClass}>
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white h-12 px-6 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        {isColumnLayout ? t('auth.signInWithGoogle') : t('auth.google')}
      </button>

      <button
        type="button"
        onClick={handleFacebookLogin}
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white h-12 px-6 text-sm font-bold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg aria-hidden="true" className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
          <path
            clipRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            fillRule="evenodd"
          />
        </svg>
        {isColumnLayout ? t('auth.signInWithFacebook') : t('auth.facebook')}
      </button>
    </div>
  );
}
