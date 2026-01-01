'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Plane, User, Mail, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useRegister } from '@/hooks/useAuthMutations';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { ROUTES } from '@/config/routes';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          alt="Scenic mountain lake travel landscape"
          className="h-full w-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzAuKc79wNlAwn3l_ODc0q24164NnlW67TCghSCLUiV1aBJGhjbWQjw8TRNul9l_1tuFIlIYg8f3f9GpdXXIAOHMrxWg9HSXy2Ptxmv77YumsUWH-mBWnHPzUHxU-O6FaO7s7LzUERyZwCe5U88xVHOKjij-x8ECdRLqMkTlIM4hSEkLZkFrU1DtFS31u93icSxOVJzwgFHZYW74XHEuCNFaw3X-oZ720T75EhXmK1OSpvsNNDGiKbTym9-n0xAkkBD8hSJsEf2fcr"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-8 md:justify-start md:px-12 lg:px-20">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30">
            <Plane className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white drop-shadow-md">Maveraone</h2>
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[520px] rounded-[2.5rem] p-8 shadow-2xl ring-1 ring-white/20 md:p-10 bg-white/95 backdrop-blur-xl"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Start Your Journey
            </h1>
            <p className="text-slate-500">
              Join Maveraone to unlock exclusive travel deals.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* Full Name */}
            <div className="group relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className={`h-14 w-full rounded-full border-2 ${
                  errors.name ? 'border-red-400' : 'border-slate-200'
                } bg-slate-50 pl-12 pr-4 text-base font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white`}
                {...register('name')}
              />
              {errors.name && (
                <p className="mt-1 ml-4 text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="group relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                className={`h-14 w-full rounded-full border-2 ${
                  errors.email ? 'border-red-400' : 'border-slate-200'
                } bg-slate-50 pl-12 pr-4 text-base font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white`}
                {...register('email')}
              />
              {errors.email && (
                <p className="mt-1 ml-4 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="group relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create Password"
                className={`h-14 w-full rounded-full border-2 ${
                  errors.password ? 'border-red-400' : 'border-slate-200'
                } bg-slate-50 pl-12 pr-12 text-base font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password && (
                <p className="mt-1 ml-4 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="group relative">
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className={`h-14 w-full rounded-full border-2 ${
                  errors.password_confirmation ? 'border-red-400' : 'border-slate-200'
                } bg-slate-50 pl-12 pr-12 text-base font-medium text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-blue-600 focus:bg-white`}
                {...register('password_confirmation')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password_confirmation && (
                <p className="mt-1 ml-4 text-xs text-red-500">{errors.password_confirmation.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={registerMutation.isPending}
              className="mt-2 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-blue-600 text-base font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {registerMutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative bg-white px-4 text-sm font-medium text-slate-400">
              or continue with
            </div>
          </div>

          {/* Social Auth Buttons */}
          <SocialAuthButtons />

          {/* Login Link */}
          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Already have an account?{' '}
            <Link
              href={ROUTES.LOGIN}
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Log in
            </Link>
          </p>
        </motion.div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-white/60">
          © 2024 Maveraone Inc. All rights reserved.
        </p>
      </main>
    </div>
  );
}
