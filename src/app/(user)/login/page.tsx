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
import naverIcon from '@/assets/icons/naver-white.svg';
import Alert from '@/components/common/Alert';
import FirstLoginFlow from '@/components/login/FirstLoginFlow';
import OwnerFirstLoginFlow from '@/components/login/OwnerFirstLoginFlow';
import { API_END_POINT } from '@/constants/api';
import { useSearchParams } from 'next/navigation';
import { customFetch } from '@/lib/customFetch';
export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'customer' | 'owner'>('customer');
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFirstLoginPending, setIsFirstLoginPending] = useState(false);
  const [isFirstLoginConfirmed, setIsFirstLoginConfirmed] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const [alertTitle, setAlertTitle] = useState('');

  const [alertSubtitle, setAlertSubtitle] = useState('');

  const handleLogin = async () => {
    try {
      await customFetch(`/${API_END_POINT.AUTH.SIGN_IN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password,
          role: activeTab,
        }),
      });
    } catch {
      setAlertTitle('오류 발생');
      setAlertSubtitle('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
      setShowAlert(true);
    }
  };

  const handleSignIn = async (provider: string) => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/${provider}?redirect_url=${window.location.origin}/social/callback`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      // console.error('Login error:', error)
    }
  };

  if (isFirstLoginConfirmed || searchParams.get('isNewUser') === 'true') {
    return activeTab === 'customer' ? (
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
          { key: 'customer', label: '개인회원' },
          { key: 'owner', label: '빵집회원' },
        ]}
        activeTab={activeTab}
        setActiveTab={(key) => setActiveTab(key as 'customer' | 'owner')}
      />

      <div className="flex flex-col px-5 gap-4 mt-4">
        <VerificationInput
          value={email}
          maxLength={100}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
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

      {activeTab === 'customer' && (
        <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <div className="flex items-center w-full my-3 px-5">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-500">또는</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleSignIn('kakao')}
              className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center">
              <Image src={kakaoIcon} width={24} height={24} alt="카카오 로그인" />
            </button>
            <button
              onClick={() => handleSignIn('naver')}
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
              <Image src={naverIcon} width={24} height={24} alt="네이버 로그인" />
            </button>
            {/* <button className="w-14 h-14 border border-gray-300 rounded-full flex items-center justify-center">
              <Image src={googleIcon} width={24} height={24} alt="구글 로그인" />
            </button> */}
          </div>
        </div>
      )}

      {showAlert && (
        <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <Alert
            title={alertTitle}
            subtitle={alertSubtitle}
            buttonLabel="확인"
            onClose={() => {
              setShowAlert(false);
              if (isFirstLoginPending) {
                setIsFirstLoginConfirmed(true);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
