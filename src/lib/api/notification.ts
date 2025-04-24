import { API_END_POINT } from '@/constants/api';
import { NOTIFICATION_QUERY_KEY } from '@/constants/queryKey';
import {
  CustomerNotification,
  DoNotDisturb,
  DoNotDisturbForm,
  NotificationSetting,
  NotificationType,
  PageInfo,
} from '@/types/notification';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

export const editDoNotDisturbSetting = async (doNotDisturbForm: DoNotDisturbForm): Promise<{ data: null }> => {
  const response = await fetch(`/${API_END_POINT.EDIT_DO_NOT_DISTURB_SETTING()}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...doNotDisturbForm }),
  });

  if (!response.ok) throw new Error('Failed to edit do not distub setting');

  return response.json();
};

export const getProductNotificationSettings = async ({
  pageParam = 0,
  size = 10,
}: {
  pageParam?: number;
  size?: number;
}): Promise<{ data: { alerts: NotificationSetting[]; pageInfo: PageInfo } }> => {
  const response = await fetch(`/${API_END_POINT.PRODUCT_NOTIFICATION_SETTINGS(pageParam, size)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useProductNotificationSettings = ({ size = 10 }: { page?: number; size?: number }) => {
  return useInfiniteQuery({
    queryKey: [...NOTIFICATION_QUERY_KEY.PRODUCT_NOTIFICATION_SETTINGS(size)],
    queryFn: ({ pageParam = 0 }) => getProductNotificationSettings({ pageParam, size }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};

export const onOffProductNotificaitonSetting = async (productId: number): Promise<{ data: { active: boolean } }> => {
  const response = await fetch(`/${API_END_POINT.ONOFF_PRODUCT_NOTIFICATION_SETTING(productId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useOnOffProductNotificationSetting = ({ size = 10 }: { size?: number }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onOffProductNotificaitonSetting,

    onMutate: async (productId: number) => {
      const queryKey = NOTIFICATION_QUERY_KEY.PRODUCT_NOTIFICATION_SETTINGS(size);
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });

      const prevData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(
        queryKey,
        (prev: { pages: { data: { alerts: NotificationSetting[] } }[] } | undefined) => {
          if (!prev) return prev;

          return {
            ...prev,
            pages: prev.pages.map((page: { data: { alerts: NotificationSetting[] } }) => ({
              ...page,
              data: {
                ...page.data,
                alerts: page.data.alerts.map((alert: NotificationSetting) =>
                  alert.productId === productId ? { ...alert, alertActive: !alert.alertActive } : alert,
                ),
              },
            })),
          };
        },
      );

      return { prevData };
    },

    onError: (err, productId, context) => {
      if (context?.prevData) {
        const queryKey = NOTIFICATION_QUERY_KEY.PRODUCT_NOTIFICATION_SETTINGS(size);
        queryClient.setQueryData(queryKey, context.prevData);
      }
    },
  });
};

export const deleteProductNotificationSetting = async (productId: number): Promise<{ data: null }> => {
  const response = await fetch(`/${API_END_POINT.DELETE_PRODUCT_NOTFICATION_SETTING(productId)}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const getCustomerNotifications = async ({
  pageParam = 0,
  size = 10,
  type,
}: {
  pageParam?: number;
  size?: number;
  type: NotificationType | 'ALL';
}): Promise<{ data: { notifications: CustomerNotification[]; pageInfo: PageInfo } }> => {
  const response = await fetch(`/${API_END_POINT.CUSTOMER_NOTIFICATIONS(pageParam, size, type)}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to fetch');

  return response.json();
};

export const useCustomerNotifications = ({ type, size = 10 }: { type: NotificationType | 'ALL'; size?: number }) => {
  return useInfiniteQuery({
    queryKey: [...NOTIFICATION_QUERY_KEY.CUSTOMER_NOTIFICATIONS(type)],
    queryFn: ({ pageParam = 0 }) => getCustomerNotifications({ pageParam, size, type }),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.pageInfo.isLast) return undefined;
      return lastPage.data.pageInfo.currPage + 1;
    },
    initialPageParam: 0,
  });
};
