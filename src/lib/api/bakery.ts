import { API_END_POINT } from '@/constants/api';
import { Bakery, BakeryProducts } from '@/types/bakery';
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
    queryKey: ['bakery', bakeryId],
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
    queryKey: ['bakery', bakeryId, 'products'],
    queryFn: () => getBakeryProducts(bakeryId),
    select: (data: { data: BakeryProducts }) => data?.data,
  });
