"use client";

import { useState } from "react";
import HotBreadTab from "@/components/common/tabs/HotBreadTab";
import RoundTab from "@/components/common/tabs/RoundTab";
import BakerySchedule from "@/components/bakedetail/BakerySchedule";

export default function Page() {
  const [activeTab, setActiveTab] = useState<"hot" | "popular">("hot");

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
  const [activeCategory, setActiveCategory] = useState<"bread" | "other">(
    "bread",
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-primary">핫한 빵 리스트</h2>
      <p className="mb-4">이곳에는 최근 핫한 빵 목록이 나옵니다.</p>

      <RoundTab
        categories={[
          { key: "bread", label: "빵류" },
          { key: "other", label: "기타" },
        ]}
        activeTab={activeCategory}
        onTabChange={setActiveCategory}
      />

      <div className="mt-4">
        {activeCategory === "bread" ? (
          <BreadCategoryContent />
        ) : (
          <OtherCategoryContent />
        )}
      </div>
    </div>
  );
}

function PopularBreadContent() {
  return (
    <div>
      <h2 className="text-xl font-bold text-primary">인기 빵 리스트</h2>
      <p>이곳에는 가장 인기 있는 빵 목록이 나옵니다.</p>
    </div>
  );
}

// 빵 리스트
function BreadCategoryContent() {
  return (
    <div className="space-y-4">
      <BreadCard name="크로와상" description="겉바속촉 크로와상" />
      <BreadCard name="소금빵" description="고소하고 짭짤한 소금빵" />
      <BreadCard name="앙버터 바게트" description="버터와 팥이 조화로운 빵" />
      <BakerySchedule />
    </div>
  );
}

function OtherCategoryContent() {
  return (
    <div className="space-y-4">
      <BreadCard name="도넛" description="달콤하고 폭신한 도넛" />
      <BreadCard name="치즈케이크" description="부드러운 치즈케이크" />
      <BreadCard name="마카롱" description="색색의 달콤한 마카롱" />
    </div>
  );
}

// 빵 카드 컴포넌트
function BreadCard({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
