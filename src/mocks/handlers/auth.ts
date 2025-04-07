import { http, HttpResponse } from 'msw';
import { API_END_POINT } from '@/constants/api';

interface LoginRequestBody {
  email: string;
  password: string;
  role?: string;
}

interface InitCustomerRequestBody {
  nickname: string;
  breadCategoryList: string[];
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

  return HttpResponse.json(
    {
      status: 'FAIL',
      message: 'Invalid credentials',
    },
    { status: 401 },
  );
});

const signup = http.post(`/${API_END_POINT.AUTH.SIGN_UP}`, async ({ request }) => {
  const { email, password, role } = (await request.json()) as LoginRequestBody;

  if (!email || !password || !role) {
    return HttpResponse.json(
      {
        status: 'FAIL',
        message: 'Missing required fields',
      },
      { status: 400 },
    );
  }

  return HttpResponse.json({
    status: 'SUCCESS',
    data: {
      userId: 12345,
    },
  });
});

const initCustomer = http.post('/customer-api/api/v1/customer/me/init', async ({ request }) => {
  const { nickname, breadCategoryList } = (await request.json()) as InitCustomerRequestBody;

  if (!nickname || !Array.isArray(breadCategoryList)) {
    return HttpResponse.json(
      {
        status: 'FAIL',
        message: 'Invalid nickname or breadCategoryList',
      },
      { status: 400 },
    );
  }

  return HttpResponse.json({
    status: 'SUCCESS',
    data: {
      nickname,
      breadCategoryList,
    },
  });
});

export default [login, signup, initCustomer];
