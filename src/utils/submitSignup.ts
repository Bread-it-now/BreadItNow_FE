'use client';

import { API_END_POINT } from '@/constants/api';
import { customFetch } from '@/lib/customFetch';
interface SubmitSignupParams {
  email: string;
  password: string;
  role: 'CUSTOMER' | 'OWNER';
  onSuccess: () => void;
  onFail?: (message: string) => void;
}

export const submitSignup = async ({ email, password, role, onSuccess, onFail }: SubmitSignupParams) => {
  try {
    const res = await customFetch(`/${API_END_POINT.AUTH.SIGN_UP}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    if (!res) {
      onFail?.('회원가입 중 오류가 발생했습니다.');
      return;
    }
    const result = await res.json();

    if (!res.ok || result.status !== 'SUCCESS') {
      onFail?.(result.status || '회원가입 실패. 다시 시도해주세요.');
      return;
    }

    onSuccess();
  } catch {
    onFail?.('회원가입 중 오류가 발생했습니다.');
  }
};
