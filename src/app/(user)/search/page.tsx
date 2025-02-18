"use client";

import Image from "next/image";
import { useState } from "react";
import SearchBar from "@/components/common/SearchBar";
import BackIcon from "@/assets/icons/back.svg";
import SearchIcon from "@/components/common/Icons/SearchIcon";
import HotBreadTab from "@/components/common/tabs/HotBreadTab";
import FilterDropdown from "@/components/search/FilterDropdown";
import BakeryCard from "@/components/bakerycard/BakeryCard";
import BreadCard from "@/components/bakerycard/BreadCard";
import BakeryImg from "@/assets/images/bakery.png";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [activeTab, setActiveTab] = useState("빵집");

  const suggestions = ["즐거운 빵집", "빵 굽는집", "즐거운 빵집"];

  const handleSearchEnter = () => {
    setIsSearchActive(true);
  };

  return (
    <div className="relative flex flex-col items-center w-full max-h-[100%] bg-white p-4">
      <div className="flex items-center w-full py-2">
        <button className="p-2" onClick={() => window.history.back()}>
          <Image src={BackIcon} alt="뒤로 가기" width={24} height={24} />
        </button>
        <div className="flex-1">
          <SearchBar
            name="search"
            placeholder="빵, 빵집으로 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
            onEnter={handleSearchEnter}
          />
        </div>
      </div>

      {!isSearchActive ? (
        <div className="w-full flex-1 px-4 overflow-y-scroll scrollbar-hide">
          {searchTerm && (
            <ul className="mt-2">
              {suggestions.map((suggestion, index) => {
                const highlightedText = suggestion
                  .split(new RegExp(`(${searchTerm})`, "gi"))
                  .map((part, i) =>
                    part.toLowerCase() === searchTerm.toLowerCase() ? (
                      <span key={i} className="text-gray400">
                        {part}
                      </span>
                    ) : (
                      part
                    ),
                  );
                return (
                  <li
                    key={index}
                    className="gap-2 flex items-center py-2 text-gray900"
                  >
                    <SearchIcon color="#999b9d" />
                    <span className="text-gray900">{highlightedText}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : (
        <div className="w-full flex flex-col h-full overflow-hidden">
          <HotBreadTab
            tabs={[
              { key: "빵집", label: "빵집" },
              { key: "빵", label: "빵" },
            ]}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="flex items-center justify-between p-4 text-gray-900">
              <span>
                총 <span className="text-primary">99</span>개
              </span>
              <FilterDropdown />
            </div>
            {activeTab === "빵집" ? (
              <>
                <div className="p-4">
                  <BakeryCard
                    id={1}
                    operatingStatus="OPEN"
                    profileImgUrl={BakeryImg.src}
                    name="라 메종 뒤 팡 에 뒤 레브"
                    distance={1.5}
                    size="large"
                  />
                </div>
                <div className="p-4">
                  <BakeryCard
                    id={2}
                    operatingStatus="OPEN"
                    profileImgUrl={BakeryImg.src}
                    name="라 메종 뒤 팡 에 뒤 레브"
                    distance={1.5}
                    size="large"
                  />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4 p-4">
                <BreadCard
                  id={1}
                  profileImgUrl={BakeryImg.src}
                  name="크루아상"
                  description="달콤한 아침"
                  price="3,200원"
                  size="normal"
                />
                <BreadCard
                  id={2}
                  profileImgUrl={BakeryImg.src}
                  name="바게트"
                  description="달콤한 아침"
                  price="3,200원"
                  size="normal"
                />
                <BreadCard
                  id={3}
                  profileImgUrl={BakeryImg.src}
                  name="크루아상"
                  description="달콤한 아침"
                  price="3,200원"
                  size="normal"
                />
                <BreadCard
                  id={4}
                  profileImgUrl={BakeryImg.src}
                  name="바게트"
                  description="달콤한 아침"
                  price="3,200원"
                  size="normal"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
