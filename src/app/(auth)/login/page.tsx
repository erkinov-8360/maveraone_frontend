import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { ROUTES } from '@/config/routes';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Sign in to your account to continue
          </p>
        </div>

        <Card>
          <SocialAuthButtons />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <LoginForm />

          <div className="mt-6 text-center text-sm">
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </Card>

        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="font-medium text-[#F5B546] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
