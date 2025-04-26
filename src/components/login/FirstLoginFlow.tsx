'use client';

import { useState } from 'react';
// import PhoneVerification from '@/components/login/PhoneVerification';
// import VerificationCode from '@/components/login/VerificationCode';
import NicknameSetup from '@/components/login/NicknameSetup';
import BreadCategorySelection from '@/components/login/BreadCategorySelection';

interface FirstLoginFlowProps {
  onComplete: () => void;
  isSocial?: boolean;
}

export default function FirstLoginFlow({ onComplete }: FirstLoginFlowProps) {
  const [signupStep, setSignupStep] = useState(1);
  const [nickname, setNickname] = useState('');

  return (
    <div className="flex flex-col h-[100%] max-h-[100%] bg-white">
      {signupStep === 1 && (
        <NicknameSetup nickname={nickname} setNickname={setNickname} onNext={() => setSignupStep(2)} />
      )}
      {signupStep === 2 && <BreadCategorySelection nickname={nickname} onComplete={onComplete} />}
    </div>
  );
}
