'use client';

import { ENG_TO_KOR_DAY } from '@/lib/shared/date';
// import { useEffect, useState } from 'react';
import DayChip from '../common/chips/DayChip';
import { ENG_DAY, KOR_DAY } from '@/types/date';

interface DayPickerProps {
  initialDays: ENG_DAY[];
  handleChangeDays: (day: ENG_DAY) => void;
}

const DayPicker = ({ initialDays, handleChangeDays }: DayPickerProps) => {
  return (
    <div className="flex items-center gap-[0.375rem] w-full h-[2.5rem]">
      {Object.entries(ENG_TO_KOR_DAY).map(([key, value]) => {
        return (
          <DayChip
            key={`day-${key}-${value}`}
            day={value as KOR_DAY}
            onClick={() => handleChangeDays(key as ENG_DAY)}
            checked={initialDays.includes(key as ENG_DAY)}
          />
        );
      })}
    </div>
  );
};

export default DayPicker;
