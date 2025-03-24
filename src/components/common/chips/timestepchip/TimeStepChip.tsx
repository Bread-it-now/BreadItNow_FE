'use client';

import { cn } from '@/utils/cn';

interface TimeStepChipProps {
  /** step 단위. 분 */
  step: number;
  onClick: () => void;
  checked?: boolean;
  className?: string;
}

const TimeStepChip = ({ step, onClick, checked, className }: TimeStepChipProps) => {
  const hour = Math.floor(step / 60);
  const miniutes = Math.floor(step % 60);
  const content =
    step >= 1440
      ? '오늘 하루'
      : hour === 0
        ? `${miniutes}분`
        : miniutes === 0
          ? `${hour}시간`
          : `${hour}시간 ${miniutes}분`;
  return (
    <div
      className={cn(
        `flex justify-center items-center px-6 gap-[10px] h-[48px] rounded-lg cursor-pointer hover:opacity-70 border text-title-content-s font-normal max-w-[166px] ${checked ? 'bg-primaryLight1 border-primary text-primary' : 'bg-white border-gray200 text-gray900'}`,
        className,
      )}
      onClick={() => onClick}>
      <span>{content}</span>
    </div>
  );
};

export default TimeStepChip;
