import { authApi } from '@/lib/api/auth';

export class FacebookOAuthProvider {
  authorize(): Promise<string> {
    return new Promise((resolve, reject) => {
      const authUrl = authApi.getFacebookAuthUrl();
      const width = 500;
      const height = 600;
      const left = window.screen.width / 2 - width / 2;
      const top = window.screen.height / 2 - height / 2;

      const popup = window.open(
        authUrl,
        'Facebook OAuth',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        reject(new Error('Failed to open popup window'));
        return;
      }

      const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
          reject(new Error('Popup closed by user'));
          return;
        }

        try {
          const popupUrl = popup.location.href;

          if (popupUrl.includes('/oauth/callback')) {
            const url = new URL(popupUrl);
            const code = url.searchParams.get('code');

            if (code) {
              clearInterval(checkPopup);
              popup.close();
              resolve(code);
            }
          }
        } catch (e) {
          // Cross-origin error - popup is still on external domain
          // This is expected while on Facebook's OAuth page
        }
      }, 500);
    });
  }
}
