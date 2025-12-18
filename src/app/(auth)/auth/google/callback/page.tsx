'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoogleOAuthProvider } from '@/lib/auth/oauth/GoogleOAuthProvider';
import { ROUTES } from '@/config/routes';
import { Spinner } from '@/components/ui/Spinner';

function GoogleCallbackContent() {
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
        const googleProvider = new GoogleOAuthProvider();
        await googleProvider.handleCallback(code);

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
        <p className="mt-4 text-gray-600">Completing Google sign in...</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spinner size="lg" />
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
