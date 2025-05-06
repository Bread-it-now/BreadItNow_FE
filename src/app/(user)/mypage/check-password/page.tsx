'use client';
import Image from 'next/image';
import lock from '@/assets/images/lock.png';
import CloseIcon from '@/components/common/Icons/CloseIcon';
import PasswordInput from '@/components/common/Input/PasswordInput';
import Button from '@/components/button/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import KakaoIcon from '@/assets/images/kakao.png';
import NaverIcon from '@/assets/images/naver.png';
// import GoogleIcon from '@/assets/icons/google.svg';
function Page() {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className="bg-white h-screen px-5 w-full text-black flex flex-col">
      <div className="grow">
        <div className="flex py-[13px] text-left gap-5">
          <div className="text-title-content-l grow">비밀번호 확인</div>
          <button className="w-6 h-6" onClick={() => router.push(ROUTES.MYPAGE.HOME)}>
            <CloseIcon />
          </button>
        </div>
        <div className="text-center mt-6 pb-5">
          <Image className="mx-auto" src={lock} width={70} height={70} alt="잠금 아이콘" />
          <div className="mt-6">
            <div className="text-title-detailpage">비밀번호를 입력해주세요</div>
            <div className="text-sm text-gray-500 mt-2">개인정보 보호를 위해 비밀번호 확인이 필요합니다.</div>
          </div>
        </div>
        <PasswordInput
          className="mt-[30px] border rounded-lg"
          onChange={onChangePassword}
          value={password}
          placeholder="비밀번호"
        />
        <Button
          fullWidth
          onClick={() => router.push(ROUTES.MYPAGE.PROFILE_SETTING)}
          className="mt-[30px]"
          variant="primary">
          <div>다음</div>
        </Button>
      </div>

      <div className="mb-[50px]">
        <div className="flex justify-center items-center">
          <div
            className="
              text-[13px] 
              text-gray-500 
              relative 
              flex 
              items-center 
              justify-center
              w-full
              before:absolute 
              before:content-[''] 
              before:h-[1px] 
              before:w-[calc(50%-80px)]
              before:left-0
              before:bg-gray-200
              after:absolute 
              after:content-[''] 
              after:h-[1px] 
              after:w-[calc(50%-80px)]
              after:right-0
              after:bg-gray-200
            ">
            소셜 로그인 회원의 경우
          </div>
        </div>
        <Button
          fullWidth
          onClick={() =>
            window.open(
              'https://accounts.kakao.com/weblogin/find_password?continue=%2Flogin%3Fcontinue%3Dhttps%253A%252F%252Faccounts.kakao.com%252Fweblogin%252Faccount&lang=ko&showHeader=false',
            )
          }
          className="mt-[30px]"
          variant="default">
          <div className="flex items-center gap-2">
            <Image src={KakaoIcon} width={20} height={20} alt="카카오" />
            카카오로 확인하기
          </div>
        </Button>
        <Button
          fullWidth
          onClick={() => window.open('https://nid.naver.com/user2/help/pwInquiry.nhn?menu=pwinquiry', '_blank')}
          className="mt-[30px]"
          variant="default">
          <div className="flex items-center gap-2">
            <Image src={NaverIcon} width={20} height={20} alt="네이버" />
            네이버로 확인하기
          </div>
        </Button>
        {/* <Button fullWidth onClick={() => {}} className="mt-[30px]" variant="default">
          <div className="flex items-center gap-2">
            <Image src={GoogleIcon} width={20} height={20} alt="구글" />
            구글로 확인하기
          </div>
        </Button> */}
      </div>
    </div>
  );
}

export default Page;
