import { User } from '@/types/auth';
import { AuthStorage } from './AuthStorage';
import { AUTH_CONFIG } from '@/config/auth';

export class LocalStorageAdapter implements AuthStorage {
  setToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_CONFIG.tokenKey, token);
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(AUTH_CONFIG.tokenKey);
  }

  removeToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
  }

  setUser(user: User): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(user));
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem(AUTH_CONFIG.userKey);
    if (!userData) return null;

    try {
      const parsedUser = JSON.parse(userData);
      return {
        ...parsedUser,
        createdAt: new Date(parsedUser.createdAt),
        updatedAt: new Date(parsedUser.updatedAt),
      };
    } catch {
      return null;
    }
  }

  removeUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(AUTH_CONFIG.userKey);
  }

  clear(): void {
    this.removeToken();
    this.removeUser();
  }
}
