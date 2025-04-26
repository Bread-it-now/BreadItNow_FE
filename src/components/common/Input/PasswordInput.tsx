import { cn } from '@/utils/cn';
import { InputProps } from './Input';
import PWSHOWICON from '@/assets/icons/pw_show.svg';
import PWHIDEICON from '@/assets/icons/pw_hide.svg';
import Image from 'next/image';
import { useState } from 'react';

function PasswordInput({
  value,
  onChange,
  disabled = false,
  placeholder = '',
  className = '',
  maxLength = undefined,
  id,
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={cn(className, 'relative overflow-hidden')}>
      <input
        type={showPassword ? 'text' : 'password'}
        id={id}
        className={cn('px-4 py-[14px] outline-none text-gray-900 w-full text-[13px] border border-none  rounded-lg')}
        onChange={onChange}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      <Image
        onClick={toggleShowPassword}
        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
        src={showPassword ? PWSHOWICON : PWHIDEICON}
        alt="show"
        width={22}
        height={22}
      />
    </div>
  );
}

export default PasswordInput;
