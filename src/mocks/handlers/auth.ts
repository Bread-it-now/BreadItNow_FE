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

interface InitOwnerRequestBody {
  bakeryName: string;
  address: string;
  zipcode: string;
  detailAddress: string;
  phoneNumber: string;
  businessHours: string;
  description: string;
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

const initOwner = http.post('/owner-api/api/v1/bakery', async ({ request }) => {
  const body = (await request.json()) as InitOwnerRequestBody;

  const requiredFields = [
    body.bakeryName,
    body.address,
    body.zipcode,
    body.detailAddress,
    body.phoneNumber,
    body.businessHours,
    body.description,
  ];

  const hasEmptyField = requiredFields.some((field) => !field || field.trim() === '');

  if (hasEmptyField) {
    return HttpResponse.json(
      {
        status: 'FAIL',
        message: '모든 필드를 입력해주세요.',
      },
      { status: 400 },
    );
  }

  return HttpResponse.json({
    status: 'SUCCESS',
    message: '빵집 생성 완료',
    data: {
      bakeryId: 999,
      ...body,
    },
  });
});

export default [login, signup, initCustomer, initOwner];
