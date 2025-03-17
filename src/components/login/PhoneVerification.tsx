'use client';

import { useState } from 'react';
import Button from '@/components/button/Button';
import VerificationInput from '@/components/common/Input/VerificationInput';
import Topbar from '../topbar/Topbar';

export default function PhoneVerification({ onNext }: { onNext: () => void }) {
  const [phone, setPhone] = useState('');

  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, '');

    if (numericValue.length <= 3) {
      return numericValue;
    } else if (numericValue.length <= 7) {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3)}`;
    } else {
      return `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhoneNumber(e.target.value));
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar hasBackBtn />

      <div className="flex-grow px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          본인인증을 위해 <br /> 휴대폰 번호를 입력해주세요
        </h1>

        <label className="mt-5 mb-3 text-sm font-medium text-gray-700 block">휴대폰 번호</label>
        <VerificationInput value={phone} maxLength={13} onChange={handleChange} placeholder="휴대폰 번호" />
      </div>

      <div className="w-full px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button fullWidth variant="primary" disabled={phone.length < 13} onClick={onNext}>
          인증하기
        </Button>
      </div>
    </div>
  );
}
