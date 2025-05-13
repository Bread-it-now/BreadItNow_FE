import { API_END_POINT } from '@/constants/api';
import { GuGunRegion, SidoRegion } from '@/types/location';
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

export const getGuGunRegions = async (sidoCode: string): Promise<{ data: GuGunRegion[] }> => {
  const response = await customFetch(`/${API_END_POINT.GUGUN_REGIONS(sidoCode)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to gugun Regions');

  return response.json();
};

export const useGuGunRegions = (sidoCode: string) =>
  useQuery({
    queryKey: [...REGION_QUERY_KEY.GUGUN_REGIONS(sidoCode)],
    queryFn: () => getGuGunRegions(sidoCode),
    select: (data: { data: GuGunRegion[] }) => data.data,
  });

export const updateRegion = async (sidoCode: string, gugunCodes: string[]): Promise<{ data: null }> => {
  const response = await customFetch(`/${API_END_POINT.UPDATE_REGION()}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sidoCode, gugunCodes }),
  });

  if (!response?.ok) throw new Error('Failed to gugun Regions');

  return response.json();
};

export const getLocationRegion = async (
  latitude: number,
  longitude: number,
): Promise<{ data: { sidoName: string; gugunCode: string; gugunName: string } }> => {
  const response = await customFetch(`/${API_END_POINT.LOCATION_REGION(latitude, longitude)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response?.ok) throw new Error('Failed to location Regions');

  return response.json();
};

export const useLocationRegion = (latitude: number, longitude: number) =>
  useQuery({
    queryKey: [...REGION_QUERY_KEY.LOCATION_REGION(latitude, longitude)],
    queryFn: () => getLocationRegion(latitude, longitude),
    select: (data: { data: { sidoName: string; gugunCode: string; gugunName: string } }) => data.data,
  });
