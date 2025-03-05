'use client';

import { MYPAGE_TITLE, ROUTES } from '@/constants/routes';
import Topbar from '@/components/topbar/Topbar';
import { usePathname } from 'next/navigation';

const reservationDetailPathRegex = /^\/mypage\/reservations\/\d+$/;

const getPageRoute = (path: string): keyof typeof ROUTES.MYPAGE => {
  const entry = Object.entries(ROUTES.MYPAGE).find(
    ([key, value]) => value === path || (key === 'RESERVATION_DETAIL' && reservationDetailPathRegex.test(path)),
  );

  return entry ? (entry[0] as keyof typeof ROUTES.MYPAGE) : 'HOME';
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <Topbar title={MYPAGE_TITLE[getPageRoute(pathname)]} />
      <div className="flex flex-col gap-[0.625rem] bg-gray100 w-full h-full">{children}</div>
    </div>
  );
}
