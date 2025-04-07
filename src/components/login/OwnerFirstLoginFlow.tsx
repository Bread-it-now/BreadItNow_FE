'use client';

import Image from 'next/image';
import Button from '@/components/button/Button';
import VerificationInput from '@/components/common/Input/VerificationInput';
import Topbar from '@/components/topbar/Topbar';
import ResendButton from '../button/ResendButton';
import DaumPostcode from 'react-daum-postcode';
import { useRef, useState } from 'react';
import CloseIcon from '@/components/common/Icons/CloseIcon';

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
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files).slice(0, 8 - images.length);
    setImages((prev) => [...prev, ...newFiles]);
  };

  const handleImageDelete = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  type PostcodeData = {
    address: string;
    addressType: 'R' | 'J';
    bname: string;
    buildingName: string;
    zonecode: string;
  };

  const handleComplete = (data: PostcodeData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setZipcode(data.zonecode);
    setAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray50">
      <Topbar hasBackBtn />

      <div className="w-full px-5 pt-6 pb-7 bg-white rounded-bl-2xl rounded-br-2xl mb-3">
        <div className="text-2xl font-bold text-gray-900">
          빵집 정보를 <br /> 입력해주세요.
        </div>
      </div>

      <div className="p-5 space-y-6 bg-white rounded-xl">
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
                <ResendButton onClick={() => setIsPostcodeOpen(true)} message="우편번호" />
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
            <div className="justify-start text-gray900 text-xs font-medium">빵집 이미지</div>

            <div className={`flex overflow-x-auto gap-3 no-scrollbar ${images.length === 1 ? 'justify-center' : ''}`}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[180px] h-[120px] min-w-[180px] rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt="bakery"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <button
                    onClick={() => handleImageDelete(index)}
                    className="absolute top-1.5 right-1.5 bg-black/60 rounded-full max-w-[20px] max-h-[20px] p-1.5 flex items-center justify-center">
                    <CloseIcon color="#fff" />
                  </button>
                </div>
              ))}
            </div>

            {images.length < 8 && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primaryLight1 font-medium bg-primaryLight text-red-400 rounded-md">
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.5" y="1" width="18" height="18" rx="9" fill="#FF7651" />
                    <path
                      d="M10.5 7V13"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 10L13.5 10"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm">빵집 이미지 등록 {images.length}/8</span>
                </button>

                <input type="file" accept="image/*" multiple hidden ref={fileInputRef} onChange={handleImageUpload} />
              </>
            )}
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
      {isPostcodeOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-[90%] max-w-[375px] bg-white rounded-md shadow-lg p-4">
            <button
              onClick={() => setIsPostcodeOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl">
              ✕
            </button>
            <DaumPostcode onComplete={handleComplete} />
          </div>
        </div>
      )}
    </div>
  );
}
