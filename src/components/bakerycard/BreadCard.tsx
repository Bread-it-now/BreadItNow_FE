'use client';

import Image from 'next/image';
import { cn } from '@/utils/cn';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmark_fill.svg';
import Link from 'next/link';
import { comma } from '@/utils/comma';
import { addFavoriteProduct, deleteFavoriteProduct } from '@/lib/api/bakery';
import { useState } from 'react';

export interface BreadCardProps {
  id: number;
  profileImgUrl: string;
  name: string;
  description: string;
  price: number;
  size?: 'small' | 'normal';
  isBookmarked: boolean;
  onToggleBookmark?: () => void;
}

const BreadCard = ({
  id,
  profileImgUrl,
  name,
  description,
  price,
  size = 'normal',
  isBookmarked,
  onToggleBookmark,
}: BreadCardProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleToggleBookmark = (productId: number) => {
    const willBeBookmarked = !(isBookmarked === checked);

    if (willBeBookmarked) {
      addFavoriteProduct(productId);
    } else {
      deleteFavoriteProduct(productId);
    }

    setChecked(!checked);
  };
  return (
    <Link
      href={`/bread/${id}`}
      className={cn('flex flex-col items-start gap-3 relative', size === 'normal' ? 'w-40' : 'w-32')}>
      <div className={cn('relative overflow-hidden rounded-xl', size === 'normal' ? 'w-40 h-40' : 'w-32 h-32')}>
        <Image src={profileImgUrl} fill alt="bread" className="object-cover p-1 rounded-[10px] w-full h-full" />
        <button
          className="absolute opacity-90 bottom-2 right-2 flex justify-center items-center w-8 h-8 min-w-8 border rounded-full border-gray100 bg-white shadow-md"
          aria-label="bookmark"
          onClick={(e) => {
            e.preventDefault();
            if (onToggleBookmark) onToggleBookmark();
            else {
              handleToggleBookmark(id);
            }
          }}>
          <Image width={16} height={16} src={isBookmarked && !checked ? bookmarkFill : bookmark} alt="bookmark" />
        </button>
      </div>
      <div className="flex flex-col px-1 items-start gap-1 w-full">
        <div className="self-stretch flex-col justify-start items-start gap-0.5 flex">
          <div className="self-stretch text-gray700 text-[13px] font-normal leading-[19px]">{description}</div>
          <div className="self-stretch text-gray900 text-sm font-semibold leading-tight">{name}</div>
        </div>
        <div className="text-gray900 text-sm font-medium leading-tight">{`${comma(price)}원`}</div>
      </div>
    </Link>
  );
};

export default BreadCard;
