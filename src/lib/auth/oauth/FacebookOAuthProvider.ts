import { AUTH_CONFIG } from '@/config/auth';
import { AuthResponse } from '@/types/auth';
import { LocalStorageAdapter } from '../storage/LocalStorageAdapter';

export class FacebookOAuthProvider {
  private storage = new LocalStorageAdapter();

  async authorize(): Promise<void> {
    if (AUTH_CONFIG.useMock) {
      // Mock implementation - simulate redirect
      const mockCode = 'mock-facebook-code-' + Date.now();
      window.location.href = `${AUTH_CONFIG.oauth.facebook.redirectUri}?code=${mockCode}`;
      return;
    }

    // Real Facebook OAuth URL
    const params = new URLSearchParams({
      client_id: AUTH_CONFIG.oauth.facebook.appId,
      redirect_uri: AUTH_CONFIG.oauth.facebook.redirectUri,
      scope: AUTH_CONFIG.oauth.facebook.scope,
    });

    window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?${params}`;
  }

  async handleCallback(code: string): Promise<AuthResponse> {
    if (AUTH_CONFIG.useMock) {
      // Mock user from Facebook
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockUser = {
        id: 'facebook-' + Date.now(),
        email: 'user@facebook.com',
        name: 'Facebook User',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=facebook',
        provider: 'facebook' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const token = `mock-facebook-token-${Date.now()}`;
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      this.storage.setToken(token);
      this.storage.setUser(mockUser);

      return { user: mockUser, token, expiresAt };
    }

    // Real implementation - exchange code for token
    const response = await fetch('/api/auth/facebook/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Facebook authentication failed');
    }

    return response.json();
  }
}
