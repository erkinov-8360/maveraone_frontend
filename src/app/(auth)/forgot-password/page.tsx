import Link from 'next/link';
import { ROUTES } from '@/config/routes';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ForgotPasswordPage() {
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
          <form className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <Button type="submit" className="w-full">
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
        </Card>
      </div>
    </div>
  );
}
