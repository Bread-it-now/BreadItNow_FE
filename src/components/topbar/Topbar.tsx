'use client';

import { cn } from '@/utils/cn';
import back from '@/assets/icons/back.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TopbarProps {
  /** 뒤로 가기 버튼 유무 */
  hasBackBtn?: boolean;

  /** Title */
  title?: string;

  /** Topbar 왼쪽에 들어갈 Content */
  leftItems?: React.ReactNode;

  /** Topbar 오쪽에 들어갈 Content */
  rightItems?: React.ReactNode;

  /** 추가적인 CSS 속성 */
  classname?: string;
}

const Topbar = ({ hasBackBtn = true, title, leftItems, rightItems, classname }: TopbarProps) => {
  const router = useRouter();
  return (
    <div className={cn('flex items-center gap-5 w-full h-[52px] p-5 bg-white', classname)}>
      <div className={cn('flex items-center gap-[10px] w-full h-full')}>
        {hasBackBtn && (
          <button onClick={router.back}>
            <Image src={back} width={24} height={24} alt="back" />
          </button>
        )}
        {title && <span className="text-lg font-semibold">{title}</span>}
        {leftItems && leftItems}
      </div>
      {rightItems && <div className="flex justify-end items-center gap-4 h-full">{rightItems}</div>}
    </div>
  );
};

export default Topbar;
