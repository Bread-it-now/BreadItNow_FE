import { BreadCategory } from '@/types/bakery';
export interface OriginalShared {
  [key: number | string]: number | string;
}

export interface Option {
  value: string | number;
  label: string | number;
}

export const breadCategories: BreadCategory[] = [
  { categoryId: 1, categoryName: '식빵' },
  { categoryId: 2, categoryName: '통밀빵' },
  { categoryId: 3, categoryName: '호밀빵' },
  { categoryId: 4, categoryName: '소금빵' },
  { categoryId: 5, categoryName: '크림빵' },
  { categoryId: 6, categoryName: '단팥빵' },
  { categoryId: 7, categoryName: '치아바타' },
  { categoryId: 8, categoryName: '바게트' },
  { categoryId: 9, categoryName: '포카치아' },
  { categoryId: 10, categoryName: '데니쉬' },
  { categoryId: 11, categoryName: '머핀' },
  { categoryId: 12, categoryName: '브리오슈' },
  { categoryId: 13, categoryName: '베이글' },
  { categoryId: 14, categoryName: '치즈빵' },
  { categoryId: 15, categoryName: '감자빵' },
  { categoryId: 16, categoryName: '호두빵' },
  { categoryId: 17, categoryName: '바나나빵' },
  { categoryId: 18, categoryName: '크루아상' },
  { categoryId: 19, categoryName: '파네토네' },
  { categoryId: 20, categoryName: '피자빵' },
  { categoryId: 21, categoryName: '브레첼' },
  { categoryId: 22, categoryName: '콘브레드' },
  { categoryId: 23, categoryName: '롤빵' },
  { categoryId: 24, categoryName: '호박빵' },
  { categoryId: 25, categoryName: '아몬드빵' },
  { categoryId: 26, categoryName: '마늘빵' },
  { categoryId: 27, categoryName: '허니오트빵' },
  { categoryId: 28, categoryName: '오트밀빵' },
  { categoryId: 29, categoryName: '스위트브레드' },
  { categoryId: 30, categoryName: '다크브레드' },
  { categoryId: 31, categoryName: '우유빵' },
  { categoryId: 32, categoryName: '요거트빵' },
  { categoryId: 33, categoryName: '버터빵' },
  { categoryId: 34, categoryName: '견과빵' },
  { categoryId: 35, categoryName: '씨앗빵' },
  { categoryId: 36, categoryName: '글루텐프리빵' },
  { categoryId: 37, categoryName: '멀티그레인빵' },
  { categoryId: 38, categoryName: '흑미빵' },
  { categoryId: 39, categoryName: '흑설탕빵' },
  { categoryId: 40, categoryName: '김치빵' },
  { categoryId: 41, categoryName: '쌀빵' },
  { categoryId: 42, categoryName: '보리빵' },
  { categoryId: 43, categoryName: '옥수수빵' },
  { categoryId: 44, categoryName: '코코넛빵' },
  { categoryId: 45, categoryName: '통곡물빵' },
  { categoryId: 46, categoryName: '호밀식빵' },
  { categoryId: 47, categoryName: '흰빵' },
  { categoryId: 48, categoryName: '플랫브레드' },
  { categoryId: 49, categoryName: '피타빵' },
  { categoryId: 50, categoryName: '난' },
  { categoryId: 51, categoryName: '차파티' },
  { categoryId: 52, categoryName: '사워도우' },
  { categoryId: 53, categoryName: '스콘' },
  { categoryId: 54, categoryName: '토르티야' },
  { categoryId: 55, categoryName: '에그빵' },
  { categoryId: 56, categoryName: '찹쌀빵' },
  { categoryId: 57, categoryName: '밤빵' },
  { categoryId: 58, categoryName: '쑥빵' },
  { categoryId: 59, categoryName: '고구마빵' },
  { categoryId: 60, categoryName: '잣빵' },
  { categoryId: 61, categoryName: '참깨빵' },
  { categoryId: 62, categoryName: '아마씨빵' },
  { categoryId: 63, categoryName: '시나몬빵' },
  { categoryId: 64, categoryName: '메론빵' },
  { categoryId: 65, categoryName: '맘모스빵' },
  { categoryId: 66, categoryName: '앙버터' },
  { categoryId: 67, categoryName: '모닝빵' },
  { categoryId: 68, categoryName: '도넛' },
  { categoryId: 69, categoryName: '와플' },
  { categoryId: 70, categoryName: '번' },
];

export const BREAD_CATEGORY: OriginalShared = breadCategories
  .map((category) => ({
    [category.categoryId]: category.categoryName,
  }))
  .reduce((acc, cur) => ({ ...acc, ...cur }), {}) as OriginalShared;
