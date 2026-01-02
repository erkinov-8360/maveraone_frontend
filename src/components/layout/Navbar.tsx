'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/Avatar';
import { ROUTES } from '@/config/routes';
import logo from '../../../public/images/logo.png'
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslations } from '@/context/TranslationsContext';
import { locales, localeNames } from '@/i18n/config';

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t, locale, setLocale } = useTranslations();

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
            {t('navbar.home')}
          </Link>
          <Link href={ROUTES.TOURS} className="text-white text-sm font-medium hover:text-[#137fec] transition-colors leading-normal">
            {t('navbar.tours')}
          </Link>
          <Link href="/destinations" className="text-white text-sm font-medium hover:text-[#137fec] transition-colors leading-normal">
            {t('navbar.virtualTour')}
          </Link>
          <Link href="/about" className="text-white text-sm font-medium hover:text-[#137fec] transition-colors leading-normal">
            {t('navbar.about')}
          </Link>
        </nav>

        {/* Language Selector */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="text-sm font-medium uppercase">{locale}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`cursor-pointer ${locale === loc ? 'bg-slate-100' : ''}`}
                >
                  <span className="flex items-center gap-2">
                    {locale === loc && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-[#137fec]"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    <span className={locale === loc ? 'font-semibold' : ''}>
                      {localeNames[loc]}
                    </span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3 pl-4 border-l border-white/30">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none">
                  <Avatar
                    src={user?.profilePicture}
                    alt={user?.name}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-white">{user?.name.split(" ")[0]}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{t('common.myAccount')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.MY_BOOKINGS} className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {t('common.myBookings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={ROUTES.PROFILE} className="cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {t('common.profile')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 focus:text-red-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  {t('common.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link
            href={ROUTES.LOGIN}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#137fec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors"
          >
            <span className="truncate">{t('common.signup')}</span>
          </Link>
        )}
      </div>
    </header>
  );
}
