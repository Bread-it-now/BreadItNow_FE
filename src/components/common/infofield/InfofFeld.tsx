'use client';

import { cn } from '@/utils/cn';

interface InfoFieldProps {
  title: string;
  content: string;
  className?: string;
}

const InfoField = ({ title, content, className }: InfoFieldProps) => {
  return (
    <div className={cn('flex flex-col items-start gap-2 w-full', className)}>
      <span className={cn(' w-full h-[22px] text-title-content-m text-gray-900')}>{title}</span>
      <div className={cn('text-[13px]', 'text-gray500')}>{content}</div>
    </div>
  );
};

export default InfoField;
