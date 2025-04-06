'use client';

import { editProduct, useBakeryProduct } from '@/lib/api/bakery';
import { ProductForm } from '@/types/bakery';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import { ROUTES } from '@/constants/routes';
import { LabelForm } from '@/components/common/labelform/LabelForm';
import SelectedItem from '@/components/selecteditem/SelectItem';
import { generateSharedObjectByCustomKey, mapCategoryIdsToIdLabel } from '@/utils/mappingUtils';
import { BREAD_CATEGORY, Option } from '@/lib/shared/product';
import CustomInputWithOptions from '@/components/custominputwithoptions/CustomInputWithOptions';
import ProductCategory from '@/components/productcategory/ProductCategory';

const bakeryId = 1;

export interface LayoutProps {
  type: 'CREATE' | 'EDIT';
  mutate: (data: ProductForm) => void;
  productId?: number;
  initValue: ProductForm | null;
}
export const ProductFormLayout = ({ initValue, mutate }: LayoutProps) => {
  const router = useRouter();
  const generateSelectOption = generateSharedObjectByCustomKey('id', 'label');

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
  } = useForm<ProductForm>({
    defaultValues: initValue || {},
  });
  const data = watch();

  return (
    <div className="flex flex-col items-start w-full h-full bg-gray50">
      <form
        className="flex flex-col items-start gap-[30px] px-5 pt-6 pb-[30px] w-full bg-white"
        onSubmit={handleSubmit(() => {
          mutate({ ...data, productType: data.productType });
          router.push(ROUTES.OWNER.BAKERY.BAKERY_HOME);
        })}>
        <LabelForm name="productType" label="메뉴 타입" isRequired errors={errors} className="w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex w-full gap-2">
              <Controller
                name="productType"
                control={control}
                render={({ field }) => (
                  <div className="flex w-full gap-2">
                    <SelectedItem
                      label="빵류"
                      checked={field.value === 'BREAD'}
                      onClick={() => field.onChange('BREAD')}
                    />
                    <SelectedItem
                      label="기타"
                      checked={field.value === 'OTHER'}
                      onClick={() => field.onChange('OTHER')}
                    />
                  </div>
                )}
                rules={{ required: '메뉴 타입을 선택해주세요.' }}
              />
            </div>
            <p className="text-title-content-2xs text-gray500">
              *기타에는 크림치즈, 생크림등 빵 관련 부가적인 메뉴를 등록합니다.
            </p>
          </div>
        </LabelForm>

        <LabelForm name="breadCategoryIds" label="빵 카테고리" isRequired errors={errors} className="w-full">
          <Controller
            control={control}
            name="breadCategoryIds"
            rules={{ required: '빵 카테고리를 선택해주세요.' }}
            render={({ field }) => {
              const breadCategories: Option[] =
                field.value && field.value.length !== 0 ? mapCategoryIdsToIdLabel(field.value) : [];

              return (
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    {breadCategories.map((category) => (
                      <ProductCategory
                        key={category.label}
                        category={category}
                        handleDelete={() => field.onChange(field.value.filter((id: number) => id !== category.id))}
                      />
                    ))}
                  </div>
                  <CustomInputWithOptions
                    selectOption={({ id }: Option) => {
                      if (!field.value.includes(Number(id))) {
                        field.onChange([...field.value, Number(id)]);
                      }
                    }}
                    placeholder="카테고리 검색"
                    options={generateSelectOption(BREAD_CATEGORY)}
                  />
                </div>
              );
            }}
          />
        </LabelForm>

        <div className="absolute bottom-0 left-0 flex p-5 gap-2 w-full shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)] bg-white">
          <Button variant="default" fullWidth onClick={() => router.push(ROUTES.OWNER.BAKERY.BAKERY_HOME)}>
            취소
          </Button>
          <Button variant="primary" type="submit" disabled={!isDirty} fullWidth onClick={() => {}}>
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

  return (
    product && (
      <ProductFormLayout
        type={'EDIT'}
        mutate={(productForm: ProductForm) => editProduct(bakeryId, productId, productForm)}
        initValue={initValue}
        productId={productId}
      />
    )
  );
}
