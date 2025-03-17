'use client';
import { ElementType, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export interface NavElement {
  name: string;
  navPathname: string;
  route: string;
  icon: ElementType;
}

interface BottomNavbarProps {
  NavList: NavElement[];
}

export default function BottomNavbar({ NavList }: BottomNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo(() => {
    const activeNavElement = NavList.filter((navElement: NavElement) => navElement.route == pathname);
    return activeNavElement.length !== 0 ? activeNavElement[0].name : '';
  }, [pathname, NavList]);

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full max-w-[375px] h-[58px] absolute bottom-0 left-0 bg-white rounded-t-2xl shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)] flex justify-center items-center gap-8">
      {NavList.map(({ name, route, icon: Icon }: NavElement) => (
        <div
          key={route}
          className="flex flex-col items-center justify-center w-[60px] cursor-pointer"
          onClick={() => handleTabClick(route)}>
          <Icon color={activeTab === name ? '#FF7651' : '#1C1E20'} />
          <span
            className={`text-[11px] font-medium ${activeTab === name ? 'text-primary' : 'text-gray900 opacity-60'}`}>
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}
