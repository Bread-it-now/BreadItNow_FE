'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface IconButtonProps {
  icon: string | StaticImport;
  iconText: string;
  onClick: () => void | Promise<void>;
  isChecked?: boolean;
  buttonClass?: string;
  iconWidth?: number;
  iconHeight?: number;
}

function IconButton({
  icon,
  onClick,
  iconText,
  isChecked = false,
  buttonClass = '',
  iconWidth = 16,
  iconHeight = 16,
}: IconButtonProps) {
  return (
    <button
      className={`
      w-6 h-6 rounded-full
      ${buttonClass}
      ${isChecked ? 'border-none bg-primary bg-opacity-10' : ' border-gray-100 bg-white border-2'}
    `}
      onClick={onClick}>
      <Image width={iconWidth} height={iconHeight} className="mx-auto" src={icon} alt={iconText} />
    </button>
  );
}

export default IconButton;
