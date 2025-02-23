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
    return <MenuList menuList={category === "1" ? breadMenu : otherMenu} />;
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
      <MemoizedMenuList category={category} breadMenu={[]} otherMenu={[]} />
    </>
  );
}

export default MenuCategory;
