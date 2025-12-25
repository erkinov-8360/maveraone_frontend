import { apiClient } from './client';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '@/types/auth';

interface ExchangeCodeResponse {
  user: {
    id: string;
    email: string;
    name: string;
    profilePicture?: string;
    provider: 'email' | 'google' | 'facebook';
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  expiresAt: string;
}

export const authApi = {
  exchangeCode: async (code: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ExchangeCodeResponse>(
      'api/public/exchange',
      { code }
    );

    return {
      user: {
        ...response.user,
        createdAt: new Date(response.user.createdAt),
        updatedAt: new Date(response.user.updatedAt),
      },
      token: response.token,
      expiresAt: new Date(response.expiresAt),
    };
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ExchangeCodeResponse>(
      'api/public/auth/login',
      credentials
    );

    return {
      user: {
        ...response.user,
        createdAt: new Date(response.user.createdAt),
        updatedAt: new Date(response.user.updatedAt),
      },
      token: response.token,
      expiresAt: new Date(response.expiresAt),
    };
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<ExchangeCodeResponse>(
      'api/public/register',
      credentials
    );

    return {
      user: {
        ...response.user,
        createdAt: new Date(response.user.createdAt),
        updatedAt: new Date(response.user.updatedAt),
      },
      token: response.token,
      expiresAt: new Date(response.expiresAt),
    };
  },

  getGoogleAuthUrl: (): string => {
    const baseUrl = apiClient.getBaseUrl();
    return `${baseUrl}/api/public/auth/redirect/google`;
  },

  getFacebookAuthUrl: (): string => {
    const baseUrl = apiClient.getBaseUrl();
    return `${baseUrl}/api/public/auth/redirect/facebook`;
  },

  resetPassword: async (email: string): Promise<{ message: string }> => {
    return apiClient.post('api/public/reset_password', { email });
  },
};
