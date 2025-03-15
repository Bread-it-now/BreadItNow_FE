'use client';

import { useState } from 'react';
import Button from '@/components/button/Button';
import VerificationInput from '@/components/common/Input/VerificationInput';
import Topbar from '../topbar/Topbar';

interface NicknameSetupProps {
  onNext: () => void;
}

export default function NicknameSetup({ onNext }: NicknameSetupProps) {
  const [nickname, setNickname] = useState('');

  return (
    <div className="flex flex-col h-screen">
      <Topbar hasBackBtn />

      <div className="flex-grow px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          빵잇나우에서 사용할 <br /> 닉네임을 입력해주세요
        </h1>

        <label className="mt-5 mb-3 text-sm font-medium text-gray-700 block">닉네임</label>
        <VerificationInput value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
      </div>
      <div className="w-full px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button fullWidth variant="primary" disabled={!nickname} onClick={onNext}>
          인증하기
        </Button>
      </div>
    </div>
  );
}
