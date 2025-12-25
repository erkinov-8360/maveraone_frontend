import { AuthService } from './AuthService';
import { LoginCredentials, RegisterCredentials, AuthResponse, User } from '@/types/auth';
import { MOCK_USERS, MOCK_CREDENTIALS } from '@/lib/api/mock/mockUsers';
import { LocalStorageAdapter } from './storage/LocalStorageAdapter';

export class MockAuthService implements AuthService {
  private storage = new LocalStorageAdapter();

  // Simulate API delay for realistic UX
  private delay(ms: number = 800) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.delay();

    const { email, password } = credentials;

    // Check mock credentials
    if (MOCK_CREDENTIALS[email] === password) {
      const user = MOCK_USERS.find(u => u.email === email);
      if (!user) throw new Error('User not found');

      const token = `mock-token-${Date.now()}`;
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      this.storage.setToken(token);
      this.storage.setUser(user);

      return { user, token, expiresAt };
    }

    throw new Error('Invalid email or password');
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    await this.delay();

    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === credentials.email)) {
      throw new Error('User with this email already exists');
    }

    // Check password confirmation
    if (credentials.password !== credentials.password_confirmation) {
      throw new Error('Passwords do not match');
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: credentials.email,
      name: credentials.name,
      profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.email}`,
      provider: 'email',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Add to mock storage
    MOCK_USERS.push(newUser);
    MOCK_CREDENTIALS[credentials.email] = credentials.password;

    const token = `mock-token-${Date.now()}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    this.storage.setToken(token);
    this.storage.setUser(newUser);

    return { user: newUser, token, expiresAt };
  }

  async logout(): Promise<void> {
    await this.delay(300);
    this.storage.clear();
  }

  async getCurrentUser(): Promise<User | null> {
    const token = this.storage.getToken();
    if (!token) return null;

    return this.storage.getUser();
  }

  async refreshToken(): Promise<string> {
    await this.delay();
    const newToken = `mock-token-${Date.now()}`;
    this.storage.setToken(newToken);
    return newToken;
  }
}
