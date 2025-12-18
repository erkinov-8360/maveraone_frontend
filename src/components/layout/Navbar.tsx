'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { ROUTES } from '@/config/routes';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href={ROUTES.HOME} className="text-xl font-bold text-blue-600">
          MaveraOne Tours
        </Link>

        <div className="flex items-center gap-6">
          <Link href={ROUTES.TOURS} className="text-gray-700 hover:text-blue-600 transition-colors">
            Tours
          </Link>
          <Link href="/destinations" className="text-gray-700 hover:text-blue-600 transition-colors">
            Destinations
          </Link>

          {isAuthenticated ? (
            <>
              <Link href={ROUTES.MY_BOOKINGS} className="text-gray-700 hover:text-blue-600 transition-colors">
                My Bookings
              </Link>
              <div className="flex items-center gap-3">
                <Link href={ROUTES.PROFILE} className="flex items-center gap-2">
                  <Avatar
                    src={user?.profilePicture}
                    alt={user?.name}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href={ROUTES.LOGIN}>
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href={ROUTES.REGISTER}>
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
