import RoundTab from "../common/tabs/RoundTab";
import MenuList from "@/components/breadStoreInfo/MenuList";
import { useState, memo } from "react";
interface MenuCategoryProps {
  key: string;
  label: string;
}
interface BreadReserveCardProps {
  url?: string;
  checked?: boolean;
  name: string;
  subText: string;
  price: string | number;
  count: number;
  existReserveTime?: boolean;
}

const menuCategories: MenuCategoryProps[] = [
  {
    key: "1",
    label: "빵류",
  },
  {
    key: "2",
    label: "기타",
  },
];
const breadList = [
  {
    url: "https://placehold.co/300x400/png",
    name: "소금빵",
    subText: "1000원",
    price: 1000,
    count: 1,
    existReserveTime: true,
  },
  {
    url: "https://placehold.co/300x400/png",
    name: "휘낭시에",
    subText: "1000원",
    price: 1000,
    count: 1,
    existReserveTime: true,
  },
  {
    url: "https://placehold.co/300x400/png",
    name: "마들렌",
    subText: "1000원",
    price: 1000,
    count: 1,
    existReserveTime: true,
  },
  {
    url: "https://placehold.co/300x400/png",
    name: "식빵",
    subText: "1000원",
    price: 1000,
    count: 1,
    existReserveTime: true,
  },
  {
    url: "https://placehold.co/300x400/png",
    name: "크루아상",
    subText: "1000원",
    price: 1000,
    count: 1,
    existReserveTime: true,
  },
];
const MemoizedMenuList = memo(
  ({
    category,
    breadMenu,
    otherMenu,
  }: {
    category: string;
    breadMenu: BreadReserveCardProps[];
    otherMenu: BreadReserveCardProps[];
  }) => {
    return (
      <MenuList
        menuList={category === "1" ? breadMenu : otherMenu}
        title={category === "1" ? "빵류" : "기타"}
      />
    );
  },
);

MemoizedMenuList.displayName = "MemoizedMenuList";

function MenuCategory() {
  const [category, setCategory] = useState<string>(menuCategories[0].key);
  const onTabChange = (key: string) => {
    const item = menuCategories.find((item) => item.key === key);
    if (item) {
      setCategory(item.key);
    }
  };
  return (
    <>
      <div className="px-5">
        <RoundTab
          categories={menuCategories}
          activeTab={category}
          onTabChange={onTabChange}
        />
      </div>
      <MemoizedMenuList
        category={category}
        breadMenu={breadList}
        otherMenu={[]}
      />
    </>
  );
}

export default MenuCategory;
