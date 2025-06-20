import { OriginalShared } from '@/lib/shared/product';
import { breadCategories } from '@/lib/shared/product';

export type TCustomLabelKey = 'label' | 'name';
export type TCustomValueKey = 'value' | 'id';

/**
 * @description custom key, value로 shared 데이터를 만들어주는 함수
 * @param customLabelKey custom label key 이름 (ex. name)
 * @param customValueKey custom value key 이름 (ex. id)
 */

export type CustomObject<T extends TCustomValueKey, U extends TCustomLabelKey> = { [key in T | U]: string | number };

export const generateSharedObjectByCustomKey =
  <T extends TCustomValueKey, U extends TCustomLabelKey>(customValueKey: T, customLabelKey: U) =>
  (customKeyObject: OriginalShared): CustomObject<T, U>[] =>
    Object.entries(customKeyObject)
      ?.map(([value, key]) => {
        if (typeof key === 'undefined' || typeof value === 'undefined') return undefined;
        return {
          [customLabelKey]: key as typeof key,
          [customValueKey]: value,
        } as CustomObject<T, U>;
      })
      .filter((item): item is CustomObject<T, U> => item !== undefined);

export type CustomObjectType = ReturnType<typeof generateSharedObjectByCustomKey>;

export const mapCategoryIdsToIdLabel = (breadCategoryIds: number[]): { id: number; label: string }[] => {
  return breadCategoryIds
    .map((id: number) => {
      const category = breadCategories.find((bread) => bread.categoryId === id);
      return category ? { id: category.categoryId, label: category.categoryName } : null;
    })
    .filter((category): category is { id: number; label: string } => category !== null);
};
