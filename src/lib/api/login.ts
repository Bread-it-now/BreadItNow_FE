import { API_END_POINT } from '@/constants/api';
import { customFetch } from '../customFetch';
export interface IUser {
  customerId: number;
  email?: string;
  nickname?: string;
  profileImage?: string;
  isSocialLogin: boolean;
  phone?: string;
}
export const login = async (email: string, password: string, role: 'customer' | 'owner') => {
  const response = (await customFetch('/auth-api/api/v1/auth/sign-in', {
    method: 'GET',
    body: JSON.stringify({ email, password, role }),
  })) as Response;
  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
};

export const signUp = async (email: string, password: string, role: 'customer' | 'owner') => {
  const response = (await customFetch('/auth-api/api/v1/auth/sign-up', {
    method: 'POST',
    body: JSON.stringify({ email, password, role }),
  })) as Response;
  return response.json();
};

export const chkDuplicateEmail = async (email: string) => {
  const response = (await customFetch(
    `/customer-api/auth-api/api/v1/email/duplicate-check?email=${encodeURIComponent(email)}`,
    {
      method: 'GET',
    },
  )) as Response;
  if (response.status === 200) {
    return response.json();
  }
  throw new Error('Failed to check duplicate email');
};

export const chkDuplicateNickname = async (nickname: string) => {
  const response = (await customFetch(`/customer-api/api/v1/customer/duplicate-nickname?nickname=${nickname}`, {
    method: 'GET',
  })) as Response;
  return response.json();
};

export const getMyInfo = async (): Promise<{ data: IUser }> => {
  const response = await customFetch(`/${API_END_POINT.MY_INFO()}`, {
    method: 'GET',
  });
  return response.json();
};

export const validatePassword = async (password: string) => {
  const response = await customFetch(`/${API_END_POINT.VALIDATE_PASSWORD()}`, {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
  return response.json();
};

export const updateUserInfo = async (
  user: { nickname: string; phone: string; newPassword: string },
  profileImage?: File,
) => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(user));
  if (profileImage) {
    formData.append('profileImage', profileImage);
  }

  const response = await customFetch(`/${API_END_POINT.UPDATE_USER_INFO()}`, {
    method: 'POST',
    // headers: { 'Content-Type': 'multipart/form-data' }, // 이 줄을 삭제!
    body: formData,
  });
  return response.json();
};
