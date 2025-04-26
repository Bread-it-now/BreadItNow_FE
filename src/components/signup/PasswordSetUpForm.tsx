'use client';

import { useState } from 'react';
import VerificationInput from '@/components/common/Input/VerificationInput';
import Button from '@/components/button/Button';

interface Props {
  password: string;
  setPassword: (value: string) => void;
  onComplete: () => void;
}

export default function PasswordSetupForm({ password, setPassword, onComplete }: Props) {
  const [confirmPassword, setConfirmPassword] = useState('');

  const isLengthValid = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isMatch = password === confirmPassword;

  const isValid = isLengthValid && hasNumber && hasSpecialChar && isMatch;

  return (
    <div className="flex flex-col h-[100%]">
      <div className="px-5 pt-6 flex-grow">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          비밀번호를 <br />
          설정해주세요
        </h1>

        <label className="mt-5 text-sm font-medium text-gray-700 block">비밀번호</label>
        <div className="relative flex-col mt-3 space-y-1">
          <VerificationInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="영문, 숫자, 특수기호 포함 (8글자 이상)"
            type="password"
            showToggle={true}
            className={`${!isLengthValid || !hasNumber || !hasSpecialChar ? 'border-primary' : 'border-gray-300'}`}
          />
          {password.length > 0 && (!isLengthValid || !hasNumber || !hasSpecialChar) ? (
            <p className="text-primary text-xs mt-1">영문, 숫자, 특수기호를 모두 포함하여 입력해주세요. (8글자 이상)</p>
          ) : null}
        </div>

        <label className="mt-4 text-sm font-medium text-gray-700 block">비밀번호 확인</label>
        <div className="relative flex-col mt-3 space-y-1">
          <VerificationInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 확인"
            type="password"
            showToggle={true}
            className={`${!isMatch ? 'border-primary' : 'border-gray-300'}`}
          />
          {!isMatch && confirmPassword.length > 0 ? (
            <p className="text-primary text-xs mt-1">비밀번호가 일치하지 않습니다.</p>
          ) : null}
        </div>
      </div>

      <div className="w-full z-10 px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button
          fullWidth
          variant="primary"
          className="h-[52px] text-[15px] font-semibold"
          disabled={!isValid}
          onClick={onComplete}>
          회원가입
        </Button>
      </div>
    </div>
  );
}
