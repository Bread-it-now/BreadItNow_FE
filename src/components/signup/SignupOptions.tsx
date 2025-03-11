import Image from 'next/image';
import googleIcon from '@/assets/icons/google.svg';
import kakaoIcon from '@/assets/icons/kakao.svg';
import naverIcon from '@/assets/icons/naver.svg';

interface SignupOptionsProps {
  onSelectEmail: () => void;
}

export default function SignupOptions({ onSelectEmail }: SignupOptionsProps) {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-bold text-gray-900 leading-snug">
        회원가입하고 신선한 빵을 <br /> 빠르게 만나보세요!
      </h1>
      <p className="mt-2 text-sm text-gray-500">갓 나온 빵, 기다리지 말고 알림으로 먼저 받아보세요!</p>

      <div className="mt-6 flex flex-col gap-4">
        <button className="w-full h-12 bg-primary text-white font-semibold rounded-lg" onClick={onSelectEmail}>
          이메일로 시작하기
        </button>

        <div className="flex items-center my-3">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">또는</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button className="w-full h-12 bg-[#FEE500] text-black font-semibold rounded-lg flex items-center justify-center gap-2">
          <Image src={kakaoIcon} width={20} height={20} alt="카카오 로그인" />
          카카오로 시작하기
        </button>

        <button className="w-full h-12 bg-[#03C75A] text-white font-semibold rounded-lg flex items-center justify-center gap-2">
          <Image src={naverIcon} width={20} height={20} alt="네이버 로그인" />
          네이버로 시작하기
        </button>

        <button className="w-full h-12 border border-gray-300 text-gray-700 font-semibold rounded-lg flex items-center justify-center gap-2">
          <Image src={googleIcon} width={20} height={20} alt="구글 로그인" />
          Google로 시작하기
        </button>
      </div>
    </div>
  );
}
