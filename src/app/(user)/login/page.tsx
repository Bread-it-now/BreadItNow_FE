'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Topbar from '@/components/topbar/Topbar';
import VerificationInput from '@/components/common/Input/VerificationInput';
import HotBreadTab from '@/components/common/tabs/HotBreadTab';
import Button from '@/components/button/Button';
import kakaoIcon from '@/assets/icons/kakao.svg';
import naverIcon from '@/assets/icons/naver.svg';
import googleIcon from '@/assets/icons/google.svg';
import Alert from '@/components/common/Alert';
import FirstLoginFlow from '@/components/login/FirstLoginFlow';
import OwnerFirstLoginFlow from '@/components/login/OwnerFirstLoginFlow';
import { API_END_POINT } from '@/constants/api';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'personal' | 'bakery'>('bakery');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertSubtitle, setAlertSubtitle] = useState('');

  //TODO: 추후 로그인 API 연동하고 가져오기
  const handleLogin = async () => {
    try {
      const res = await fetch(`/${API_END_POINT.AUTH.SIGN_IN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        setAlertTitle('로그인 실패했습니다.');
        setAlertSubtitle('아이디 또는 비밀번호를 확인해주세요.');
        setShowAlert(true);
        return;
      }

      const data = await res.json();

      if (data.data?.isNewUser) {
        setIsFirstLogin(true);
      } else {
        setIsFirstLogin(false);
        setAlertTitle('로그인에 성공했습니다!');
        setAlertSubtitle('메인 화면으로 이동합니다.');
        setShowAlert(true);

        setTimeout(() => {
          router.push('/');
        }, 1500);
      }
    } catch {
      setAlertTitle('오류 발생');
      setAlertSubtitle('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
      setShowAlert(true);
    }
  };

  const handleSignIn = async (provider: string) => {
    try {
      signIn(provider, {
        callbackUrl: '/',
        redirect: true,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // console.error('Login error:', error)
    }
  };

  if (isFirstLogin) {
    return activeTab === 'personal' ? (
      <FirstLoginFlow onComplete={() => router.push('/')} />
    ) : (
      <OwnerFirstLoginFlow onComplete={() => router.push('/')} />
    );
  }

  return (
    <div className="flex flex-col max-h-[100%] bg-white">
      <Topbar
        classname="whitespace-nowrap"
        hasBackBtn
        rightItems={
          <Link href="/signup" className="text-primary font-semibold">
            회원가입
          </Link>
        }
      />

      <div className="px-5 py-4 text-xl font-bold text-gray900">
        빵잇나우와 함께 <br />갓 구운 빵을 지금 바로!
      </div>

      <HotBreadTab
        tabs={[
          { key: 'personal', label: '개인회원' },
          { key: 'bakery', label: '빵집회원' },
        ]}
        activeTab={activeTab}
        setActiveTab={(key) => setActiveTab(key as 'personal' | 'bakery')}
      />

      <div className="flex flex-col px-5 gap-4 mt-4">
        <VerificationInput
          value={email}
          maxLength={13}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디"
        />

        <div className="relative w-full">
          <VerificationInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="영문, 숫자, 특수기호 포함 (8글자 이상)"
            type="password"
            showToggle={true}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoLogin(!isAutoLogin)}
            className={`w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md ${
              isAutoLogin ? 'bg-primary text-white' : 'bg-white'
            }`}>
            {isAutoLogin && <span className="text-white font-bold">✔</span>}
          </button>
          <span className="text-sm text-gray-900">자동로그인</span>
        </div>

        <Button onClick={handleLogin} fullWidth variant="primary">
          로그인
        </Button>
      </div>

      {activeTab === 'personal' && (
        <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <div className="flex items-center w-full my-3 px-5">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-500">또는</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="flex gap-4">
            <button className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center">
              <Image src={kakaoIcon} width={24} height={24} alt="카카오 로그인" />
            </button>
            <button
              onClick={() => handleSignIn('naver')}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <Image src={naverIcon} width={24} height={24} alt="네이버 로그인" />
            </button>
            <button className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center">
              <Image src={googleIcon} width={24} height={24} alt="구글 로그인" />
            </button>
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Alert title={alertTitle} subtitle={alertSubtitle} buttonLabel="확인" onClose={() => setShowAlert(false)} />
        </div>
      )}
    </div>
  );
}
