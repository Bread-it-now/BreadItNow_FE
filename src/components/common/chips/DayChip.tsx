'use client';

interface DayChipProps {
  /** 요일 */
  day: '월' | '화' | '수' | '목' | '금' | '토' | '일';
  /** 체크 여부 */
  checked?: boolean;
  /** 클릭 이벤트 */
  onClick: () => void;
}

export default function DayChip({ day, checked, onClick }: DayChipProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center p-[0.625rem] gap-[0.625rem] w-[2.5rem] h-[2.5rem] rounded-lg ${checked ? 'bg-primary bg-opacity-[0.12]' : 'bg-gray50'} hover:opacity-70 cursor-pointer`}
      onClick={onClick}>
      <span className={`text-[13px] font-semibold ${checked ? 'text-primary' : 'text-gray500'}`}>{day}</span>
    </div>
  );
}
