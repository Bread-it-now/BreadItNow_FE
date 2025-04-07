import { http, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';

interface LoginRequestBody {
  email: string;
  password: string;
  role?: string;
}

const login = http.post(`/${API_END_POINT.AUTH.SIGN_IN}`, async ({ request }) => {
  const { email, password } = (await request.json()) as LoginRequestBody;

  if (email === 'test@example' && password === 'password123') {
    return HttpResponse.json({
      status: 'SUCCESS',
      message: '로그인 성공',
      data: {
        accessToken: 'mocked-access-token',
        userId: 1,
        isNewUser: true,
        role: 'OWNER',
      },
    });
  }

  return new HttpResponse('Invalid credentials', { status: 401 });
});

const signup = http.post(`/${API_END_POINT.AUTH.SIGN_UP}`, async ({ request }) => {
  const { email, password, role } = (await request.json()) as LoginRequestBody;

  if (!email || !password || !role) {
    return new HttpResponse('Missing required fields', { status: 400 });
  }

  return HttpResponse.json({
    status: 'SUCCESS',
    data: {
      userId: 12345,
    },
  });
});

export default [login, signup];
