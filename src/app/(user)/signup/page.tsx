'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Personal from '@/assets/images/personal.png';
import Store from '@/assets/images/store.png';
import Topbar from '@/components/topbar/Topbar';
import Modal from '@/components/login/PrivacyModal';

export default function SignupPage() {
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  return (
    <div className="flex flex-col h-[100%] bg-white relative">
      <Topbar
        classname="whitespace-nowrap"
        hasBackBtn
        rightItems={
          <Link href="/login" className="text-primary font-semibold">
            로그인
          </Link>
        }
      />

      <div className="px-5 pt-6 pb-4 text-gray900">
        <h1 className="text-2xl font-bold leading-snug">
          빵잇나우에 <br />
          오신 걸 환영합니다!
        </h1>
        <p className="mt-2 text-sm text-gray500">가입하실 회원 유형을 선택해주세요.</p>
      </div>

      <div className="flex justify-center gap-3 px-5 mt-6">
        <Link href="/signup/personal" className="w-40 h-[180px]">
          <div className="w-full h-full border border-gray-300 rounded-2xl flex flex-col items-center py-6 px-4 shadow-sm hover:shadow-md transition">
            <Image src={Personal} alt="개인회원" width={70} height={70} className="mt-3 object-contain" />
            <p className="mt-3 text-base font-medium text-gray-900">개인회원</p>
          </div>
        </Link>

        <Link href="/signup/bakery" className="w-40 h-[180px]">
          <div className="w-full h-full border border-gray-300 rounded-2xl flex flex-col items-center py-6 px-4 shadow-sm hover:shadow-md transition">
            <Image src={Store} alt="빵집회원" width={70} height={70} className="mt-3 object-contain" />
            <p className="mt-3 text-base font-medium text-gray-900">빵집회원</p>
          </div>
        </Link>
      </div>

      <div className="absolute bottom-[40px] left-0 w-full px-5 text-center text-xs text-gray500 leading-relaxed">
        회원가입시 빵잇나우의{' '}
        <button onClick={() => setPrivacyModalOpen(true)} className="underline">
          개인정보처리방침
        </button>{' '}
        및{' '}
        <button onClick={() => setTermsModalOpen(true)} className="underline">
          이용약관
        </button>
        에 <br /> 동의하는 것으로 간주합니다.
      </div>
      <Modal
        isOpen={isPrivacyModalOpen}
        className="max-w-[320px]"
        onClose={() => setPrivacyModalOpen(false)}
        title="개인정보처리방침">
        <p>
          개인정보 보호법에 따라 빵잇나우는 회원의 개인정보를 보호합니다. 수집된 개인정보는 이용자의 원활한 서비스
          이용을 위해 사용됩니다. 자세한 사항은 관리자의 정책을 따릅니다.
        </p>
      </Modal>

      <Modal
        isOpen={isTermsModalOpen}
        className="max-w-[320px]"
        onClose={() => setTermsModalOpen(false)}
        title="이용약관">
        <p>
          본 서비스의 이용약관은 다음과 같습니다. 이용자는 본 약관에 동의해야 서비스를 이용할 수 있으며, 약관은 회사의
          정책에 따라 변경될 수 있습니다.
        </p>
      </Modal>
    </div>
  );
}
