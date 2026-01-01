'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { ROUTES } from '@/config/routes';
import logo from '../../../public/images/logo.png'
import Image from 'next/image';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between whitespace-nowrap px-4 md:px-10 py-6 border-b border-white/10">
      <Link href={ROUTES.HOME} className="flex items-center gap-2">
        <div className="text-white">
          <Image src={logo} width={100} height={100} alt="logo" />
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Maveraone</h2>
      </Link>

      <div className="flex flex-1 justify-end gap-8">
        <nav className="hidden md:flex items-center gap-9">
          <Link href={ROUTES.HOME} className="text-white text-sm font-medium hover:text-[#137fec] transition-colors leading-normal">
            Home
          </Link>
          <Link href={ROUTES.TOURS} className="text-white text-sm font-medium hover:text-[#137fec] transition-colors leading-normal">
            Tours
          </Link>
          <Link href="/destinations" className="text-white text-sm font-medium hover:text-[#137fec] transition-colors leading-normal">
            360° tour
          </Link>
          <Link href="/about" className="text-white text-sm font-medium hover:text-[#137fec] transition-colors leading-normal">
            About
          </Link>
        </nav>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Link href={ROUTES.MY_BOOKINGS} className="text-white text-sm font-medium hover:text-[#137fec] transition-colors">
              My Bookings
            </Link>
            <div className="flex items-center gap-3 pl-4 border-l border-white/30">
              <Link href={ROUTES.PROFILE} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Avatar
                  src={user?.profilePicture}
                  alt={user?.name}
                  size="sm"
                />
                <span className="text-sm font-medium text-white">{user?.name}</span>
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
          </div>
        ) : (
          <Link
            href={ROUTES.LOGIN}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#137fec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors"
          >
            <span className="truncate">Sign Up</span>
          </Link>
        )}
      </div>
    </header>
  );
}
