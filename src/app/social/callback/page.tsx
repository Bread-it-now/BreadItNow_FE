'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
// import { ROUTES } from '@/constants/routes';
export default function SocialCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleTokenRefresh = async () => {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth-api/api/v1/token/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });
      const accessToken = result.headers.get('Authorization');
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    handleTokenRefresh();
    // if (searchParams.get('isNewUser') === 'true') {
    //   router.push(ROUTES.AUTH.LOGIN + '?isNewUser=true');
    // } else {
    //   handleTokenRefresh().then(() => router.push('/'));
    // }
    // handleTokenRefresh().then(() => router.push('/'));
  }, [searchParams, router]);
  return <div></div>;
}
