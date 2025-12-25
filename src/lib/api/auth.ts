import { apiClient } from './client';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';

interface ExchangeCodeResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    token_type: string;
    user: {
      name: string;
      email: string;
      avatar: string | null;
      email_verified_at: string | null;
    };
  };
  errors: null;
}

export const authApi = {
  exchangeCode: async (code: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ExchangeCodeResponse>(
      'api/public/exchange',
      { code }
    );

    return {
      user: {
        id: '',
        email: response.data.user.email,
        name: response.data.user.name,
        profilePicture: response.data.user.avatar || undefined,
        provider: 'google',
        createdAt: response.data.user.email_verified_at
          ? new Date(response.data.user.email_verified_at)
          : new Date(),
        updatedAt: response.data.user.email_verified_at
          ? new Date(response.data.user.email_verified_at)
          : new Date(),
      },
      token: response.data.access_token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ExchangeCodeResponse>(
      'api/public/auth/login',
      credentials
    );

    return {
      user: {
        id: '',
        email: response.data.user.email,
        name: response.data.user.name,
        profilePicture: response.data.user.avatar || undefined,
        provider: 'email',
        createdAt: response.data.user.email_verified_at
          ? new Date(response.data.user.email_verified_at)
          : new Date(),
        updatedAt: response.data.user.email_verified_at
          ? new Date(response.data.user.email_verified_at)
          : new Date(),
      },
      token: response.data.access_token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ExchangeCodeResponse>(
      'api/public/register',
      credentials
    );

    return {
      user: {
        id: '',
        email: response.data.user.email,
        name: response.data.user.name,
        profilePicture: response.data.user.avatar || undefined,
        provider: 'email',
        createdAt: response.data.user.email_verified_at
          ? new Date(response.data.user.email_verified_at)
          : new Date(),
        updatedAt: response.data.user.email_verified_at
          ? new Date(response.data.user.email_verified_at)
          : new Date(),
      },
      token: response.data.access_token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };
  },

  getGoogleAuthUrl: (): string => {
    const baseUrl = apiClient.getBaseUrl();
    const redirectUrl = encodeURIComponent(`${window.location.origin}/oauth/callback`);
    return `${baseUrl}/api/public/auth/redirect/google?redirect_url=${redirectUrl}&prompt=select_account`;
  },

  getFacebookAuthUrl: (): string => {
    const baseUrl = apiClient.getBaseUrl();
    const redirectUrl = encodeURIComponent(`${window.location.origin}/oauth/callback`);
    return `${baseUrl}/api/public/auth/redirect/facebook?redirect_url=${redirectUrl}`;
  },

  resetPassword: async (email: string): Promise<{ message: string }> => {
    return apiClient.post('api/public/reset_password', { email });
  },
};
