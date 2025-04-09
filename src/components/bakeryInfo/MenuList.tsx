import ProductReserveCard from './ProductReserveCard';
import { Product } from '@/types/bakery';
import BellIcon from '@/assets/icons/bell_gray.svg';
import BellPressedIcon from '@/assets/icons/bell_pressed.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import BookmarkFill from '@/assets/icons/bookmark_fill.svg';
import Tag from '@/components/common/Tag';
import IconButton from '@/components/button/IconButton';
import { useState } from 'react';
interface ProductReserveCardProps {
  menuList?: Product[];
  title: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenuImageIconButton({ bakeryId, productId }: { bakeryId: number; productId: number }) {
  const [bookmarkChecked, setBookmarkChecked] = useState<boolean>(false);
  const onBookmarkClick = () => {
    setBookmarkChecked(!bookmarkChecked);
  };
  return (
    <IconButton
      buttonClass="absolute right-2 bottom-2"
      isChecked={bookmarkChecked}
      icon={bookmarkChecked ? BookmarkFill : Bookmark}
      iconText=""
      onClick={onBookmarkClick}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenuFloatingButton({ bakeryId, productId }: { bakeryId: number; productId: number }) {
  const [alarmChecked, setAlarmChecked] = useState<boolean>(false);
  const onClickAlarmBtn = () => {
    setAlarmChecked(!alarmChecked);
  };
  return (
    <IconButton
      buttonClass="absolute bottom-0 right-0 mb-5 border border-gray-100 border-[1px]"
      isChecked={alarmChecked}
      icon={alarmChecked ? BellPressedIcon : BellIcon}
      iconText=""
      onClick={onClickAlarmBtn}
    />
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
function MenuList({ menuList, title }: ProductReserveCardProps) {
  return (
    <article
      key={title}
      className="bg-white border-box rounded-2xl px-5 py-[30px] mb-[52px] overflow-y-scroll min-h-[600px] text-black">
      <div className="flex justify-between mb-6">
        <div className="font-semibold  text-md">{title}</div>
      </div>
      {menuList &&
        menuList.map((menu, index) => (
          <>
            <ProductReserveCard
              ImageIconButton={<MenuImageIconButton bakeryId={menu.bakeryId} productId={menu.productId} />}
              FloatingButton={<MenuFloatingButton bakeryId={menu.bakeryId} productId={menu.productId} />}
              moreInfoComponent={<TimeForBreadComeOut />}
              key={`${title}-menu-${index}`}
              {...menu}
            />
            {index !== menuList.length - 1 && <hr className="border-gray-200 my-5" />}
          </>
        ))}
    </article>
  );
}

export default MenuList;
