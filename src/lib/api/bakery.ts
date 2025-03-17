import { API_END_POINT } from '@/constants/api';
import { Bakery } from '@/types/bakery';

export const getBakeryInfo = async (bakeryId: number): Promise<{ data: Bakery }> => {
  const response = await fetch(`/${API_END_POINT.BAKERY(bakeryId)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('오류가 발생했습니다');

  return response.json();
};
