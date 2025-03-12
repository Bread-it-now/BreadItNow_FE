'use client';
import Image from 'next/image';
import Profile from '@/assets/images/profile.png';
import Button from '@/components/button/Button';
import Input from '@/components/inputs/Input';
import { useState } from 'react';
import PasswordInput from '@/components/inputs/PasswordInput';

interface EditableInputProps {
  title: string;
  value: string;
  buttonText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonMode: boolean;
  onButtonClick: () => void;
}

function EditableInput({ title, value, onChange, buttonMode, onButtonClick, buttonText }: EditableInputProps) {
  return (
    <>
      <div className="text-body-s">{title}</div>
      <div className="mt-2 flex items-center align gap-2">
        <Input
          className="border border-gray-200 bg-gray-white rounded-lg"
          value={value}
          disabled={!buttonMode}
          onChange={onChange}
        />
        <Button className="grow bg-primaryLight" variant="primary" onClick={onButtonClick}>
          <div className="text-primary">{buttonText}</div>
        </Button>
      </div>
    </>
  );
}

export default function Page() {
  const [nickname, setNickname] = useState<string>('');
  const [nicknameButtonMode, setNicknameButtonMode] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberButtonMode, setPhoneNumberButtonMode] = useState<boolean>(false);
  //Validation을 위해 function으로 wrapping
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const onNicknameChange = () => {
    if (nicknameButtonMode === false) {
      setNicknameButtonMode(true);
    }
  };

  const onPhoneNumberChange = () => {
    if (phoneNumberButtonMode === false) {
      setPhoneNumberButtonMode(true);
    }
  };

  return (
    <div className="bg-gray-200 text-black overflow-y-auto flex flex-col gap-[10px]">
      <div className="px-5 pt-6 pb-[30px] bg-white rounded-b-2xl">
        <div className="text-title-content-l">기본 정보</div>
        <div className="mt-6">
          <div className="text-body-s">프로필 사진</div>
          <div className="text-center mt-2">
            <div className="w-20 h-20 bg-gray-50 rounded-full border border-gray-200 mx-auto">
              <Image src={Profile} width={80} height={80} className="mx-auto" alt="프로필" />
            </div>
            <div className="mt-4 mb-5 title-content-xs">빵잇나우에서 사용할 프로필 사진을 등록해주세요.</div>
          </div>
          <div className="flex gap-2 h-9">
            <Button className="!h-full grow" variant="default" onClick={() => {}}>
              <div className="text-body-s">기본 이미지로 변경 </div>
            </Button>
            <Button className="!h-full grow" variant="default" onClick={() => {}}>
              <div className="text-body-s">이미지 변경</div>
            </Button>
          </div>
          <div className="mt-[30px]">
            <EditableInput
              title="닉네임"
              value={nickname}
              buttonText={nicknameButtonMode ? '변경하기' : '중복확인'}
              onChange={onChangeNickname}
              buttonMode={nicknameButtonMode}
              onButtonClick={onNicknameChange}
            />
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-[30px] bg-white rounded-2xl">
        <div className="text-title-content-l">회원 정보</div>
        <div className="mt-6">
          <div className="text-body-s">이메일</div>
          <div className="mt-2 flex items-center align gap-2">
            <Input
              className="border w-full border-gray-200 rounded-lg"
              value={nickname}
              disabled
              onChange={onChangeNickname}
            />
          </div>
          <div className="mt-[30px]">
            <EditableInput
              title="휴대폰 번호"
              value={phoneNumber}
              buttonText={phoneNumberButtonMode ? '변경하기' : '인증하기'}
              onChange={onChangePhoneNumber}
              buttonMode={phoneNumberButtonMode}
              onButtonClick={onPhoneNumberChange}
            />
          </div>
          <div className="mt-[30px]">
            <div className="text-body-s">비밀번호</div>
            <Button className="mt-2 grow w-full bg-primaryLight" variant="primary" onClick={() => {}}>
              <div className="text-primary">비밀번호 변경하기</div>
            </Button>
            <PasswordInput
              className="border border-gray-200  rounded-lg mt-2"
              value={nickname}
              onChange={onChangeNickname}
              placeholder="영문, 숫자, 특수기호 모두 포함 (8글자 이상)"
            />
            <PasswordInput
              className="border border-gray-200 rounded-lg mt-2"
              value={nickname}
              onChange={onChangeNickname}
              placeholder="새 비밀번호 확인"
            />
          </div>
        </div>
      </div>
      <div className="flex px-5 h-[19px] justify-center items-center font-medium text-[13px] mb-[50px]">
        <div className="text-gray-500">로그아웃</div>
        <div className="mx-4 w-[3px] h-[3px] bg-gray-300 rounded-full"></div>
        <div className="text-primary !bg-none !h-full">회원탈퇴</div>
      </div>
    </div>
  );
}
