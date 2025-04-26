'use client';
import Input from '@/components/common/Input/Input';
import PasswordInput from '@/components/common/Input/PasswordInput';
import Button from '@/components/button/Button';
import { useEffect, useState } from 'react';
import { chkDuplicateEmail, signUp } from '@/lib/api/login';
import { useRouter } from 'next/navigation';
export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [step, setStep] = useState<number>(1);

  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const password_regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const router = useRouter();
  const onClick = async () => {
    if (step === 1) {
      try {
        const response = await chkDuplicateEmail(email);
        if (response.status === 200) {
          setEmailError('');
          setIsEmailValid(true);
          setStep(2);
        } else {
          setIsEmailValid(false);
          setEmailError('이미 사용중인 이메일입니다.');
        }
      } catch {
        setIsEmailValid(false);
        setEmailError('이미 사용중인 이메일입니다.');
        setStep(2);
      }
    } else {
      if (isPasswordValid) {
        try {
          await signUp(email, password, 'owner');
          router.push('/owner/login');
        } catch {
          alert('회원가입에 실패했습니다.');
        }
      }
    }
  };

  useEffect(() => {
    const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    if (email_regex.test(email)) {
      setIsEmailValid(true);
      setEmailError('');
    } else {
      setIsEmailValid(false);
      setEmailError('이메일 형식이 올바르지 않습니다.');
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 0) {
      if (password_regex.test(password)) {
        setIsPasswordValid(true);
        setPasswordError('');
      } else {
        setPasswordError('영문, 숫자, 특수문자를 모두 포함하여 입력해주세요. (8글자 이상)');
        setIsPasswordValid(false);
        return;
      }

      if (password === passwordConfirm) {
        setPasswordError('');
        setIsPasswordValid(true);
      } else {
        setPasswordError('비밀번호가 일치하지 않습니다.');
        setIsPasswordValid(false);
      }
    }
  }, [password, passwordConfirm]);
  return (
    <div className="px-5 mt-6 h-full flex flex-col">
      {step}
      {step === 1 ? (
        <>
          <div className="flex flex-col flex-1">
            <div className="font-bold text-2xl text-gray-900">
              이메일을
              <br />
              입력해주세요
            </div>
            <div className="mt-[30px]">
              <label className="font-medium text-sm block text-gray-900">이메일</label>
              <Input
                className={`border h-[48px] box-border ${!isEmailValid ? 'border-primary' : 'border-gray-200'} bg-gray-white rounded-lg mt-2 w-full`}
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-primary text-xs">{emailError}</span>
            </div>
          </div>
          <div className="p-5 w-full self-end shadow-[0_-1px_20px_rgba(28,30,32,0.08)]">
            <Button disabled={!isEmailValid} onClick={onClick} variant="primary" fullWidth>
              {step === 1 ? '다음' : '완료'}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col flex-1 flex-grow">
            <div className="font-bold text-2xl text-gray-900">
              비밀번호를
              <br />
              설정해주세요
            </div>
            <div className="mt-[30px]">
              <label className="font-medium text-sm block text-gray-900">비밀번호</label>
              <PasswordInput
                className={`border h-[48px] box-border ${password.length > 0 && !isPasswordValid ? '!border-primary' : 'border-gray-200'} bg-gray-white rounded-lg mt-2 w-full`}
                placeholder="비밀번호"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
              <div className="text-primary text-xs min-h-[16px] my-1">{passwordError}</div>
              <PasswordInput
                className={`border h-[48px] box-border ${password.length > 0 && !isPasswordValid ? 'border-primary' : 'border-gray-200'} bg-gray-white rounded-lg mt-2 w-full`}
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordConfirm(e.target.value)}
              />
            </div>
          </div>
          <div className="p-5 w-full self-end shadow-[0_-1px_20px_rgba(28,30,32,0.08)]">
            <Button disabled={!isPasswordValid} onClick={onClick} variant="primary" fullWidth>
              {step === 1 ? '다음' : '완료'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
