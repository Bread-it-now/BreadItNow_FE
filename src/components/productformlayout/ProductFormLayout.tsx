import Button from '@/components/button/Button';
import { ROUTES } from '@/constants/routes';
import { LabelForm } from '@/components/common/labelform/LabelForm';
import SelectedItem from '@/components/selecteditem/SelectItem';
import { generateSharedObjectByCustomKey, mapCategoryIdsToIdLabel } from '@/utils/mappingUtils';
import { BREAD_CATEGORY, MAIN_BREAD_CATEGORY, Option } from '@/lib/shared/product';
import CustomInputWithOptions from '@/components/custominputwithoptions/CustomInputWithOptions';
import ProductCategory from '@/components/productcategory/ProductCategory';
import CategoryChip from '@/components/common/chips/categorychip/CategoryChip';
import InputText from '@/components/common/inputtext/InputText';
import TextArea from '@/components/common/textarea/TextArea';
import { useForm, Controller } from 'react-hook-form';
import { ProductForm } from '@/types/bakery';
import { useRouter } from 'next/navigation';
import WheelTimePicker from '../wheeltimepicker/WheelTimePicker';
import BottomSheet from '../bottomsheet/Bottomsheet';
import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';
import TimeChip from '../common/chips/timechip/TimeChip';
import { useState } from 'react';
import { getReleaseTime } from '@/utils/date';
import add from '@/assets/icons/add.svg';
import Image from 'next/image';

