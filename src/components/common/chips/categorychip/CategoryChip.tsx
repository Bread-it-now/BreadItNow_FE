import CheckIcon from '../../Icons/CheckIcon';
import PlusIcon from '../../Icons/PlusIcon';

interface CategoryChipProps {
  checked?: boolean;
  handleChecked: () => void;
  category: { id: number; label: string };
}

const CategoryChip = ({ checked, handleChecked, category }: CategoryChipProps) => {
  return (
    <div
      className={`flex justify-center items-center px-[10px] gap-1 h-[30px] border rounded-md text-title-content-xs hover:cursor-pointer ${checked ? 'border-primary bg-primaryLight text-primary' : 'border-gray200 bg-white text-gray500'}`}
      onClick={handleChecked}>
      <span>{category.label}</span>
      {checked ? <CheckIcon color={'#ff7651'} /> : <PlusIcon />}
    </div>
  );
};

export default CategoryChip;
