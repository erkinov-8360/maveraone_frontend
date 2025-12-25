export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  provider: 'email' | 'google' | 'facebook';
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: Date;
}

export interface OAuthProvider {
  name: string;
  authorize: () => void;
}
