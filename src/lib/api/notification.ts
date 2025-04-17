import { API_END_POINT } from '@/constants/api';
import { NOTIFICATION_QUERY_KEY } from '@/constants/queryKey';
import { DoNotDisturb } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';

export const getDoNotDisturbSetting = async (): Promise<{ data: DoNotDisturb }> => {
  const response = await fetch(`/${API_END_POINT.DO_NOT_DISTURB_SETTING()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useDoNotDisturbSetting = () =>
  useQuery({
    queryKey: [...NOTIFICATION_QUERY_KEY.DO_NOT_DISTURB()],
    queryFn: () => getDoNotDisturbSetting(),
    select: (data: { data: DoNotDisturb }) => data?.data,
  });
