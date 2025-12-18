import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types/auth';

export interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(credentials: RegisterCredentials): Promise<AuthResponse>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
  refreshToken(): Promise<string>;
}
