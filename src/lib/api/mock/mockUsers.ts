import { User } from '@/types/auth';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    provider: 'email',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

// Mock password storage: email -> password
export const MOCK_CREDENTIALS: Record<string, string> = {
  'demo@example.com': 'password123',
};
