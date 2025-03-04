'use client';

import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
interface IconButtonProps {
  icon: string | StaticImport;
  iconText: string;
  onClick: () => void | Promise<void>;
  isChecked?: boolean;
  buttonClass?: string;
}

function IconButton({ icon, onClick, iconText, isChecked = false, buttonClass = '' }: IconButtonProps) {
  return (
    <button
      className={`
      w-8 h-8 rounded-full
      ${buttonClass}
      ${isChecked ? 'border-none bg-primary bg-opacity-10' : ' border-gray-100 bg-white border-2'}
    `}
      onClick={onClick}>
      <Image width={16} height={16} className="mx-auto" src={icon} alt={iconText} />
    </button>
  );
}

export default IconButton;
