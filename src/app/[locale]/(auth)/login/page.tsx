'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Globe, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/config/routes';
import toast from 'react-hot-toast';
import { useTranslations } from '@/context/TranslationsContext';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const getLoginSchema = (t: (key: string) => string) => z.object({
  email: z.string().email(t('auth.validation.invalidEmail')),
  password: z.string().min(8, t('auth.validation.passwordMinLength8')),
});

export default function LoginPage() {
  const { t } = useTranslations();
  const { getLocalizedPath } = useLocalizedPath();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginSchema = getLoginSchema(t);
  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success(t('auth.successfullySignedIn'));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('auth.failedToSignIn'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBnBRT0kGixbLvu-Wsk9fnNUBiwIMlbSn1jKYimdyufcD-GFEvBI79lyaSUZ7ixVCxf_s5xmrL37udNT4ycSGnAsp_dqZgrsEq4xIeLhGgtCYlcbNpo4wkCKskz50SjUlL1UA02ngujfe8kR-kK0SDbOAtbLLZkdhBWwF4osbvXGhWvBaJa6WtdALyA7Fdcl1-b0hnMWcWK7jNIMmHIa41W1sbq19Zt-ySXOklH_BVi-4y9BiHFcI-MKUDctjSduqA9OtV-48gWgdY1')`,
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between whitespace-nowrap px-10 py-6 border-b border-white/10">
        <Link href={getLocalizedPath("/")} className="flex items-center gap-4 text-white">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20 backdrop-blur-md">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Maveraone</h2>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-20 flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[480px] bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-2xl overflow-hidden p-8 md:p-10 border border-white/20"
        >
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-slate-900 tracking-tight text-[32px] font-bold leading-tight text-center mb-2">
              {t('auth.welcomeBack')}
            </h1>
            <p className="text-slate-500 text-base font-normal leading-normal text-center">
              {t('auth.loginSubtitle')}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col w-full">
              <span className="text-slate-900 text-sm font-bold leading-normal pb-2 ml-1">{t('common.email')}</span>
              <div className="group relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  placeholder={t('auth.enterEmail')}
                  className={`h-12 w-full rounded-full border ${
                    errors.email ? 'border-red-400' : 'border-slate-200'
                  } bg-slate-50 pl-11 pr-4 text-base font-normal text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/50 focus:bg-white`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 ml-4 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-center pb-2 ml-1">
                <span className="text-slate-900 text-sm font-bold leading-normal">{t('common.password')}</span>
              </div>
              <div className="group relative">
                <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.enterPassword')}
                  className={`h-12 w-full rounded-full border ${
                    errors.password ? 'border-red-400' : 'border-slate-200'
                  } bg-slate-50 pl-11 pr-12 text-base font-normal text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:ring-2 focus:ring-blue-600/50 focus:bg-white`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 ml-4 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-2">
              <Link
                href={getLocalizedPath(ROUTES.FORGOT_PASSWORD)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
              >
                {t('auth.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-full h-12 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-bold transition-colors shadow-lg shadow-blue-500/30 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                t('auth.signIn')
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex py-8 items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">{t('auth.orContinueWith')}</span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          {/* Social Auth Buttons */}
          <SocialAuthButtons variant="column" />

          {/* Sign Up Link */}
          <div className="text-center mt-8">
            <p className="text-slate-500 text-sm">
              {t('auth.dontHaveAccount')}{' '}
              <Link
                href={getLocalizedPath(ROUTES.REGISTER)}
                className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
              >
                {t('auth.signUp')}
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
