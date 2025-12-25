'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useResetPassword } from '@/hooks/useAuthMutations';

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ForgotPasswordPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Reset your password
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email and we&apos;ll send you a reset link
          </p>
        </div>

        <Card>
          {resetPassword.isSuccess ? (
            <div className="text-center space-y-4">
              <div className="text-green-600">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-600">
                Check your email for a password reset link.
              </p>
              <Link
                href={ROUTES.LOGIN}
                className="text-blue-600 hover:underline"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Button
                  type="submit"
                  className="w-full"
                  isLoading={resetPassword.isPending}
                >
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link
                  href={ROUTES.LOGIN}
                  className="text-blue-600 hover:underline"
                >
                  Back to login
                </Link>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