interface ProductFormLayoutProps {
  type: 'CREATE' | 'EDIT';
  mutate: (data: ProductForm) => void;
  productId?: number;
  initValue: ProductForm | null;
}
export const ProductFormLayout = ({ initValue, mutate }: ProductFormLayoutProps) => {
  const router = useRouter();
  const generateSelectOption = generateSharedObjectByCustomKey('id', 'label');
  const { isOpen: isWheelTimePickerOpen, dispatch } = useBaseBottomSheet();
  const [newReleaseTime, setNewReleaseTime] = useState<{ hours: number; minutes: number; ampm: 'AM' | 'PM' }>({
    hours: 9,
    minutes: 30,
    ampm: 'AM',
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isDirty },
    register,
  } = useForm<ProductForm>({
    defaultValues: initValue || {
      productType: undefined,
      breadCategoryIds: [],
      name: '',
      price: undefined,
      description: '',
      releaseTimes: [],
    },
  });
  const data = watch();

  return (
    <div className="flex flex-col items-start w-full h-full bg-gray50">
      <form
        className="flex flex-col items-start gap-[30px] px-5 pt-6 pb-[102px] w-full bg-white"
        onSubmit={handleSubmit(() => {
          mutate({ ...data, productType: data.productType });
          router.push(ROUTES.OWNER.BAKERY.BAKERY_HOME);
        })}>
        <LabelForm name="productType" label="메뉴 타입" isRequired errors={errors} className="w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            <div className="flex w-full gap-2">
              <Controller
                control={control}
                rules={{ required: '메뉴 타입을 선택해주세요.' }}
                {...register('productType')}
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
            rules={{ required: '빵 카테고리를 선택해주세요.' }}
            {...register('breadCategoryIds')}
            render={({ field }) => {
              const breadCategories: Option[] =
                field.value && field.value.length !== 0 ? mapCategoryIdsToIdLabel(field.value) : [];

              return (
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    {breadCategories.map((category) => (
                      <ProductCategory
                        key={category.label}
                        category={{ ...category, id: Number(category.id) }}
                        handleDelete={() => field.onChange(field.value.filter((id: number) => id !== category.id))}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <CustomInputWithOptions
                      selectOption={({ id }: Option) => {
                        if (!field.value.includes(Number(id))) {
                          field.onChange([...field.value, Number(id)]);
                        }
                      }}
                      placeholder="카테고리 검색"
                      options={generateSelectOption(BREAD_CATEGORY)}
                    />
                    <div className="flex flex-wrap items-start content-center gap-[6px] w-full">
                      {generateSelectOption(MAIN_BREAD_CATEGORY).map((category) => (
                        <CategoryChip
                          key={category.label}
                          category={{ id: Number(category.id), label: String(category.label) }}
                          checked={field.value.includes(Number(category.id))}
                          handleChecked={() => {
                            if (field.value.includes(Number(category.id))) {
                              field.onChange(field.value.filter((id: number) => id !== Number(category.id)));
                            } else {
                              field.onChange([...field.value, Number(category.id)]);
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </LabelForm>
        <LabelForm name="name" label="메뉴 이름" isRequired errors={errors} className="w-full">
          <Controller
            control={control}
            rules={{ required: '메뉴 이름을 입력해주세요.' }}
            {...register('name')}
            render={({ field }) => {
              return (
                <InputText
                  defaultValue={field.value}
                  placeholder="메뉴 이름"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              );
            }}
          />
        </LabelForm>
        <LabelForm name="price" label="메뉴 가격" isRequired errors={errors} className="w-full">
          <Controller
            control={control}
            rules={{ required: '메뉴 가격을 입력해주세요.' }}
            {...register('price', { valueAsNumber: true })}
            render={({ field }) => {
              return (
                <InputText
                  defaultValue={String(field.value)}
                  placeholder="메뉴 가격"
                  onChange={(e) => field.onChange(e.target.value && Number(e.target.value))}
                  inputType="number"
                  unit="원"
                />
              );
            }}
          />
        </LabelForm>
        <LabelForm name="description" label="메뉴 설명" isRequired errors={errors} className="w-full">
          <Controller
            control={control}
            rules={{ required: '메뉴 설명을 입력해주세요.' }}
            {...register('description')}
            render={({ field }) => {
              return (
                <TextArea
                  defaultValue={field.value}
                  placeholder="메뉴의 특징, 중량 또는 주요 재료 정보를 작성해주세요."
                  onChange={(e) => field.onChange(e.target.value)}
                  currentLength={field.value.length}
                  maxLength={50}
                />
              );
            }}
          />
        </LabelForm>

        <LabelForm name="releaseTimes" label="빵 나오는 시간" isRequired errors={errors} className="w-full">
          <Controller
            control={control}
            rules={{ required: '빵 나오는 시간을 설정해주세요.' }}
            {...register('releaseTimes')}
            render={({ field }) => {
              const releaseTimes = field.value || [];
              return (
                <div className="flex flex-col gap-3 w-full">
                  <div className="flex flex-wrap gap-[6px]">
                    {releaseTimes.map((releaseTime: string) => (
                      <TimeChip
                        key={releaseTime}
                        time={releaseTime}
                        handleDelete={() => field.onChange(field.value.filter((time: string) => time !== releaseTime))}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <Button variant="secondary" onClick={() => dispatch.open()} fullWidth className="flex gap-[6px]">
                      <Image src={add} width={20} height={20} alt="add" />
                      <p>빵 나오는 시간 추가</p>
                    </Button>
                    <p className="text-title-content-2xs text-gray500">
                      *빵이 나오는 시간을 등록해주세요. 여러 개 등록 가능합니다.
                    </p>
                  </div>
                  {isWheelTimePickerOpen && (
                    <BottomSheet
                      isOpen={isWheelTimePickerOpen}
                      onClose={() => {
                        dispatch.close();
                        setNewReleaseTime({
                          hours: 9,
                          minutes: 30,
                          ampm: 'AM',
                        });
                      }}
                      confirmText="추가"
                      cancelText="취소"
                      onConfirm={() => {
                        dispatch.close();
                        if (
                          !field.value.includes(
                            getReleaseTime(newReleaseTime.hours, newReleaseTime.minutes, newReleaseTime.ampm),
                          )
                        ) {
                          field.onChange([
                            ...field.value,
                            getReleaseTime(newReleaseTime.hours, newReleaseTime.minutes, newReleaseTime.ampm),
                          ]);
                        }
                        setNewReleaseTime({
                          hours: 9,
                          minutes: 30,
                          ampm: 'AM',
                        });
                      }}>
                      <WheelTimePicker handleSelectedTime={setNewReleaseTime} initTime={newReleaseTime} />
                    </BottomSheet>
                  )}
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
