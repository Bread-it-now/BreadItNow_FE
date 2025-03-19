import { API_END_POINT } from '@/constants/api';
import { Bakery, Product } from '@/types/bakery';
import { useQuery } from '@tanstack/react-query';

export const getBakeryInfo = async (bakeryId: number): Promise<{ data: Bakery }> => {
  const response = await fetch(`/${API_END_POINT.BAKERY_INFO(bakeryId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('오류가 발생했습니다');

  return response.json();
};

export const useBakeryInfo = (bakeryId: number) =>
  useQuery({
    queryKey: ['bakery'],
    queryFn: () => getBakeryInfo(bakeryId),
    select: (data: { data: Bakery }) => data?.data,
  });

export const getBakeryProoducts = async (
  bakeryId: number,
): Promise<{ data: { totalCount: number; breadProducts: Product[]; otherProducts: Product[] } }> => {
  const response = await fetch(`/${API_END_POINT.BAKERY_PRODUCTS(bakeryId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('오류가 발생했습니다');

  return response.json();
};

export const useBakeryProoducts = (bakeryId: number) => {
  useQuery({
    queryKey: ['bakery', 'products'],
    queryFn: () => getBakeryProoducts(bakeryId),
    select: (data: { data: { totalCount: number; breadProducts: Product[]; otherProducts: Product[] } }) => data?.data,
  });
};
