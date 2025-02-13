"use client";

import { useState } from "react";
import HotBreadTab from "@/components/common/tabs/HotBreadTab";

export default function Page() {
  const [activeTab, setActiveTab] = useState("hot");

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <HotBreadTab
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          { key: "hot", label: "핫한 빵" },
          { key: "popular", label: "인기 빵" },
        ]}
      />

      <div className="p-4">
        {activeTab === "hot" ? <HotBreadContent /> : <PopularBreadContent />}
      </div>
    </div>
  );
}

function HotBreadContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-primary">핫한 빵 리스트</h2>
      <p>이곳에는 핫한 빵 목록이 나옵니다.</p>
    </div>
  );
}

function PopularBreadContent() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-primary">인기 빵 리스트</h2>
      <p>이곳에는 인기 있는 빵 목록이 나옵니다.</p>
    </div>
  );
}
