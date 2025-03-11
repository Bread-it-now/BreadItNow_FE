'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/button/Button';
import Image from 'next/image';
import successIcon from '@/assets/images/success.png';

export default function SignupComplete() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="flex flex-col items-center justify-start pt-20 px-5">
        <Image src={successIcon} alt="회원가입 완료" width={80} height={80} />

        <h1 className="mt-6 text-2xl font-bold text-gray-900 text-center">회원가입이 완료되었습니다</h1>
        <p className="mt-2 text-sm text-gray-500 text-center">
          갓 구운 빵이 나오는 순간, 바로 알림을 받을 수 있습니다!
        </p>
      </div>

      <div className="w-full px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button
          fullWidth
          variant="primary"
          className="h-[52px] text-[15px] font-semibold"
          onClick={() => router.push('/login')}>
          로그인
        </Button>
      </div>
    </div>
  );
}
