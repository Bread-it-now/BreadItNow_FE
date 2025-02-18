'use client';

import { MYPAGE_TITLE, ROUTES } from '@/constants/routes';
import Topbar from '@/components/topbar/Topbar';
import { usePathname } from 'next/navigation';

const getPageRoute = (path: string): keyof typeof ROUTES.MYPAGE => {
  const entry = Object.entries(ROUTES.MYPAGE).find(([, value]) => value === path);
  return entry ? (entry[0] as keyof typeof ROUTES.MYPAGE) : 'HOME';
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <Topbar title={MYPAGE_TITLE[getPageRoute(pathname)]} />
      {children}
    </div>
  );
}
