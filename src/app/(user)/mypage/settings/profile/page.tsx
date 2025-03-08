'use client';
import Image from 'next/image';
import Profile from '@/assets/images/profile.png';
import Button from '@/components/button/Button';
import Input from '@/components/inputs/Input';
import { useState } from 'react';
export default function Page() {
  const [nickname, setNickname] = useState<string>('');

  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  return (
    <div className="bg-gray-200 text-black overflow-y-auto flex flex-col gap-[10px]">
      <div className="px-5 pt-6 pb-[30px] bg-white rounded-2xl">
        <div className="title-content-l">기본 정보</div>
        <div className="mt-6">
          <div className="body-s">프로필 사진</div>
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full border border-gray-200 mx-auto">
              <Image src={Profile} width={80} height={80} className="mx-auto" alt="프로필" />
            </div>
            <div className="mt-4 mb-5 title-content-xs">빵잇나우에서 사용할 프로필 사진을 등록해주세요.</div>
          </div>
          <div className="flex gap-2">
            <Button className="!h-9 grow" variant="default" onClick={() => {}}>
              <div>기본 이미지로 변경 </div>
            </Button>
            <Button className="!h-9 grow" variant="default" onClick={() => {}}>
              <div>이미지 변경</div>
            </Button>
          </div>
          <div className="mt-[30px]">
            <div>닉네임</div>
            <div className="mt-2 flex items-center align gap-2">
              <Input
                className="border border-gray-200 bg-gray-50 rounded-lg"
                value={nickname}
                onChange={onChangeNickname}
              />
              <Button className="grow bg-primaryLight" variant="primary" onClick={() => {}}>
                <div className="text-primary">이미지 변경</div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6 pb-[30px] bg-white rounded-2xl">
        <div className="title-content-l">회원 정보</div>
        <div className="mt-6">
          <div>이메일</div>
          <div className="mt-2 flex items-center align gap-2"></div>
          <div className="mt-[30px]">
            <div>닉네임</div>
            <div className="mt-2 flex items-center align gap-2">
              <Input
                className="border w-full border-gray-200 bg-gray-50 rounded-lg"
                value={nickname}
                onChange={onChangeNickname}
              />
            </div>
          </div>
          <div className="mt-[30px] flex items-center align gap-2">
            <Input
              className="border border-gray-200 bg-gray-50 rounded-lg"
              value={nickname}
              onChange={onChangeNickname}
            />
            <Button className="grow bg-primaryLight" variant="primary" onClick={() => {}}>
              <div className="text-primary">변경하기</div>
            </Button>
          </div>
          <div className="mt-[30px]">
            <div>비밀번호</div>
            <Button className="mt-2 grow w-full bg-primaryLight" variant="primary" onClick={() => {}}>
              <div className="text-primary">비밀번호 변경하기</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
