export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  TOURS: '/tours',
  MY_BOOKINGS: '/my-bookings',
} as const;

export const PUBLIC_ROUTES = [
  ROUTES.HOME,
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.TOURS,
  '/tours',
  '/destinations',
  '/about',
  '/contact',
  '/auth/google/callback',
  '/auth/facebook/callback',
];

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
];
