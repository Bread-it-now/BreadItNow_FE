import BottomNavbar from '@/components/common/BottomNavbar';
import { NavElement } from '@/components/common/BottomNavbar';
import { ROUTES } from '@/constants/routes';
import ManagementIcon from '@/components/common/Icons/ManagementIcon';
import ReservationIcon from '@/components/common/Icons/ReservationIcon';
import NotificationIcon from '@/components/common/Icons/NotificationIcon';
import BakeryIcon from '@/components/common/Icons/BakeryIcon';

const UserNavElements: NavElement[] = [
  { name: '관리', navPathname: 'home', route: ROUTES.OWNER.HOME, icon: ManagementIcon },
  { name: '예약', navPathname: 'reservations', route: ROUTES.OWNER.RESERVATIONS, icon: ReservationIcon },
  { name: '알림', navPathname: 'notifications', route: ROUTES.OWNER.NOTIFICATIONS, icon: NotificationIcon },
  { name: '빵집', navPathname: 'bakery', route: ROUTES.OWNER.MANAGE_BAKERY.HOME, icon: BakeryIcon },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-100">
      <div className="relative w-full max-w-[375px] max-h-[812px] bg-white border-1 mx-auto pt-[44px] pb-[58px] h-lvh overflow-scroll">
        <div id="bottomsheet-root" />
        {children}
        <div className="absolute bottom-0 left-0 w-full">
          <BottomNavbar NavList={[...UserNavElements]} />
        </div>
      </div>
    </div>
  );
}
