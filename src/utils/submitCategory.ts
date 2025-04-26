import { API_END_POINT } from '@/constants/api';

interface SubmitCategoryArgs {
  nickname: string;
  categories: string[];
}

export async function submitCategorySetting({ nickname, categories }: SubmitCategoryArgs) {
  try {
    const res = await fetch(`/${API_END_POINT.CUSTOMER_INIT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nickname,
        breadCategoryList: categories,
      }),
    });

    if (!res.ok) {
      return { success: false, message: '초기 설정에 실패했습니다. 다시 시도해주세요.' };
    }

    return { success: true, message: '초기 설정을 완료했습니다.' };
  } catch {
    return { success: false, message: '초기 설정 중 오류가 발생했습니다.' };
  }
}
