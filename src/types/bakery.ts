export const OPERATING_STATUS = {
  OPEN: '영업 중',
  CLOSED: '영업 종료',
  TEMPORARY_CLOSED: '일시 중지',
} as const;

/** 빵집 기본 정보 */
export interface BaseInfo {
  bakeryId: number;
  name: string;
  address: string;
  phone: string;
  distance?: number;
  introduction: string;
}

/** 빵집 운영 관련 정보 */
export interface OperatingInfo {
  operatingStatus: keyof typeof OPERATING_STATUS;
  openTime: string;
}

/** 빵집 이미지 정보 */
export interface ImageInfo {
  profileImage: string;
  bakeryImages: string[];
}

export interface Bakery extends BaseInfo, OperatingInfo, ImageInfo {}
export interface Bread {
  id: number;
  bakeryId: number;
  price: number;
  name: string;
  bakeryName: string;
  description: string;
  imgUrl: string;
  stock: number;
  releaseTimes: string[];
  isActive: boolean;
}

export type ProductType = 'BREAD' | 'OTHER';

export interface Product {
  productId: number;
  bakeryId: number;
  productType: ProductType;
  name: string;
  price: number;
  image: string;
  description: string;
  releaseTimes?: string[];
  stock: number;
  isActive: boolean;
  isHidden: boolean;
  breadCategories?: { categoryId: number; categoryName: string }[];
  displayOrder?: number;
}

export interface BakeryProducts {
  totalCount: number;
  breadProducts: Product[];
  otherProducts: Product[];
}
