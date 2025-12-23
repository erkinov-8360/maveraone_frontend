'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { ROUTES } from '@/config/routes';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-transparent">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Link href={ROUTES.HOME} className="text-3xl text-white tracking-wide transition-opacity">
          maveraone
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-12">
          <Link href={ROUTES.HOME} className="text-xl text-white hover:opacity-80 transition-opacity">
            Home
          </Link>
          <Link href={ROUTES.TOURS} className="text-xl text-white hover:opacity-80 transition-opacity">
            Tours
          </Link>
          <Link href="/destinations" className="text-xl text-white hover:opacity-80 transition-opacity">
            Blog
          </Link>
           <Link href="/destinations" className="text-xl  text-white hover:opacity-80 transition-opacity">
            360° tour
          </Link>
              <Link href="/destinations" className="text-xl  text-white hover:opacity-80 transition-opacity">
           Contact
          </Link>

          {isAuthenticated ? (
            <>
              <Link href={ROUTES.MY_BOOKINGS} className="text-white hover:opacity-70 transition-opacity">
                My Bookings
              </Link>
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-white/30">
                <Link href={ROUTES.PROFILE} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar
                    src={user?.profilePicture}
                    alt={user?.name}
                    size="sm"
                  />
                  <span className="text-sm font-light text-white">{user?.name}</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="border-white/50 text-white hover:bg-white/10"
                >
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* <Link href={ROUTES.LOGIN}>
                <Button
                  size="sm"
                  className="text-white hover:bg-white/10 bg-[#1A3A5C]"
                >
                  Login
                </Button>
              </Link> */}
              {/* <Link href={ROUTES.REGISTER}>
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                >
                  Purchase Now
                </Button>
              </Link> */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
