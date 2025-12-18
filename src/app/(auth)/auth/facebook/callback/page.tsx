'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FacebookOAuthProvider } from '@/lib/auth/oauth/FacebookOAuthProvider';
import { ROUTES } from '@/config/routes';
import { Spinner } from '@/components/ui/Spinner';

function FacebookCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');

      if (!code) {
        router.push(ROUTES.LOGIN);
        return;
      }

      try {
        const facebookProvider = new FacebookOAuthProvider();
        await facebookProvider.handleCallback(code);

        // Redirect to dashboard after successful authentication
        router.push(ROUTES.DASHBOARD);
      } catch (error) {
        console.error('OAuth callback error:', error);
        router.push(ROUTES.LOGIN);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">Completing Facebook sign in...</p>
      </div>
    </div>
  );
}

export default function FacebookCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    }>
      <FacebookCallbackContent />
    </Suspense>
  );
}
