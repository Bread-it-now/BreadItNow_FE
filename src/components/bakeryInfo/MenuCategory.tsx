import RoundTab from '../common/tabs/RoundTab';
import MenuList from '@/components/bakeryInfo/MenuList';
import { useState, memo } from 'react';
import { Product } from '@/types/product';
interface MenuCategoryProps {
  key: string;
  label: string;
}

const menuCategories: MenuCategoryProps[] = [
  {
    key: '1',
    label: '빵류',
  },
  {
    key: '2',
    label: '기타',
  },
];
const breadList: Product[] = [
  {
    productId: '1',
    bakery_id: '1',
    type: 'BREAD',
    name: '소금빵',
    price: 1000,
    stock: 10,
    description: '소금빵 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
  {
    productId: '2',
    bakery_id: '1',
    type: 'BREAD',
    name: '휘낭시에',
    price: 1000,
    stock: 10,
    description: '휘낭시에 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
  {
    productId: '3',
    bakery_id: '1',
    type: 'BREAD',
    name: '마들렌',
    price: 1000,
    stock: 10,
    description: '마들렌 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
  {
    productId: '4',
    bakery_id: '1',
    type: 'BREAD',
    name: '식빵',
    price: 1000,
    stock: 10,
    description: '식빵 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
  {
    productId: '5',
    bakery_id: '1',
    type: 'BREAD',
    name: '크루아상',
    price: 1000,
    stock: 10,
    description: '크루아상 소개',
    image: 'https://placehold.co/600x400/png',
    isActive: true,
  },
];
const MemoizedMenuList = memo(
  ({ category, breadMenu, otherMenu }: { category: string; breadMenu: Product[]; otherMenu: Product[] }) => {
    return <MenuList menuList={category === '1' ? breadMenu : otherMenu} title={category === '1' ? '빵류' : '기타'} />;
  },
);

MemoizedMenuList.displayName = 'MemoizedMenuList';

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
        <RoundTab categories={menuCategories} activeTab={category} onTabChange={onTabChange} />
      </div>
      <MemoizedMenuList category={category} breadMenu={breadList} otherMenu={[]} />
    </>
  );
}

export default MenuCategory;
