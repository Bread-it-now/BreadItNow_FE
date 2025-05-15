import { API_END_POINT } from '@/constants/api';
import { BAKERY_QUERY_KEY, SEARCH_QUERY_KEY } from '@/constants/queryKey';
import {
  Bakery,
  BakeryProducts,
  BreadReleaseTime,
  FavoriteBakeryList,
  FavoriteProductList,
  FilterKey,
  HotBakery,
  HotFilterKey,
  HotProduct,
  IReservationInfo,
  OPERATING_STATUS,
  Product,
  ProductForm,
  ProductOrder,
  SearchAutoComplete,
  SearchBakery,
  SearchProduct,
} from '@/types/bakery';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { customFetch } from '../customFetch';
import { PageInfo } from '@/types/reservation';

export const getBakeryInfo = async (bakeryId: number): Promise<{ data: Bakery }> => {
  const response = await customFetch(`/${API_END_POINT.BAKERY_INFO(bakeryId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to fetch bakeryInfo');

  return response.json();
};

export const getCustomerBakeryDetailInfo = async (
  bakeryId: number,
): Promise<{
  data: {
    bakery: Bakery;
    releaseSchedules: BreadReleaseTime[];
    breadProducts: Product[];
    otherProducts: Product[];
  };
}> => {
  const response = await customFetch(`/${API_END_POINT.CUSTOMER_BAKERY_DETAIL_INFO(bakeryId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to fetch bakeryInfo');

  return response.json();
};

export const useCustomerBakeryDetailInfo = (bakeryId: number) =>
  useQuery({
    queryKey: [...BAKERY_QUERY_KEY.BAKERY_INFO(bakeryId)],
    queryFn: () => getCustomerBakeryDetailInfo(bakeryId),
    select: (data: {
      data: {
        bakery: Bakery;
        releaseSchedules: BreadReleaseTime[];
        breadProducts: Product[];
        otherProducts: Product[];
      };
    }) => data?.data,
  });

export const useBakeryInfo = (bakeryId: number) =>
  useQuery({
    queryKey: [...BAKERY_QUERY_KEY.BAKERY_INFO(bakeryId)],
    queryFn: () => getBakeryInfo(bakeryId),
    select: (data: { data: Bakery }) => data?.data,
  });

export const getBakeryProducts = async (bakeryId: number): Promise<{ data: BakeryProducts }> => {
  const response = await fetch(`/${API_END_POINT.BAKERY_PRODUCTS(bakeryId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to fetch bakery products');

  return response.json();
};

export const useBakeryProducts = (bakeryId: number) =>
  useQuery({
    queryKey: [...BAKERY_QUERY_KEY.BAKERY_PRODUCTS(bakeryId)],
    queryFn: () => getBakeryProducts(bakeryId),
    select: (data: { data: BakeryProducts }) => data?.data,
  });

export const changeStockQuantity = async (
  bakeryId: number,
  productId: number,
  stock: number,
): Promise<{ data: { stock: number } }> => {
  const response = await customFetch(`/${API_END_POINT.CHANGE_STOCK_QUANTITY(bakeryId, productId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stock }),
  });

  if (!response?.ok) throw new Error('Failed to fetch bakery products');

  return response.json();
};

export const changeOperatingStatus = async (
  bakeryId: number,
  operatingStatus: keyof typeof OPERATING_STATUS,
): Promise<{ data: { bakeryId: number } }> => {
  const response = await customFetch(`/${API_END_POINT.CHANGE_OPERATING_STATUS(bakeryId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operatingStatus }),
  });

  if (!response?.ok) throw new Error('Failed to change operating Status');

  return response.json();
};

export const deleteProduct = async (bakeryId: number, productId: number): Promise<{ data: { productId: number } }> => {
  const response = await customFetch(`/${API_END_POINT.DELETE_PRODUCT(bakeryId, productId)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to change operating Status');

  return response.json();
};

export const deleteProducts = async (
  bakeryId: number,
  productIds: number[],
): Promise<{ data: { deletedCount: number } }> => {
  const response = await customFetch(`/${API_END_POINT.DELETE_PRODUCTS(bakeryId)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productIds }),
  });

  if (!response?.ok) throw new Error('Failed to change operating Status');

  return response.json();
};

export const hideProducts = async (bakeryId: number, productIds: number[]): Promise<{ data: null }> => {
  const response = await customFetch(`/${API_END_POINT.HIDE_PRODUCTS(bakeryId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hidden: true, productIds }),
  });

  if (!response?.ok) throw new Error('Failed to change operating Status');

  return response.json();
};

export const reorderProducts = async (bakeryId: number, productOrders: ProductOrder[]): Promise<{ data: null }> => {
  const response = await customFetch(`/${API_END_POINT.REORDER_PRODUCTS(bakeryId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productOrders }),
  });

  if (!response?.ok) throw new Error('Failed to change operating Status');

  return response.json();
};

export const getBakeryProduct = async (bakeryId: number, productId: number): Promise<{ data: Product }> => {
  const response = await fetch(`/${API_END_POINT.BAKERY_PRODUCT(bakeryId, productId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to fetch bakery products');

  return response.json();
};

export const useBakeryProduct = (bakeryId: number, productId: number) =>
  useQuery({
    queryKey: [...BAKERY_QUERY_KEY.BAKERY_PRODUCT(bakeryId, productId)],
    queryFn: () => getBakeryProduct(bakeryId, productId),
    select: (data: { data: Product }) => data?.data,
  });

export const createProduct = async (
  bakeryId: number,
  productForm: ProductForm,
): Promise<{ data: { productId: number } }> => {
  const formData = new FormData();
  formData.append('productImage', productForm.productImage as File);
  formData.append(
    'data',
    JSON.stringify({
      productType: productForm.productType,
      breadCategoryIds: productForm.breadCategoryIds,
      name: productForm.name,
      price: productForm.price,
      description: productForm.description,
      releaseTimes: productForm.releaseTimes,
    }),
  );
  const response = await fetch(`/${API_END_POINT.CREATE_PRODUCT(bakeryId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  if (!response?.ok) throw new Error('Failed to create product');

  return response.json();
};

export const editProduct = async (
  bakeryId: number,
  productId: number,
  productForm: ProductForm,
): Promise<{ data: Product }> => {
  const formData = new FormData();
  formData.append('productImage', productForm.productImage as File);
  formData.append(
    'data',
    JSON.stringify({
      productType: productForm.productType,
      breadCategoryIds: productForm.breadCategoryIds,
      name: productForm.name,
      price: productForm.price,
      description: productForm.description,
      releaseTimes: productForm.releaseTimes,
    }),
  );
  const response = await fetch(`/${API_END_POINT.EDIT_PRODUCT(bakeryId, productId)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  if (!response?.ok) throw new Error('Failed to edit product');

  return response.json();
};

export const getFavoriteBakeryList = async ({
  pageParam = 0,
  size = 10,
  sort = 'popular',
  latitude = 10,
  longitude = 10,
}: {
  pageParam: number;
  size: number;
  sort: FilterKey;
  latitude?: number;
  longitude?: number;
}): Promise<{ data: FavoriteBakeryList }> => {
  const response = await customFetch(
    `/${API_END_POINT.FAVORITE_BAKERIES(pageParam, size, sort, latitude, longitude)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response?.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useFavoriteBakeryList = ({
  size = 10,
  latitude = 10,
  longitude = 10,
  sort = 'popular',
}: {
  page?: number;
  size?: number;
  sort: FilterKey;
  latitude?: number;
  longitude?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [...BAKERY_QUERY_KEY.FAVORITE_BAKERIES(sort)],
    queryFn: ({ pageParam = 0 }) => getFavoriteBakeryList({ pageParam, size, sort, latitude, longitude }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};

export const addFavoriteBakery = async (bakeryId: number): Promise<{ data: null }> => {
  const response = await customFetch(`/${API_END_POINT.ADD_FAVORITE_BAKERY(bakeryId)}`, {});
  if (!response?.ok) throw new Error('Failed to add favorite product');

  return response.json();
};

export const addBookmarkProduct = async (productId: number): Promise<{ data: { productId: number } }> => {
  const response = await customFetch(`/${API_END_POINT.BOOKMARK_PRODUCT(productId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to add bookmark product');
  return response.json();
};

export const deleteFavoriteBakery = async (bakeryId: number): Promise<{ data: null }> => {
  const response = await customFetch(`/${API_END_POINT.DELETE_FAVORITE_BAKERY(bakeryId)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to delete favorite bakery');

  return response.json();
};
export const removeBookmarkProduct = async (productId: number): Promise<{ data: { productId: number } }> => {
  const response = await customFetch(`/${API_END_POINT.CANCEL_BOOKMARK_PRODUCT(productId)}`, {
    method: 'DELETE',
  });

  if (!response?.ok) throw new Error('Failed to remove favorite product');

  return response.json();
};

export const getFavoriteProductList = async ({
  pageParam = 0,
  size = 10,
  sort = 'popular',
  latitude = 10,
  longitude = 10,
}: {
  pageParam: number;
  size: number;
  sort: FilterKey;
  latitude: number;
  longitude: number;
}): Promise<{ data: FavoriteProductList }> => {
  const response = await customFetch(
    `/${API_END_POINT.FAVORITE_PRODUCTS(pageParam, size, sort, latitude, longitude)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response?.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useFavoriteProductList = ({
  size = 10,
  latitude = 10,
  longitude = 10,
  sort = 'popular',
}: {
  page?: number;
  size?: number;
  sort: FilterKey;
  latitude: number;
  longitude: number;
}) => {
  return useInfiniteQuery({
    queryKey: [...BAKERY_QUERY_KEY.FAVORITE_PRODUCTS(sort)],
    queryFn: ({ pageParam = 0 }) => getFavoriteProductList({ pageParam, size, sort, latitude, longitude }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};

export const addFavoriteProduct = async (productId: number): Promise<{ data: null }> => {
  const response = await customFetch(`/${API_END_POINT.ADD_FAVORITE_PRODUCT(productId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to add favorite bakery');

  return response.json();
};
export const addAlertProduct = async (productId: number): Promise<{ data: { productId: number } }> => {
  const response = await customFetch(`/${API_END_POINT.ALERT_PRODUCT(productId)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response?.ok) throw new Error('Failed to add alert product');

  return response.json();
};

export const deleteAlertProduct = async (productId: number): Promise<{ data: null }> => {
  const response = await customFetch(`/${API_END_POINT.DELETE_FAVORITE_PRODUCT(productId)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to delete favorite product');
  return response.json();
};

export const deleteFavoriteProduct = async (productId: number): Promise<{ data: null }> => {
  const response = await customFetch(`/${API_END_POINT.DELETE_FAVORITE_PRODUCT(productId)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to delete favorite bakery');

  return response.json();
};

export const setAlertProduct = async (productId: number): Promise<{ data: { active: boolean } }> => {
  const response = await customFetch(`/${API_END_POINT.ALERT_PRODUCT(productId)}/toggle`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response?.ok) throw new Error('Failed to set alert product');
  return response.json();
};

export const createReservation = async (reservation: {
  bakeryId: number;
  reservationProducts: {
    productId: number;
    quantity: number;
  }[];
}): Promise<{ data: { reservationId: number; status: string; totalPrice: number; pickupDeadline: string } }> => {
  const response = await customFetch(`/${API_END_POINT.CREATE_RESERVATION()}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reservation),
  });

  if (!response?.ok) throw new Error('Failed to create reservation');

  return response.json();
};

export const addBakeryBookmark = async (bakeryId: number): Promise<{ data: { bakeryId: number } }> => {
  const response = await customFetch(`/${API_END_POINT.BAKERY_BOOKMARK(bakeryId)}`, {
    method: 'POST',
  });

  if (!response?.ok) throw new Error('Failed to add bakery bookmark');

  return response.json();
};

export const removeBakeryBookmark = async (bakeryId: number): Promise<{ data: { bakeryId: number } }> => {
  const response = await customFetch(`/${API_END_POINT.BAKERY_CANCEL_BOOKMARK(bakeryId)}`, {
    method: 'DELETE',
  });

  if (!response?.ok) throw new Error('Failed to remove alert product');

  return response.json();
};

export const getHotProducts = async ({
  pageParam = 0,
  size = 10,
  sort = 'reservation',
}: {
  pageParam: number;
  size: number;
  sort?: HotFilterKey;
}): Promise<{ data: { hotProducts: HotProduct[]; pageInfo: PageInfo } }> => {
  const response = await customFetch(`/${API_END_POINT.HOT_PRODUCTS(pageParam, size, sort)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to fetch hot products');

  return response.json();
};

export const useHotProducts = ({
  size = 10,
  sort = 'reservation',
}: {
  page?: number;
  size?: number;
  sort?: HotFilterKey;
}) => {
  return useInfiniteQuery({
    queryKey: [...BAKERY_QUERY_KEY.HOT_PRODUCTS(sort)],
    queryFn: ({ pageParam = 0 }) => getHotProducts({ pageParam, size, sort }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};

export const getHotBakeries = async ({
  pageParam = 0,
  size = 10,
  sort = 'reservation',
  latitude = 10,
  longitude = 10,
}: {
  pageParam: number;
  size: number;
  sort?: HotFilterKey;
  latitude?: number;
  longitude?: number;
}): Promise<{ data: { hotBakeries: HotBakery[]; pageInfo: PageInfo } }> => {
  const response = await customFetch(`/${API_END_POINT.HOT_BAKERIES(pageParam, size, sort, latitude, longitude)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to fetch hot bakeries');

  return response.json();
};

export const useHotBakeries = ({
  size = 10,
  sort = 'reservation',
}: {
  page?: number;
  size?: number;
  sort?: HotFilterKey;
}) => {
  return useInfiniteQuery({
    queryKey: [...BAKERY_QUERY_KEY.HOT_BAKERIES(sort)],
    queryFn: ({ pageParam = 0 }) => getHotBakeries({ pageParam, size, sort }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};

export const getSearchAutoCompletes = async (
  searchTerm: string,
): Promise<{ data: { searchAutoCompletes: SearchAutoComplete[] } }> => {
  const response = await customFetch(`/${API_END_POINT.SEARCH_AUTOCOMPLETE(searchTerm)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to fetch autocompletes');

  return response.json();
};

export const useSearchAutoCompletes = (searchTerm: string) =>
  useQuery({
    queryKey: [...SEARCH_QUERY_KEY.AUTOCOMPLETE(searchTerm)],
    queryFn: () => getSearchAutoCompletes(searchTerm),
    select: (data: { data: { searchAutoCompletes: SearchAutoComplete[] } }) => data.data.searchAutoCompletes,
  });

export const getSearchBakeries = async ({
  pageParam = 0,
  size = 10,
  sort = 'latest',
  latitude = 10,
  longitude = 10,
  keyword,
}: {
  pageParam: number;
  size: number;
  sort?: FilterKey;
  latitude?: number;
  longitude?: number;
  keyword: string;
}): Promise<{ data: { searchBakeries: SearchBakery[]; pageInfo: PageInfo } }> => {
  const response = await customFetch(
    `/${API_END_POINT.SEARCH_BAKERIES(pageParam, size, sort, keyword, latitude, longitude)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response?.ok) throw new Error('Failed to fetch bakeries');

  return response.json();
};

export const useSearchBakeries = ({
  size = 10,
  sort = 'latest',
  keyword,
  latitude = 10,
  longitude = 10,
}: {
  page?: number;
  size?: number;
  sort?: FilterKey;
  keyword: string;
  latitude?: number;
  longitude?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [...SEARCH_QUERY_KEY.BAKERIES(keyword, sort)],
    queryFn: ({ pageParam = 0 }) => getSearchBakeries({ pageParam, size, keyword, sort, latitude, longitude }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};
export const getSearchProducts = async ({
  pageParam = 0,
  size = 10,
  sort = 'latest',
  latitude = 10,
  longitude = 10,
  keyword,
}: {
  pageParam: number;
  size: number;
  sort?: FilterKey;
  latitude?: number;
  longitude?: number;
  keyword: string;
}): Promise<{ data: { searchProducts: SearchProduct[]; pageInfo: PageInfo } }> => {
  const response = await customFetch(
    `/${API_END_POINT.SEARCH_PRODUCTS(pageParam, size, sort, keyword, latitude, longitude)}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    },
  );

  if (!response?.ok) throw new Error('Failed to fetch products');

  return response.json();
};

export const useSearchProducts = ({
  size = 10,
  sort = 'latest',
  keyword,
  latitude = 10,
  longitude = 10,
}: {
  page?: number;
  size?: number;
  sort?: FilterKey;
  keyword: string;
  latitude?: number;
  longitude?: number;
}) => {
  return useInfiniteQuery({
    queryKey: [...SEARCH_QUERY_KEY.PRODUCTS(keyword, sort)],
    queryFn: ({ pageParam = 0 }) => getSearchProducts({ pageParam, size, keyword, sort, latitude, longitude }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};

export const getReservation = async (reservationId: number): Promise<{ data: IReservationInfo }> => {
  try {
    const response = await customFetch(`/${API_END_POINT.RESERVATION(reservationId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response?.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

//* 추후 해당 로직 이동
export const logout = async (): Promise<{ data: null }> => {
  const response = (await customFetch(`/${API_END_POINT.AUTH.LOGOUT}}`, {
    method: 'POST',
  })) as Response;
  if (!response.ok) {
    throw new Error('Failed to logut');
  }
  return response.json();
};
