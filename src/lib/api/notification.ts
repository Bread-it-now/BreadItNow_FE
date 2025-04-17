import { API_END_POINT } from '@/constants/api';
import { NOTIFICATION_QUERY_KEY } from '@/constants/queryKey';
import { DoNotDisturb } from '@/types/notification';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const onOffDoNotDisturbSetting = async (): Promise<{ data: { active: boolean } }> => {
  const response = await fetch(`/${API_END_POINT.DO_NOT_DISTURB_SETTING()}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useOnOffDoNotDisturbSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onOffDoNotDisturbSetting,

    // ✅ 낙관적 업데이트
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [...NOTIFICATION_QUERY_KEY.DO_NOT_DISTURB()] });

      const prevData: { data: DoNotDisturb } | undefined = queryClient.getQueryData([
        ...NOTIFICATION_QUERY_KEY.DO_NOT_DISTURB(),
      ]);

      queryClient.setQueryData([...NOTIFICATION_QUERY_KEY.DO_NOT_DISTURB()], {
        data: { ...prevData?.data, active: !prevData?.data.active },
      });

      return { prevData };
    },

    onError: (err, _, context) => {
      if (context?.prevData) {
        queryClient.setQueryData([...NOTIFICATION_QUERY_KEY.DO_NOT_DISTURB()], context.prevData);
      }
    },
  });
};
