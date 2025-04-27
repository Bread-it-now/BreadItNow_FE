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
  bakeryName: string;
  bakeryId: number;
  price: number;
  isBookmarked: boolean;
  onToggleBookmark?: () => void;
  direction?: 'row' | 'column';
  isShowRank?: boolean;
  isShowBookmark?: boolean;
  rank?: number;
  stock?: number;
}

const BreadCard = ({
  id,
  profileImgUrl,
  name,
  bakeryName,
  price,
  bakeryId,
  direction = 'column',
  isBookmarked,
  onToggleBookmark,
  isShowRank = false,
  isShowBookmark = false,
  stock,
  rank = 0,
}: BreadCardProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleToggleBookmark = (productId: number) => {
    const willBeBookmarked = isBookmarked === checked;

    if (willBeBookmarked) {
      addFavoriteProduct(productId);
    } else {
      deleteFavoriteProduct(productId);
    }

    setChecked(!checked);
  };
  return (
    <Link
      href={`/bakery/${bakeryId}`}
      className={cn(
        'flex flex-col items-start gap-3 relative',
        direction === 'row' ? 'flex-row h-[90px]' : 'flex-col',
      )}>
      <div
        className={cn(
          'relative overflow-hidden rounded-xl',
          direction === 'row' ? 'flex-row h-[90px] min-w-[120px]' : 'flex-col w-full',
        )}>
        <div
          className={`flex flex-row gap-[10px] ${isShowRank ? 'items-center w-[120px]' : direction === 'row' ? 'w-[90px]' : 'w-full'}`}>
          {isShowRank && (
            <div className="text-title-content-m font-semibold text-gray900 w-full max-w-[20px]">{rank}</div>
          )}
          <div className="relative flex w-full">
            {direction === 'row' ? (
              <Image
                src={profileImgUrl}
                width={90}
                height={90}
                alt="bread"
                className={cn(stock === 0 ? 'opacity-70' : 'opacity-100', 'rounded-[10px]')}
              />
            ) : (
              <Image
                src={profileImgUrl}
                alt="bread"
                className={cn(
                  'object-cover rounded-[10px] w-full h-full',
                  stock === 0 ? 'opacity-70' : 'opacity-100',
                  'rounded-[10px]',
                )}
              />
            )}
            {isShowBookmark && (
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
                <Image width={16} height={16} src={isBookmarked !== checked ? bookmarkFill : bookmark} alt="bookmark" />
              </button>
            )}
            {stock === 0 && (
              <p
                className={`absolute flex text-center ${direction === 'row' ? 'top-[25px] left-[28px] text-title-content-s' : 'top-[60px] left-[60px] text-title-content-lg'} h-[40px] w-[40px]  text-white`}>
                SOLD
                <br />
                OUT
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col px-1 items-start ${direction === 'row' ? 'h-full justify-center' : 'items-start'} gap-1 w-full`}>
        <div className="self-stretch flex-col justify-start items-start gap-0.5 flex">
          <div className="self-stretch text-gray700 text-[13px] font-normal leading-[19px]">{bakeryName}</div>
          <div className="self-stretch text-gray900 text-sm font-semibold leading-tight">{name}</div>
        </div>
        <div className="text-gray900 text-sm font-medium leading-tight">{`${comma(price)}원`}</div>
      </div>
    </Link>
  );
};

export default BreadCard;
