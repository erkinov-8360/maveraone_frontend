import { authApi } from '@/lib/api/auth';

export class GoogleOAuthProvider {
  authorize(): Promise<string> {
    return new Promise((resolve, reject) => {
      const authUrl = authApi.getGoogleAuthUrl();
      console.log('Opening OAuth popup to:', authUrl);
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        authUrl,
        'Google OAuth',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        reject(new Error('Failed to open popup window. Please allow popups for this site.'));
        return;
      }

      console.log('Popup opened successfully');

      const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          reject(new Error('Popup closed by user'));
          return;
        }

        try {
          const popupUrl = popup.location.href;
          console.log('Checking popup URL:', popupUrl);

          if (popupUrl.includes('/oauth/callback')) {
            const url = new URL(popupUrl);
            const code = url.searchParams.get('code');

            if (code) {
              console.log('Code received:', code);
              clearInterval(checkPopup);
              popup.close();
              resolve(code);
            }
          }
        } catch (e) {
          // Cross-origin error - popup is still on external domain
          // This is expected while on Google's OAuth page
          console.log('Cross-origin - waiting for redirect back to our domain');
        }
      }, 500);
    });
  }
}
