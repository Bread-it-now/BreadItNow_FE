'use client';

import { cn } from '@/utils/cn';

interface InfoFieldProps {
  title: string;
  content?: string;
  className?: string;
}

const InfoField = ({ title, content, className }: InfoFieldProps) => {
  return (
    <div className={cn('flex flex-col items-start gap-2 w-full h-full', className)}>
      <span className={cn(' w-full min-h-[22px] h-full text-title-content-m text-gray-900')}>{title}</span>
      {content && <div className={'text-[13px] text-gray500 whitespace-pre-line'}>{content}</div>}
    </div>
  );
};

export default InfoField;
