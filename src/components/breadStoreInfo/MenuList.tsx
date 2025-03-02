import BreadReserveCard from './BreadReserveCard';
import { Product } from '@/types/product';
import BellIcon from '@/assets/icons/bell.svg';
import BookmarkIcon from '@/assets/icons/bookmark.svg';
import Image from 'next/image';
import Tag from '@/components/common/Tag';
interface BreadReserveCardProps {
  menuList: Product[];
  title: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenuImageIconButton({ bakeryId, productId }: { bakeryId: string; productId: string }) {
  return (
    <div className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-white bg-opacity-80">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image src={BookmarkIcon} alt="bookmark" />
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenuFloatingButton({ bakeryId, productId }: { bakeryId: string; productId: string }) {
  return (
    <div className="absolute bottom-0 w-9 h-9 right-0 rounded-full mb-5 bg-white bg-opacity-80  border-gray-100 border-[1px]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image src={BellIcon} alt="bookmark" width={20} height={20} />
      </div>
    </div>
  );
}

function TimeForBreadComeOut() {
  return (
    <div className="flex gap-[2px]">
      <Tag type="time" label="08:00" />
      <Tag type="time" label="08:00" />
      <Tag type="time" label="08:00" />
    </div>
  );
}
function MenuList({ menuList, title }: BreadReserveCardProps) {
  return (
    <article className="bg-white border-box rounded-2xl px-5 py-[30px] mb-[52px] overflow-y-scroll h-[600px]">
      <div className="f lex justify-between">
        <div className="font-semibold text-black text-md">{title}</div>
      </div>
      {menuList.map((menu, index) => (
        <BreadReserveCard
          ImageIconButton={<MenuImageIconButton bakeryId={menu.bakery_id} productId={menu.productId} />}
          FloatingButton={<MenuFloatingButton bakeryId={menu.bakery_id} productId={menu.productId} />}
          moreInfoComponent={<TimeForBreadComeOut />}
          key={`menu-${index}`}
          {...menu}
        />
      ))}
    </article>
  );
}

export default MenuList;
