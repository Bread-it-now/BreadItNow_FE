'use client';

import { useState } from 'react';
import Button from '@/components/button/Button';
import VerificationInput from '@/components/common/Input/VerificationInput';
import Topbar from '@/components/topbar/Topbar';
import ResendButton from '../button/ResendButton';

interface OwnerFirstLoginFlowProps {
  onComplete: () => void;
}

export default function OwnerFirstLoginFlow({ onComplete }: OwnerFirstLoginFlowProps) {
  const [bakeryName, setBakeryName] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessHours, setBusinessHours] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div className="flex flex-col h-full bg-gray50">
      <Topbar hasBackBtn />

      <div className="w-full px-5 pt-6 pb-7 bg-white rounded-bl-2xl rounded-br-2xl mb-3">
        <div className="text-2xl font-bold text-gray-900">
          빵집 정보를 <br /> 입력해주세요.
        </div>
      </div>

      <div className="p-5 space-y-6 bg-white rounded-xl">
        {/* 빵집 기본 정보 */}
        <div>
          <h2 className="text-lg font-semibold text-gray900">빵집 기본 정보</h2>
          <div className="mt-3 space-y-3">
            <div className="mt-6 space-y-2">
              <div className="justify-start text-gray900 text-xs font-medium">빵집 이름</div>
              <VerificationInput
                value={bakeryName}
                onChange={(e) => setBakeryName(e.target.value)}
                placeholder="빵집 이름"
              />
            </div>
            <div className="mt-6 space-y-2">
              <div className="mt-6 justify-start text-gray900 text-xs font-medium">빵집 주소</div>
              <div className="flex gap-2">
                <VerificationInput
                  value={zipcode}
                  onChange={(e) => setZipcode(e.target.value)}
                  placeholder="우편번호"
                  className="flex-grow"
                />
                <ResendButton
                  disabled={!address}
                  //eslint-disable-next-line
                  onClick={() => console.log('우편번호 찾기 클릭')}
                  message="우편번호"
                />
              </div>
            </div>
            <VerificationInput
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="빵집 주소"
              className="flex-grow"
            />
            <VerificationInput
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              placeholder="상세주소"
            />
            <div className="mt-6 space-y-2">
              <div className="mt-6 justify-start text-gray900 text-xs font-medium">빵집 전화번호</div>
              <VerificationInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="빵집 전화번호"
              />
            </div>
            <div className="mt-6 space-y-2">
              <div className="text-gray900 text-xs font-medium">빵집 영업시간</div>

              <div className="relative">
                <textarea
                  value={businessHours}
                  onChange={(e) => setBusinessHours(e.target.value)}
                  maxLength={500}
                  placeholder={`평일 | 오전 07:00 - 오후 10:00
토요일 | 오전 07:00 - 오후 06:00

*정기 휴무 매주 일요일`}
                  className="w-full p-3 pr-10 whitespace-pre-wrap border rounded-md resize-none text-sm text-gray900 placeholder-gray-400 focus:outline-primary h-40"
                />

                <div className="absolute bottom-3 right-3 text-gray400 text-xs">{businessHours.length}/500</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-6 bg-white rounded-xl">
        <h2 className="text-lg font-semibold text-gray-900">추가 정보</h2>
        <div className="mt-3 space-y-3">
          <div className="mt-6 space-y-2">
            <div className="mt-6 justify-start text-gray900 text-xs font-medium">빵집 이미지</div>
            <button className="flex items-center justify-center gap-2 w-full py-3 bg-primaryLight1 font-medium text-red-400 rounded-md">
              <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1.5" y="1" width="18" height="18" rx="9" fill="#FF7651" />
                <path d="M10.5 7V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M7.5 10L13.5 10"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span className="text-sm">빵집 이미지 등록 0/8</span>
            </button>
          </div>
          <p className="text-xs text-gray-500">*3:2 비율로 이미지가 크롭되어 보여집니다.</p>
          <div className="mt-6 space-y-2">
            <div className="text-gray900 text-xs font-medium">빵집 소개글</div>

            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="빵집 소개글"
                maxLength={100}
                className="w-full p-3 pr-10 border rounded-md resize-none text-gray900 text-sm focus:outline-primary placeholder-gray-400 h-40"
              />

              <div className="absolute bottom-3 right-3 text-gray400 text-xs">{description.length}/100</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-5 py-3 bg-white shadow-[0px_-1px_20px_0px_rgba(28,30,32,0.08)]">
        <Button
          onClick={onComplete}
          fullWidth
          variant="primary"
          disabled={!bakeryName || !address || !zipcode || !phoneNumber}>
          완료
        </Button>
      </div>
    </div>
  );
}
