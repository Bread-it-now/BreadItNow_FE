import { customFetch } from '../customFetch';

export const postCustomerFcmToken = async (token: string) => {
  const response = await customFetch('/customer-api/api/v1/fcm/update-token', {
    method: 'POST',
    body: JSON.stringify({
      token: token,
    }),
  });
  return response?.json();
};

export const postOwnerFcmToken = async () => {
  const response = await customFetch('/owner-api/api/v1/fcm/update-token', {
    method: 'POST',
  });
  return response?.json();
};

export const postNotification = async (bakeryId: number, productId: number) => {
  const response = await customFetch('/owner-api/api/v1/notification', {
    method: 'POST',
    body: JSON.stringify({ bakeryId, productId }),
  });
  return response?.json();
};
