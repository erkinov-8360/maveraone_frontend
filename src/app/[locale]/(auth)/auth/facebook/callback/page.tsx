'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useExchangeCode } from '@/hooks/useAuthMutations';
import { Spinner } from '@/components/ui/Spinner';

function FacebookCallbackContent() {
  const searchParams = useSearchParams();
  const exchangeCode = useExchangeCode();

  useEffect(() => {
    const code = searchParams.get('code');

    if (code && !exchangeCode.isPending && !exchangeCode.isSuccess) {
      exchangeCode.mutate(code);
    }
  }, [searchParams, exchangeCode]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-gray-600">
          {exchangeCode.isPending
            ? 'Completing Facebook sign in...'
            : exchangeCode.isError
              ? 'Authentication failed. Redirecting...'
              : 'Processing...'}
        </p>
      </div>
    </div>
  );
}

export default function FacebookCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <Spinner size="lg" />
        </div>
      }
    >
      <FacebookCallbackContent />
    </Suspense>
  );
}
