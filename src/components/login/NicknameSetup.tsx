'use client';

import Button from '@/components/button/Button';
import VerificationInput from '@/components/common/Input/VerificationInput';
import Topbar from '../topbar/Topbar';
import { useEffect, useState } from 'react';
import { chkDuplicateNickname } from '@/lib/api/login';
interface NicknameSetupProps {
  nickname: string;
  setNickname: (nickname: string) => void;
  onNext: () => void;
}

export default function NicknameSetup({ nickname, setNickname, onNext }: NicknameSetupProps) {
  const [isCorrectNickname, setIsCorrectNickname] = useState<boolean>(false);
  const [dupBtnDisabled, setDupBtnDisabled] = useState<boolean>(false);
  const [wornNicknameLabel, setWornNicknameLabel] = useState<string>('');
  const onCheckDuplicate = async () => {
    const response = await chkDuplicateNickname(nickname);
    if (response.status === 200) {
      setIsCorrectNickname(true);
      setWornNicknameLabel('사용 가능한 닉네임입니다.');
    } else {
      setIsCorrectNickname(false);
      setWornNicknameLabel('이미 사용 중인 닉네임입니다.');
    }
  };

  useEffect(() => {
    if (nickname.length > 0) {
      setDupBtnDisabled(false);
    } else {
      setDupBtnDisabled(true);
    }
  }, [nickname]);
  return (
    <div className="flex flex-col h-screen">
      <Topbar hasBackBtn />

      <div className="flex-grow px-5 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          빵잇나우에서 사용할 <br /> 닉네임을 입력해주세요
        </h1>

        <label className="mt-5 mb-3 text-sm font-medium text-gray-700 block">닉네임</label>
        <div className="flex gap-2">
          <div className="flex-grow">
            <VerificationInput value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="닉네임" />
            <div className={`text-sm ${isCorrectNickname ? 'text-secondary' : 'text-red-500'}`}>
              {wornNicknameLabel}
            </div>
          </div>
          <Button className="w-24" disabled={dupBtnDisabled} variant="secondary" onClick={onCheckDuplicate}>
            중복확인
          </Button>
        </div>
      </div>

      <div className="w-full px-5 py-3 bg-white shadow-[...]">
        <Button disabled={!isCorrectNickname} fullWidth variant="primary" onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}
