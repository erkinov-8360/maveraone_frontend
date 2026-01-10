import { AuthService } from './AuthService';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types/auth';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/authStore';

export class ApiAuthService implements AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.login(credentials);

    // Store in Zustand store
    useAuthStore.getState().setAuth(response.user, response.token);

    return response;
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await authApi.register(credentials);

    // Store in Zustand store
    useAuthStore.getState().setAuth(response.user, response.token);

    return response;
  }

  async logout(): Promise<void> {
    // Clear Zustand store
    useAuthStore.getState().clearAuth();
  }

  async getCurrentUser(): Promise<User | null> {
    // Get user from Zustand store
    const { user } = useAuthStore.getState();
    return user;
  }

  async refreshToken(): Promise<string> {
    const { token } = useAuthStore.getState();
    return token || '';
  }
}
