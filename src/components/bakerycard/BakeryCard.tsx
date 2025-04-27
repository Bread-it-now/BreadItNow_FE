import Image from 'next/image';
import { cn } from '@/utils/cn';
import { Bakery, OPERATING_STATUS } from '@/types/bakery';
import bookmark from '@/assets/icons/bookmark.svg';
import bookmarkFill from '@/assets/icons/bookmark_fill.svg';
import Link from 'next/link';
import { useState } from 'react';
import { addFavoriteBakery, deleteFavoriteBakery } from '@/lib/api/bakery';

export interface BakeryCardProps
  extends Pick<Bakery, 'bakeryId' | 'operatingStatus' | 'profileImage' | 'name' | 'distance'> {
  rank?: number;
  size?: 'normal' | 'large';
  showBookmark?: boolean;
  isBookmarked: boolean;
  onToggleBookmark?: () => void;
}

const BakeryCard = ({
  bakeryId,
  operatingStatus,
  profileImage,
  name,
  rank,
  distance,
  size = 'normal',
  showBookmark = true,
  isBookmarked,
  onToggleBookmark,
}: BakeryCardProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleToggleBookmark = (bakeryId: number) => {
    const willBeBookmarked = !(isBookmarked === checked);

    if (willBeBookmarked) {
      addFavoriteBakery(bakeryId);
    } else {
      deleteFavoriteBakery(bakeryId);
    }

    setChecked(!checked);
  };
  return (
    <Link
      href={`/bakery/${bakeryId}`}
      className={cn(' flex flex-col items-start gap-3', size === 'normal' ? 'w-60' : 'w-full')}>
      <div className={`relative w-full ${size === 'normal' ? 'h-40' : 'h-[223px]'}`}>
        <Image src={profileImage} fill alt="bakery" className="rounded-md object-cover" />
      </div>
      <div className={cn('flex items-start gap-[10px]', 'w-full h-11')}>
        {size === 'normal' && (
          <span className={cn('w-5 h-[26px]', 'text-center', 'text-gray-900 text-lg font-semibold')}>{rank}</span>
        )}

        <div className={cn('flex justify-between items-center gap-5', 'w-full')}>
          <div className={cn('flex flex-col items-start gap-[2px]', 'w-full')}>
            <div className={cn('text-gray-900', 'text-body-m', 'w-full')}>{name}</div>
            <div className={cn('flex items-center gap-1', 'w-full h-[19px]')}>
              <span
                className={cn(
                  'font-semibold',
                  'text-[13px]',
                  operatingStatus === 'OPEN' ? 'text-secondary' : 'text-gray-500',
                )}>
                {OPERATING_STATUS[operatingStatus]}
              </span>
              <span className={cn('text-gray-200')}>•</span>
              <span className={cn('text-[13px]', 'text-gray-500')}>{distance}KM</span>
            </div>
          </div>
          {size === 'large' && showBookmark && (
            <button
              onClick={(e) => {
                e.preventDefault();
                if (onToggleBookmark) onToggleBookmark();
                else {
                  handleToggleBookmark(bakeryId);
                }
              }}
              className={cn(
                'flex justify-center items-center',
                'w-8 h-8 min-w-8',
                'border rounded-full border-gray100',
              )}
              aria-label="bookmark">
              <Image width={16} height={16} src={isBookmarked && !checked ? bookmarkFill : bookmark} alt="bookmark" />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BakeryCard;
