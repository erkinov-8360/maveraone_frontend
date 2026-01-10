'use client';

import { useAuth } from './useAuth';

export function useUser() {
  const { user, isLoading, isAuthenticated } = useAuth();

  return {
    user,
    isLoading,
    isAuthenticated,
    isGuest: !isAuthenticated,
  };
}
