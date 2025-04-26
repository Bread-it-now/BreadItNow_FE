'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/button/Button';
import ResendButton from '@/components/button/ResendButton';
import VerificationInput from '../common/Input/VerificationInput';

interface EmailVerificationFormProps {
  onVerify: () => void;
}

export default function EmailVerificationForm({ onVerify }: EmailVerificationFormProps) {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);
  const [isResendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      setResendDisabled(false);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(180);
    setResendDisabled(true);
  };

  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-5 pt-6 flex-grow">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          메일로 전송된 <br />
          인증번호를 입력해주세요
        </h1>

        <label className="mt-4 text-sm font-medium text-gray-900 block">인증번호</label>

        <div className="flex items-center gap-3 mt-2">
          <VerificationInput
            placeholder="인증번호"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            timeLeft={timeLeft}
          />

          <ResendButton disabled={isResendDisabled} className="h-12" onClick={handleResend} message="재전송" />
        </div>
      </div>

      <div className="z-10 w-full px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button
          fullWidth
          variant="primary"
          className="h-[52px] text-[15px] font-semibold"
          disabled={!code}
          onClick={onVerify}>
          다음
        </Button>
      </div>
    </div>
  );
}
