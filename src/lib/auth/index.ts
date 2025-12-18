import { AuthService } from './AuthService';
import { MockAuthService } from './MockAuthService';
import { ApiAuthService } from './ApiAuthService';
import { AUTH_CONFIG } from '@/config/auth';

// Factory function - THIS IS KEY FOR EASY SWAPPING!
// Change environment variable to switch between mock and real API
export function createAuthService(): AuthService {
  if (AUTH_CONFIG.useMock) {
    return new MockAuthService();
  }
  return new ApiAuthService();
}

// Export singleton instance
export const authService = createAuthService();
