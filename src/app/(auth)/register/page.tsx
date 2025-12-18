import Link from 'next/link';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { SocialAuthButtons } from '@/components/auth/SocialAuthButtons';
import { ROUTES } from '@/config/routes';
import { Card } from '@/components/ui/Card';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Start your journey with MaveraOne Tours
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
                Or register with email
              </span>
            </div>
          </div>

          <RegisterForm />
        </Card>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="font-medium text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
