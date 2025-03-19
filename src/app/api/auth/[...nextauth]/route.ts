import NextAuth from 'next-auth';
import NaverProvider from 'next-auth/providers/naver';

const handler = NextAuth({
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
    async jwt({ token, user }) {
      // 네이버 로그인 시 받아오는 정보를 토큰에 저장
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          name: token.name as string,
          email: token.email as string,
          image: token.image as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // 에러 페이지를 로그인 페이지로 지정
  },
});

export { handler as GET, handler as POST };
