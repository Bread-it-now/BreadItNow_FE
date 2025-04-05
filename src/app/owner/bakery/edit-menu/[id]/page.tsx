'use client';

import { LabelForm } from '@/components/common/labelform/LabelForm';
import { useBakeryProduct } from '@/lib/api/bakery';
import { ProductForm } from '@/types/bakery';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';

const bakeryId = 1;

export interface LayoutProps {
  type: 'CREATE' | 'EDIT';
  mutate: () => void;
  initValue: ProductForm | null;
  productId?: number;
}

const Layout = ({}: LayoutProps) => {
  const {} = useForm<ProductForm>({});
  return (
    <div className="flex flex-col items-start px-5 pt-6 pb-[30px]">
      <form className="flex flex-col items-start gap-[30px]">
        <LabelForm label="메뉴 타입" isRequired>
          임시 정보
        </LabelForm>
      </form>
    </div>
  );
};

export default function Page() {
  const params = useParams<{ id: string }>();
  const productId = Number(params.id);
  const { data: product } = useBakeryProduct(bakeryId, productId);
  const initValue: ProductForm | null = product
    ? {
        productType: product.productType,
        breadCategoryId: product.breadCategories ? product.breadCategories.map((category) => category.categoryId) : [],
        name: product.name,
        price: product.price,
        description: product.description,
        releaseTimes: product.releaseTimes || [],
      }
    : null;

  return product && <Layout type={'CREATE'} mutate={() => {}} initValue={initValue} productId={productId} />;
}
