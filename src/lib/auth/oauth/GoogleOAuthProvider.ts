import { AUTH_CONFIG } from '@/config/auth';
import { AuthResponse } from '@/types/auth';
import { LocalStorageAdapter } from '../storage/LocalStorageAdapter';

export class GoogleOAuthProvider {
  private storage = new LocalStorageAdapter();

  async authorize(): Promise<void> {
    // Calculate center position
    const width = 600;
    const height = 700;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},noopener,noreferrer`;

    if (AUTH_CONFIG.useMock) {
      // Mock implementation - simulate redirect in new tab
      const mockCode = 'mock-google-code-' + Date.now();
      const url = `${AUTH_CONFIG.oauth.google.redirectUri}?code=${mockCode}`;
      window.open(url, '_blank', windowFeatures);
      return;
    }

    // Real Google OAuth URL
    const params = new URLSearchParams({
      client_id: AUTH_CONFIG.oauth.google.clientId,
      redirect_uri: AUTH_CONFIG.oauth.google.redirectUri,
      response_type: 'code',
      scope: AUTH_CONFIG.oauth.google.scope,
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    window.open(authUrl, '_blank', windowFeatures);
  }

  async handleCallback(code: string): Promise<AuthResponse> {
    if (AUTH_CONFIG.useMock) {
      // Mock user from Google
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockUser = {
        id: 'google-' + Date.now(),
        email: 'user@gmail.com',
        name: 'Google User',
        profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=google',
        provider: 'google' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const token = `mock-google-token-${Date.now()}`;
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      this.storage.setToken(token);
      this.storage.setUser(mockUser);

      return { user: mockUser, token, expiresAt };
    }

    // Real implementation - exchange code for token
    const response = await fetch('/api/auth/google/callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Google authentication failed');
    }

    return response.json();
  }
}
