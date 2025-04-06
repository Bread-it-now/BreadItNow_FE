'use client';
import { Option } from '@/lib/shared/product';
import Image from 'next/image';
import Close from '@/assets/icons/close.svg';

interface ProductCategoryProps {
  category: Option;
  handleDelete: () => void;
}

const ProductCategory = ({ category, handleDelete }: ProductCategoryProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 w-full rounded-lg bg-gray50">
      <p className="text-title-content-s w-full font-gray900">{category.label}</p>
      <button className="w-[22px] h-[22px] hover:cursor-pointer" onClick={() => handleDelete()}>
        <Image src={Close} width={22} height={22} alt="delete Category" />
      </button>
    </div>
  );
};

export default ProductCategory;
