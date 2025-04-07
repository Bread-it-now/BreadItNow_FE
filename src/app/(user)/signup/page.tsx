'use client';

import { useState } from 'react';
import Link from 'next/link';
import Topbar from '@/components/topbar/Topbar';
import PrivacyModal from '@/components/login/PrivacyModal';
import UserTypeSelection from '@/components/signup/UserTypeSelection';
import SignupOptions from '@/components/signup/SignupOptions';
import EmailSignupForm from '@/components/signup/EmailSignupForm';
import PasswordSetupForm from '@/components/signup/PasswordSetUpForm';
import SignupComplete from '@/components/signup/SignupComplete';
import { submitSignup } from '@/utils/submitSignup';

export default function SignupPage() {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [userType, setUserType] = useState<'CUSTOMER' | 'OWNER' | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isSignupComplete, setSignupComplete] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!userType) return;

    submitSignup({
      email,
      password,
      role: userType,
      onSuccess: () => setSignupComplete(true),
      onFail: (message) => alert(message),
    });
  };

  return (
    <div className="flex flex-col h-[100%] bg-white relative">
      <Topbar
        classname="whitespace-nowrap"
        hasBackBtn={!isSignupComplete}
        rightItems={
          !isSignupComplete && (
            <Link href="/login" className="text-primary font-semibold">
              로그인
            </Link>
          )
        }
      />

      {isSignupComplete ? (
        <SignupComplete />
      ) : showPasswordForm ? (
        <PasswordSetupForm password={password} setPassword={setPassword} onComplete={handleSignUp} />
      ) : showEmailForm ? (
        <EmailSignupForm email={email} setEmail={setEmail} onNext={() => setShowPasswordForm(true)} />
      ) : userType ? (
        <SignupOptions onSelectEmail={() => setShowEmailForm(true)} />
      ) : (
        <UserTypeSelection onSelectType={setUserType} />
      )}

      {!isSignupComplete && (
        <div className="absolute bottom-[40px] left-0 w-full px-5 text-center text-xs text-gray500 leading-relaxed">
          회원가입시 빵잇나우의{' '}
          <button onClick={() => setPrivacyModalOpen(true)} className="underline font-medium">
            개인정보처리방침
          </button>{' '}
          및{' '}
          <button onClick={() => setTermsModalOpen(true)} className="underline font-medium">
            이용약관
          </button>
          에 동의하는 것으로 간주합니다.
        </div>
      )}

      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        className="max-w-[340px]"
        onClose={() => setPrivacyModalOpen(false)}
        title="개인정보처리방침">
        <p>개인정보 보호법에 따라 빵잇나우는 회원의 개인정보를 보호합니다...</p>
      </PrivacyModal>

      <PrivacyModal
        isOpen={isTermsModalOpen}
        className="max-w-[340px]"
        onClose={() => setTermsModalOpen(false)}
        title="이용약관">
        <p>본 서비스의 이용약관은 다음과 같습니다...</p>
      </PrivacyModal>
    </div>
  );
}
