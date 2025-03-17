'use client';

import { useState } from 'react';
import Button from '@/components/button/Button';
import VerificationInput from '@/components/common/Input/VerificationInput';
import Topbar from '../topbar/Topbar';

interface VerificationCodeProps {
  onNext: () => void;
}

export default function VerificationCode({ onNext }: VerificationCodeProps) {
  const [code, setCode] = useState('');

  return (
    <div className="flex flex-col h-screen">
      <Topbar hasBackBtn />

      <div className="flex-grow px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          문자로 전송된 <br /> 인증번호를 입력해주세요
        </h1>

        <label className="mt-5 mb-3 text-sm font-medium text-gray-700 block">인증번호</label>
        <VerificationInput value={code} onChange={(e) => setCode(e.target.value)} placeholder="인증번호" />
      </div>
      <div className="w-full px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button fullWidth variant="primary" disabled={!code} onClick={onNext}>
          인증하기
        </Button>
      </div>
    </div>
  );
}
