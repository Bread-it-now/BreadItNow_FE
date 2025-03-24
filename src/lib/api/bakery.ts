import { API_END_POINT } from '@/constants/api';
import { BAKERY_QUERY_KEY } from '@/constants/queryKey';
import { Bakery, BakeryProducts, OPERATING_STATUS } from '@/types/bakery';
import { useQuery } from '@tanstack/react-query';

export const getBakeryInfo = async (bakeryId: number): Promise<{ data: Bakery }> => {
  const response = await fetch(`/${API_END_POINT.BAKERY_INFO(bakeryId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch bakeryInfo');

  return response.json();
};

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

  if (!response.ok) throw new Error('Failed to fetch bakery products');

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
  const response = await fetch(`/${API_END_POINT.CHANGE_STOCK_QUANTITY(bakeryId, productId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ stock }),
  });

  if (!response.ok) throw new Error('Failed to fetch bakery products');

  return response.json();
};

export const changeOperatingStatus = async (
  bakeryId: number,
  operatingStatus: keyof typeof OPERATING_STATUS,
): Promise<{ data: { bakeryId: number } }> => {
  const response = await fetch(`/${API_END_POINT.CHANGE_OPERATING_STATUS(bakeryId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ operatingStatus }),
  });

  if (!response.ok) throw new Error('Failed to change operating Status');

  return response.json();
};
