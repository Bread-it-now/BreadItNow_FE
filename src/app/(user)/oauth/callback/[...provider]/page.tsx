'use client';
import { useEffect } from 'react';

export default function OAuthCallbackPage() {
  // const router = useRouter();
  const handleTokenRefresh = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth-api/api/v1/token/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
        },
      });
      if (!response.ok) throw new Error('토큰 갱신 실패');
      return response;
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    handleTokenRefresh();
  }, []);

  return <div>OAuthCallbackPage</div>;
}
