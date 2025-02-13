"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import HomeIcon from "@/components/common/Icons/HomeIcon";
import SearchIcon from "@/components/common/Icons/SearchIcon";
import NotificationIcon from "@/components/common/Icons/NotificationIcon";
import MyIcon from "@/components/common/Icons/MyIcon";

export default function BottomNavbar() {
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };
  return (
    <div className="w-full max-w-[375px] h-[58px] absolute bottom-0 left-0 bg-white rounded-t-2xl shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)] flex justify-center items-center gap-8">
      <div
        className="flex flex-col items-center w-[60px] cursor-pointer"
        onClick={() => handleTabClick("home", "/")}
      >
        <HomeIcon color={activeTab === "home" ? "#FF7651" : "#1C1E20"} />
        <span
          className={`text-[11px] font-medium ${activeTab === "home" ? "text-[#FF7651]" : "text-[#1C1E20] opacity-60"}`}
        >
          홈
        </span>
      </div>

      <div
        className="flex flex-col items-center w-[60px] cursor-pointer"
        onClick={() => handleTabClick("search", "/search")}
      >
        <SearchIcon color={activeTab === "search" ? "#FF7651" : "#1C1E20"} />
        <span
          className={`text-[11px] font-medium ${activeTab === "search" ? "text-[#FF7651]" : "text-[#1C1E20] opacity-60"}`}
        >
          검색
        </span>
      </div>

      <div
        className="flex flex-col items-center w-[60px] cursor-pointer"
        onClick={() => handleTabClick("notifications", "/notifications")}
      >
        <NotificationIcon
          color={activeTab === "notifications" ? "#FF7651" : "#1C1E20"}
        />
        <span
          className={`text-[11px] font-medium ${activeTab === "notifications" ? "text-[#FF7651]" : "text-[#1C1E20] opacity-60"}`}
        >
          알림
        </span>
      </div>

      <div
        className="flex flex-col items-center w-[60px] cursor-pointer"
        onClick={() => handleTabClick("my", "/my")}
      >
        <MyIcon color={activeTab === "my" ? "#FF7651" : "#1C1E20"} />
        <span
          className={`text-[11px] font-medium ${activeTab === "my" ? "text-[#FF7651]" : "text-[#1C1E20] opacity-60"}`}
        >
          마이
        </span>
      </div>
    </div>
  );
}
