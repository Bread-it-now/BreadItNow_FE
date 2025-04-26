import { customFetch } from '../customFetch';

export const login = async (email: string, password: string, role: 'customer' | 'owner'): Promise<Response> => {
  const response = (await customFetch('/auth-api/api/v1/auth/sign-in', {
    method: 'GET',
    body: JSON.stringify({ email, password, role }),
  })) as Response;
  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
};

export const authCheck = async (): Promise<Response> => {
  const response = (await customFetch('/customer-api/api/v1/alert/product?page=0&size=10', {
    method: 'GET',
  })) as Response;
  return response.json();
};
