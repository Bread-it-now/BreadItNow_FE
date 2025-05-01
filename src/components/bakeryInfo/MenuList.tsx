'use client';
import ProductReserveCard from './ProductReserveCard';
import { Product } from '@/types/bakery';
import BellIcon from '@/assets/icons/bell_gray.svg';
import BellPressedIcon from '@/assets/icons/bell_pressed.svg';
import Bookmark from '@/assets/icons/bookmark.svg';
import BookmarkFill from '@/assets/icons/bookmark_fill.svg';
import Tag from '@/components/common/Tag';
import IconButton from '@/components/button/IconButton';
import { useState } from 'react';
import { addBookmarkProduct, removeBookmarkProduct, addAlertProduct, deleteAlertProduct } from '@/lib/api/bakery';
interface ProductReserveCardProps {
  menuList?: Product[];
  title: string;
}

function MenuImageIconButton({ productId, isActive }: { productId: number; isActive: boolean }) {
  const [bookmarkChecked, setBookmarkChecked] = useState<boolean>(isActive);
  const onBookmarkClick = async () => {
    try {
      if (bookmarkChecked) {
        await removeBookmarkProduct(productId);
      } else {
        await addBookmarkProduct(productId);
      }
      setBookmarkChecked(!bookmarkChecked);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add or remove favorite product', error);
    }
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

function MenuFloatingButton({ productId, isActive }: { productId: number; isActive: boolean }) {
  const [alarmChecked, setAlarmChecked] = useState<boolean>(isActive);
  const onClickAlarmBtn = async () => {
    try {
      if (alarmChecked) {
        await deleteAlertProduct(productId);
      } else {
        await addAlertProduct(productId);
      }
      setAlarmChecked(!alarmChecked);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add or remove favorite product', error);
    }
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
    <article className="bg-white border-box rounded-2xl px-5 py-[30px] mb-[52px] overflow-y-scroll min-h-[600px] text-black">
      <div className="flex justify-between mb-6">
        <div className="font-semibold  text-md">{title}</div>
      </div>
      {menuList &&
        menuList.map((menu, index) => (
          <div key={`${title}-menu-${menu.productId}`}>
            <ProductReserveCard
              ImageIconButton={<MenuImageIconButton productId={menu.productId} isActive={menu.isFavorite} />}
              FloatingButton={<MenuFloatingButton productId={menu.productId} isActive={menu.alarmEnabled} />}
              moreInfoComponent={<TimeForBreadComeOut />}
              {...menu}
            />
            {index !== menuList.length - 1 && <hr className="border-gray-200 my-5" />}
          </div>
        ))}
    </article>
  );
}

export default MenuList;
