import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

const handler = NextAuth({
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn() {
      try {
        // 로그인 처리 로직
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // 에러가 있는 경우 처리
      if (url.includes('error=Callback')) {
        return `${baseUrl}/login`;
      }
      // 취소된 경우 처리
      if (url.includes('error=AccessDenied')) {
        return `${baseUrl}/login`;
      }
      // 기본 리다이렉트
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // 에러 페이지를 로그인 페이지로 지정
  },
});

export { handler as GET, handler as POST };
