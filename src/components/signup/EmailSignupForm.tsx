'use client';

import VerificationInput from '@/components/common/Input/VerificationInput';
import Button from '@/components/button/Button';

interface Props {
  email: string;
  setEmail: (value: string) => void;
  onNext: () => void;
}

export default function EmailSignupForm({ email, setEmail, onNext }: Props) {
  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-5 pt-6 flex-grow">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">이메일을 입력해주세요</h1>

        <label className="mt-5 mb-3 text-sm font-medium text-gray-700 block">이메일</label>

        <VerificationInput placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="w-full z-10 px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button
          fullWidth
          variant="primary"
          className="h-[52px] text-[15px] font-semibold"
          disabled={!email}
          onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
