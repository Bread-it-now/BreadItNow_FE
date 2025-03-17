'use client';
import BottomNavbar from '@/components/common/BottomNavbar';
import { NavElement } from '@/components/common/BottomNavbar';
import { OWNER_BAKERY_TITLE, OWNER_PAGE_TITLE, ROUTES } from '@/constants/routes';
import ManagementIcon from '@/components/common/Icons/ManagementIcon';
import ReservationIcon from '@/components/common/Icons/ReservationIcon';
import NotificationIcon from '@/components/common/Icons/NotificationIcon';
import BakeryIcon from '@/components/common/Icons/BakeryIcon';
import Topbar from '@/components/topbar/Topbar';
import { usePathname } from 'next/navigation';

const UserNavElements: NavElement[] = [
  { name: '관리', navPathname: 'home', route: ROUTES.OWNER.HOME, icon: ManagementIcon },
  { name: '예약', navPathname: 'reservations', route: ROUTES.OWNER.RESERVATIONS, icon: ReservationIcon },
  { name: '알림', navPathname: 'notifications', route: ROUTES.OWNER.NOTIFICATIONS, icon: NotificationIcon },
  { name: '빵집', navPathname: 'bakery', route: ROUTES.OWNER.BAKERY.BAKERY_HOME, icon: BakeryIcon },
];

const reservationDetailPathRegex = /^\/owner\/reservations\/\d+$/;

const getPageRoute = (path: string): keyof typeof OWNER_PAGE_TITLE | keyof typeof OWNER_BAKERY_TITLE => {
  const pageEntry = Object.entries(ROUTES.OWNER).find(
    ([key, value]) => value === path || (key === 'RESERVATION_DETAIL' && reservationDetailPathRegex.test(path)),
  );

  const bakeryPageEntry = Object.entries(ROUTES.OWNER.BAKERY).find(([, value]) => value === path);

  return pageEntry
    ? (pageEntry[0] as keyof typeof OWNER_PAGE_TITLE)
    : bakeryPageEntry
      ? (bakeryPageEntry[0] as keyof typeof OWNER_BAKERY_TITLE)
      : 'HOME';
};

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageRoute = getPageRoute(pathname);
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="relative w-full max-w-[375px] max-h-[812px] bg-white border-1 mx-auto pt-[44px] pb-[58px] h-lvh overflow-scroll">
        <Topbar
          title={
            pageRoute in OWNER_PAGE_TITLE
              ? OWNER_PAGE_TITLE[pageRoute as keyof typeof OWNER_PAGE_TITLE]
              : OWNER_BAKERY_TITLE[pageRoute as keyof typeof OWNER_BAKERY_TITLE]
          }
        />
        <div id="bottomsheet-root" />
        {children}
        <div className="fixed bottom-0 w-full">
          <BottomNavbar NavList={[...UserNavElements]} />
        </div>
      </div>
    </div>
  );
}
