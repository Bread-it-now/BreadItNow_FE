'use client';

interface QuantityChipProps {
  quantity: number;
  onClick: () => void;
}

const QuantityChip = ({ quantity, onClick }: QuantityChipProps) => {
  return (
    <div
      className="flex justify-center px-4 py-2 gap-[10px] w-[50px] bg-primaryLight rounded-full cursor-pointer hover:opacity-70"
      onClick={onClick}>
      <span className="text-[13px] font-normal text-primary">{`${quantity > 0 ? '+' : ''}${quantity}`}</span>
    </div>
  );
};

export default QuantityChip;
