'use client';

import { usePathname } from 'next/navigation';
import BottomNavbar from '@/components/common/BottomNavbar';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarPaths = ['/login', '/signup'];
  const shouldHideNavbar = hideNavbarPaths.includes(pathname);

  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div
        className={`relative w-full max-w-[375px] max-h-[812px] bg-white border-1 mx-auto pt-[44px] h-lvh overflow-scroll 
          ${!shouldHideNavbar ? 'pb-[58px]' : ''}`}>
        <div id="bottomsheet-root" />
        {children}
        {!shouldHideNavbar && (
          <div className="absolute bottom-0 left-0 w-full">
            <BottomNavbar />
          </div>
        )}
      </div>
    </div>
  );
}
