import deleteChip from '@/assets/icons/close-sub.svg';
import Image from 'next/image';

interface TimeChipProps {
  handleDelete: () => void;
  time: string;
}
/* H30_tag */

const TimeChip = ({ handleDelete, time }: TimeChipProps) => {
  return (
    <div
      className="flex justify-center items-center px-[10px] gap-1 w-[72px] h-[30px] bg-primary rounded-md"
      onClick={handleDelete}>
      <span className="text-title-content-xs text-white">{time}</span>
      <div className="w-3 h-3">
        <Image src={deleteChip} width={12} height={12} alt="delte chip" />
      </div>
    </div>
  );
};

export default TimeChip;
