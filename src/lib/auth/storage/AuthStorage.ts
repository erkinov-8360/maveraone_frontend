import { User } from '@/types/auth';

export interface AuthStorage {
  setToken(token: string): void;
  getToken(): string | null;
  removeToken(): void;
  setUser(user: User): void;
  getUser(): User | null;
  removeUser(): void;
  clear(): void;
}
