export const customFetch = async (url: string, options: RequestInit): Promise<Response | undefined> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  // const cookieStr = document.cookie;
  // const refreshToken = cookieStr
  //   .split('; ')
  //   .find(row => row.startsWith('refreshToken='))
  //   ?.split('=')[1];
  //TODO: 토큰 쿠키로 변경
  const defaultHeaders: HeadersInit = {
    Accept: 'application/json',
    credentials: 'include',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  const mergedHeaders = {
    ...defaultHeaders,
    ...options.headers,
  };

  const handleTokenRefresh = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth-api/api/v1/token/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: defaultHeaders,
      });
      if (!response.ok) throw new Error('토큰 갱신 실패');
      return response;
    } catch (error) {
      throw error;
    }
  };

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      credentials: 'include',
      headers: mergedHeaders,
    });

    // 401 또는 403 에러 발생 시 토큰 재발급 시도
    if (response.status === 401 || response.status === 403) {
      await handleTokenRefresh();

      // 토큰 재발급 후 원래 요청 재시도
      const retryResponse = await fetch(`${baseUrl}${url}`, {
        ...options,
        credentials: 'include',
        headers: mergedHeaders,
      });

      return retryResponse;
    }

    return response;
  } catch (error) {
    throw error;
  }
};
