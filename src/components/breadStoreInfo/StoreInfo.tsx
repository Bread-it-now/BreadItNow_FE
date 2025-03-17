'use client';
import { Bakery } from '@/types/bakery';
import IconButton from '@/components/button/IconButton';
import Bookmark from '@/assets/icons/bookmark.svg';
import BookmarkFill from '@/assets/icons/bookmark_fill.svg';
import { useState } from 'react';

function StoreInfo({ bakery }: { bakery: Bakery }) {
  const [bookmarkChecked, setBookmarkChecked] = useState<boolean>(false);
  const onBookmarkClick = () => {
    setBookmarkChecked(!bookmarkChecked);
  };
  return (
    <article className="bg-white rounded-2xl px-5 py-[30px]">
      <div>
        <div className="flex justify-between">
          <div className="font-semibold text-black text-[22px]">{bakery.name}</div>
          <IconButton
            isChecked={bookmarkChecked}
            icon={bookmarkChecked ? BookmarkFill : Bookmark}
            iconText=""
            onClick={onBookmarkClick}
          />
        </div>
        <div>
          <span className="font-semibold text-secondary text-xs">{bakery.operatingStatus}</span>
          <span className="mx-1">&#183;</span>
          <span className="font-regular text-xs text-gray-500">1.5KM</span>
        </div>
      </div>
      <div className="mt-5 font-regular text-xs text-gray-500">{bakery.introduction}</div>
    </article>
  );
}

export default StoreInfo;
