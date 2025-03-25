import { http, HttpResponse } from 'msw';

interface LoginRequestBody {
  email: string;
  password: string;
}

const login = http.post('/api/login', async ({ request }) => {
  const { email, password } = (await request.json()) as LoginRequestBody;

  if (email === 'test@example.com' && password === 'password123') {
    return HttpResponse.json({
      message: 'Login successful',
      token: 'mock-token',
    });
  }

  return new HttpResponse('Invalid credentials', { status: 401 });
});

export default [login];
