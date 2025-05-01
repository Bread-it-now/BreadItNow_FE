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
  isBakeryFavorite: boolean;
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
  additionalImages?: string[];
}

export interface BreadReleaseTime {
  releaseTime: string;
  scheduledProducts: {
    productId: number;
    name: string;
  }[];
}

export interface Bakery extends BaseInfo, OperatingInfo, ImageInfo {
  isFavorite: boolean;
}
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
export interface BreadCategory {
  categoryId: number;
  categoryName: string;
}

export interface Product {
  productId: number;
  bakeryId: number;
  productType: ProductType;
  name: string;
  price: number;
  image: string;
  description?: string;
  releaseTimes?: string[];
  stock: number;
  isActive: boolean;
  isHidden: boolean;
  breadCategories?: BreadCategory[];
  displayOrder?: number;
  alarmEnabled: boolean;
  isFavorite: boolean;
}

export interface BakeryProducts {
  totalCount: number;
  breadProducts: Product[];
  otherProducts: Product[];
}

export interface TodayProduct {
  bakeryId: number;
  bakeryName: string;
  productId: number;
  productName: string;
  releaseTimes: string[];
}
export interface ProductOrder {
  productId: number;
  order: number;
}

export interface ProductForm {
  productType: ProductType;
  breadCategoryIds: number[];
  name: string;
  price: number;
  productImage?: string | File;
  description: string;
  releaseTimes: string[];
}

export interface FavoriteBakery {
  bakeryId: number;
  name: string;
  profileImage: string;
  distance: number;
  operatingStatus: keyof typeof OPERATING_STATUS;
  isBakeryActive: boolean;
}

export interface FavoriteProduct {
  productId: number;
  bakeryId: number;
  name: string;
  image: string;
  price: number;
  releaseTimes: string[];
  isBakeryActive: false;
  isBreadActive: true;
}

export interface FavoriteBakeryList {
  favorites: FavoriteBakery[];
  pageInfo: {
    totalElements: number;
    totalPages: number;
    isLast: boolean;
    currPage: number;
  };
}

export interface FavoriteProductList {
  favorites: FavoriteProduct[];
  pageInfo: {
    totalElements: number;
    totalPages: number;
    isLast: boolean;
    currPage: number;
  };
}
export interface HotProduct {
  productId: Product['productId'];
  bakeryId: Product['bakeryId'];
  bakeryName: string;
  productName: Product['name'];
  image: Product['image'];
  price: Product['price'];
  stock: Product['stock'];
  isFavorite: Product['isFavorite'];
}

export interface HotBakery {
  bakeryId: Bakery['bakeryId'];
  bakeryName: Bakery['name'];
  profileImage: Bakery['profileImage'];
  distance: number;
  isFavorite: Bakery['isFavorite'];
  operatingStatus: Bakery['operatingStatus'];
}

export interface SearchBakery {
  bakeryId: Bakery['bakeryId'];
  bakeryName: Bakery['name'];
  profileImage: Bakery['profileImage'];
  distance: number;
  isFavorite: Bakery['isFavorite'];
  operatingStatus: Bakery['operatingStatus'];
}
export interface SearchProduct {
  productId: Product['productId'];
  bakeryId: Product['bakeryId'];
  bakeryName: string;
  productName: Product['name'];
  image: Product['image'];
  price: Product['price'];
  stock: Product['stock'];
  isFavorite: Product['isFavorite'];
}
export interface SearchAutoComplete {
  name: string;
  type: 'BAKERY' | 'PRODUCT';
}

export type FilterKey = 'latest' | 'popular' | 'distance';
export type HotFilterKey = 'reservation' | 'favorite';
