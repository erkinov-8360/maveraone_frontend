export const AUTH_CONFIG = {
  tokenKey: 'maveraone_auth_token',
  userKey: 'maveraone_user',
  tokenExpiryDays: 7,

  oauth: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/google/callback`,
      scope: 'openid email profile',
    },
    facebook: {
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/facebook/callback`,
      scope: 'email,public_profile',
    },
  },

  useMock: process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true',
};
