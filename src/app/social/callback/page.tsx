'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

export default function SocialCallbackPage() {
  // const router = useRouter();

  const handleTokenRefresh = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth-api/api/v1/token/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('토큰 갱신 실패');
      return response;
    } catch (error) {
      throw error;
    }
  };
  handleTokenRefresh();
  return <div>SocialCallbackPage</div>;
}
