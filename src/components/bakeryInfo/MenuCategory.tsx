import RoundTab from '../common/tabs/RoundTab';
import MenuList from '@/components/bakeryInfo/MenuList';
import { useState, memo } from 'react';
import { Product } from '@/types/bakery';
interface MenuCategoryProps {
  key: 'BREAD' | 'OTHER';
  label: string;
}

const menuCategories: MenuCategoryProps[] = [
  {
    key: 'BREAD',
    label: '빵류',
  },
  {
    key: 'OTHER',
    label: '기타',
  },
];
const MemoizedMenuList = memo(
  ({
    category,
    breadMenu,
    otherMenu,
  }: {
    category: 'BREAD' | 'OTHER';
    breadMenu?: Product[];
    otherMenu?: Product[];
  }) => {
    return (
      <MenuList
        key={category}
        menuList={category === 'BREAD' ? breadMenu : otherMenu}
        title={category === 'BREAD' ? '빵류' : '기타'}
      />
    );
  },
);

MemoizedMenuList.displayName = 'MemoizedMenuList';

function MenuCategory({ breadMenu, otherMenu }: { breadMenu: Product[]; otherMenu: Product[] }) {
  const [category, setCategory] = useState<'BREAD' | 'OTHER'>(menuCategories[0].key);
  const onTabChange = (key: string) => {
    const item = menuCategories.find((item) => item.key === key);
    if (item) {
      setCategory(item.key);
    }
  };
  return (
    <div className="">
      <div className="my-[10px]">
        <RoundTab categories={menuCategories} activeTab={category} onTabChange={onTabChange} />
      </div>
      <MemoizedMenuList category={category} breadMenu={breadMenu} otherMenu={otherMenu} />
    </div>
  );
}

export default MenuCategory;
