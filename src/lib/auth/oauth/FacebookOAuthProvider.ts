import { authApi } from '@/lib/api/auth';

export class FacebookOAuthProvider {
  authorize(): void {
    const authUrl = authApi.getFacebookAuthUrl();
    window.location.href = authUrl;
  }
}
