'use client';

import { useBakeryProduct } from '@/lib/api/bakery';
import { ProductForm } from '@/types/bakery';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import { ROUTES } from '@/constants/routes';
import { LabelForm } from '@/components/common/labelform/LabelForm';

const bakeryId = 1;

export interface LayoutProps {
  type: 'CREATE' | 'EDIT';
  mutate: (data: ProductForm) => void;
  productId?: number;
  initValue: ProductForm | null;
}

const Layout = ({ initValue }: LayoutProps) => {
  const router = useRouter();
  const {} = useForm<ProductForm>({});
  const { handleSubmit } = useForm<ProductForm>({
    defaultValues: initValue || {},
  });

  return (
    <div className="flex flex-col items-start w-full h-full bg-gray50">
      <form
        className="flex flex-col items-start gap-[30px] px-5 pt-6 pb-[30px] w-full bg-white"
        onSubmit={handleSubmit(() => {})}>
        <LabelForm name="productType" label="메뉴 타입" isRequired>
          <div>12</div>
        </LabelForm>
        <div className="absolute bottom-0 left-0 flex p-5 gap-2 w-full shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)] bg-white">
          <Button variant="default" fullWidth onClick={() => router.push(ROUTES.OWNER.BAKERY.BAKERY_HOME)}>
            취소
          </Button>
          <Button
            variant="primary"
            type="submit"
            fullWidth
            onClick={() => router.push(ROUTES.OWNER.BAKERY.BAKERY_HOME)}>
            저장
          </Button>
        </div>
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
        breadCategoryIds: product.breadCategories ? product.breadCategories.map((category) => category.categoryId) : [],
        name: product.name,
        price: product.price,
        description: product.description,
        releaseTimes: product.releaseTimes || [],
      }
    : null;

  return product && <Layout type={'CREATE'} mutate={() => {}} initValue={initValue} productId={productId} />;
}
