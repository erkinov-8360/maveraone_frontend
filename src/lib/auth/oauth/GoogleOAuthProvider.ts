import { authApi } from '@/lib/api/auth';

export class GoogleOAuthProvider {
  authorize(): void {
    const authUrl = authApi.getGoogleAuthUrl();
    window.location.href = authUrl;
  }
}
