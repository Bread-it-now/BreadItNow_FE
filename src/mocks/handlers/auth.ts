import { http, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';

interface LoginRequestBody {
  email: string;
  password: string;
}

const login = http.post(`/${API_END_POINT.AUTH.SIGN_IN}`, async ({ request }) => {
  const { email, password } = (await request.json()) as LoginRequestBody;

  if (email === 'test@example' && password === 'password123') {
    return HttpResponse.json({
      message: 'Login successful',
      token: 'mock-token',
    });
  }

  return new HttpResponse('Invalid credentials', { status: 401 });
});

export default [login];
