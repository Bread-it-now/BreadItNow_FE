'use client';

import DayChip from '../common/chips/DayChip';
import { Day } from '@/types/date';

export const DAY = {
  1: '일',
  2: '월',
  3: '화',
  4: '수',
  5: '목',
  6: '금',
  7: '토',
} satisfies Record<Day, '일' | '월' | '화' | '수' | '목' | '금' | '토'>;

interface DayPickerProps {
  initialDays: Day[];
}

const DayPicker = ({ initialDays }: DayPickerProps) => {
  return (
    <div className="flex items-center gap-[0.375rem] w-full h-[2.5rem]">
      {Object.entries(DAY).map(([key, value]) => {
        const day = Number(key) as Day;
        return (
          <DayChip key={`day-${day}-${value}`} day={value} onClick={() => {}} checked={initialDays.includes(day)} />
        );
      })}
    </div>
  );
};

export default DayPicker;
