'use client';

import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary';
  scale?: 'large' | 'medium' | 'small' | 'xsmall';
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  id?: string;
  onClick: () => void;
}

const Button = ({
  children,
  disabled = false,
  scale = 'medium',
  variant = 'default',
  type = 'button',
  fullWidth = false,
  className,
  onClick,
}: ButtonProps) => {
  const baseStyles = cn(
    `flex center justify-center items-center w-[120px] h-[52px] rounded-lg ${fullWidth && 'w-full'} hover:cursor-pointer disabled:cursor-not-allowed`,
  );

  const variants = {
    default: cn('bg-white border border-gray200', 'hover:bg-[#F8F9FB] active:bg-gray50 disabled:bg-inherit'),
    primary: cn('bg-primary', 'hover:bg-[#F36A45] active:bg-[#ED6541] disabled:bg-gray100'),
    secondary: cn('bg-primaryLight', 'hover:bg-[#FFE4DC] active:bg-[#FFD6CB] disabled:bg-gray100'),
  };

  const contentStyles = cn(
    `flex items-center justify-center w-full h-full gap-1.5 text-nowrap`,
    `${variant === 'default' ? 'text-gray900' : variant === 'primary' ? 'text-white' : 'text-primary'}`,
    `${disabled ? 'text-gray400' : ''}`,
  );

  const scaleStyles = {
    large: 'h-[52px] text-[15px] font-semibold',
    medium: 'h-[48px] text-[14px] font-normal',
    small: 'h-[44px] text-[14px] font-normal',
    xsmall: 'h-[36px] text-[13px] font-normal',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], scaleStyles[scale], className)}
      disabled={disabled}
      type={type ?? 'button'}
      onClick={onClick}>
      <div className={contentStyles}>{children}</div>
    </button>
  );
};

export default Button;
