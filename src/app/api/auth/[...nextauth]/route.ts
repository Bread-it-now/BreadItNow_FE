import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';
import KakaoProvider from 'next-auth/providers/kakao';
const handler = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.response?.id ? profile.response?.id : profile.id,
          name: profile.response?.name ? profile.response?.name : profile.name,
          email: profile.response?.email ? profile.response?.email : profile.email,
          image: profile.response?.profile_image ? profile.response?.profile_image : profile.image,
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn() {
      try {
        return true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // 에러가 있는 경우 처리
      if (url.includes('error=Callback')) {
        return `${process.env.NEXTAUTH_URL}/login`;
      }
      // 취소된 경우 처리
      if (url.includes('error=AccessDenied')) {
        return `${process.env.NEXTAUTH_URL}/login`;
      }
      // 기본 리다이렉트
      if (url.startsWith(baseUrl)) {
        return `${process.env.NEXTAUTH_URL}/`;
      }
      return baseUrl;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // 에러 페이지를 로그인 페이지로 지정
  },
});

export { handler as GET, handler as POST };
