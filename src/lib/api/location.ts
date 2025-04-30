import { API_END_POINT } from '@/constants/api';
import { SidoRegion } from '@/types/location';
import { customFetch } from '../customFetch';
import { useQuery } from '@tanstack/react-query';
import { REGION_QUERY_KEY } from '@/constants/queryKey';

export const getSidoRegions = async (): Promise<{ data: SidoRegion[] }> => {
  const response = await customFetch(`/${API_END_POINT.SIDO_REGIONS()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to sido Regions');

  return response.json();
};

export const useSidoRegions = () =>
  useQuery({
    queryKey: [...REGION_QUERY_KEY.SIDO_REGIONS()],
    queryFn: () => getSidoRegions(),
    select: (data: { data: SidoRegion[] }) => data.data,
  });
