'use client';

import { usePathname } from 'next/navigation';
import BottomNavbar from '@/components/common/BottomNavbar';
import HomeIcon from '@/components/common/Icons/HomeIcon';
import SearchIcon from '@/components/common/Icons/SearchIcon';
import NotificationIcon from '@/components/common/Icons/NotificationIcon';
import MyIcon from '@/components/common/Icons/MyIcon';
import { ROUTES } from '@/constants/routes';
import { NavElement } from '@/components/common/BottomNavbar';

const UserNavElements: NavElement[] = [
  { name: '홈', navPathname: 'home', route: ROUTES.HOME.ROOT, icon: HomeIcon },
  { name: '검색', navPathname: 'search', route: ROUTES.SEARCH, icon: SearchIcon },
  { name: '알림', navPathname: 'notifications', route: ROUTES.MYPAGE.NOTIFICATIONS, icon: NotificationIcon },
  { name: '마이', navPathname: 'my', route: ROUTES.MYPAGE.HOME, icon: MyIcon },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbarPaths = ['/login', '/signup', '/mypage/', '/reservation/result'];
  const myPageSubSectionPathRegex = /^\/mypage\/.*$/;
  const customerBakeryPathRegex = /^\/bakery\/([a-zA-Z0-9]+)$/;
  const bakeryImageViewPathRegex = /^\/bakery\/image_view\/([a-zA-Z0-9]+)$/;
  const shouldHideNavbar = hideNavbarPaths.includes(pathname);
  const isMyPageSubSection = myPageSubSectionPathRegex.test(pathname);
  const isCustomerBakery = customerBakeryPathRegex.test(pathname);
  const isBakeryImageView = bakeryImageViewPathRegex.test(pathname);
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div
        className={`relative w-full max-w-[375px] max-h-[812px] bg-white border-1 mx-auto pt-[44px] h-lvh overflow-scroll 
          ${!shouldHideNavbar && !isMyPageSubSection && !isCustomerBakery && !isBakeryImageView ? 'pb-[58px]' : ''}`}>
        <div id="bottomsheet-root" />
        {children}
        {!shouldHideNavbar && !isMyPageSubSection && !isCustomerBakery && !isBakeryImageView && (
          <div className="absolute bottom-0 left-0 w-full">
            <BottomNavbar NavList={[...UserNavElements]} />
          </div>
        )}
      </div>
    </div>
  );
}
