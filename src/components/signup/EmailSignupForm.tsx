'use client';

import VerificationInput from '@/components/common/Input/VerificationInput';
import Button from '@/components/button/Button';
import { useEffect, useState } from 'react';
import { chkDuplicateEmail } from '@/lib/api/login';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  onNext: () => void;
}

export default function EmailSignupForm({ email, setEmail, onNext }: Props) {
  const [isCorrectEmail, setIsCorrectEmail] = useState<boolean>(false);
  const [dupBtnDisabled, setDupBtnDisabled] = useState<boolean>(false);
  const [wornEmailLabel, setWornEmailLabel] = useState<string>('');
  const onCheckDuplicate = async () => {
    const response = await chkDuplicateEmail(email);
    if (response.status === 'SUCCESS') {
      setIsCorrectEmail(true);
      setWornEmailLabel('사용 가능한 이메일입니다.');
    } else {
      setIsCorrectEmail(false);
      setWornEmailLabel('이미 사용 중인 이메일입니다.');
    }
  };

  useEffect(() => {
    if (email.length > 0) {
      setDupBtnDisabled(false);
    } else {
      setDupBtnDisabled(true);
    }
  }, [email]);
  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-5 pt-6 flex-grow">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">이메일을 입력해주세요</h1>

        <label className="mt-5 mb-3 text-sm font-medium text-gray-700 block">이메일</label>

        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <VerificationInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className={`text-sm ${isCorrectEmail ? 'text-secondary' : 'text-error'}`}>{wornEmailLabel}</div>
          </div>
          <Button disabled={dupBtnDisabled} onClick={onCheckDuplicate}>
            중복확인
          </Button>
        </div>
      </div>

      <div className="w-full z-10 px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button
          fullWidth
          variant="primary"
          className="h-[52px] text-[15px] font-semibold"
          disabled={!isCorrectEmail || dupBtnDisabled}
          onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
