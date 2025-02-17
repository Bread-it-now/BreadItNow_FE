"use client";
import { useMemo } from "react";

import { usePathname, useRouter } from "next/navigation";

import { ROUTES } from "@/constants/routes";

import HomeIcon from "@/components/common/Icons/HomeIcon";
import SearchIcon from "@/components/common/Icons/SearchIcon";
import NotificationIcon from "@/components/common/Icons/NotificationIcon";
import MyIcon from "@/components/common/Icons/MyIcon";

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo(() => {
    switch (true) {
      case pathname === ROUTES.HOME:
        return "home";
      case pathname.startsWith(ROUTES.SEARCH):
        return "search";
      case pathname.startsWith(ROUTES.NOTIFICATIONS):
        return "notifications";
      case pathname.startsWith(ROUTES.MYPAGE.HOME):
        return "my";
      default:
        return "";
    }
  }, [pathname]);

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="w-full max-w-[375px] h-[58px] absolute bottom-0 left-0 bg-white rounded-t-2xl shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)] flex justify-center items-center gap-8">
      <div
        className="flex flex-col items-center w-[60px] cursor-pointer"
        onClick={() => handleTabClick(ROUTES.HOME)}
      >
        <HomeIcon color={activeTab === "home" ? "#FF7651" : "#1C1E20"} />
        <span
          className={`text-[11px] font-medium ${
            activeTab === "home" ? "text-primary" : "text-gray900 opacity-60"
          }`}
        >
          홈
        </span>
      </div>

      <div
        className="flex flex-col items-center w-[60px] cursor-pointer"
        onClick={() => handleTabClick(ROUTES.SEARCH)}
      >
        <SearchIcon color={activeTab === "search" ? "#FF7651" : "#1C1E20"} />
        <span
          className={`text-[11px] font-medium ${
            activeTab === "search" ? "text-primary" : "text-gray900 opacity-60"
          }`}
        >
          검색
        </span>
      </div>

      <div
        className="flex flex-col items-center w-[60px] cursor-pointer"
        onClick={() => handleTabClick(ROUTES.NOTIFICATIONS)}
      >
        <NotificationIcon
          color={activeTab === "notifications" ? "#FF7651" : "#1C1E20"}
        />
        <span
          className={`text-[11px] font-medium ${
            activeTab === "notifications"
              ? "text-primary"
              : "text-gray900 opacity-60"
          }`}
        >
          알림
        </span>
      </div>

      <div
        className="flex flex-col items-center w-[60px] cursor-pointer"
        onClick={() => handleTabClick(ROUTES.MYPAGE.HOME)}
      >
        <MyIcon color={activeTab === "my" ? "#FF7651" : "#1C1E20"} />
        <span
          className={`text-[11px] font-medium ${
            activeTab === "my" ? "text-primary" : "text-gray900 opacity-60"
          }`}
        >
          마이
        </span>
      </div>
    </div>
  );
}
