import BreadReserveCard from './BreadReserveCard';
import { Product } from '@/types/product';
import BellIcon from '@/assets/icons/bell.svg';
import BellPressedIcon from '@/assets/icons/bell_pressed.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import BookmarkFill from '@/assets/icons/bookmark_fill.svg';
import Tag from '@/components/common/Tag';
import IconButton from '@/components/button/IconButton';
import { useState } from 'react';
interface BreadReserveCardProps {
  menuList: Product[];
  title: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MenuImageIconButton({ bakeryId, productId }: { bakeryId: string; productId: string }) {
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
function MenuFloatingButton({ bakeryId, productId }: { bakeryId: string; productId: string }) {
  const [alarmChecked, setAlarmChecked] = useState<boolean>(false);
  const onClickAlarmBtn = () => {
    setAlarmChecked(!alarmChecked);
  };
  return (
    <IconButton
      buttonClass="absolute bottom-0 right-0 mb-5 "
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
