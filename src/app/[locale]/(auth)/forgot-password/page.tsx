'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Mail, ArrowLeft, ArrowRight, KeyRound, CheckCircle } from 'lucide-react';
import { ROUTES } from '@/config/routes';
import { useResetPassword } from '@/hooks/useAuthMutations';
import { useLocalizedPath } from '@/hooks/useLocalizedPath';

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordPage() {
  const { getLocalizedPath } = useLocalizedPath();
  const resetPassword = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword.mutate(data.email);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          alt="Scenic canyon landscape with warm sunlight"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCcEMhOdkEv_xfiqalZMSTIc8irk80uuRmdHuKGRKn58ZRiqptRGtOAMEXH44Qch_RXS9XNMf3AN3I1KQ4aWZ_89KGyfUHyj--ZMXrXA9lFbMO_XsMIv8DHwz72He78HsfXjG7ZdkdNNIg19im1b_vAcAwoNbhWzO1r4bz_Fj58m523W2aMfdM8boIhx1ztwF7-rjH_1wsZtLSLz5MofGuJyFqcJYwiqvyDY-Os5AjIjAIAHSJMIgo_JbfAGaV1XecT7RcWS-1LfWB"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center w-full px-6 py-6 lg:px-12">
          <Link href={getLocalizedPath("/")} className="flex items-center gap-3 text-white group hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Maveraone</h2>
          </Link>
        </header>

        {/* Main Content */}
        <div className="flex flex-1 items-center justify-center p-4 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[520px] bg-white/95 backdrop-blur-md shadow-2xl rounded-[2.5rem] overflow-hidden"
          >
            <div className="p-8 md:p-12 flex flex-col gap-8">
              {resetPassword.isSuccess ? (
                /* Success State */
                <div className="flex flex-col gap-6 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-[-0.02em]">
                      Check Your Email
                    </h1>
                    <p className="text-slate-500 text-base font-normal leading-relaxed">
                      We&apos;ve sent a password reset link to your email address. Please check your inbox and follow the instructions.
                    </p>
                  </div>
                  <div className="flex justify-center border-t border-slate-100 pt-6 mt-2">
                    <Link
                      href={ROUTES.LOGIN}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Link>
                  </div>
                </div>
              ) : (
                /* Form State */
                <>
                  <div className="flex flex-col gap-3 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-2">
                      <KeyRound className="w-8 h-8" />
                    </div>
                    <h1 className="text-slate-900 text-3xl font-black leading-tight tracking-[-0.02em]">
                      Reset Password
                    </h1>
                    <p className="text-slate-500 text-base font-normal leading-relaxed">
                      Forgot your password? No problem. Enter your email and we&apos;ll send you reset instructions.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-slate-900 text-sm font-bold pl-4"
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      <div className="group relative">
                        <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          placeholder="example@maveraone.com"
                          className={`w-full h-14 pl-12 pr-6 rounded-full bg-slate-50 border ${
                            errors.email ? 'border-red-400' : 'border-slate-200'
                          } text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600`}
                          {...register('email')}
                        />
                      </div>
                      {errors.email && (
                        <p className="ml-4 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={resetPassword.isPending}
                      className="group relative flex w-full items-center justify-center rounded-full bg-blue-600 h-14 px-8 transition-all hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/30 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {resetPassword.isPending ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <span className="text-white text-base font-bold flex items-center gap-2">
                          Send Reset Link
                          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </span>
                      )}
                    </button>
                  </form>

                  <div className="flex justify-center border-t border-slate-100 pt-6">
                    <Link
                      href={ROUTES.LOGIN}
                      className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="w-full py-6 text-center text-white/40 text-xs">
          <p>© 2024 Maveraone Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
