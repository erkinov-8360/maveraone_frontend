import { AuthService } from './AuthService';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types/auth';

export class ApiAuthService implements AuthService {
  private baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  }

  async logout(): Promise<void> {
    await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  async getCurrentUser(): Promise<User | null> {
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      credentials: 'include',
    });

    if (!response.ok) return null;

    return response.json();
  }

  async refreshToken(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    return data.token;
  }
}
